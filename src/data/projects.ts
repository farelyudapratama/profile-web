export type Project = {
  id: number
  title: string
  description: string
  img: string
  tech: string[]
  demo?: string
  link?: string
  github?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Bubble Pop Visualizer',
    description:
      'A tiny physics playground where bubbles argue about who is rounder. Built with canvas and forgiving UX.',
    img: '/public/img/bubble.webp',
    tech: ['Vue', 'TypeScript', 'Canvas'],
    demo: 'https://snapcal-fastapi-1007513690873.asia-southeast2.run.app',
    link: '#/projects/1',
    github: 'https://github.com/USERNAME/bubble-pop',
    featured: true,
  },
  {
    id: 2,
    title: 'Mas Notes (Too Honest)',
    description:
      'A minimal notes app that refuses to forget your terrible ideas. Includes offline support and optimistic saving.',
    img: '/public/img/mas.webp',
    tech: ['Vue', 'PWA', 'IndexedDB'],
    link: '#/projects/2',
    github: 'https://github.com/USERNAME/mas-notes',
    featured: true,
  },
  {
    id: 3,
    title: 'Portfolio AI Assistant',
    description:
      'A playful assistant that suggests better project titles and occasionally roasts your code comments.',
    img: '/public/img/paternpoto.svg',
    tech: ['Vue', 'Node', 'OpenAI'],
    link: '#/projects/3',
    featured: true,
  },
  {
    id: 4,
    title: 'Tiny Shopfront',
    description:
      'A micro e-commerce demo with a focus on delightful micro-interactions and fake discounts.',
    img: '/public/img/logo.svg',
    tech: ['Vue', 'Tailwind', 'Stripe'],
    link: '#/projects/4',
    featured: true,
  },
]
