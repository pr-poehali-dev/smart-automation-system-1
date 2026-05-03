import { useState, useEffect, useRef } from "react"
import { Menu, X, Check, Globe } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "next-themes"
import { useLang } from "@/lib/LangContext"
import Icon from "@/components/ui/icon"
import type { Lang, TranslationKey } from "@/lib/i18n"

const LANGS: { code: Lang; label: string; name: string; flag: string }[] = [
  { code: "es", label: "ES", name: "Español", flag: "🇲🇽" },
  { code: "en", label: "EN", name: "English", flag: "🇺🇸" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const { lang, setLang, t } = useLang()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const currentLang = LANGS.find((l) => l.code === lang)!

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled ? "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container py-2">
          <div className="flex items-center justify-between gap-3">
            <a href="/" className="flex items-center gap-1.5 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#9B8FFF] flex items-center justify-center shadow-sm">
                <Icon name="Sparkles" size={15} className="text-white" />
              </div>
              <span className="text-base font-bold text-black dark:text-white">
                Piast<span className="text-[#7A7FEE]">ra</span>
              </span>
            </a>

            <div className="flex items-center gap-2">
              <nav className="hidden md:block">
                <ul className="flex gap-4">
                  {[
                    { href: "#services", key: "nav_features" },
                    { href: "#projects", key: "nav_examples" },
                    { href: "#pricing", key: "nav_pricing" },
                    { href: "#faq", key: "nav_faq" },
                  ].map((item) => (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        className="text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors text-xs font-medium"
                      >
                        {t(item.key as TranslationKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Language switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-xs font-medium text-black dark:text-white hover:border-[#7A7FEE] transition-colors"
                  title={currentLang.name}
                >
                  <Globe className="w-3 h-3 text-[#7A7FEE]" />
                  <span>{currentLang.label}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 min-w-[160px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                      Язык / Language
                    </div>
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          lang === l.code ? "bg-[#7A7FEE]/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{l.flag}</span>
                          <span className={lang === l.code ? "text-[#7A7FEE] font-semibold" : "text-black dark:text-white"}>
                            {l.name}
                          </span>
                        </div>
                        {lang === l.code && <Check className="w-3.5 h-3.5 text-[#7A7FEE]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <ThemeToggle />

              <a
                href="/dashboard"
                className="hidden md:inline-flex items-center px-3 py-1.5 bg-[#7A7FEE] text-white rounded-md text-xs font-semibold hover:bg-opacity-90 transition-colors"
              >
                {t("nav_start")}
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-md bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/20 md:hidden"
                aria-label="Меню"
              >
                <Menu className="h-5 w-5 text-black dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#111111] shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111111]">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#9B8FFF] flex items-center justify-center">
                  <Icon name="Sparkles" size={15} className="text-white" />
                </div>
                <span className="text-base font-bold text-black dark:text-white">
                  Piast<span className="text-[#7A7FEE]">ra</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {[
                  { href: "/", key: "nav_home" },
                  { href: "#services", key: "nav_features" },
                  { href: "#projects", key: "nav_examples" },
                  { href: "#pricing", key: "nav_pricing" },
                  { href: "#faq", key: "nav_faq" },
                ].map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="flex items-center py-3 px-4 rounded-lg text-base text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(item.key as TranslationKey)}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-2 px-4">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      lang === l.code
                        ? "border-[#7A7FEE] text-[#7A7FEE] bg-[#7A7FEE]/5"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              <a
                href="/dashboard"
                className="flex items-center justify-center w-full py-3 px-4 bg-[#7A7FEE] text-white rounded-lg text-base font-medium hover:bg-opacity-90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav_start")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}