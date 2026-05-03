import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLang } from "@/lib/LangContext"
import type { TranslationKey } from "@/lib/i18n"

const faqKeys: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "faq1_q", a: "faq1_a" },
  { q: "faq2_q", a: "faq2_a" },
  { q: "faq3_q", a: "faq3_a" },
  { q: "faq4_q", a: "faq4_a" },
  { q: "faq5_q", a: "faq5_a" },
  { q: "faq6_q", a: "faq6_a" },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const { t } = useLang()

  return (
    <section id="faq" className="my-8">
      <div className="card p-3 shadow-sm max-w-2xl mx-auto">
        <h2 className="text-black dark:text-white mb-1 text-sm font-semibold leading-tight text-center">
          {t("faq_title1")}{" "}
          <span className="text-[#7A7FEE]">{t("faq_title2")}</span>
        </h2>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {faqKeys.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenItem(openItem === i ? null : i)}
                className="flex justify-between items-center w-full text-left py-1.5 text-[11px] font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors gap-2"
                aria-expanded={openItem === i}
              >
                <span className="leading-tight">{t(faq.q)}</span>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${openItem === i ? "rotate-180 text-[#7A7FEE]" : ""}`} />
              </button>
              {openItem === i && (
                <div className="pb-1.5 text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">{t(faq.a)}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}