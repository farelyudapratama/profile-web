export type Project = {
  id: number
  title: { en: string; id: string }
  description: { en: string; id: string }
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
    title: {
      en: 'Bubble Pop Visualizer',
      id: 'Visualizer Gelembung',
    },
    description: {
      en: 'A tiny physics playground where bubbles argue about who is rounder. Built with canvas and forgiving UX.',
      id: 'Taman fisika mini di mana gelembung saling debat siapa paling bulat. Dibuat dengan canvas dan UX yang memaafkan.',
    },
    img: '/public/img/bubble.webp',
    tech: ['Vue', 'TypeScript', 'Canvas'],
    demo: 'https://snapcal-fastapi-1007513690873.asia-southeast2.run.app',
    link: '#/projects/1',
    github: 'https://github.com/USERNAME/bubble-pop',
    featured: true,
  },
  {
    id: 2,
    title: {
      en: 'Mas Notes (Too Honest)',
      id: 'Mas Notes (Terlalu Jujur)',
    },
    description: {
      en: 'A minimal notes app that refuses to forget your terrible ideas. Includes offline support and optimistic saving.',
      id: 'Aplikasi catatan minimalis yang menolak melupakan ide-ide jelekmu. Ada dukungan offline dan penyimpanan optimis.',
    },
    img: '/public/img/mas.webp',
    tech: ['Vue', 'PWA', 'IndexedDB'],
    link: '#/projects/2',
    github: 'https://github.com/USERNAME/mas-notes',
    featured: true,
  },
  {
    id: 3,
    title: {
      en: 'Portfolio AI Assistant',
      id: 'Asisten AI Portfolio',
    },
    description: {
      en: 'A playful assistant that suggests better project titles and occasionally roasts your code comments.',
      id: 'Asisten iseng yang suka kasih saran judul proyek lebih keren dan kadang roasting komentar kodinganmu.',
    },
    img: '/public/img/paternpoto.svg',
    tech: ['Vue', 'Node', 'OpenAI'],
    link: '#/projects/3',
    featured: true,
  },
  {
    id: 4,
    title: {
      en: 'Tiny Shopfront',
      id: 'Toko Mini Palsu',
    },
    description: {
      en: 'A micro e-commerce demo with a focus on delightful micro-interactions and fake discounts.',
      id: 'Demo e-commerce mikro dengan banyak interaksi lucu dan diskon palsu.',
    },
    img: '/public/img/logo.svg',
    tech: ['Vue', 'Tailwind', 'Stripe'],
    link: '#/projects/4',
    featured: true,
  },
]
