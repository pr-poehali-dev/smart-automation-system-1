import { useLang } from "@/lib/LangContext"

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="hero" className="card my-4 relative overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5 z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#7A7FEE]/10 text-[#7A7FEE] text-[10px] font-medium px-2 py-0.5 rounded-full mb-2">
            {t("hero_badge")}
          </div>
          <h1 className="text-black dark:text-white text-xl md:text-3xl font-medium leading-tight">
            {t("hero_title1")}{" "}
            <span className="text-[#7A7FEE]">{t("hero_title2")}</span>
          </h1>
          <p className="my-3 text-xs max-w-md text-gray-700 dark:text-gray-300">
            {t("hero_desc")}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/dashboard" className="px-3 py-1.5 rounded-md bg-[#7A7FEE] text-white text-xs font-semibold hover:bg-opacity-90 transition-colors">{t("hero_cta")}</a>
            <a href="#services" className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 text-xs font-medium text-black dark:text-white hover:border-[#7A7FEE] transition-colors">{t("hero_how")}</a>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="text-center">
              <div className="text-base font-bold text-black dark:text-white">10</div>
              <div className="text-[9px] text-gray-500 dark:text-gray-400 leading-tight">{t("hero_stat1")}</div>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-base font-bold text-black dark:text-white">&lt;30s</div>
              <div className="text-[9px] text-gray-500 dark:text-gray-400 leading-tight">{t("hero_stat2")}</div>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-base font-bold text-black dark:text-white">4-in-1</div>
              <div className="text-[9px] text-gray-500 dark:text-gray-400 leading-tight">{t("hero_stat3")}</div>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:flex md:items-center">
          <img src="/purple-circle-wave-static.png" alt="Wave" className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left opacity-80" />
        </div>
      </div>
    </section>
  )
}