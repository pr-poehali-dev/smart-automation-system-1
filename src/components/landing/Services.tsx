import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"

export default function Services() {
  const { t } = useLang()

  const services = [
    {
      icon: "Image",
      title: t("service1_title"),
      desc: t("service1_desc"),
      image: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/39f49594-8aa2-42d1-b59f-4a48158a46ca.jpg",
    },
    {
      icon: "LayoutTemplate",
      title: t("service2_title"),
      desc: t("service2_desc"),
      image: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/20352bff-e47b-4a9b-b0bf-a8da2042a1f6.jpg",
    },
    {
      icon: "Shirt",
      title: t("service3_title"),
      desc: t("service3_desc"),
      image: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/745072ef-179e-4c2c-b8af-97f75cb09203.jpg",
    },
    {
      icon: "Video",
      title: t("service4_title"),
      desc: t("service4_desc"),
      image: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/45877cfd-35e8-4330-b838-fe8de412e59b.jpg",
    },
  ]

  const steps = [
    { step: "01", title: t("step1_title"), desc: t("step1_desc") },
    { step: "02", title: t("step2_title"), desc: t("step2_desc") },
    { step: "03", title: t("step3_title"), desc: t("step3_desc") },
    { step: "04", title: t("step4_title"), desc: t("step4_desc") },
  ]

  return (
    <section id="services" className="my-10">
      <h2 className="text-black dark:text-white mb-3 text-xl md:text-2xl font-medium leading-tight">
        {t("services_title1")}
        <span className="text-[#7A7FEE]"> {t("services_title2")}</span>
      </h2>
      <p className="mb-6 max-w-xl text-sm text-gray-700 dark:text-gray-300">{t("services_desc")}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {services.map((s, i) => (
          <div key={i} className="card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-[#7A7FEE] w-7 h-7 rounded-full flex items-center justify-center shadow">
                <Icon name={s.icon} size={13} className="text-white" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-1 text-black dark:text-white">{s.title}</h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 shadow-sm">
        <h3 className="text-base font-semibold text-black dark:text-white mb-4 text-center">{t("how_title")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-7 h-7 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center mb-1.5">
                <span className="text-[#7A7FEE] font-bold text-[10px]">{s.step}</span>
              </div>
              <h4 className="font-semibold text-black dark:text-white text-xs mb-0.5">{s.title}</h4>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 line-clamp-2">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-3.5 left-[calc(50%+14px)] w-[calc(100%-28px)] h-px bg-[#7A7FEE]/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}