export default function Hero() {
  return (
    <section id="hero" className="card my-8 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5 z-10">
          <div className="inline-flex items-center gap-2 bg-[#7A7FEE]/10 text-[#7A7FEE] text-sm font-medium px-3 py-1.5 rounded-full mb-4">
            ✦ Mercado Libre & Amazon ready
          </div>
          <h1 className="text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            Карточки товаров
            <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">с AI за секунды</span>
          </h1>
          <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            Загрузите фото товара — AI создаст профессиональные фото, инфографику, примерку и видео. Готово для Mercado Libre и Amazon. Оплата внутренней валютой Пиастра.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary">
              Начать бесплатно
            </a>
            <a href="#services" className="btn-secondary text-black dark:text-white">
              Как это работает
            </a>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-black dark:text-white">10</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Sestertius в подарок</div>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-black dark:text-white">&lt;30 сек</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Время генерации</div>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-black dark:text-white">4-в-1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Типа контента</div>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:flex md:items-center">
          <img
            src="/purple-circle-wave-static.png"
            alt="Purple Wave"
            className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
          />
        </div>
      </div>
    </section>
  )
}