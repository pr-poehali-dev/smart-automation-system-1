import { useState, useRef } from "react"
import { useLang } from "@/lib/LangContext"
import func2url from "../../backend/func2url.json"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSteps from "@/components/dashboard/DashboardSteps"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import { ContentType, ProductCategory, Step } from "@/components/dashboard/constants"

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
    { id: "infographic", label: t("content_infographic"), cost: 1, icon: "LayoutTemplate", desc: t("content_infographic_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/20352bff-e47b-4a9b-b0bf-a8da2042a1f6.jpg" },
    { id: "tryon", label: t("content_tryon"), cost: 4, icon: "Shirt", desc: t("content_tryon_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/745072ef-179e-4c2c-b8af-97f75cb09203.jpg" },
    { id: "video", label: t("content_video"), cost: 8, icon: "Video", desc: t("content_video_desc"), preview: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/45877cfd-35e8-4330-b838-fe8de412e59b.jpg" },
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
      <DashboardHeader balance={balance} />

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
          <DashboardSteps
            step={step}
            fileRef={fileRef}
            onFileChange={handleFileChange}
            onDrop={handleDrop}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setStep={setStep}
            setUploadedImage={setUploadedImage}
            concepts={concepts}
            selectedConcept={selectedConcept}
            setSelectedConcept={setSelectedConcept}
            contentTypes={contentTypes}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            description={description}
            setDescription={setDescription}
            generateError={generateError}
            balance={balance}
            selectedTypeData={selectedTypeData}
            onGenerate={handleGenerate}
            generatedImages={generatedImages}
            setSelectedCategoryNull={() => {
              setStep("upload")
              setUploadedImage(null)
              setDescription("")
              setSelectedCategory(null)
            }}
          />

          <DashboardSidebar
            selectedCategory={selectedCategory}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setStep={setStep}
            balance={balance}
          />
        </div>
      </div>
    </div>
  )
}
