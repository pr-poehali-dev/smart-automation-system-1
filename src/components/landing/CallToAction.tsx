export default function CallToAction() {
  return (
    <section id="contact" className="card my-20 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5 z-10">
          <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Начните продавать больше{" "}
            <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">уже сегодня</span>
          </h2>
          <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            Зарегистрируйтесь и получите <strong>50 Пиастр бесплатно</strong> — этого хватит на первые 50 генераций. Кредитная карта не нужна.
          </p>
          <p className="mb-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            Загрузите первое фото и убедитесь в качестве сами — без рисков и обязательств.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/dashboard" className="btn-primary">
              Создать аккаунт бесплатно
            </a>
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