import ContactFormButton from "./ContactFormButton"

export default function CallToAction() {
  return (
    <section id="contact" className="card my-20 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5 z-10">
          <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Ваша следующая идея <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">начинается</span> здесь
          </h2>
          <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            Есть идея или проблема, которую нужно решить?
          </p>
          <p className="mb-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            Давайте обсудим. Мы поможем найти лучший подход, составить план и понять, подходим ли мы друг другу.
          </p>
          <div>
            <ContactFormButton />
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
