import ThemeToggle from "@/components/landing/ThemeToggle"
import Icon from "@/components/ui/icon"
import { useLang } from "@/lib/LangContext"

type Props = {
  balance: number
}

export default function DashboardHeader({ balance }: Props) {
  const { t } = useLang()

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#9B8FFF] flex items-center justify-center shadow-sm">
            <Icon name="Sparkles" size={15} className="text-white" />
          </div>
          <span className="text-base font-bold text-black dark:text-white">
            Piast<span className="text-[#7A7FEE]">ra</span>
          </span>
        </a>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#7A7FEE]/10 text-[#7A7FEE] px-3 py-1.5 rounded-full text-sm font-semibold">
            <Icon name="Coins" size={15} />
            {balance} {t("dash_balance")}
          </div>
          <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] transition-colors">
            {t("dash_buy")}
          </button>
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-[#7A7FEE] flex items-center justify-center text-white text-sm font-semibold">U</div>
        </div>
      </div>
    </header>
  )
}