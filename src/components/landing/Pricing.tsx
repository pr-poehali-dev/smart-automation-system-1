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
  dark?: boolean
  features: { label: string; count: string }[]
  perks: string[]
}

const plans: Plan[] = [
  {
    id: "start",
    name: "Старт",
    sestertius: 100,
    price: 9,
    features: [
      { label: "AI-фото", count: "100 шт" },
      { label: "Инфографика", count: "50 шт" },
      { label: "AI Try-on", count: "33 шт" },
      { label: "AI-видео", count: "20 шт" },
    ],
    perks: [
      "Бессрочные токены",
      "Без подписки",
      "Все 6 категорий",
    ],
  },
  {
    id: "business",
    name: "Бизнес",
    sestertius: 500,
    price: 35,
    oldPrice: 45,
    badge: "Популярный",
    highlight: true,
    dark: true,
    features: [
      { label: "AI-фото", count: "500 шт" },
      { label: "Инфографика", count: "250 шт" },
      { label: "AI Try-on", count: "166 шт" },
      { label: "AI-видео", count: "100 шт" },
    ],
    perks: [
      "Бессрочные токены",
      "Приоритет в очереди",
      "API-доступ",
      "Поддержка 24/7",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    sestertius: 1600,
    price: 99,
    oldPrice: 144,
    badge: "Лучшая цена",
    features: [
      { label: "AI-фото", count: "1 600 шт" },
      { label: "Инфографика", count: "800 шт" },
      { label: "AI Try-on", count: "533 шт" },
      { label: "AI-видео", count: "320 шт" },
    ],
    perks: [
      "Бессрочные токены",
      "Приоритет в очереди",
      "API-доступ",
      "Личный менеджер",
      "Кастомные промпты",
    ],
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
    <section id="pricing" className="my-20">
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-[#7A7FEE]/10 text-[#7A7FEE] text-xs font-semibold tracking-wide uppercase">
          Тарифы
        </span>
      </div>
      <h2 className="text-black dark:text-white mb-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-center">
        {t("pricing_title1")}{" "}
        <span className="text-[#7A7FEE]">{t("pricing_title2")}</span>
      </h2>
      <p className="mb-12 max-w-2xl mx-auto text-center text-gray-700 dark:text-gray-300">
        {t("pricing_desc")}
      </p>

      {/* Bonus banner */}
      <div className="max-w-3xl mx-auto mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7A7FEE] to-[#9B8FFF] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Icon name="Gift" size={26} className="text-white" />
          </div>
          <div className="text-white">
            <div className="font-semibold text-lg">{t("pricing_bonus_title")}</div>
            <div className="text-sm text-white/80">{t("pricing_bonus_desc")}</div>
          </div>
        </div>
        <a
          href="/dashboard"
          className="shrink-0 px-6 py-3 bg-white text-[#7A7FEE] rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors relative z-10"
        >
          {t("pricing_register")}
        </a>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              plan.dark
                ? "bg-gradient-to-br from-[#1a1a2e] via-[#2a2a4a] to-[#1a1a2e] text-white shadow-2xl shadow-[#7A7FEE]/30 lg:scale-105 border border-[#7A7FEE]/30"
                : "bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md ${
                  plan.dark
                    ? "bg-[#7A7FEE] text-white"
                    : "bg-emerald-500 text-white"
                }`}>
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <h3 className={`text-2xl font-bold mb-1 ${plan.dark ? "text-white" : "text-black dark:text-white"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${plan.dark ? "text-gray-400" : "text-gray-500 dark:text-gray-400"}`}>
                Разовая покупка · без подписки
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold ${plan.dark ? "text-white" : "text-black dark:text-white"}`}>
                  ${plan.price}
                </span>
                {plan.oldPrice && (
                  <span className={`text-lg line-through ${plan.dark ? "text-gray-500" : "text-gray-400"}`}>
                    ${plan.oldPrice}
                  </span>
                )}
              </div>
              <div className={`flex items-center gap-1.5 mt-1 text-sm font-semibold ${plan.dark ? "text-[#9B8FFF]" : "text-[#7A7FEE]"}`}>
                <Icon name="Coins" size={14} />
                {plan.sestertius.toLocaleString("ru-RU")} Sestertius
              </div>
            </div>

            {/* What's included */}
            <div className={`rounded-xl p-4 mb-5 ${plan.dark ? "bg-white/5" : "bg-gray-50 dark:bg-[#111]"}`}>
              <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${plan.dark ? "text-gray-400" : "text-gray-500"}`}>
                Хватит на:
              </div>
              <div className="space-y-2">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className={plan.dark ? "text-gray-300" : "text-gray-700 dark:text-gray-300"}>{f.label}</span>
                    <span className={`font-semibold ${plan.dark ? "text-white" : "text-black dark:text-white"}`}>
                      {f.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks */}
            <ul className="space-y-2.5 mb-7 flex-1">
              {plan.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    plan.dark ? "bg-[#7A7FEE]" : "bg-[#7A7FEE]/10"
                  }`}>
                    <Icon name="Check" size={12} className={plan.dark ? "text-white" : "text-[#7A7FEE]"} />
                  </div>
                  <span className={plan.dark ? "text-gray-200" : "text-gray-700 dark:text-gray-300"}>
                    {perk}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan !== null}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait ${
                plan.dark
                  ? "bg-[#7A7FEE] text-white hover:bg-[#9B8FFF] shadow-lg shadow-[#7A7FEE]/40"
                  : plan.highlight
                  ? "bg-[#7A7FEE] text-white hover:bg-opacity-90"
                  : "bg-black dark:bg-white text-white dark:text-black hover:bg-opacity-90"
              }`}
            >
              {loadingPlan === plan.id ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Подключение...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" size={16} />
                  Купить {plan.name}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="max-w-md mx-auto mt-6 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-[#7A7FEE]" />
          <span>Безопасная оплата</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Infinity" size={16} className="text-[#7A7FEE]" />
          <span>Токены не сгорают</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="RefreshCw" size={16} className="text-[#7A7FEE]" />
          <span>Возврат 14 дней</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-[#7A7FEE]" />
          <span>Активация мгновенно</span>
        </div>
      </div>
    </section>
  )
}