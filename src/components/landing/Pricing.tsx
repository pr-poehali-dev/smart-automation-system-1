import { useState } from "react"
import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"
import func2url from "../../../backend/func2url.json"

type Plan = {
  id: string
  name: string
  sestertius: number
  price: number
  oldPrice?: number
  badge?: string
  highlight?: boolean
  features: { label: string; count: string }[]
  perks: string[]
}

const plans: Plan[] = [
  {
    id: "start",
    name: "Старт",
    sestertius: 100,
    price: 12,
    features: [
      { label: "AI-фото", count: "100" },
      { label: "Инфографика", count: "100" },
      { label: "Try-on", count: "25" },
      { label: "AI-видео", count: "12" },
    ],
    perks: ["Бессрочные токены", "Все 6 категорий"],
  },
  {
    id: "business",
    name: "Бизнес",
    sestertius: 500,
    price: 59,
    oldPrice: 75,
    badge: "Популярный",
    highlight: true,
    features: [
      { label: "AI-фото", count: "500" },
      { label: "Инфографика", count: "500" },
      { label: "Try-on", count: "125" },
      { label: "AI-видео", count: "62" },
    ],
    perks: ["Приоритет в очереди", "API-доступ"],
  },
  {
    id: "pro",
    name: "Pro",
    sestertius: 1600,
    price: 189,
    oldPrice: 240,
    badge: "Лучшая цена",
    features: [
      { label: "AI-фото", count: "1600" },
      { label: "Инфографика", count: "1600" },
      { label: "Try-on", count: "400" },
      { label: "AI-видео", count: "200" },
    ],
    perks: ["Личный менеджер", "Кастомные промпты"],
  },
]

export default function Pricing() {
  const { t } = useLang()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId)
    setError(null)
    try {
      const origin = window.location.origin
      const res = await fetch(func2url["stripe-checkout"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: planId,
          success_url: `${origin}/success`,
          cancel_url: `${origin}/cancel`,
        }),
      })
      const data = await res.json()
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        setError(data.error || "Ошибка создания платежа")
        setLoadingPlan(null)
      }
    } catch (e) {
      setError("Ошибка подключения. Попробуйте ещё раз.")
      setLoadingPlan(null)
    }
  }

  return (
    <section id="pricing" className="my-12">
      <div className="text-center mb-2">
        <span className="inline-block px-2 py-0.5 rounded-full bg-[#7A7FEE]/10 text-[#7A7FEE] text-[10px] font-semibold tracking-wide uppercase">
          Тарифы
        </span>
      </div>
      <h2 className="text-black dark:text-white mb-2 text-xl md:text-2xl font-medium leading-tight text-center">
        {t("pricing_title1")}{" "}
        <span className="text-[#7A7FEE]">{t("pricing_title2")}</span>
      </h2>
      <p className="mb-5 max-w-md mx-auto text-center text-xs text-gray-700 dark:text-gray-300">
        {t("pricing_desc")}
      </p>

      {/* Bonus banner */}
      <div className="max-w-xl mx-auto mb-4 relative overflow-hidden rounded-lg bg-gradient-to-r from-[#7A7FEE] to-[#9B8FFF] px-3 py-2 flex items-center justify-between gap-2 shadow">
        <div className="flex items-center gap-2 relative z-10 min-w-0">
          <Icon name="Gift" size={14} className="text-white shrink-0" />
          <div className="text-white text-xs font-medium truncate">
            {t("pricing_bonus_title")}
          </div>
        </div>
        <a
          href="/dashboard"
          className="shrink-0 px-2.5 py-1 bg-white text-[#7A7FEE] rounded text-[10px] font-semibold hover:bg-gray-100 transition-colors"
        >
          {t("pricing_register")}
        </a>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl p-3 flex flex-col transition-all ${
              plan.highlight
                ? "bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4a] text-white shadow-lg shadow-[#7A7FEE]/20 border border-[#7A7FEE]/40"
                : "bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-semibold whitespace-nowrap ${
                  plan.highlight ? "bg-[#7A7FEE] text-white" : "bg-emerald-500 text-white"
                }`}>
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-2">
              <h3 className={`text-sm font-bold ${plan.highlight ? "text-white" : "text-black dark:text-white"}`}>
                {plan.name}
              </h3>
            </div>

            <div className="mb-2 flex items-baseline gap-1">
              <span className={`text-xl font-bold ${plan.highlight ? "text-white" : "text-black dark:text-white"}`}>
                ${plan.price}
              </span>
              {plan.oldPrice && (
                <span className={`text-[10px] line-through ${plan.highlight ? "text-gray-500" : "text-gray-400"}`}>
                  ${plan.oldPrice}
                </span>
              )}
            </div>

            <div className={`flex items-center gap-1 mb-2 text-[10px] font-semibold ${plan.highlight ? "text-[#9B8FFF]" : "text-[#7A7FEE]"}`}>
              <Icon name="Coins" size={10} />
              {plan.sestertius} St
            </div>

            <div className={`rounded p-2 mb-2 ${plan.highlight ? "bg-white/5" : "bg-gray-50 dark:bg-[#111]"}`}>
              <div className="space-y-0.5">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px]">
                    <span className={plan.highlight ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}>{f.label}</span>
                    <span className={`font-semibold ${plan.highlight ? "text-white" : "text-black dark:text-white"}`}>
                      {f.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <ul className="space-y-1 mb-2 flex-1">
              {plan.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-1 text-[10px]">
                  <Icon name="Check" size={10} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#9B8FFF]" : "text-[#7A7FEE]"}`} />
                  <span className={plan.highlight ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}>
                    {perk}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan !== null}
              className={`w-full py-1.5 rounded-md text-[11px] font-semibold transition-all flex items-center justify-center gap-1 disabled:opacity-60 ${
                plan.highlight
                  ? "bg-[#7A7FEE] text-white hover:bg-[#9B8FFF]"
                  : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
              }`}
            >
              {loadingPlan === plan.id ? (
                <>
                  <Icon name="Loader2" size={10} className="animate-spin" />
                  Открываю...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" size={10} />
                  Купить
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="max-w-xl mx-auto mt-3 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded text-center">
          {error}
        </div>
      )}

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[10px] text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Icon name="Shield" size={11} className="text-[#7A7FEE]" />
          <span>Безопасная оплата</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Infinity" size={11} className="text-[#7A7FEE]" />
          <span>Не сгорают</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Zap" size={11} className="text-[#7A7FEE]" />
          <span>Мгновенно</span>
        </div>
      </div>
    </section>
  )
}