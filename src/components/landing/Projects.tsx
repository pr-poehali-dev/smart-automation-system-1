import Icon from "@/components/ui/icon"

const projects = [
  {
    id: 1,
    platform: "Mercado Libre",
    category: "Электроника",
    title: "Наушники TWS — рост конверсии на 38%",
    description: "AI создал 12 фото в студийном стиле, инфографику с характеристиками и 30-секундное видео. Листинг вышел на первую страницу за 2 недели.",
    mainImage: "/portfolio-images/ecommerce-interface-1.jpg",
    badge: "Электроника",
  },
  {
    id: 2,
    platform: "Amazon",
    category: "Одежда",
    title: "Женские платья — AI try-on увеличил CTR на 52%",
    description: "Виртуальная примерка на 6 моделях разных типов фигуры. Возвраты снизились на 24% — покупатели лучше понимают посадку.",
    mainImage: "/portfolio-images/ai-platform-1.jpg",
    badge: "Мода",
  },
  {
    id: 3,
    platform: "Mercado Libre",
    category: "Товары для дома",
    title: "Кухонные блендеры — 200 SKU за 1 день",
    description: "Bulk-генерация карточек для всей линейки. Инфографика с параметрами, фото в лайфстайл-сценах. Сэкономили 15 000 USD на фотосъёмке.",
    mainImage: "/portfolio-images/saas-dashboard-1.jpg",
    badge: "Дом",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Реальные результаты
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">наших клиентов</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Продавцы из Мексики и Аргентины уже используют Piastra для создания контента под Mercado Libre и Amazon. Посмотрите, что получается.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-[#7A7FEE] text-white text-xs font-medium px-2 py-1 rounded-full">
                  {project.platform}
                </span>
                <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {project.badge}
                </span>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-base font-semibold text-black dark:text-white">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 mb-4">{project.description}</p>
              <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                Подробнее{" "}
                <Icon name="ArrowUpRight" size={16} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a href="#contact" className="btn-primary">
          Попробовать бесплатно
        </a>
      </div>
    </section>
  )
}
