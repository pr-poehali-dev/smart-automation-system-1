import { useState, useRef } from "react"
import ThemeToggle from "@/components/landing/ThemeToggle"
import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"

type Step = "upload" | "concept" | "describe" | "generating" | "result"
type ContentType = "photo" | "infographic" | "tryon" | "video"

export default function Dashboard() {
  const { t } = useLang()
  const [step, setStep] = useState<Step>("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<string>("white-bg")
  const [selectedType, setSelectedType] = useState<ContentType>("photo")
  const [description, setDescription] = useState("")
  const [balance] = useState(10)
  const [generatedImages] = useState([
    "/portfolio-images/ecommerce-interface-1.jpg",
    "/portfolio-images/ai-platform-1.jpg",
    "/portfolio-images/saas-dashboard-1.jpg",
  ])
  const fileRef = useRef<HTMLInputElement>(null)

  const concepts = [
    { id: "white-bg", label: t("concept_white"), desc: t("concept_white_desc"), icon: "Square" },
    { id: "lifestyle", label: t("concept_lifestyle"), desc: t("concept_lifestyle_desc"), icon: "Home" },
    { id: "studio", label: t("concept_studio"), desc: t("concept_studio_desc"), icon: "Camera" },
    { id: "gradient", label: t("concept_gradient"), desc: t("concept_gradient_desc"), icon: "Layers" },
  ]

  const contentTypes: { id: ContentType; label: string; cost: number; icon: string; desc: string }[] = [
    { id: "photo", label: t("content_photo"), cost: 1, icon: "Image", desc: t("content_photo_desc") },
    { id: "infographic", label: t("content_infographic"), cost: 2, icon: "LayoutTemplate", desc: t("content_infographic_desc") },
    { id: "tryon", label: t("content_tryon"), cost: 3, icon: "Shirt", desc: t("content_tryon_desc") },
    { id: "video", label: t("content_video"), cost: 5, icon: "Video", desc: t("content_video_desc") },
  ]

  const selectedTypeData = contentTypes.find((ct) => ct.id === selectedType)!

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadedImage(URL.createObjectURL(file))
    setStep("concept")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    setUploadedImage(URL.createObjectURL(file))
    setStep("concept")
  }

  const handleGenerate = () => {
    setStep("generating")
    setTimeout(() => setStep("result"), 3000)
  }

  const stepIndex = ["upload", "concept", "describe", "result"].indexOf(step === "generating" ? "result" : step)
  const stepLabels = [t("dash_step1"), t("dash_step2"), t("dash_step3"), t("dash_step4")]

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
              {i < 3 && <div className="w-6 h-px bg-gray-200 dark:bg-gray-700" />}
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
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selectedType === ct.id ? "border-[#7A7FEE] bg-[#7A7FEE]/5" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon name={ct.icon} size={18} className={selectedType === ct.id ? "text-[#7A7FEE]" : "text-gray-400"} />
                      <div className="mt-1.5 font-medium text-black dark:text-white text-xs">{ct.label}</div>
                      <div className="text-xs text-[#7A7FEE] font-semibold">{ct.cost} St</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("describe")}
                  className="mt-6 w-full py-3 bg-[#7A7FEE] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
                >
                  {t("dash_next")}
                </button>
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
                    onClick={() => { setStep("upload"); setUploadedImage(null); setDescription("") }}
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
