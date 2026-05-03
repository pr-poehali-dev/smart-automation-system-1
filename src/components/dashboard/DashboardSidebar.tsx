import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"
import { ProductCategory, Step } from "./constants"

type Props = {
  selectedCategory: ProductCategory | null
  uploadedImage: string | null
  setUploadedImage: (img: string | null) => void
  setStep: (s: Step) => void
  balance: number
}

export default function DashboardSidebar({
  selectedCategory,
  uploadedImage,
  setUploadedImage,
  setStep,
  balance,
}: Props) {
  const { t } = useLang()

  return (
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
  )
}
