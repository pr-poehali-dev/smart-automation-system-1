import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    slug: "ai-analytics-dashboard",
    title: "AI Аналитика",
    shortDescription: "Платформа бизнес-аналитики в реальном времени на базе машинного обучения",
    mainImage: "/portfolio-images/saas-dashboard-1.jpg",
  },
  {
    id: 2,
    slug: "smart-automation-suite",
    title: "Умная автоматизация",
    shortDescription: "Комплексная автоматизация рабочих процессов с AI-принятием решений",
    mainImage: "/portfolio-images/ecommerce-interface-1.jpg",
  },
  {
    id: 3,
    slug: "neural-commerce-platform",
    title: "Neural Commerce",
    shortDescription: "E-commerce платформа нового поколения с персонализированными AI-рекомендациями",
    mainImage: "/portfolio-images/ai-platform-1.jpg",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Наши последние
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">проекты</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        От AI-автоматизации до кастомных маркетплейсов — наши решения помогают бизнесу масштабироваться эффективнее.
        Изучите платформы, инструменты и решения, которые мы создали для наших клиентов.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">{project.shortDescription}</p>
              <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                Подробнее{" "}
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a href="#contact" className="btn-primary">
          Все проекты
        </a>
      </div>
    </section>
  )
}
