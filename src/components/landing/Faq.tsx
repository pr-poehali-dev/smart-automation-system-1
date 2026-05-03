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
    <section id="faq" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          {t("faq_title1")}
          <span className="block text-[#7A7FEE]">{t("faq_title2")}</span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">{t("faq_desc")}</p>

        <div className="space-y-4">
          {faqKeys.map((faq, i) => (
            <div key={i} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setOpenItem(openItem === i ? null : i)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === i}
              >
                <span className="font-medium">{t(faq.q)}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openItem === i ? "rotate-180 text-[#7A7FEE]" : ""}`} />
              </button>
              {openItem === i && (
                <div className="mt-2 text-gray-700 dark:text-gray-300">{t(faq.a)}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
