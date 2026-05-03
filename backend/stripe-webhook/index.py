import json
import os
import hmac
import hashlib
import time
import psycopg2


def verify_signature(payload: bytes, sig_header: str, secret: str) -> bool:
    """Проверяет подпись Stripe вебхука"""
    if not sig_header or not secret:
        return False
    try:
        items = dict(item.split('=', 1) for item in sig_header.split(','))
        timestamp = items.get('t', '')
        signature = items.get('v1', '')
        if not timestamp or not signature:
            return False
        if abs(int(time.time()) - int(timestamp)) > 300:
            return False
        signed_payload = f'{timestamp}.{payload.decode("utf-8")}'
        expected = hmac.new(
            secret.encode('utf-8'),
            signed_payload.encode('utf-8'),
            hashlib.sha256,
        ).hexdigest()
        return hmac.compare_digest(expected, signature)
    except Exception:
        return False


def handler(event: dict, context) -> dict:
    """Обрабатывает Stripe вебхук — зачисляет Sestertius после оплаты"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    raw_body = event.get('body') or ''
    headers = event.get('headers') or {}
    sig_header = headers.get('Stripe-Signature') or headers.get('stripe-signature') or ''
    webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET', '')

    payload_bytes = raw_body.encode('utf-8') if isinstance(raw_body, str) else raw_body

    if webhook_secret and not verify_signature(payload_bytes, sig_header, webhook_secret):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid signature'}),
        }

    try:
        payload = json.loads(raw_body)
    except Exception:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    event_type = payload.get('type', '')

    if event_type == 'checkout.session.completed':
        session = payload.get('data', {}).get('object', {})
        session_id = session.get('id', '')
        payment_intent = session.get('payment_intent', '') or ''
        customer_email = session.get('customer_email') or session.get('customer_details', {}).get('email', '') or ''

        dsn = os.environ.get('DATABASE_URL', '')
        if dsn and session_id:
            try:
                conn = psycopg2.connect(dsn)
                cur = conn.cursor()
                sid = session_id.replace("'", "''")
                pi = payment_intent.replace("'", "''")
                email = customer_email.replace("'", "''")
                cur.execute(
                    f"UPDATE transactions SET status = 'completed', stripe_payment_intent = '{pi}', "
                    f"user_email = COALESCE(NULLIF(user_email, ''), '{email}'), completed_at = NOW() "
                    f"WHERE stripe_session_id = '{sid}'"
                )
                conn.commit()
                cur.close()
                conn.close()
            except Exception:
                pass

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'received': True}),
    }
