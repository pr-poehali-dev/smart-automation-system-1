import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"

export default function Projects() {
  const { t } = useLang()

  const projects = [
    {
      platform: "Mercado Libre",
      badge: t("service1_title"),
      title: t("project1_title"),
      description: t("project1_desc"),
      mainImage: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/f68bd52a-55ab-4db9-afeb-4b0e1864a83a.jpg",
    },
    {
      platform: "Amazon",
      badge: t("service3_title"),
      title: t("project2_title"),
      description: t("project2_desc"),
      mainImage: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/b4d74193-6886-4ddc-890d-a2fe18f9f302.jpg",
    },
    {
      platform: "Mercado Libre",
      badge: t("service2_title"),
      title: t("project3_title"),
      description: t("project3_desc"),
      mainImage: "https://cdn.poehali.dev/projects/f1f6ce41-04c8-4892-abd6-bd5cce7672a0/files/669a0a77-2146-4232-8fcf-a2c4b71acaf7.jpg",
    },
  ]

  return (
    <section id="projects" className="my-12">
      <h2 className="text-black dark:text-white mb-2 text-xl md:text-2xl font-medium leading-tight text-center">
        {t("projects_title1")}{" "}
        <span className="text-[#7A7FEE]">{t("projects_title2")}</span>
      </h2>
      <p className="mb-5 max-w-md mx-auto text-center text-xs text-gray-700 dark:text-gray-300">{t("projects_desc")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">
        {projects.map((project, i) => (
          <div key={i} className="rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="relative overflow-hidden">
              <img src={project.mainImage} alt={project.title} className="w-full h-24 object-cover" />
              <div className="absolute top-1.5 left-1.5 flex gap-1">
                <span className="bg-[#7A7FEE] text-white text-[8px] font-medium px-1.5 py-0.5 rounded-full">{project.platform}</span>
              </div>
            </div>
            <div className="p-2.5">
              <h3 className="text-xs font-semibold text-black dark:text-white leading-tight line-clamp-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-1 line-clamp-2">{project.description}</p>
              <div className="inline-flex items-center text-[#7A7FEE] text-[10px] font-medium group mt-1.5">
                {t("see_more")}
                <Icon name="ArrowUpRight" size={10} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <a href="/dashboard" className="px-4 py-1.5 rounded-md bg-[#7A7FEE] text-white text-xs font-semibold hover:bg-opacity-90 transition-colors">{t("projects_cta")}</a>
      </div>
    </section>
  )
}