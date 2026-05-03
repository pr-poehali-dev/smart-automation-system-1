import { useLang } from "@/lib/LangContext"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="container py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center text-center">
        <a href="/" className="flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-black dark:text-white">
            Piast<span className="text-[#7A7FEE]">ra</span>
          </span>
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">{t("footer_desc")}</p>
        <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <a href="#services" className="hover:text-[#7A7FEE] transition-colors">{t("nav_features")}</a>
          <a href="#pricing" className="hover:text-[#7A7FEE] transition-colors">{t("nav_pricing")}</a>
          <a href="#faq" className="hover:text-[#7A7FEE] transition-colors">{t("nav_faq")}</a>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().getFullYear()} Piastra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
