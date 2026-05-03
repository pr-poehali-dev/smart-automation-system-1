import { RefObject } from "react"
import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"
import { ContentType, PRODUCT_CATEGORIES, ProductCategory, Step } from "./constants"

type ContentTypeItem = {
  id: ContentType
  label: string
  cost: number
  icon: string
  desc: string
  preview: string
}

type ConceptItem = {
  id: string
  label: string
  desc: string
  icon: string
}

type Props = {
  step: Step
  fileRef: RefObject<HTMLInputElement>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (e: React.DragEvent) => void
  selectedCategory: ProductCategory | null
  setSelectedCategory: (cat: ProductCategory) => void
  setStep: (s: Step) => void
  setUploadedImage: (img: string | null) => void
  concepts: ConceptItem[]
  selectedConcept: string
  setSelectedConcept: (c: string) => void
  contentTypes: ContentTypeItem[]
  selectedType: ContentType
  setSelectedType: (t: ContentType) => void
  description: string
  setDescription: (d: string) => void
  generateError: string | null
  balance: number
  selectedTypeData: ContentTypeItem
  onGenerate: () => void
  generatedImages: string[]
  setSelectedCategoryNull: () => void
}

export default function DashboardSteps(props: Props) {
  const { t } = useLang()
  const {
    step,
    fileRef,
    onFileChange,
    onDrop,
    selectedCategory,
    setSelectedCategory,
    setStep,
    setUploadedImage,
    concepts,
    selectedConcept,
    setSelectedConcept,
    contentTypes,
    selectedType,
    setSelectedType,
    description,
    setDescription,
    generateError,
    balance,
    selectedTypeData,
    onGenerate,
    generatedImages,
    setSelectedCategoryNull,
  } = props

  return (
    <div className="lg:col-span-2 space-y-4">
      {/* Upload */}
      {step === "upload" && (
        <div
          className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#7A7FEE] transition-colors"
          onClick={() => fileRef.current?.click()}
          onDrop={onDrop}
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
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
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
              onClick={onGenerate}
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
              onClick={setSelectedCategoryNull}
              className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#7A7FEE] transition-colors"
            >
              {t("dash_new")}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
