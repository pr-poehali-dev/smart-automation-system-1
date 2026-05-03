import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export default function Cancel() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d0d] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-6">
          <Icon name="XCircle" size={42} className="text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
          Оплата отменена
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          С вашей карты ничего не списано. Можно попробовать ещё раз или выбрать другой тариф.
        </p>
        <Link
          to="/#pricing"
          className="block w-full py-3.5 bg-[#7A7FEE] text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors mb-3"
        >
          Вернуться к тарифам
        </Link>
        <Link
          to="/"
          className="block text-sm text-gray-500 dark:text-gray-400 hover:text-[#7A7FEE] transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
