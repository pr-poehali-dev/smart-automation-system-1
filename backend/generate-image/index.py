import os
import json
import base64
import requests


def handler(event: dict, context) -> dict:
    """Генерация изображения через Hugging Face Stable Diffusion XL"""
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
    prompt = body.get('prompt', 'product photo, white background, professional')
    concept = body.get('concept', 'white-bg')
    content_type = body.get('content_type', 'photo')

    concept_prompts = {
        'white-bg': 'product photo on pure white background, professional studio lighting, high quality',
        'lifestyle': 'product in lifestyle setting, natural environment, modern interior, beautiful lighting',
        'studio': 'product in professional photo studio, dramatic lighting, shadows, commercial photography',
        'gradient': 'product on smooth gradient background, vibrant colors, modern aesthetic',
    }

    base_concept = concept_prompts.get(concept, concept_prompts['white-bg'])
    full_prompt = f"{prompt}, {base_concept}, 4k, photorealistic, detailed"

    hf_token = os.environ.get('HUGGINGFACE_API_TOKEN', '')
    api_url = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0"

    response = requests.post(
        api_url,
        headers={
            "Authorization": f"Bearer {hf_token}",
            "Content-Type": "application/json"
        },
        json={
            "inputs": full_prompt,
            "parameters": {
                "num_inference_steps": 30,
                "guidance_scale": 7.5,
                "width": 1024,
                "height": 1024
            }
        },
        timeout=120
    )

    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'HF API error: {response.status_code}', 'detail': response.text[:500]})
        }

    image_bytes = response.content
    image_b64 = base64.b64encode(image_bytes).decode('utf-8')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'image': image_b64,
            'format': 'jpeg',
            'prompt': full_prompt
        })
    }