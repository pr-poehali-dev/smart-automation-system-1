import { useLang } from "@/lib/LangContext"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="container py-3 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <a href="/" className="flex items-center">
          <span className="text-sm font-bold text-black dark:text-white">
            Piast<span className="text-[#7A7FEE]">ra</span>
          </span>
        </a>
        <div className="flex gap-3 text-[10px] text-gray-500 dark:text-gray-400">
          <a href="#services" className="hover:text-[#7A7FEE] transition-colors">{t("nav_features")}</a>
          <a href="#pricing" className="hover:text-[#7A7FEE] transition-colors">{t("nav_pricing")}</a>
          <a href="#faq" className="hover:text-[#7A7FEE] transition-colors">{t("nav_faq")}</a>
        </div>
        <p className="text-[10px] text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Piastra
        </p>
      </div>
    </footer>
  )
}