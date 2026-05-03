import Icon from "@/components/ui/icon"

const services = [
  {
    id: 1,
    title: "AI-фотографии",
    description: "Профессиональные фото товара на белом фоне, лайфстайл-сцены и студийные снимки. Соответствуют требованиям Mercado Libre и Amazon.",
    icon: "Image",
    color: "bg-[#7A7FEE]",
  },
  {
    id: 2,
    title: "Инфографика",
    description: "Автоматические карточки с характеристиками, преимуществами и размерными таблицами. Добавляйте текст и иконки одним кликом.",
    icon: "LayoutTemplate",
    color: "bg-[#7A7FEE]",
  },
  {
    id: 3,
    title: "AI Try-on",
    description: "Виртуальная примерка одежды и аксессуаров на моделях. Покупатели видят товар на себе — конверсия растёт.",
    icon: "Shirt",
    color: "bg-[#7A7FEE]",
  },
  {
    id: 4,
    title: "AI-видео",
    description: "Короткие видеоролики из фото товара для листинга и социальных сетей. Движение, эффекты, музыка — всё автоматически.",
    icon: "Video",
    color: "bg-[#7A7FEE]",
  },
]

const steps = [
  { step: "01", title: "Загрузите фото", desc: "Любое фото товара с телефона или камеры" },
  { step: "02", title: "Выберите концепцию", desc: "Выберите стиль, фон и тип контента" },
  { step: "03", title: "Опишите товар", desc: "Добавьте описание — AI усилит его" },
  { step: "04", title: "Скачайте результат", desc: "Готовые файлы под стандарты площадок" },
]

export default function Services() {
  return (
    <section id="services" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Четыре инструмента
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">для роста продаж</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Piastra создаёт весь визуальный контент для карточки товара — от фото до видео. Все форматы соответствуют техническим требованиям Mercado Libre и Amazon.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {services.map((service) => (
          <div key={service.id} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
              <Icon name={service.icon} size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="card p-8 shadow-md">
        <h3 className="text-2xl font-semibold text-black dark:text-white mb-8 text-center">Как это работает</h3>
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
