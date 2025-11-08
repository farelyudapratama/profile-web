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
      en: 'SnapCal',
      id: 'SnapCal',
    },
    description: {
      en: 'An Android app that analyzes food photos using AI to estimate calories and nutrients, combining YOLO for food detection and Gemini AI for nutritional estimation.',
      id: 'Aplikasi Android yang menganalisis foto makanan menggunakan AI untuk memperkirakan kalori dan nutrisi, menggabungkan YOLO untuk deteksi makanan dan Gemini AI untuk estimasi gizi.',
    },
    longDescription: {
      en: 'SnapCal is an Android application that helps users understand what they eat through an AI-driven analysis pipeline. It detects food in images using a local YOLO model, estimates nutritional content with Google Gemini and LLaMA (via Groq API), and stores results in MongoDB through a backend built with Express.js. The app also provides daily and weekly summaries, allowing users to track their calorie intake visually and effortlessly. Firebase Authentication is used for secure access. The entire system is designed to work seamlessly between mobile, backend, and AI layers.',
      id: 'SnapCal adalah aplikasi Android yang membantu pengguna memahami makanan yang mereka konsumsi melalui analisis berbasis AI. Aplikasi ini mendeteksi makanan pada gambar menggunakan model YOLO lokal, memperkirakan kandungan nutrisi melalui Gemini dan LLaMA (via Groq API), dan menyimpan hasilnya ke MongoDB melalui backend Express.js. Aplikasi juga menampilkan ringkasan harian dan mingguan, sehingga pengguna bisa memantau asupan kalori secara visual dan mudah. Autentikasi pengguna menggunakan Firebase. Seluruh sistem dirancang agar mobile, backend, dan AI dapat bekerja secara mulus satu sama lain.',
    },
    features: {
      en: [
        'Food detection using YOLO',
        'Nutritional estimation powered by Gemini and Groq APIs',
        'Daily and weekly calorie summaries',
        'Manual food input and history tracking',
        'Firebase Authentication for user validation',
        'Backend integration with Express.js and FastAPI',
        'Fallback AI analysis when YOLO detection fails',
      ],
      id: [
        'Deteksi makanan berbasis dengan YOLO',
        'Estimasi nutrisi menggunakan Gemini dan Groq API',
        'Ringkasan kalori harian dan mingguan',
        'Input manual dan riwayat makanan',
        'Autentikasi pengguna dengan Firebase',
        'Integrasi backend menggunakan Express.js dan FastAPI',
        'Analisis fallback ke AI jika deteksi YOLO gagal',
      ],
    },
    architectureImage: '/public/img/snapcal/arsisnapcal.png',
    images: [
      '/public/img/snapcal/s1.png',
      '/public/img/snapcal/s2.png',
      '/public/img/snapcal/s3.png',
      '/public/img/snapcal/s4.png',
      '/public/img/snapcal/s5.png',
    ],
    tech: [
      'Kotlin',
      'Express.js',
      'FastAPI',
      'MongoDB',
      'Firebase',
      'YOLOv11',
      'Gemini AI API',
      'Groq AI API (LLaMA)',
      'Cloudflare Tunnel',
    ],
    demo: 'https://snapcal-fastapi-1007513690873.asia-southeast2.run.app',
    link: '#/projects/1',
    github: 'https://github.com/farelyudapratama/SnapCal-Firebase-Gemini',
    featured: true,
  },
  {
    id: 2,
    title: {
      en: 'StockUp — Inventory Management',
      id: 'StockUp — Manajemen Inventaris',
    },
    description: {
      en: 'StockUp is a lightweight inventory management application built with PHP and Blade templates. It provides product, stock, and transaction tracking, intended for small businesses to manage inventory and reports.',
      id: 'StockUp adalah aplikasi manajemen inventaris ringan yang dibangun dengan PHP dan template Blade. Menyediakan pelacakan produk, stok, dan transaksi, ditujukan untuk usaha kecil untuk mengelola inventaris dan laporan.',
    },
    images: [
      '/public/img/stockup/stockup-1.png',
      '/public/img/stockup/stockup-2.png',
      '/public/img/stockup/stockup-3.png',
      '/public/img/stockup/stockup-4.png',
    ],
    tech: ['PHP', 'Laravel', 'Blade', 'SQLite', 'JavaScript', 'Tailwind CSS'],
    link: '#/projects/2',
    github: 'https://github.com/farelyudapratama/stockup',
    featured: true,
  },
  {
    id: 3,
    title: {
      en: 'AturDana',
      id: 'AturDana',
    },
    description: {
      en: 'AturDana is an Android app for personal finance management. Users can log income and expenses, view transaction history, filter by date, calculate totals, create budgets, and set reminders. Built with Kotlin and Firebase (Realtime Database, Authentication, Storage).',
      id: 'AturDana adalah aplikasi Android untuk manajemen keuangan pribadi. Pengguna dapat mencatat pendapatan dan pengeluaran, melihat riwayat transaksi, memfilter berdasarkan tanggal, menghitung total transaksi, membuat anggaran, dan membuat pengingat. Dibangun dengan Kotlin dan menggunakan Firebase (Realtime Database, Authentication, Storage).',
    },
    images: ['/public/img/paternpoto.svg', '/public/img/mas.webp', '/public/img/bubble.webp'],
    tech: ['Kotlin', 'Firebase', 'OpenAI'],
    link: '#/projects/3',
    github: 'https://github.com/farelyudapratama/aturdana',
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
  {
    id: 5,
    title: {
      en: 'Code Snippet Manager',
      id: 'Manajer Cuplikan Kode',
    },
    description: {
      en: 'A web app to save and organize your code snippets with tagging and search functionality.',
      id: 'Aplikasi web untuk menyimpan dan mengatur cuplikan kode Anda dengan fungsi penandaan dan pencarian.',
    },
    images: ['/public/img/mas.webp', '/public/img/bubble.webp'],
    tech: ['Vue', 'Firebase'],
    link: '#/projects/5',
    github: 'https://github.com/USERNAME/code-snippet-manager',
  },
]
