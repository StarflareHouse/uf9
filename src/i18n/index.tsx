/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import en from './locales/en.json'
import filPH from './locales/fil-PH.json'
import hiIN from './locales/hi-IN.json'
import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import msMY from './locales/ms-MY.json'
import thTH from './locales/th-TH.json'
import viVN from './locales/vi-VN.json'
import zhCN from './locales/zh-CN.json'
import zhHK from './locales/zh-HK.json'
import zhTW from './locales/zh-TW.json'

export type Locale =
  | 'ms-MY'
  | 'en-SG'
  | 'fil-PH'
  | 'ko-KR'
  | 'zh-CN'
  | 'th-TH'
  | 'id-ID'
  | 'vi-VN'
  | 'hi-IN'
  | 'ja-JP'
  | 'zh-TW'
  | 'zh-HK'

export interface CountryOption {
  code: string
  country: string
  flagSrc: string
  language: string
  locale: Locale
}

export const countryOptions: CountryOption[] = [
  { code: 'MY', country: 'MALAYSIA', flagSrc: '/flags/my.png', language: 'Bahasa Melayu', locale: 'ms-MY' },
  { code: 'SG', country: 'SINGAPORE', flagSrc: '/flags/sg.png', language: 'English', locale: 'en-SG' },
  { code: 'PH', country: 'PHILIPPINES', flagSrc: '/flags/ph.png', language: 'Filipino', locale: 'fil-PH' },
  { code: 'KR', country: 'KOREA', flagSrc: '/flags/kr.png', language: '한국어', locale: 'ko-KR' },
  { code: 'CN', country: 'CHINA', flagSrc: '/flags/cn.png', language: '简体中文', locale: 'zh-CN' },
  { code: 'TH', country: 'THAILAND', flagSrc: '/flags/th.png', language: 'ไทย', locale: 'th-TH' },
  { code: 'ID', country: 'INDONESIA', flagSrc: '/flags/id.png', language: 'Bahasa Indonesia', locale: 'id-ID' },
  { code: 'VN', country: 'VIETNAM', flagSrc: '/flags/vn.png', language: 'Tiếng Việt', locale: 'vi-VN' },
  { code: 'IN', country: 'INDIA', flagSrc: '/flags/in.png', language: 'हिन्दी', locale: 'hi-IN' },
  { code: 'JP', country: 'JAPAN', flagSrc: '/flags/jp.png', language: '日本語', locale: 'ja-JP' },
  { code: 'TW', country: 'TAIWAN', flagSrc: '/flags/tw.png', language: '繁體中文', locale: 'zh-TW' },
  { code: 'HK', country: 'HONG KONG', flagSrc: '/flags/hk.png', language: '繁體中文', locale: 'zh-HK' },
]

const locales: Record<Locale, Record<string, unknown>> = {
  'ms-MY': msMY,
  'en-SG': en,
  'fil-PH': filPH,
  'ko-KR': koKR,
  'zh-CN': zhCN,
  'th-TH': thTH,
  'id-ID': idID,
  'vi-VN': viVN,
  'hi-IN': hiIN,
  'ja-JP': jaJP,
  'zh-TW': zhTW,
  'zh-HK': zhHK,
}
const DEFAULT_LOCALE: Locale = 'en-SG'

function resolve(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

function getByPath(obj: Record<string, unknown>, path: string): string {
  const val = resolve(obj, path)
  return typeof val === 'string' ? val : path
}

function getArrayByPath(obj: Record<string, unknown>, path: string): string[] {
  const val = resolve(obj, path)
  return Array.isArray(val) ? val : []
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
  tRaw: <T = unknown>(key: string) => T
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'uf9-country-locale'
const legacyLocaleMap: Record<string, Locale> = {
  en: 'en-SG',
  'zh-CN': 'zh-CN',
}

function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null
  if (value in locales) return value as Locale
  return legacyLocaleMap[value] ?? null
}

function localeFromBrowser(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const language = navigator.language.toLowerCase()
  if (language.includes('zh-hk')) return 'zh-HK'
  if (language.includes('zh-tw') || language.includes('zh-mo')) return 'zh-TW'
  if (language.startsWith('zh')) return 'zh-CN'
  if (language.startsWith('ms')) return 'ms-MY'
  if (language.startsWith('ko')) return 'ko-KR'
  if (language.startsWith('th')) return 'th-TH'
  if (language.startsWith('id')) return 'id-ID'
  if (language.startsWith('vi')) return 'vi-VN'
  if (language.startsWith('hi')) return 'hi-IN'
  if (language.startsWith('ja')) return 'ja-JP'
  if (language.startsWith('fil') || language.startsWith('tl')) return 'fil-PH'
  return DEFAULT_LOCALE
}

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const locale = normalizeLocale(stored) ?? normalizeLocale(localStorage.getItem('uf9-lang'))
    if (locale) return locale
  } catch {
    return localeFromBrowser()
  }
  return localeFromBrowser()
}

export function LanguageProvider({ children }: { children: ReactNode }): ReactNode {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // Ignore blocked storage so the selector still works for the current page view.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dataset.country = countryOptions.find((option) => option.locale === locale)?.code ?? ''
  }, [locale])

  const t = useCallback((key: string): string => {
    const result = getByPath(locales[locale], key)
    if (result === key && locale !== DEFAULT_LOCALE) {
      return getByPath(locales[DEFAULT_LOCALE], key)
    }
    return result
  }, [locale])

  const tArray = useCallback((key: string): string[] => {
    const result = getArrayByPath(locales[locale], key)
    if (result.length === 0 && locale !== DEFAULT_LOCALE) {
      return getArrayByPath(locales[DEFAULT_LOCALE], key)
    }
    return result
  }, [locale])

  const tRaw = useCallback(<T = unknown>(key: string): T => {
    const result = resolve(locales[locale], key)
    if (result == null && locale !== DEFAULT_LOCALE) {
      return resolve(locales[DEFAULT_LOCALE], key) as T
    }
    return result as T
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray, tRaw }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
