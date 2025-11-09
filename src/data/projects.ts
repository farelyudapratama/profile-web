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
    images: [
      '/public/img/aturdana/turdan1.png',
      '/public/img/aturdana/turdan2.png',
      '/public/img/aturdana/turdan3.png',
      '/public/img/aturdana/turdan4.png',
    ],
    tech: ['Kotlin', 'Firebase'],
    github: 'https://github.com/farelyudapratama/aturdana',
    featured: true,
  },
  {
    id: 4,
    title: {
      en: 'ListAnime',
      id: 'ListAnime',
    },
    description: {
      en: 'An application to search and bookmark favorite anime (Dicoding Submission). Jikan API is used to fetch anime data',
      id: 'Aplikasi untuk mencari dan bookmark anime favorit (Submission Dicoding). Jikan API digunakan untuk mengambil data anime',
    },
    images: ['/public/img/listnime/la1.png', '/public/img/listnime/la2.png'],
    tech: ['Kotlin'],
    github: 'https://github.com/farelyudapratama/listanime',
    featured: true,
  },
  {
    id: 5,
    title: {
      en: 'personal-notes',
      id: 'personal-notes',
    },
    description: {
      en: 'A simple note-taking application to store personal notes. Built with React.',
      id: 'Aplikasi catatan sederhana untuk menyimpan catatan pribadi. Dibangun dengan React.',
    },
    images: ['/public/img/pslnot/1.png', '/public/img/pslnot/2.png', '/public/img/pslnot/3.png'],
    tech: ['React'],
    demo: 'https://69043d9ce4ef6e00087c8a53--personal-notes-react-yuda.netlify.app/',
    github: 'https://github.com/farelyudapratama/personal-notes-react',
  },
  {
    id: 6,
    title: {
      en: 'Web Portfolio',
      id: 'Web Portfolio',
    },
    description: {
      en: 'My personal portfolio website showcasing projects and skills. Built with Vue.js.',
      id: 'Situs web portofolio pribadi saya yang menampilkan proyek dan keterampilan. Dibangun dengan Vue.js.',
    },
    images: ['/public/img/image.png'],
    tech: ['Vue'],
    github: 'https://github.com/farelyudapratama/profile-web',
  },
]
