import Icon from "@/components/ui/icon"

const plans = [
  {
    name: "Старт",
    price: "Бесплатно",
    piastras: "50 Пиастр",
    description: "Подарок при регистрации — попробуйте без оплаты",
    features: [
      "50 Пиастр на счёт сразу",
      "AI-фотографии товаров",
      "Базовая инфографика",
      "Форматы Mercado Libre",
      "Скачивание в JPG/PNG",
    ],
    cta: "Начать бесплатно",
    highlight: false,
  },
  {
    name: "Продавец",
    price: "$19",
    piastras: "500 Пиастр",
    period: "/ месяц",
    description: "Для активных продавцов на 1–2 платформах",
    features: [
      "500 Пиастр в месяц",
      "AI try-on примерка",
      "AI-видео ролики",
      "Форматы Amazon + ML",
      "Редактор текстов",
      "Bulk-загрузка до 50 SKU",
    ],
    cta: "Выбрать план",
    highlight: true,
  },
  {
    name: "Бизнес",
    price: "$79",
    piastras: "2500 Пиастр",
    period: "/ месяц",
    description: "Для брендов и агентств с большим каталогом",
    features: [
      "2500 Пиастр в месяц",
      "Все типы контента",
      "Bulk без ограничений",
      "Приоритетная генерация",
      "API-доступ",
      "Персональный менеджер",
    ],
    cta: "Связаться с нами",
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Простые
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">тарифы</span>
      </h2>
      <p className="mb-4 max-w-2xl text-gray-700 dark:text-gray-300">
        Оплачивайте внутренней валютой — <strong>Пиастрой</strong>. 1 Пиастра = 1 генерация контента. Неиспользованные Пиастры переносятся на следующий месяц.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card p-6 md:p-8 shadow-md flex flex-col ${plan.highlight ? "ring-2 ring-[#7A7FEE] relative" : ""}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7A7FEE] text-white text-xs font-semibold px-4 py-1 rounded-full">
                Популярный
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-black dark:text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-500 dark:text-gray-400 text-sm">{plan.period}</span>}
              </div>
              <div className="text-[#7A7FEE] font-medium text-sm mb-2">{plan.piastras}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
            </div>

            <ul className="space-y-3 flex-1 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Icon name="Check" size={16} className="text-[#7A7FEE] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`w-full text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                plan.highlight
                  ? "bg-[#7A7FEE] text-white hover:bg-opacity-90"
                  : "border border-[#7A7FEE] text-[#7A7FEE] hover:bg-[#7A7FEE]/10"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Можно докупить Пиастры в любой момент · Без автопродления · Отмена в 1 клик
      </p>
    </section>
  )
}
