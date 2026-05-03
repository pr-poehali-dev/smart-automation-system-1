import os
import json
import base64
import time
import boto3
import requests
from io import BytesIO
from PIL import Image


CONCEPT_PROMPTS = {
    'white-bg': 'pure seamless white background, soft studio lighting, professional commercial product photography, clean shadow under product',
    'lifestyle': 'natural lifestyle setting, modern interior, soft natural daylight, photorealistic environment, depth of field',
    'studio': 'professional photo studio with dramatic side lighting, deep shadows, premium commercial advertising photography',
    'gradient': 'smooth vibrant gradient background, modern minimalist aesthetic, clean composition',
}


def resize_image(image_b64: str, max_size: int = 1024) -> bytes:
    img_bytes = base64.b64decode(image_b64)
    img = Image.open(BytesIO(img_bytes)).convert("RGB")
    img.thumbnail((max_size, max_size), Image.LANCZOS)
    out = BytesIO()
    img.save(out, format="JPEG", quality=92)
    return out.getvalue()


def upload_to_s3(image_bytes: bytes, key_prefix: str = 'uploads') -> str:
    """Загружает изображение в S3 и возвращает публичный URL"""
    aws_key = os.environ.get('AWS_ACCESS_KEY_ID', '')
    aws_secret = os.environ.get('AWS_SECRET_ACCESS_KEY', '')
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=aws_key,
        aws_secret_access_key=aws_secret,
    )
    file_key = f'{key_prefix}/{int(time.time() * 1000)}.jpg'
    s3.put_object(
        Bucket='files',
        Key=file_key,
        Body=image_bytes,
        ContentType='image/jpeg',
    )
    return f'https://cdn.poehali.dev/projects/{aws_key}/bucket/{file_key}'


def call_fal_kontext(fal_key: str, image_url: str, prompt: str) -> bytes:
    """Вызывает FLUX Kontext через fal.ai — сохраняет товар, меняет фон"""
    submit_url = 'https://queue.fal.run/fal-ai/flux-pro/kontext'
    headers = {
        'Authorization': f'Key {fal_key}',
        'Content-Type': 'application/json',
    }
    payload = {
        'prompt': prompt,
        'image_url': image_url,
        'guidance_scale': 3.5,
        'num_images': 1,
        'output_format': 'jpeg',
        'safety_tolerance': '2',
    }
    submit = requests.post(submit_url, headers=headers, json=payload, timeout=30)
    if submit.status_code not in (200, 202):
        raise RuntimeError(f'fal submit {submit.status_code}: {submit.text[:500]}')

    data = submit.json()
    status_url = data.get('status_url') or data.get('response_url')
    if not status_url:
        raise RuntimeError(f'no status_url in fal response: {data}')

    # Polling до 90 секунд
    for _ in range(45):
        time.sleep(2)
        check = requests.get(status_url, headers=headers, timeout=15)
        if check.status_code != 200:
            continue
        st = check.json()
        if st.get('status') == 'COMPLETED':
            response_url = data.get('response_url') or status_url.replace('/status', '')
            result = requests.get(response_url, headers=headers, timeout=15).json()
            images = result.get('images', [])
            if not images:
                raise RuntimeError(f'no images in result: {result}')
            img_url = images[0]['url'] if isinstance(images[0], dict) else images[0]
            img_resp = requests.get(img_url, timeout=30)
            return img_resp.content
        if st.get('status') == 'FAILED':
            raise RuntimeError(f'fal failed: {st}')

    raise RuntimeError('fal timeout 90s')


def handler(event: dict, context) -> dict:
    """Генерация фото товара через fal.ai FLUX Kontext (сохраняет товар, меняет окружение)"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    try:
        body = json.loads(event.get('body') or '{}')
        prompt = body.get('prompt', 'product photo')
        concept = body.get('concept', 'white-bg')
        image_b64 = body.get('image', '')

        if not image_b64:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'image required'}),
            }

        fal_key = os.environ.get('FAL_API_KEY', '').strip()
        if not fal_key:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'FAL_API_KEY not configured'}),
            }

        base_concept = CONCEPT_PROMPTS.get(concept, CONCEPT_PROMPTS['white-bg'])

        full_prompt = (
            f'{prompt}. '
            f'Place the IDENTICAL product into this new scene: {base_concept}. '
            f'Add realistic shadow and reflection on the surface based on the new environment. '
            f'Product must stay completely untouched — same shape, color, material, logos, '
            f'reflections, proportions, angle. Background only changes. '
            f'High quality, 4k, photorealistic, professional product photography.'
        )

        # Загружаем фото в S3 чтобы дать fal.ai публичный URL
        img_bytes = resize_image(image_b64, 1024)
        image_url = upload_to_s3(img_bytes, 'uploads')

        # Вызываем FLUX Kontext
        result_bytes = call_fal_kontext(fal_key, image_url, full_prompt)
        out_b64 = base64.b64encode(result_bytes).decode('utf-8')

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'image': out_b64,
                'format': 'jpeg',
                'prompt': full_prompt,
            }),
        }

    except Exception as exc:
        print(f'GEN_ERROR {type(exc).__name__}: {str(exc)}')
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'{type(exc).__name__}: {str(exc)}'}),
        }
