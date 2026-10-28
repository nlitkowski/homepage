// Language-agnostic facts. All prose lives in src/locales, keyed by the ids below.

export const profile = {
  name: 'Norbert Litkowski',
  email: 'norbert.litkowski@gmail.com',
  github: 'https://github.com/nlitkowski',
  linkedin: 'https://www.linkedin.com/in/norbert-litkowski',
  timezone: 'Europe/Warsaw',
  city: 'Kraków',
  country: 'PL',
  since: 2019,
  deployments: 200,
}

export type Period = { start: number; end?: number }

export type Project = Period & {
  id: 'icpen' | 'kiribati' | 'transpiler' | 'thesis'
  client?: string
  visual: 'rings' | 'orbit' | 'glyphs' | 'attention'
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'icpen',
    client: 'IC Solutions',
    start: 2024,
    visual: 'rings',
    stack: ['.NET', 'IdentityServer4', 'Kerberos', 'SPNEGO', 'nginx', 'React', 'Module Federation', 'gRPC', 'Kubernetes'],
  },
  {
    id: 'kiribati',
    client: 'Kiribati Club',
    start: 2025,
    visual: 'orbit',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI API', 'shadcn/ui', 'Tailwind CSS'],
  },
  {
    id: 'transpiler',
    client: 'DomData',
    start: 2019,
    end: 2023,
    visual: 'glyphs',
    stack: ['.NET', 'C#', 'TypeScript', 'React', 'Redux', 'RxJS', 'T-SQL'],
  },
  {
    id: 'thesis',
    start: 2022,
    end: 2022,
    visual: 'attention',
    stack: ['Python', 'Transformers', 'RecSys', 'Deep learning'],
  },
]

export type Job = Period & {
  id: 'icsolutions' | 'kiribati' | 'symphony' | 'domdata' | 'mymusic' | 'ignicode'
  company: string
  stack?: string[]
}

export const experience: Job[] = [
  { id: 'icsolutions', company: 'IC Solutions', start: 2024 },
  { id: 'kiribati', company: 'Kiribati Club', start: 2025, stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'] },
  {
    id: 'symphony',
    company: 'Symphony Solutions',
    start: 2023,
    end: 2024,
    stack: ['.NET', 'React', 'TypeScript', 'Tailwind CSS', 'Headless UI', 'Entity Framework', 'Redux', 'Docker', 'NUnit'],
  },
  { id: 'domdata', company: 'DomData', start: 2019, end: 2023, stack: ['.NET', 'React', 'TypeScript', 'Redux', 'RxJS', 'T-SQL'] },
  { id: 'mymusic', company: 'MyMusic', start: 2019, end: 2019, stack: ['.NET', 'Xamarin', 'NUnit'] },
  { id: 'ignicode', company: 'Ignicode', start: 2018, end: 2019, stack: ['.NET', 'AMBasic'] },
]

export const disciplines = [
  { id: 'frontend', items: ['React', 'Next.js', 'TypeScript', 'Redux', 'RxJS', 'Module Federation', 'Tailwind CSS', 'Material UI'] },
  { id: 'backend', items: ['.NET', 'C#', 'Node.js', 'REST', 'gRPC', 'Entity Framework', 'PostgreSQL', 'SQL Server'] },
  { id: 'identity', items: ['OAuth 2.0', 'OpenID Connect', 'IdentityServer4', 'Kerberos', 'SPNEGO', 'LDAP', 'Active Directory'] },
  { id: 'infrastructure', items: ['Docker', 'Kubernetes', 'nginx', 'Azure', 'Git', 'NUnit', 'Code review', 'Scrum'] },
] as const

export const education = [
  { id: 'msc', start: 2021, end: 2022 },
  { id: 'bsc', start: 2017, end: 2021 },
] as const

// Names come from Intl.DisplayNames, levels from the locale files.
export const spokenLanguages = [
  { code: 'pl', level: 'native' },
  { code: 'en', level: 'fluent', certificate: 'Cambridge FCE' },
  { code: 'de', level: 'basic' },
  { code: 'fr', level: 'basic' },
] as const

export const interests = ['bouldering', 'vinyl'] as const

export const heroTech = ['TypeScript', 'React', 'Node.js', '.NET', 'SQL']

export const marquee = ['TypeScript', 'React', 'Next.js', '.NET', 'Node.js', 'PostgreSQL', 'Kerberos', 'Module Federation', 'gRPC', 'Kubernetes']
