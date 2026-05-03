import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"

const packages = [
  { sestertius: 100, price: "$9", highlight: false, best: false, perUnit: "$0.09 / St" },
  { sestertius: 130, price: "$15", highlight: false, best: false, perUnit: "$0.115 / St" },
  { sestertius: 250, price: "$19", highlight: true, best: false, perUnit: "$0.076 / St" },
  { sestertius: 500, price: "$35", highlight: false, best: false, perUnit: "$0.07 / St" },
  { sestertius: 750, price: "$49", highlight: false, best: false, perUnit: "$0.065 / St" },
  { sestertius: 1600, price: "$99", highlight: false, best: true, perUnit: "$0.062 / St" },
]

export default function Pricing() {
  const { t } = useLang()

  return (
    <section id="pricing" className="my-20">
      <h2 className="text-black dark:text-white mb-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        {t("pricing_title1")}
        <span className="block text-[#7A7FEE]">{t("pricing_title2")}</span>
      </h2>
      <p className="mb-10 max-w-2xl text-gray-700 dark:text-gray-300">{t("pricing_desc")}</p>

      {/* Bonus card */}
      <div className="card p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed border-[#7A7FEE]/40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center shrink-0">
            <Icon name="Gift" size={22} className="text-[#7A7FEE]" />
          </div>
          <div>
            <div className="font-semibold text-black dark:text-white text-lg">{t("pricing_bonus_title")}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t("pricing_bonus_desc")}</div>
          </div>
        </div>
        <a
          href="/dashboard"
          className="shrink-0 px-6 py-2.5 bg-[#7A7FEE] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          {t("pricing_register")}
        </a>
      </div>

      {/* Packages grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {packages.map((pkg) => (
          <div
            key={pkg.sestertius}
            className={`card p-4 flex flex-col items-center text-center relative transition-shadow hover:shadow-lg ${
              pkg.highlight ? "ring-2 ring-[#7A7FEE]" : ""
            }`}
          >
            {(pkg.highlight || pkg.best) && (
              <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                pkg.best ? "bg-emerald-500" : "bg-[#7A7FEE]"
              }`}>
                {pkg.best ? t("pricing_best") : t("pricing_popular")}
              </div>
            )}

            <div className="text-2xl font-bold text-black dark:text-white mt-1">{pkg.sestertius}</div>
            <div className="text-xs text-[#7A7FEE] font-medium mb-1">Sestertius</div>
            <div className="text-xl font-semibold text-black dark:text-white mb-1">{pkg.price}</div>
            <div className="text-[11px] text-gray-400 mb-3">{pkg.perUnit}</div>

            <a
              href="/dashboard"
              className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors mt-auto ${
                pkg.highlight
                  ? "bg-[#7A7FEE] text-white hover:bg-opacity-90"
                  : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#7A7FEE] hover:text-[#7A7FEE]"
              }`}
            >
              {t("pricing_buy")}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        {t("pricing_footer")}
      </p>
    </section>
  )
}
