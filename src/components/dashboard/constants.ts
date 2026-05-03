export type Step = "upload" | "category" | "concept" | "describe" | "generating" | "result"
export type ContentType = "photo" | "infographic" | "tryon" | "video"

export type ProductCategory = {
  id: string
  label: string
  icon: string
  prompt: string
  preview: string
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "sneakers",
    label: "Кроссовки / Обувь",
    icon: "Footprints",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/1d7871f9-fe38-45e1-a3b8-db854982ebcf.jpg",
    prompt: "Keep EXACT product: same shape, color, material, brand logo, stitching, sole wear, lace condition, same angle and perspective — do not rotate or reposition by even 1°. Preserve original lighting on the product. Do NOT modify, redesign, clean, or alter the product in ANY way.",
  },
  {
    id: "watches",
    label: "Часы / Ювелирка",
    icon: "Watch",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/3db0e154-7b27-4852-9a27-fb69a973345a.jpg",
    prompt: "Keep EXACT product: same case shape, dial color, strap material and color with stitching, date window position, crown details. Preserve exact light reflection pattern on glass — same glare position, do not add new reflections. Do NOT polish, remove scratches, or alter the product in ANY way.",
  },
  {
    id: "cosmetics",
    label: "Косметика / Бутылка",
    icon: "Droplets",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/0279f324-f634-451e-aefb-e3af3ca4efdb.jpg",
    prompt: "Keep EXACT product: same bottle/container shape, cap color and material, liquid fill level, label with all text and graphics, transparency of glass. Same angle — do not rotate or reposition by even 1°. Do NOT change shape, color, label, or fill level in ANY way.",
  },
  {
    id: "gadgets",
    label: "Гаджет / Телефон / Ноутбук",
    icon: "Laptop",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/eb1adbb9-23d4-4520-ad42-18822907a7bc.jpg",
    prompt: "Keep EXACT product: same model, color, all stickers, decals, ports, wear marks, rubber edge condition. Preserve screen content exactly — do not change what is displayed on screen. Same angle — do not rotate or reposition by even 1°. Do NOT clean, polish, or alter the product in ANY way.",
  },
  {
    id: "packaging",
    label: "Упаковка / Коробка / Еда",
    icon: "Package",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/6eb12e93-af3d-46e7-99b1-900936360781.jpg",
    prompt: "Keep EXACT product: same packaging shape, brand logo and colors, all text on packaging, grease spots, dents, creases — these are intentional and must be preserved. Same angle — do not rotate or reposition by even 1°. Do NOT clean, fix, or alter the product in ANY way.",
  },
  {
    id: "tools",
    label: "Инструменты / Станки",
    icon: "Wrench",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/5f2d7fbf-28b2-41c7-a5d8-f5d77ab170ad.jpg",
    prompt: "Keep EXACT product: same model, brand color and logo, all wear marks, scratches, cable condition, grip texture. Same angle — do not rotate or reposition by even 1°. Preserve all signs of use — they demonstrate reliability. Do NOT clean, polish, or alter the product in ANY way.",
  },
  {
    id: "clothing",
    label: "Одежда / Нижнее бельё",
    icon: "Shirt",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/14cae0d7-5c3f-4dd6-bda5-112296ee7626.jpg",
    prompt: "Keep EXACT garment: same fabric texture, color, pattern, stitching, lace, buttons, zippers, brand labels, fit and silhouette. Preserve fabric folds and drape exactly as in original. Same angle — do not rotate or reposition by even 1°. Do NOT change cut, color, fabric, or alter the garment in ANY way.",
  },
  {
    id: "furniture",
    label: "Мебель / Декор",
    icon: "Armchair",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/b9caa117-30ae-4966-b40e-60d99cc67ef2.jpg",
    prompt: "Keep EXACT furniture item: same shape, dimensions, material (wood grain, fabric texture, metal finish), color, upholstery pattern, legs, handles, hardware. Preserve all details and proportions. Same angle and perspective — do not rotate or reposition by even 1°. Do NOT redesign, restyle, or alter the item in ANY way.",
  },
  {
    id: "lighting",
    label: "Люстры / Светильники",
    icon: "Lamp",
    preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/8fc58b04-1bc0-4972-a7a4-fc2911a6bf38.jpg",
    prompt: "Keep EXACT lighting fixture: same shape, material (glass, metal, crystal), color, finish, bulb type and arrangement, chain or cord. Preserve light glow and reflections exactly. Same angle — do not rotate or reposition by even 1°. Do NOT change design, shape, or alter the fixture in ANY way.",
  },
]
