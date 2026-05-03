import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { translations } from "./i18n"
import type { Lang, TranslationKey } from "./i18n"

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LangContext = createContext<LangContextType>({
  lang: "es",
  setLang: () => {},
  t: (key) => key,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("piastra_lang")
    if (saved === "es" || saved === "en" || saved === "ru") return saved
    const browser = navigator.language.slice(0, 2)
    if (browser === "ru") return "ru"
    if (browser === "en") return "en"
    return "es"
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("piastra_lang", l)
  }

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations["es"][key] ?? key
  }

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
