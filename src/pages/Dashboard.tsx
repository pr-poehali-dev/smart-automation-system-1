import { useState, useRef } from "react"
import ThemeToggle from "@/components/landing/ThemeToggle"
import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"
import func2url from "../../backend/func2url.json"

type Step = "upload" | "category" | "concept" | "describe" | "generating" | "result"
type ContentType = "photo" | "infographic" | "tryon" | "video"

type ProductCategory = {
  id: string
  label: string
  icon: string
  prompt: string
  preview: string
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
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
]

export default function Dashboard() {
  const { t } = useLang()
  const [step, setStep] = useState<Step>("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<string>("white-bg")
  const [selectedType, setSelectedType] = useState<ContentType>("photo")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
  const [description, setDescription] = useState("")
  const [balance] = useState(10)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [generateError, setGenerateError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const uploadedImageFile = useRef<File | null>(null)

  const concepts = [
    { id: "white-bg", label: t("concept_white"), desc: t("concept_white_desc"), icon: "Square" },
    { id: "lifestyle", label: t("concept_lifestyle"), desc: t("concept_lifestyle_desc"), icon: "Home" },
    { id: "studio", label: t("concept_studio"), desc: t("concept_studio_desc"), icon: "Camera" },
    { id: "gradient", label: t("concept_gradient"), desc: t("concept_gradient_desc"), icon: "Layers" },
  ]

  const contentTypes: { id: ContentType; label: string; cost: number; icon: string; desc: string; preview: string }[] = [
    { id: "photo", label: t("content_photo"), cost: 1, icon: "Image", desc: t("content_photo_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/39f49594-8aa2-42d1-b59f-4a48158a46ca.jpg" },
    { id: "infographic", label: t("content_infographic"), cost: 2, icon: "LayoutTemplate", desc: t("content_infographic_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/20352bff-e47b-4a9b-b0bf-a8da2042a1f6.jpg" },
    { id: "tryon", label: t("content_tryon"), cost: 3, icon: "Shirt", desc: t("content_tryon_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/745072ef-179e-4c2c-b8af-97f75cb09203.jpg" },
    { id: "video", label: t("content_video"), cost: 5, icon: "Video", desc: t("content_video_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/45877cfd-35e8-4330-b838-fe8de412e59b.jpg" },
  ]

  const selectedTypeData = contentTypes.find((ct) => ct.id === selectedType)!

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    uploadedImageFile.current = file
    setUploadedImage(URL.createObjectURL(file))
    setStep("category")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    uploadedImageFile.current = file
    setUploadedImage(URL.createObjectURL(file))
    setStep("category")
  }

  const getImageBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(',')[1])
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleGenerate = async () => {
    setStep("generating")
    setGenerateError(null)
    setGeneratedImages([])
    try {
      let imageB64 = ""
      if (uploadedImageFile.current) {
        imageB64 = await getImageBase64(uploadedImageFile.current)
      }

      const results: string[] = []
      for (let i = 0; i < 3; i++) {
        const res = await fetch(func2url["generate-image"], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `${selectedCategory?.prompt || ""} ${description || "product photo"}`.trim(),
            concept: selectedConcept,
            content_type: selectedType,
            image: imageB64,
          }),
        })
        const data = await res.json()
        if (data.image) {
          results.push(`data:image/jpeg;base64,${data.image}`)
        }
      }
      setGeneratedImages(results)
      setStep("result")
    } catch (e) {
      setGenerateError("Ошибка генерации. Попробуй ещё раз.")
      setStep("describe")
    }
  }

  const stepIndex = ["upload", "category", "concept", "describe", "result"].indexOf(step === "generating" ? "result" : step)
  const stepLabels = ["Фото", "Категория", t("dash_step2"), t("dash_step3"), t("dash_step4")]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d0d]">
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-black dark:text-white">
            Piast<span className="text-[#7A7FEE]">ra</span>
          </a>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#7A7FEE]/10 text-[#7A7FEE] px-3 py-1.5 rounded-full text-sm font-semibold">
              <Icon name="Coins" size={15} />
              {balance} {t("dash_balance")}
            </div>
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] transition-colors">
              {t("dash_buy")}
            </button>
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-[#7A7FEE] flex items-center justify-center text-white text-sm font-semibold">U</div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === stepIndex ? "bg-[#7A7FEE] text-white" : i < stepIndex ? "bg-[#7A7FEE]/20 text-[#7A7FEE]" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              }`}>
                <span>{i + 1}</span>
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < 4 && <div className="w-6 h-px bg-gray-200 dark:bg-gray-700" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">

            {/* Upload */}
            {step === "upload" && (
              <div
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#7A7FEE] transition-colors"
                onClick={() => fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="w-16 h-16 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center mb-4">
                  <Icon name="Upload" size={28} className="text-[#7A7FEE]" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{t("dash_upload_title")}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t("dash_upload_desc")}<br />{t("dash_upload_formats")}
                </p>
                <button className="px-5 py-2.5 bg-[#7A7FEE] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                  {t("dash_upload_btn")}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            )}

            {/* Category */}
            {step === "category" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-1">Выберите категорию товара</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">ИИ подберёт оптимальный промпт для вашего типа товара</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-xl border-2 text-left transition-all overflow-hidden ${
                        selectedCategory?.id === cat.id
                          ? "border-[#7A7FEE] ring-2 ring-[#7A7FEE]/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img src={cat.preview} alt={cat.label} className="w-full h-full object-cover" />
                        {selectedCategory?.id === cat.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#7A7FEE] flex items-center justify-center">
                            <Icon name="Check" size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex items-center gap-2">
                        <Icon
                          name={cat.icon}
                          size={18}
                          className={selectedCategory?.id === cat.id ? "text-[#7A7FEE]" : "text-gray-400"}
                        />
                        <div className="font-medium text-black dark:text-white text-sm leading-tight">{cat.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setUploadedImage(null); setStep("upload") }}
                    className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#7A7FEE] transition-colors"
                  >
                    {t("dash_back")}
                  </button>
                  <button
                    onClick={() => setStep("concept")}
                    disabled={!selectedCategory}
                    className="flex-1 py-3 bg-[#7A7FEE] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t("dash_next")}
                  </button>
                </div>
              </div>
            )}

            {/* Concept */}
            {step === "concept" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">{t("dash_concept_title")}</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {concepts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedConcept(c.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedConcept === c.id ? "border-[#7A7FEE] bg-[#7A7FEE]/5" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <Icon name={c.icon} size={20} className={selectedConcept === c.id ? "text-[#7A7FEE]" : "text-gray-400"} />
                      <div className="mt-2 font-medium text-black dark:text-white text-sm">{c.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</div>
                    </button>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">{t("dash_content_title")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {contentTypes.map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => setSelectedType(ct.id)}
                      className={`rounded-xl border-2 text-left transition-all overflow-hidden ${
                        selectedType === ct.id ? "border-[#7A7FEE] ring-2 ring-[#7A7FEE]/30" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img src={ct.preview} alt={ct.label} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
                          <Icon name={ct.icon} size={14} className={selectedType === ct.id ? "text-[#7A7FEE]" : "text-gray-600 dark:text-gray-300"} />
                        </div>
                      </div>
                      <div className="p-2.5">
                        <div className="font-medium text-black dark:text-white text-xs leading-tight">{ct.label}</div>
                        <div className="text-xs text-[#7A7FEE] font-semibold mt-0.5">{ct.cost} St</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep("category")}
                    className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#7A7FEE] transition-colors"
                  >
                    {t("dash_back")}
                  </button>
                  <button
                    onClick={() => setStep("describe")}
                    className="flex-1 py-3 bg-[#7A7FEE] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
                  >
                    {t("dash_next")}
                  </button>
                </div>
              </div>
            )}

            {/* Describe */}
            {step === "describe" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{t("dash_describe_title")}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("dash_describe_hint")}</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("dash_describe_placeholder")}
                  className="w-full h-36 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-black dark:text-white text-sm resize-none focus:outline-none focus:border-[#7A7FEE] transition-colors"
                />
                <div className="flex items-center justify-between mt-2 mb-4">
                  <span className="text-xs text-gray-400">{description.length}</span>
                  <span className="text-xs text-gray-400">{t("dash_describe_hint")}</span>
                </div>
                {generateError && (
                  <div className="mb-3 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl">{generateError}</div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("concept")}
                    className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#7A7FEE] transition-colors"
                  >
                    {t("dash_back")}
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={balance < selectedTypeData.cost}
                    className="flex-1 py-3 bg-[#7A7FEE] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Icon name="Sparkles" size={16} />
                    {t("dash_generate")} · {selectedTypeData.cost} St
                  </button>
                </div>
              </div>
            )}

            {/* Generating */}
            {step === "generating" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center mb-4 animate-pulse">
                  <Icon name="Sparkles" size={28} className="text-[#7A7FEE]" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{t("dash_generating_title")}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t("dash_generating_desc")}</p>
                <div className="w-full max-w-xs bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-[#7A7FEE] h-2 rounded-full animate-pulse" style={{ width: "60%" }} />
                </div>
              </div>
            )}

            {/* Result */}
            {step === "result" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">{t("dash_result_title")}</h3>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                    -{selectedTypeData.cost} St
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {generatedImages.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden group">
                      <img src={img} alt={`Result ${i + 1}`} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-2 bg-white rounded-full">
                          <Icon name="Download" size={16} className="text-black" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-[#7A7FEE] text-white rounded-xl font-medium text-sm hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                    <Icon name="Download" size={16} />
                    {t("dash_download_all")}
                  </button>
                  <button
                    onClick={() => { setStep("upload"); setUploadedImage(null); setDescription(""); setSelectedCategory(null) }}
                    className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#7A7FEE] transition-colors"
                  >
                    {t("dash_new")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {selectedCategory && (
              <div className="bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/10 rounded-2xl p-4 flex items-center gap-3">
                <Icon name={selectedCategory.icon} size={20} className="text-[#7A7FEE] shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Категория</div>
                  <div className="text-sm font-semibold text-black dark:text-white">{selectedCategory.label}</div>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-black dark:text-white mb-3">{t("dash_your_product")}</h4>
              {uploadedImage ? (
                <div className="relative">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover rounded-xl" />
                  <button
                    onClick={() => { setUploadedImage(null); setStep("upload") }}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <Icon name="X" size={12} className="text-white" />
                  </button>
                </div>
              ) : (
                <div
                  className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setStep("upload")}
                >
                  <Icon name="ImagePlus" size={24} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-400">{t("dash_no_photo")}</span>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-black dark:text-white mb-3">{t("dash_balance")}</h4>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Coins" size={18} className="text-[#7A7FEE]" />
                <span className="text-2xl font-bold text-black dark:text-white">{balance}</span>
                <span className="text-sm text-gray-500">St</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-3">
                <div className="bg-[#7A7FEE] h-1.5 rounded-full" style={{ width: `${(balance / 500) * 100}%` }} />
              </div>
              <button className="w-full py-2 border border-[#7A7FEE] text-[#7A7FEE] rounded-lg text-sm font-medium hover:bg-[#7A7FEE]/10 transition-colors">
                {t("dash_recharge")}
              </button>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-black dark:text-white mb-3">{t("dash_stats")}</h4>
              <div className="space-y-3">
                {([
                  { label: t("dash_generated"), icon: "Sparkles" },
                  { label: t("dash_downloaded"), icon: "Download" },
                  { label: t("dash_spent"), icon: "Coins" },
                ] as { label: string; icon: string }[]).map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Icon name={s.icon} size={14} />
                      {s.label}
                    </div>
                    <span className="text-sm font-semibold text-black dark:text-white">0</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}