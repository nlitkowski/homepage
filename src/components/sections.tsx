import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Canvas } from './Canvas'
import { flowLines, projectVisuals } from './visuals'
import { Mark, Reveal, ScrollWords, SectionLabel, useClock, useScrollLock } from './common'
import { Dotted, Icon, Period } from './ui'
import { useTheme } from '../theme'
import { languages } from '../i18n'
import {
  disciplines,
  education,
  experience,
  heroTech,
  interests,
  marquee,
  profile,
  projects,
  spokenLanguages,
  type Project,
} from '../data/cv'

const ease = [0.22, 1, 0.36, 1] as const
const navIds = ['about', 'work', 'experience', 'stack', 'contact'] as const
const yearsInProduction = () => new Date().getFullYear() - profile.since

const useList = (prefix: string) => {
  const { t } = useTranslation()
  return (key: string) => t(`${prefix}.${key}`, { returnObjects: true }) as string[]
}

export function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const time = useClock()
  useScrollLock(open)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('overlay:close', close)
    return () => window.removeEventListener('overlay:close', close)
  }, [])

  const themeLabel = theme === 'dark' ? t('header.themeToLight') : t('header.themeToDark')

  return (
    <>
      <header className="header grid4 caps">
        <a href="#top" aria-label={t('header.backToTop')}>
          <Mark />
        </a>
        <nav className="header__nav hide-md">
          {navIds.slice(0, 4).map(id => (
            <a key={id} href={`#${id}`} className="underline-link">
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>
        <span className="header__time hide-md mono">
          <i className="header__dot" /> {time} KRK
        </span>
        <div className="header__controls">
          <div className="lang mono" role="group" aria-label={t('header.language')}>
            {languages.map(l => (
              <button key={l} className="caps" aria-pressed={i18n.resolvedLanguage === l} onClick={() => i18n.changeLanguage(l)}>
                {l}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button className="header__menu caps with-icon" onClick={() => setOpen(o => !o)} aria-expanded={open}>
            {open ? t('header.close') : t('header.menu')}
            <Icon name={open ? 'close' : 'plus'} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transitionEnd: { clipPath: 'none' } }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease }}
          >
            <ul className="menu__list">
              {navIds.map((id, i) => (
                <li key={id}>
                  <motion.a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease }}
                  >
                    <span className="mono">0{i + 1}</span>
                    {t(`nav.${id}`)}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const focus = t('hero.focus', { returnObjects: true }) as string[]
  return (
    <section className="hero" id="top">
      <Canvas draw={flowLines} />
      <div className="hero__title">
        <motion.p className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
          <span className="prompt" aria-hidden="true" />
          {t('hero.caption', { count: yearsInProduction() })}
        </motion.p>
        <h1>
          {profile.name.split(' ').map((word, i) => (
            <span key={word} className="hero__line">
              <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease }}>
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>
      <div className="hero__meta grid4 caps">
        <span>
          {profile.city}, {profile.country}
        </span>
        <Dotted items={focus} />
        <span className="hide-md">
          <Dotted items={heroTech} />
        </span>
        <a href="#about" className="hero__scroll">
          {t('hero.scroll')} <span />
        </a>
      </div>
    </section>
  )
}

export function Intro() {
  const { t } = useTranslation()
  const years = yearsInProduction()
  return (
    <section className="section" id="about">
      <div className="grid4">
        <SectionLabel index="01">{t('nav.about')}</SectionLabel>
        <ScrollWords key={t('about.statement')} className="statement" text={t('about.statement')} />
        <div className="hide-md" />
        <Reveal className="intro__body">
          <p>{t('about.summary', { years, deployments: profile.deployments })}</p>
        </Reveal>
        <Reveal className="intro__facts" delay={0.1}>
          <div>
            <strong>~{profile.deployments}</strong>
            <span className="caps muted">{t('about.facts.deployments')}</span>
          </div>
          <div>
            <strong>{years}</strong>
            <span className="caps muted">{t('about.facts.years', { count: years })}</span>
          </div>
          <div>
            <strong>{spokenLanguages.length}</strong>
            <span className="caps muted">{t('about.facts.languages')}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Marquee() {
  const row = marquee.map(item => <span key={item}>{item}</span>)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row.map(el => ({ ...el, key: el.key + '-2' }))}
      </div>
    </div>
  )
}

export function Work() {
  const { t } = useTranslation()
  const [active, setActive] = useState<Project | null>(null)
  return (
    <section className="section" id="work">
      <div className="work__head grid4">
        <h2>
          <SectionLabel index="02">{t('work.label')}</SectionLabel>
        </h2>
        <a href="#experience" className="caps underline-link">
          {t('work.viewExperience')}
        </a>
      </div>
      <div className="work__grid">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            className="card"
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.1, delay: (i % 2) * 0.12, ease }}
          >
            <div className="card__visual">
              <Canvas draw={projectVisuals[p.visual]} />
            </div>
            <div className="card__body">
              <h3 className="card__title">{t(`projects.${p.id}.title`)}</h3>
              <span className="caps muted">{t(`projects.${p.id}.tagline`)}</span>
              <span className="card__see caps">
                {[0, 1].map(k => (
                  <b key={k} className="with-icon">
                    {t('work.caseStudy')}
                    <Icon name="arrowRight" />
                  </b>
                ))}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>{active && <ProjectSheet project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}

function ProjectSheet({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useTranslation()
  const list = useList(`projects.${project.id}`)
  const title = t(`projects.${project.id}.title`)
  const client = project.client ?? t(`projects.${project.id}.client`)
  useScrollLock(true)
  useEffect(() => {
    window.addEventListener('overlay:close', onClose)
    return () => window.removeEventListener('overlay:close', onClose)
  }, [onClose])

  return (
    <motion.div
      className="sheet"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-lenis-prevent
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)', transitionEnd: { clipPath: 'none' } }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="sheet__bar grid4 caps">
        <Mark />
        <span className="hide-md">{client}</span>
        <span className="hide-md">
          <Period start={project.start} end={project.end} />
        </span>
        <button className="caps with-icon" onClick={onClose} autoFocus>
          {t('header.close')}
          <Icon name="close" />
        </button>
      </div>
      <div className="sheet__visual">
        <Canvas draw={projectVisuals[project.visual]} />
      </div>
      <div className="grid4 sheet__content">
        <motion.h2
          className="sheet__title"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
        >
          {title}
        </motion.h2>
        <p className="sheet__lead">{t(`projects.${project.id}.tagline`)}</p>
        <ul className="sheet__points">
          {list('points').map(pt => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        <div className="sheet__meta">
          <div>
            <div className="caps muted">{t('work.client')}</div>
            <div className="caps">{client}</div>
          </div>
          <div>
            <div className="caps muted">{t('work.year')}</div>
            <div className="caps">
              <Period start={project.start} end={project.end} />
            </div>
          </div>
        </div>
        <div className="tags mono">
          {project.stack.map(s => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const { t } = useTranslation()
  const list = useList('experience.jobs')
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="experience">
      <div className="grid4" style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>
        <h2>
          <SectionLabel index="03">{t('experience.label')}</SectionLabel>
        </h2>
      </div>
      <div className="rows">
        {experience.map((job, i) => {
          const isOpen = open === i
          return (
            <div className="row" key={job.id} data-open={isOpen}>
              <button className="row__head grid4" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                <span className="mono muted">
                  <Period start={job.start} end={job.end} />
                </span>
                <span className="row__role">{t(`experience.jobs.${job.id}.role`)}</span>
                <span className="caps">{job.company}</span>
                <span className="row__toggle caps">
                  <span className="muted hide-md">{t(`experience.jobs.${job.id}.place`)}</span>
                  <Icon name="plus" className="row__plus" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="row__body"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className="row__inner grid4">
                      <div className="caps muted hide-md">{job.company}</div>
                      <ul>
                        {list(`${job.id}.points`).map(pt => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      {job.stack && <p className="mono muted">{job.stack.join(', ')}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function Stack() {
  const { t } = useTranslation()
  const [active, setActive] = useState<number | null>(null)
  return (
    <section className="section" id="stack">
      <div className="grid4 stack__head">
        <h2>
          <SectionLabel index="04">{t('stack.label')}</SectionLabel>
        </h2>
        <ScrollWords key={t('stack.lead')} className="stack__lead" text={t('stack.lead')} />
      </div>
      <div className="stack grid4">
        {disciplines.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.08}>
            <div
              className="stack__col"
              data-dim={active !== null && active !== i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="stack__name">
                <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t(`stack.groups.${d.id}`)}</h3>
              </div>
              <ul className="mono">
                {d.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Education() {
  const { t } = useTranslation()
  const list = useList('education.items')
  return (
    <section className="section">
      <div className="grid4" style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>
        <h2>
          <SectionLabel index="05">{t('education.label')}</SectionLabel>
        </h2>
      </div>
      <div className="grid4 edu">
        {education.map((e, i) => (
          <Reveal key={e.id} className="edu__item" delay={i * 0.1}>
            <span className="mono muted">
              <Period start={e.start} end={e.end} />
            </span>
            <h3>{t(`education.items.${e.id}.degree`)}</h3>
            <span className="caps">{t(`education.items.${e.id}.school`)}</span>
            <ul>
              {list(`${e.id}.points`).map(pt => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const { t, i18n } = useTranslation()
  const time = useClock()
  const languageName = new Intl.DisplayNames([i18n.resolvedLanguage ?? 'en'], { type: 'language' })
  return (
    <>
      <section className="cta" id="contact">
        <SectionLabel index="06">{t('nav.contact')}</SectionLabel>
        <a className="cta__big" href={`mailto:${profile.email}`}>
          {t('contact.letsTalk')} <Icon name="arrowRight" className="cta__arrow" />
        </a>
      </section>
      <footer className="footer grid4">
        <div>
          <Mark />
        </div>
        <div>
          <h4 className="caps">{t('nav.contact')}</h4>
          <ul className="mono">
            <li>
              <a className="underline-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
          </ul>
          <h4 className="caps footer__sub">{t('contact.languages')}</h4>
          <ul className="mono muted">
            {spokenLanguages.map(l => (
              <li key={l.code}>
                {languageName.of(l.code)}, {t(`levels.${l.level}`)}
                {'certificate' in l && ` (${l.certificate})`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="caps">{t('contact.based')}</h4>
          <ul className="mono">
            <li>
              {profile.city}, {profile.country}
            </li>
            <li className="muted">
              {t('contact.localTime')} {time}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="caps">{t('contact.social')}</h4>
          <ul className="mono">
            <li>
              <a className="underline-link with-icon" href={profile.github} target="_blank" rel="noreferrer">
                GitHub <Icon name="arrowUpRight" />
              </a>
            </li>
            <li>
              <a className="underline-link with-icon" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Icon name="arrowUpRight" />
              </a>
            </li>
          </ul>
          <h4 className="caps footer__sub">{t('contact.offScreen')}</h4>
          <ul className="mono muted">
            {interests.map(id => (
              <li key={id}>{t(`interests.${id}`)}</li>
            ))}
          </ul>
        </div>
        <div className="footer__bottom mono muted">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="underline-link with-icon">
            {t('header.backToTop')} <Icon name="arrowUp" />
          </a>
        </div>
      </footer>
    </>
  )
}
