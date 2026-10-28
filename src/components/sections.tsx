import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Canvas } from './Canvas'
import { flowLines, projectVisuals } from './visuals'
import { Mark, Reveal, ScrollWords, SectionLabel, useClock, useScrollLock } from './common'
import { disciplines, education, experience, interests, languages, profile, projects, type Project } from '../data/cv'

const ease = [0.22, 1, 0.36, 1] as const

const nav = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const time = useClock()
  useScrollLock(open)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('overlay:close', close)
    return () => window.removeEventListener('overlay:close', close)
  }, [])

  return (
    <>
      <header className="header grid4 caps">
        <a href="#top" aria-label="Back to top">
          <Mark />
        </a>
        <nav className="header__nav hide-md">
          {nav.slice(0, 4).map(item => (
            <a key={item.href} href={item.href} className="underline-link">
              {item.label}
            </a>
          ))}
        </nav>
        <span className="header__time hide-md mono">
          <i className="header__dot" /> {time} KRK
        </span>
        <button className="header__menu caps" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? 'Close ✕' : 'Index +'}
        </button>
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
              {nav.map((item, i) => (
                <li key={item.href}>
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease }}
                  >
                    <span className="mono">0{i + 1}</span>
                    {item.label}
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
  const years = new Date().getFullYear() - profile.since
  return (
    <section className="hero" id="top">
      <Canvas draw={flowLines} />
      <div className="hero__title">
        <motion.p
          className="mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {'>'} {profile.role.toLowerCase()} — {years} years in production
        </motion.p>
        <h1>
          {['Norbert', 'Litkowski'].map((word, i) => (
            <span key={word} className="hero__line">
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>
      <div className="hero__meta grid4 caps">
        <span>{profile.location}</span>
        <span>Identity · SSO · Integration</span>
        <span className="hide-md">
          TypeScript · React
          <br />
          Node.js · .NET · SQL
        </span>
        <a href="#about" className="hero__scroll">
          Scroll <span />
        </a>
      </div>
    </section>
  )
}

export function Intro() {
  return (
    <section className="section" id="about">
      <div className="grid4">
        <SectionLabel index="01">About</SectionLabel>
        <ScrollWords className="statement" text={profile.statement} />
        <div className="hide-md" />
        <Reveal className="intro__body">
          <p>{profile.summary}</p>
        </Reveal>
        <Reveal className="intro__facts" delay={0.1}>
          <div>
            <strong>~200</strong>
            <span className="caps muted">hospitals on my SSO</span>
          </div>
          <div>
            <strong>7</strong>
            <span className="caps muted">years in production</span>
          </div>
          <div>
            <strong>4</strong>
            <span className="caps muted">languages spoken</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = ['TypeScript', 'React', 'Next.js', '.NET', 'Node.js', 'PostgreSQL', 'Kerberos', 'Module Federation', 'gRPC', 'Kubernetes']
  const row = items.flatMap(item => [<span key={item}>{item}</span>, <span key={item + '-x'}><i>✕</i></span>])
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
  const [active, setActive] = useState<Project | null>(null)
  return (
    <section className="section" id="work">
      <div className="work__head grid4">
        <h2>
          <SectionLabel index="02">Selected work</SectionLabel>
        </h2>
        <a href="#experience" className="caps underline-link">
          View experience
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
              <h3 className="card__title">{p.title}</h3>
              <span className="caps muted">{p.tagline}</span>
              <span className="card__see caps">
                <b>Case study →</b>
                <b>Case study →</b>
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
      aria-label={project.title}
      data-lenis-prevent
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)', transitionEnd: { clipPath: 'none' } }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="sheet__bar grid4 caps">
        <Mark />
        <span className="hide-md">{project.client}</span>
        <span className="hide-md">{project.year}</span>
        <button className="caps" onClick={onClose} autoFocus>
          Close ✕
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
          {project.title}
        </motion.h2>
        <p className="sheet__lead">{project.tagline}</p>
        <ul className="sheet__points">
          {project.points.map(pt => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        <div className="sheet__meta">
          <div>
            <div className="caps muted">Client</div>
            <div className="caps">{project.client}</div>
          </div>
          <div>
            <div className="caps muted">Year</div>
            <div className="caps">{project.year}</div>
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
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="experience">
      <div className="grid4" style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>
        <h2>
          <SectionLabel index="03">Experience</SectionLabel>
        </h2>
      </div>
      <div className="rows">
        {experience.map((job, i) => {
          const isOpen = open === i
          return (
            <div className="row" key={job.company + job.period} data-open={isOpen}>
              <button className="row__head grid4" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                <span className="mono muted">{job.period}</span>
                <span className="row__role">{job.role}</span>
                <span className="caps">{job.company}</span>
                <span className="row__toggle caps">
                  <span className="muted hide-md">{job.place}</span>
                  <span className="row__plus">+</span>
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
                        {job.points.map(pt => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      {job.stack && <p className="mono muted">{job.stack}</p>}
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
  const [active, setActive] = useState<number | null>(null)
  return (
    <section className="section" id="stack">
      <div className="grid4 stack__head">
        <h2>
          <SectionLabel index="04">Stack</SectionLabel>
        </h2>
        <ScrollWords className="stack__lead" text="Identity is where the layers meet — so I work across all of them." />
      </div>
      <div className="stack grid4">
        {disciplines.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.08}>
            <div
              className="stack__col"
              data-dim={active !== null && active !== i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="stack__name">
                <span className="mono muted">{String(i + 1).padStart(2, '0')}/</span>
                <h3>{d.name}</h3>
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
  return (
    <section className="section">
      <div className="grid4" style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>
        <h2>
          <SectionLabel index="05">Education</SectionLabel>
        </h2>
      </div>
      <div className="grid4 edu">
        {education.map((e, i) => (
          <Reveal key={e.degree} className="edu__item" delay={i * 0.1}>
            <span className="mono muted">{e.period}</span>
            <h3>{e.degree}</h3>
            <span className="caps">{e.school}</span>
            <ul>
              {e.points.map(pt => (
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
  const time = useClock()
  return (
    <>
      <section className="cta" id="contact">
        <SectionLabel index="06">Contact</SectionLabel>
        <a className="cta__big" href={`mailto:${profile.email}`}>
          Let’s talk <em>→</em>
        </a>
      </section>
      <footer className="footer grid4">
        <div>
          <Mark />
        </div>
        <div>
          <h4 className="caps">Contact</h4>
          <ul className="mono">
            <li>
              <a className="underline-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="caps">Based</h4>
          <ul className="mono">
            <li>{profile.location}</li>
            <li className="muted">Local time {time}</li>
            <li className="muted" style={{ marginTop: 12 }}>
              {languages.join(' / ')}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="caps">Social</h4>
          <ul className="mono">
            <li>
              <a className="underline-link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a className="underline-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li className="muted" style={{ marginTop: 12 }}>
              Off-screen: {interests.join(', ').toLowerCase()}
            </li>
          </ul>
        </div>
        <div className="footer__bottom mono muted">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top" className="underline-link">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  )
}
