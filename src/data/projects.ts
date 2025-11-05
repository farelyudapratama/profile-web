export type Project = {
  id: number
  title: { en: string; id: string }
  description: { en: string; id: string }
  longDescription?: { en: string; id: string }
  features?: { en: string[]; id: string[] }
  challenges?: { en: string; id: string }
  architectureImage?: string
  images: string[]
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
    longDescription: {
      en: 'An interactive physics simulation that demonstrates collision detection, gravity, and fluid dynamics using HTML5 Canvas. Users can create, pop, and manipulate bubbles in real-time with smooth animations and realistic physics behavior.',
      id: 'Simulasi fisika interaktif yang mendemonstrasikan deteksi tabrakan, gravitasi, dan dinamika fluida menggunakan HTML5 Canvas. Pengguna dapat membuat, memecahkan, dan memanipulasi gelembung secara real-time dengan animasi halus dan perilaku fisika yang realistis.',
    },
    features: {
      en: [
        'Real-time physics simulation with collision detection',
        'Interactive bubble creation and manipulation',
        'Customizable gravity and wind parameters',
        'Smooth animations using requestAnimationFrame',
        'Responsive canvas that adapts to screen size',
      ],
      id: [
        'Simulasi fisika real-time dengan deteksi tabrakan',
        'Pembuatan dan manipulasi gelembung interaktif',
        'Parameter gravitasi dan angin yang dapat disesuaikan',
        'Animasi halus menggunakan requestAnimationFrame',
        'Canvas responsif yang menyesuaikan ukuran layar',
      ],
    },
    challenges: {
      en: 'Optimizing collision detection for 100+ bubbles while maintaining 60 FPS required implementing spatial partitioning and efficient rendering techniques.',
      id: 'Mengoptimalkan deteksi tabrakan untuk 100+ gelembung sambil mempertahankan 60 FPS memerlukan implementasi partisi spasial dan teknik rendering yang efisien.',
    },
    architectureImage: '/public/img/paternpoto.svg',
    images: ['/public/img/bubble.webp', '/public/img/logo.svg', '/public/img/paternpoto.svg'],
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
    images: ['/public/img/mas.webp', '/public/img/bubble.webp', '/public/img/logo.svg'],
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
    images: ['/public/img/paternpoto.svg', '/public/img/mas.webp', '/public/img/bubble.webp'],
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
    images: ['/public/img/logo.svg', '/public/img/paternpoto.svg', '/public/img/mas.webp'],
    tech: ['Vue', 'Tailwind', 'Stripe'],
    link: '#/projects/4',
    featured: true,
  },
]
