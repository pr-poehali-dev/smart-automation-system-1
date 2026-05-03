import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Что такое Пиастра и как она работает?",
    answer:
      "Пиастра — внутренняя валюта сервиса. 1 Пиастра = 1 единица сгенерированного контента (фото, инфографика, примерка или видео). При регистрации вы получаете 10 Sestertius бесплатно. Докупить можно в личном кабинете в любой момент.",
  },
  {
    id: 2,
    question: "Соответствует ли контент требованиям Mercado Libre и Amazon?",
    answer:
      "Да. Piastra автоматически генерирует изображения в нужных размерах и соотношениях для каждой платформы. Для Mercado Libre — белый фон, минимум 500px. Для Amazon — белый фон, минимум 1000px, RGB. Вы просто выбираете площадку перед генерацией.",
  },
  {
    id: 3,
    question: "Сколько времени занимает генерация?",
    answer:
      "Стандартное фото или инфографика — до 30 секунд. AI try-on — до 60 секунд. AI-видео — до 3 минут. Bulk-генерация нескольких SKU запускается параллельно.",
  },
  {
    id: 4,
    question: "Можно ли редактировать текст на карточке?",
    answer:
      "Да. После генерации вы можете изменить любой текст прямо в редакторе: название, характеристики, описание преимуществ. Изменения применяются мгновенно без повторной генерации.",
  },
  {
    id: 5,
    question: "Работает ли сервис с любыми товарами?",
    answer:
      "Piastra оптимизирован для физических товаров: одежда, электроника, товары для дома, косметика, спорттовары. AI try-on лучше всего работает с одеждой и аксессуарами.",
  },
  {
    id: 6,
    question: "Как обстоит дело с LATAM-рынками?",
    answer:
      "Сервис запускается в первую очередь для Мексики и Аргентины. Интерфейс доступен на испанском языке, поддерживаются местные платёжные методы. Весь генерируемый контент адаптирован под требования LATAM-версий Mercado Libre и Amazon.",
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
          Всё, что нужно знать о генерации контента, валюте Пиастра и работе с Mercado Libre и Amazon.
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