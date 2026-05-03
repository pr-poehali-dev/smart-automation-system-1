import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"

export default function Services() {
  const { t } = useLang()

  const services = [
    { icon: "Image", title: t("service1_title"), desc: t("service1_desc") },
    { icon: "LayoutTemplate", title: t("service2_title"), desc: t("service2_desc") },
    { icon: "Shirt", title: t("service3_title"), desc: t("service3_desc") },
    { icon: "Video", title: t("service4_title"), desc: t("service4_desc") },
  ]

  const steps = [
    { step: "01", title: t("step1_title"), desc: t("step1_desc") },
    { step: "02", title: t("step2_title"), desc: t("step2_desc") },
    { step: "03", title: t("step3_title"), desc: t("step3_desc") },
    { step: "04", title: t("step4_title"), desc: t("step4_desc") },
  ]

  return (
    <section id="services" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        {t("services_title1")}
        <span className="block text-[#7A7FEE]">{t("services_title2")}</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">{t("services_desc")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {services.map((s, i) => (
          <div key={i} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-[#7A7FEE] w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Icon name={s.icon} size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{s.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="card p-8 shadow-md">
        <h3 className="text-2xl font-semibold text-black dark:text-white mb-8 text-center">{t("how_title")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center mb-3">
                <span className="text-[#7A7FEE] font-bold text-sm">{s.step}</span>
              </div>
              <h4 className="font-semibold text-black dark:text-white mb-1">{s.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-[#7A7FEE]/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
