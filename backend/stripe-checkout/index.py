import json
import os
import urllib.request
import urllib.parse
import psycopg2

PLANS = {
    'start': {'price': 9, 'sestertius': 100, 'name': 'Старт'},
    'business': {'price': 35, 'sestertius': 500, 'name': 'Бизнес'},
    'pro': {'price': 99, 'sestertius': 1600, 'name': 'Pro'},
}


def handler(event: dict, context) -> dict:
    """Создаёт Stripe Checkout сессию для оплаты тарифа Sestertius"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    plan_id = body.get('plan_id', '')
    success_url = body.get('success_url', 'https://piastra.app/success')
    cancel_url = body.get('cancel_url', 'https://piastra.app/pricing')
    user_email = body.get('email', '')

    if plan_id not in PLANS:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid plan_id'}),
        }

    plan = PLANS[plan_id]
    stripe_key = os.environ.get('STRIPE_SECRET_KEY', '')

    if not stripe_key:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Stripe not configured'}),
        }

    form_data = [
        ('mode', 'payment'),
        ('success_url', f'{success_url}?session_id={{CHECKOUT_SESSION_ID}}'),
        ('cancel_url', cancel_url),
        ('line_items[0][price_data][currency]', 'usd'),
        ('line_items[0][price_data][product_data][name]', f'Piastra {plan["name"]} — {plan["sestertius"]} Sestertius'),
        ('line_items[0][price_data][unit_amount]', str(plan['price'] * 100)),
        ('line_items[0][quantity]', '1'),
        ('metadata[plan_id]', plan_id),
        ('metadata[sestertius]', str(plan['sestertius'])),
    ]
    if user_email:
        form_data.append(('customer_email', user_email))

    encoded = urllib.parse.urlencode(form_data)
    req = urllib.request.Request(
        'https://api.stripe.com/v1/checkout/sessions',
        data=encoded.encode('utf-8'),
        headers={
            'Authorization': f'Bearer {stripe_key}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req) as response:
            session = json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        print(f'STRIPE_ERROR status={e.code} body={err_body}')
        try:
            err_json = json.loads(err_body)
            stripe_msg = err_json.get('error', {}).get('message', err_body)
        except Exception:
            stripe_msg = err_body
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Stripe: {stripe_msg}'}),
        }
    except Exception as e:
        print(f'GENERAL_ERROR {type(e).__name__}: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
        }

    dsn = os.environ.get('DATABASE_URL', '')
    if dsn:
        try:
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            email_val = user_email.replace("'", "''") if user_email else ''
            email_sql = f"'{email_val}'" if email_val else 'NULL'
            cur.execute(
                f"INSERT INTO transactions (stripe_session_id, user_email, plan_id, sestertius_amount, price_usd, status) "
                f"VALUES ('{session['id']}', {email_sql}, '{plan_id}', {plan['sestertius']}, {plan['price']}, 'pending') "
                f"ON CONFLICT (stripe_session_id) DO NOTHING"
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
        'body': json.dumps({
            'session_id': session['id'],
            'checkout_url': session['url'],
        }),
    }