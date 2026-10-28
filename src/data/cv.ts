export const profile = {
  name: 'Norbert Litkowski',
  role: 'Full-stack software engineer',
  location: 'Kraków, PL',
  relocation: 'Open to relocating to Warsaw and the US',
  email: 'norbert.litkowski@gmail.com',
  github: 'https://github.com/nlitkowski',
  linkedin: 'https://www.linkedin.com/in/norbert-litkowski',
  timezone: 'Europe/Warsaw',
  since: 2019,
  statement: 'I connect new platforms to hard legacy enterprise systems.',
  summary:
    'Full-stack engineer with 7 years of shipping production software in TypeScript/React, Node.js, .NET and SQL. Kerberos SSO, multi-domain Active Directory and LDAP for a platform running in around 200 hospitals. I own features end to end — from requirements with the customer to production fixes.',
}

export type Project = {
  id: string
  title: string
  tagline: string
  year: string
  client: string
  visual: 'rings' | 'orbit' | 'glyphs' | 'attention'
  stack: string[]
  points: string[]
}

export const projects: Project[] = [
  {
    id: 'icpen',
    title: 'ICPen Identity',
    tagline: 'Single sign-on for around 200 hospitals.',
    year: '2024 — now',
    client: 'IC Solutions',
    visual: 'rings',
    stack: ['.NET', 'IdentityServer4', 'Kerberos / SPNEGO', 'nginx', 'React', 'Module Federation', 'gRPC', 'Kubernetes'],
    points: [
      'Kerberos single sign-on through nginx SPNEGO and a custom IdentityServer4 grant validator — hospital staff sign in with their existing Windows domain accounts.',
      'Multi-domain LDAP and Active Directory integration with a plugin architecture: a dynamic admin panel built from Module Federation 2.0 remotes, driven by a gRPC configuration service.',
      'Replaced server-rendered Razor login pages with a React/TypeScript login UI.',
      'Diagnosed and fixed nginx caching bugs affecting deployments inside hospital networks.',
    ],
  },
  {
    id: 'kiribati',
    title: 'Kiribati AI',
    tagline: 'An internal AI assistant platform, used daily.',
    year: '2025 — now',
    client: 'Kiribati Club',
    visual: 'orbit',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI API', 'shadcn/ui', 'Tailwind CSS'],
    points: [
      'Built and maintain an AI assistant platform for a Polish travel company on top of the open-source chatbot-ui codebase — used daily by 10–30 staff.',
      'OpenAI models with model selection per user and per project.',
      'Shared and private workspaces with custom assistants that staff configure and scope to each workspace.',
      'PostgreSQL data model for workspaces, projects, members, per-user model settings and assistants; i18n and a custom design system matching the brand.',
    ],
  },
  {
    id: 'transpiler',
    title: 'C# → JS',
    tagline: 'A transpiler that runs C# logic in the browser.',
    year: '2019 — 2023',
    client: 'DomData',
    visual: 'glyphs',
    stack: ['.NET', 'C#', 'TypeScript', 'React', 'Redux', 'RxJS', 'T-SQL'],
    points: [
      'Custom engine that transpiles C# to JavaScript so logic written once in C# runs in web browsers — it powered online banking forms.',
      'A converter for BPMN process models.',
      'Found and optimised slow-running queries in Microsoft SQL Server.',
      'Designed APIs with backend developers and built the React/TypeScript clients consuming them.',
    ],
  },
  {
    id: 'thesis',
    title: 'Attention',
    tagline: 'Transformers applied to recommender systems.',
    year: '2022',
    client: 'MSc thesis — AMU',
    visual: 'attention',
    stack: ['Python', 'Transformers', 'Recommender systems', 'Deep learning'],
    points: [
      'MSc thesis in Artificial Intelligence: applying the Transformer architecture to recommender systems.',
      'Selected for the US–Poland Science and Technology Symposium in Palo Alto, focused on applying AI to real-world problems.',
      'Co-founded and hosted a university AI conference with keynote speakers from Stanford and Berkeley.',
    ],
  },
]

export type Job = {
  role: string
  company: string
  period: string
  place: string
  points: string[]
  stack?: string
}

