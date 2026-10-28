import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pl from './locales/pl.json'

export const languages = ['en', 'pl'] as const
export type Lang = (typeof languages)[number]

const syncDocument = () => {
  document.documentElement.lang = i18n.resolvedLanguage ?? 'en'
  document.title = i18n.t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'))
}

i18n.on('initialized', syncDocument)
i18n.on('languageChanged', syncDocument)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, pl: { translation: pl } },
    supportedLngs: languages,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'en',
    // A saved choice wins; otherwise the first supported entry in the browser's language list.
    detection: { order: ['localStorage', 'navigator'], lookupLocalStorage: 'lang', caches: ['localStorage'] },
    interpolation: { escapeValue: false },
  })

export default i18n
