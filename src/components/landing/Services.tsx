import { CircleDot, Layers, Rocket } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Исследование",
    description: "Расскажите о вашем проекте, и мы поможем воплотить вашу идею в жизнь.",
    icon: CircleDot,
    color: "bg-[#7A7FEE]",
  },
  {
    id: 2,
    title: "Разработка",
    description: "Создаем масштабируемые и надежные решения, используя лучшие инструменты.",
    icon: Layers,
    color: "bg-[#7A7FEE]",
  },
  {
    id: 3,
    title: "Запуск + Развитие",
    description: "Бесшовная интеграция, оптимизация и масштабирование по мере роста вашего бизнеса.",
    icon: Rocket,
    color: "bg-[#7A7FEE]",
  },
]

export default function Services() {
  return (
    <section id="services" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Раскройте потенциал
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">вашего бизнеса</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Мы создаем кастомные платформы и AI-инструменты для упрощения операций и масштабирования. Наш процесс делает
        реализацию ваших идей простой и эффективной.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
