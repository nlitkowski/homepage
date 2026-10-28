import { useTranslation } from 'react-i18next'
import type { Period as PeriodValue } from '../data/cv'

const paths = {
  arrowRight: 'M2 8h12M9 3l5 5-5 5',
  arrowUp: 'M8 14V2M3 7l5-5 5 5',
  arrowUpRight: 'M4 12 12 4M5 4h7v7',
  close: 'M3 3l10 10M13 3 3 13',
  plus: 'M8 2v12M2 8h12',
  moon: 'M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z',
  sun: 'M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3',
}

export type IconName = keyof typeof paths

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={paths[name]} />
      {name === 'sun' && <circle cx="8" cy="8" r="3" />}
    </svg>
  )
}

export function Period({ start, end }: PeriodValue) {
  const { t } = useTranslation()
  if (end === start) return <>{start}</>
  return (
    <span className="period">
      {start}
      <span className="period__sep" aria-hidden="true" />
      <span className="sr-only"> {t('period.to')} </span>
      {end ?? t('period.present')}
    </span>
  )
}

// Items separated by a CSS dot instead of a typed character.
export function Dotted({ items }: { items: readonly string[] }) {
  return (
    <span className="dotted">
      {items.map(item => (
        <span key={item}>{item}</span>
      ))}
    </span>
  )
}
