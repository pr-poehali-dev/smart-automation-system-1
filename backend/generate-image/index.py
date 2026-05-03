import os
import json
import base64
import requests
from io import BytesIO
from PIL import Image


def resize_image(image_b64: str, max_size: int = 1024) -> bytes:
    img_bytes = base64.b64decode(image_b64)
    img = Image.open(BytesIO(img_bytes)).convert("RGB")
    img.thumbnail((max_size, max_size), Image.LANCZOS)
    out = BytesIO()
    img.save(out, format="JPEG", quality=90)
    return out.getvalue()


def handler(event: dict, context) -> dict:
    """Генерация изображения на основе загруженного фото товара через HuggingFace. v9"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    prompt = body.get('prompt', 'product photo')
    concept = body.get('concept', 'white-bg')
    image_b64 = body.get('image', '')

    concept_prompts = {
        'white-bg': 'on pure white background, professional studio lighting, commercial product photo, high quality',
        'lifestyle': 'in lifestyle setting, natural environment, modern interior, beautiful lighting',
        'studio': 'in professional photo studio, dramatic lighting, shadows, commercial photography',
        'gradient': 'on smooth gradient background, vibrant colors, modern aesthetic',
    }

    base_concept = concept_prompts.get(concept, concept_prompts['white-bg'])

    hf_token = os.environ.get('HUGGINGFACE_API_TOKEN', '').strip()
    if not hf_token:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'HUGGINGFACE_API_TOKEN not set'})
        }

    if image_b64:
        img_bytes = resize_image(image_b64, 768)
        img_resized_b64 = base64.b64encode(img_bytes).decode('utf-8')
        full_prompt = f"{prompt}, {base_concept}, high quality, photorealistic"
        # img2img через HF inference — stable-diffusion-v1-5
        api_url = "https://router.huggingface.co/hf-inference/models/stable-diffusion-v1-5/stable-diffusion-v1-5"
        payload = {
            "inputs": full_prompt,
            "image": img_resized_b64,
            "parameters": {
                "num_inference_steps": 20,
                "guidance_scale": 7.5,
                "strength": 0.65,
            }
        }
    else:
        full_prompt = f"{prompt}, {base_concept}, high quality, 4k, photorealistic"
        api_url = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell"
        payload = {
            "inputs": full_prompt,
            "parameters": {"num_inference_steps": 4, "width": 1024, "height": 1024}
        }

    response = requests.post(
        api_url,
        headers={
            "Authorization": f"Bearer {hf_token}",
            "Content-Type": "application/json"
        },
        json=payload,
        timeout=110
    )

    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'HF API error: {response.status_code}', 'detail': response.text[:500]})
        }

    image_b64_out = base64.b64encode(response.content).decode('utf-8')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'image': image_b64_out,
            'format': 'jpeg',
            'prompt': full_prompt
        })
    }