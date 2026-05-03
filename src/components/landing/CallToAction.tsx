import { useLang } from "@/lib/LangContext"

export default function CallToAction() {
  const { t } = useLang()
  return (
    <section id="contact" className="card my-6 relative overflow-hidden shadow-sm">
      <div className="p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="z-10 text-center md:text-left">
          <h2 className="text-black dark:text-white text-base md:text-lg font-semibold leading-tight">
            {t("cta_title1")}{" "}
            <span className="text-[#7A7FEE]">{t("cta_title2")}</span>
          </h2>
          <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 max-w-md">{t("cta_desc")}</p>
        </div>
        <a href="/dashboard" className="shrink-0 px-4 py-1.5 rounded-md bg-[#7A7FEE] text-white text-xs font-semibold hover:bg-opacity-90 transition-colors z-10">
          {t("cta_btn")}
        </a>
      </div>
    </section>
  )
}