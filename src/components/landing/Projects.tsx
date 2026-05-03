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
      mainImage: "/portfolio-images/ecommerce-interface-1.jpg",
    },
    {
      platform: "Amazon",
      badge: t("service3_title"),
      title: t("project2_title"),
      description: t("project2_desc"),
      mainImage: "/portfolio-images/ai-platform-1.jpg",
    },
    {
      platform: "Mercado Libre",
      badge: t("service2_title"),
      title: t("project3_title"),
      description: t("project3_desc"),
      mainImage: "/portfolio-images/saas-dashboard-1.jpg",
    },
  ]

  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        {t("projects_title1")}
        <span className="block text-[#7A7FEE]">{t("projects_title2")}</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">{t("projects_desc")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="relative overflow-hidden">
              <img src={project.mainImage} alt={project.title} className="w-full h-48 object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-[#7A7FEE] text-white text-xs font-medium px-2 py-1 rounded-full">{project.platform}</span>
                <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">{project.badge}</span>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-base font-semibold text-black dark:text-white">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 mb-4">{project.description}</p>
              <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                {t("see_more")}
                <Icon name="ArrowUpRight" size={16} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a href="/dashboard" className="btn-primary">{t("projects_cta")}</a>
      </div>
    </section>
  )
}