export const experience: Job[] = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'IC Solutions',
    period: '2024 — now',
    place: 'Poland',
    points: [
      'Identity and access layer of ICPen — .NET microservices on Kubernetes and React/TypeScript microfrontends, in a team of 5 developers, 1 DevOps engineer and 3 testers.',
      'Kerberos SSO, multi-domain LDAP/AD with a Module Federation plugin architecture, React login UI.',
      'Frontend platform: npm → pnpm migration, shared DataTable on Material React Table v3, Module Federation fixes for Shadow DOM and Tailwind CSS v4.',
      'Mentoring and onboarding, code review, unit and integration tests, requirements gathering with the business.',
    ],
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Kiribati Club',
    period: '2025 — now',
    place: 'Remote',
    points: [
      'Internal AI assistant platform for a travel company, owning the full cycle from schema to UI to release.',
      'Requirements and bug reports straight from the client, turned into prioritised fixes and features.',
    ],
    stack: 'Next.js, TypeScript, Node.js, PostgreSQL',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Symphony Solutions',
    period: '2023 — 2024',
    place: 'Remote',
    points: [
      'Part of a US-based team, collaborating across time zones in English.',
      'Backend services and React/TypeScript interfaces for a microservice system running in Docker.',
      'Owned milestones from first design to final delivery, agreeing technical proposals with stakeholders.',
    ],
    stack: '.NET, React, TypeScript, Tailwind CSS, Headless UI, Entity Framework, Redux, Docker, NUnit',
  },
  {
    role: 'Full-Stack Developer',
    company: 'DomData',
    period: '2019 — 2023',
    place: 'Poznań',
    points: [
      'C# → JavaScript transpiler powering online banking forms; BPMN model converter.',
      'SQL Server query optimisation; API design and React/TypeScript clients.',
      'Worked directly with customers and mentored newer developers.',
    ],
    stack: '.NET, React, TypeScript, Redux, RxJS, T-SQL',
  },
  {
    role: 'Junior Backend Developer',
    company: 'MyMusic',
    period: '2019',
    place: 'Poznań',
    points: ['Designed and maintained databases, built APIs and the data clients consuming them.'],
    stack: '.NET, Xamarin, NUnit',
  },
  {
    role: 'Software Development Intern',
    company: 'Ignicode',
    period: '2018 — 2019',
    place: 'Poznań',
    points: ['Supported development, QA and UX staff on new products and resolved issues during deployments.'],
    stack: '.NET, AMBasic',
  },
]

export const disciplines = [
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Redux', 'RxJS', 'Module Federation', 'Tailwind CSS', 'Material UI'] },
  { name: 'Backend', items: ['.NET', 'C#', 'Node.js', 'REST', 'gRPC', 'Entity Framework', 'PostgreSQL', 'SQL Server'] },
  { name: 'Identity', items: ['OAuth 2.0', 'OpenID Connect', 'IdentityServer4', 'Kerberos / SPNEGO', 'LDAP', 'Active Directory'] },
  { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'nginx', 'Azure', 'Git', 'NUnit', 'Code review', 'Scrum'] },
]

export const education = [
  {
    degree: 'MSc Computer Science — Artificial Intelligence',
    school: 'Adam Mickiewicz University, Poznań',
    period: '2021 — 2022',
    points: [
      'Thesis: applying the Transformer architecture to recommender systems.',
      "Rector's scholarship for top students throughout the degree.",
      'US–Poland Science and Technology Symposium, Palo Alto.',
      'Co-founded a university AI conference with keynotes from Stanford and Berkeley.',
    ],
  },
  {
    degree: 'BSc Computer Science',
    school: 'Adam Mickiewicz University, Poznań',
    period: '2017 — 2021',
    points: [
      'Thesis on the foundations of TypeScript, including a full-stack carpooling app built in a team of four.',
      "Rector's scholarship for top students throughout the degree.",
    ],
  },
]

export const languages = ['Polish — native', 'English — fluent (Cambridge FCE)', 'German — basic', 'French — basic']
export const interests = ['Bouldering', 'Vinyl records']
