export interface Experience {
  id: number
  company: { id: string; en: string }
  position: { id: string; en: string }
  period: { id: string; en: string }
  description: { id: string[]; en: string[] }
}

export interface Education {
  id: number
  institution: { id: string; en: string }
  degree: { id: string; en: string }
  field: { id: string; en: string }
  period: { id: string; en: string }
  description?: { id: string; en: string }
}

export interface Skill {
  id: number
  category: { id: string; en: string }
  items: { id: string; en: string }[]
}

export interface Project {
  id: number
  title: { id: string; en: string }
  description: { id: string; en: string }
  technologies: string[]
  link?: string
}

export interface PersonalInfo {
  name: { id: string; en: string }
  title: { id: string; en: string }
  email: string
  phone: string
  location: { id: string; en: string }
  summary: { id: string[]; en: string[] }
}

export const resumeData = {
  personalInfo: {
    name: { id: 'Farel Yuda Pratama', en: 'Farel Yuda Pratama' },
    title: { id: 'Mahasiswa Informatika', en: 'Informatika Student' },
    email: 'farelyudapratama51@gmail.com',
    phone: '', // Removed for privacy
    location: { id: 'Jakarta Timur', en: 'East Jakarta' },
    summary: {
      id: [
        'Mahasiswa Informatika tingkat akhir di Universitas Gunadarma dan lulusan Bangkit Academy 2024 (Android Development Path) pengembangan aplikasi Android menggunakan Kotlin.',
        'Memiliki pengalaman dalam merancang, mengembangkan, dan menguji aplikasi mobile.',
        'Antusias untuk memulai karir sebagai Junior Developer dan berkontribusi pada proyek-proyek inovatif.',
      ],
      en: [
        'Final year Informatika student at Universitas Gunadarma and graduate of Bangkit Academy 2024 (Android Development Path) focusing on Android app development using Kotlin.',
        'Have experience in designing, developing, and testing mobile applications.',
        'Eager to start a career as a Junior Developer and contribute to innovative projects.',
      ],
    },
  } as PersonalInfo,

  experiences: [
    {
      id: 1,
      company: { id: 'Badan Pusat Statistik', en: 'Central Bureau of Statistics' },
      position: { id: 'Petugas Sensus Ekonomi (PPL)', en: 'Economic Census Officer (PPL)' },
      period: { id: 'Okt 2022 – Nov 2024', en: 'Oct 2022 – Nov 2024' },
      description: {
        id: ['Melakukan pendataan dan survei lapangan kepada responden di wilayah Pondok Bambu.'],
        en: ['Conducted field data collection and surveys for respondents in Pondok Bambu area.'],
      },
    },
    {
      id: 2,
      company: { id: 'Hotel Aryaduta Suites Semanggi', en: 'Aryaduta Suites Semanggi Hotel' },
      position: { id: 'Engineering Intern (PKL)', en: 'Engineering Intern (Vocational Training)' },
      period: { id: 'Jul 2019 – Des 2019', en: 'Jul 2019 – Dec 2019' },
      description: {
        id: [
          'Melakukan pemeliharaan preventif dan korektif pada sistem kelistrikan, dan peralatan elektronik hotel.',
          'Membantu tim engineering dalam inspeksi rutin dan perbaikan fasilitas teknis.',
          'Berkontribusi dalam menjaga operasional peralatan hotel agar berjalan optimal sesuai standar keselamatan.',
        ],
        en: [
          'Performed preventive and corrective maintenance on electrical systems and hotel electronic equipment.',
          'Assisted the engineering team in routine inspections and technical facility repairs.',
          'Contributed to ensuring hotel equipment operations ran optimally according to safety standards.',
        ],
      },
    },
  ] as Experience[],

  education: [
    {
      id: 1,
      institution: { id: 'Universitas Gunadarma', en: 'Universitas Gunadarma' },
      degree: { id: 'Sarjana Teknik Informatika', en: 'Bachelor of Informatics Engineering' },
      field: { id: 'Teknik Informatika', en: 'Informatics Engineering' },
      period: { id: '2021 - Sekarang', en: '2021 - Present' },
      description: {
        id: 'Mahasiswa Informatika tingkat akhir',
        en: 'Final year Informatika student',
      },
    },
    {
      id: 2,
      institution: {
        id: 'Bangkit Academy by Google, GoTo, Traveloka',
        en: 'Bangkit Academy by Google, GoTo, Traveloka',
      },
      degree: { id: 'Sertifikat', en: 'Certificate' },
      field: { id: 'Android Development Path', en: 'Android Development Path' },
      period: { id: 'Feb 2024 – Jul 2024', en: 'Feb 2024 – Jul 2024' },
      description: {
        id: 'Android Native Development, Jetpack Compose, Kotlin, RESTful APIs, Firebase, Git',
        en: 'Android Native Development, Jetpack Compose, Kotlin, RESTful APIs, Firebase, Git',
      },
    },
    {
      id: 3,
      institution: { id: 'SMKN 5 Jakarta', en: 'SMKN 5 Jakarta' },
      degree: { id: 'SMA', en: 'High School Diploma' },
      field: { id: 'Teknik Instalasi Tenaga Listrik', en: 'Electrical Installation Engineering' },
      period: { id: '2018 – 2021', en: '2018 – 2021' },
      description: {
        id: 'Lulus dari SMKN 5 Jakarta',
        en: 'Graduated from SMKN 5 Jakarta',
      },
    },
  ] as Education[],

  skills: [
    {
      id: 1,
      category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
      items: [
        { id: 'Kotlin', en: 'Kotlin' },
        { id: 'Python', en: 'Python' },
        { id: 'PHP', en: 'PHP' },
        { id: 'HTML', en: 'HTML' },
        { id: 'CSS', en: 'CSS' },
        { id: 'JavaScript', en: 'JavaScript' },
      ],
    },
    {
      id: 2,
      category: { id: 'Framework & Teknologi', en: 'Frameworks & Technologies' },
      items: [
        { id: 'Android SDK', en: 'Android SDK' },
        { id: 'Jetpack Compose', en: 'Jetpack Compose' },
        { id: 'RESTful APIs', en: 'RESTful APIs' },
        { id: 'Git', en: 'Git' },
        { id: 'GitHub', en: 'GitHub' },
        { id: 'Firebase', en: 'Firebase' },
      ],
    },
    {
      id: 3,
      category: { id: 'Tools & Software', en: 'Tools & Software' },
      items: [
        { id: 'Android Studio', en: 'Android Studio' },
        { id: 'IntelliJ IDEA', en: 'IntelliJ IDEA' },
        { id: 'Visual Studio Code', en: 'Visual Studio Code' },
        { id: 'Microsoft Office', en: 'Microsoft Office' },
        { id: 'Photoshop', en: 'Photoshop' },
      ],
    },
  ] as Skill[],

  projects: [
    {
      id: 1,
      title: { id: 'SnapCal - Aplikasi Android', en: 'SnapCal - Android Application' },
      description: {
        id: 'Aplikasi mobile yang dikembangkan selama mengikuti Bangkit Academy dengan menggunakan teknologi Android Native Development',
        en: 'Mobile application developed during Bangkit Academy program using Android Native Development technology',
      },
      technologies: ['Kotlin', 'Android SDK'],
      link: '#',
    },
    {
      id: 2,
      title: {
        id: 'Proyek Skripsi - Penyempurnaan SnapCal',
        en: 'Thesis Project - SnapCal Enhancement',
      },
      description: {
        id: 'Proyek akademik dalam bidang informatika sebagai tugas akhir yang merupakan penyempurnaan dan penambahan fitur dari aplikasi SnapCal',
        en: 'Academic project in informatics field as final project, which is an enhancement and feature addition to the SnapCal application',
      },
      technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Firebase', 'Express.js'],
      link: '#',
    },
  ] as Project[],
}
