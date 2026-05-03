import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export default function Success() {
  const [params] = useSearchParams()
  const [seconds, setSeconds] = useState(5)
  const sessionId = params.get("session_id") || ""

  useEffect(() => {
    if (seconds <= 0) return
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  useEffect(() => {
    if (seconds === 0) {
      window.location.href = "/dashboard"
    }
  }, [seconds])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d0d] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle2" size={42} className="text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
          Оплата прошла успешно!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sestertius зачислены на ваш баланс. Можно начинать создавать контент.
        </p>
        {sessionId && (
          <div className="text-xs text-gray-400 dark:text-gray-600 mb-6 break-all">
            ID транзакции: {sessionId.slice(0, 30)}...
          </div>
        )}
        <Link
          to="/dashboard"
          className="block w-full py-3.5 bg-[#7A7FEE] text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors mb-3"
        >
          Перейти в панель ({seconds})
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
