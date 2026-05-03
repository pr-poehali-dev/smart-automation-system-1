import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Чего ожидать от совместной работы?",
    answer:
      "Мы начинаем с discovery-звонка, чтобы понять ваши потребности, затем предоставляем детальное предложение со сроками и оценкой стоимости. После согласования начинаем разработку с регулярными обновлениями и сессиями обратной связи.",
  },
  {
    id: 2,
    question: "Сколько времени занимает разработка проекта?",
    answer:
      "Сроки зависят от сложности проекта. Простые сайты занимают 2-4 недели, сложные платформы — 3-6 месяцев. Мы предоставляем детальные сроки на этапе предложения.",
  },
  {
    id: 3,
    question: "Какие технологии вы используете?",
    answer:
      "Мы используем современные фреймворки React, Next.js, Node.js, а также AI-инструменты и облачные сервисы. Технологический стек подбирается под конкретные требования каждого проекта.",
  },
  {
    id: 4,
    question: "Сколько стоит типичный проект?",
    answer:
      "Стоимость сильно варьируется в зависимости от требований. Простые сайты начинаются от 300 000 рублей, сложные платформы — от 1 500 000 до 6 000 000+ рублей. Мы предоставляем детальные расчеты после discovery-процесса.",
  },
  {
    id: 5,
    question: "Как происходит оплата?",
    answer:
      "Обычно мы работаем с предоплатой 50% и оставшимися 50% по завершении проекта. Для крупных проектов возможна поэтапная оплата по милестоунам.",
  },
  {
    id: 6,
    question: "Можете ли вы обеспечить техническую поддержку?",
    answer:
      "Да, мы предлагаем пакеты технической поддержки и сопровождения. Они могут включать поддержку пользователей, исправление багов, обновление функционала и мониторинг производительности.",
  },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faq" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          Частые
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">вопросы</span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Есть вопросы о наших услугах? Найдите ответы на самые распространенные вопросы и узнайте, как наша команда
          может помочь в реализации вашего проекта.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
