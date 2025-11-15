<script setup lang="ts">
import { computed, onUnmounted, ref, reactive } from 'vue'
import { MoveRight, ScrollText } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import gsap from 'gsap'
import TechStack from '../components/TechStack.vue'

const router = useRouter()
const languageStore = useLanguageStore()

const navigateToResume = () => {
  router.push('/resume')
}

const currentLang = computed(() => languageStore.currentLang || 'id')
const imageRef = ref<HTMLElement | null>(null)
// Animation configuration constants
const ANIMATION_CONFIG = {
  fadeOut: { rotation: 360, scale: 0.1, opacity: 0, duration: 0.5, ease: 'power2.out' },
  fadeIn: { rotation: 720, scale: 1, opacity: 1, duration: 0.5, ease: 'power2.in' },
}

const imageState = reactive({
  currentImage: '/img/photo.png',
  defaultImage: '/img/photo.png',
  otherImages: ['/img/ismine/l1.jpg', '/img/ismine/l2.jpg', '/img/ismine/l3.webp'],
})

const textData = {
  aboutMe: { id: 'Tentang Saya', en: 'About Me' },
  resumeButton: { id: 'Lihat Resume', en: 'View Resume' },
  paragraphs: {
    id: [
      `Saya Farel, yang self claim sebagai pengembang full-stack. Aku suka ngulik logika di balik setiap baris kode. Bukan cuma puas kalau programnya jalan, tapi mesti tahu kenapa itu jalan, darimana logikanya, dan apakah ini solusi terbaik atau cuma kebetulan berfungsi.`,
      `Tapi ya, aku juga manusia. Kodeku gak selalu rapi, kadang berantakan, kadang penuh catatan aneh yang bahkan aku sendiri lupa maksudnya. Masih banyak repo di GitHub-ku yang mungkin bikin orang geleng-geleng. Tapi itulah proses belajar: dari kesalahan itu aku belajar, dari kode berantakan itu aku coba perbaiki, dan dari setiap proyek kecil itu aku terus berkembang.`,
      `Aku juga gak bisa bohong aku lumayan bergantung pada AI. Kadang buat brainstorming, kadang buat nulis kode. Tapi bagiku, AI bukan jalan pintas untuk menghindari belajar. Aku sadar, hasil akhirnya tetap tanggung jawab manusia yang berpikir, bukan mesin yang menebak. Jadi, aku pakai AI sebagai alat bantu, bukan pengganti.`,
      `Aku belajar buat gak langsung percaya sama kodeku sendiri. Setiap kali nulis fungsi atau desain arsitektur, aku selalu tanya diri: "Apakah ini cara terbaik? Apa ada yang lebih efisien? Apa aku udah pertimbangkan semua kemungkinan?" Dengan cara itu, aku berharap bisa terus berkembang jadi pengembang yang gak cuma jago nulis kode.`,
      `Aku suka sistematis, tapi aku juga tahu kalau dunia teknologi itu dinamis dan terus berubah. Jadi, aku berusaha buat tetap fleksibel, terbuka sama ide-ide baru, dan gak takut buat bereksperimen. Karena pada akhirnya, belajar itu perjalanan tanpa akhir.`,
      `Motifku sederhana: aku pengen <em>ngerti</em>, bukan cuma <em>nguasain</em>. Aku pengen tahu kenapa sesuatu bekerja, bukan cuma gimana cara pakainya. Karena dengan pemahaman itu, aku yakin bisa jadi pengembang yang bukan cuma ikut arus tapi suatu hari, bisa bikin arus sendiri.`,
    ],
    en: [
      `I'm Farel, a self-proclaimed full-stack developer. I like to dig into the logic behind every line of code. I'm not satisfied just because a program works; I need to know why it works, where the logic comes from, and whether it's the best solution or just a coincidence that it runs.`,
      `But I'm human too. My code isn't always neat—sometimes it's messy and full of odd notes that even I forget the meaning of. There are still many repos on my GitHub that might make people shake their heads. But that's the learning process: I learn from mistakes, try to fix messy code, and grow from every small project.`,
      `I also can't lie: I'm fairly dependent on AI sometimes—sometimes for brainstorming, sometimes for writing code. But for me, AI isn't a shortcut to avoid learning. I know the final result is still the responsibility of the human thinker, not a guessing machine. So I use AI as a tool, not a replacement.`,
      `I'm learning not to immediately trust my own code. Every time I write a function or design an architecture, I always ask myself: "Is this the best way? Is there a more efficient approach? Have I considered all possibilities?" By doing that, I hope to keep growing into a developer who doesn't just excel at writing code.`,
      `I like being systematic, but I also know the tech world is dynamic and constantly changing. So I try to stay flexible, open to new ideas, and not afraid to experiment. Because in the end, learning is a never-ending journey.`,
      `My motive is simple: I want to <em>understand</em>, not just <em>master</em>. I want to know why something works, not just how to use it. With that understanding, I believe I can become a developer who not only follows the current but one day can create the current itself.`,
    ],
  },
  techStackParagraph: {
    id: 'Beberapa teknologi yang saya gunakan',
    en: 'Some of the technologies I use',
  },
}

// Helper function for image transition animation
const animateImageTransition = (newImage: string) => {
  if (!imageRef.value) return

  gsap.to(imageRef.value, {
    ...ANIMATION_CONFIG.fadeOut,
    onComplete: () => {
      try {
        // Update the current image
        imageState.currentImage = newImage

        // Animate the new image back in
        gsap.to(imageRef.value!, {
          ...ANIMATION_CONFIG.fadeIn,
        })
      } catch (error) {
        console.error('Error during image transition:', error)
        // Fallback: ensure the default image is shown if there's an error
        imageState.currentImage = imageState.defaultImage
      }
    },
  })
}

const handleImageClick = () => {
  if (!imageRef.value) return

  // Check if current image is the default image
  if (imageState.currentImage === imageState.defaultImage) {
    // If current image is default, transition to a random other image
    if (imageState.otherImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * imageState.otherImages.length)
      const randomImage = imageState.otherImages[randomIndex]
      animateImageTransition(randomImage)
    }
  } else {
    // If current image is not the default, transition back to default
    animateImageTransition(imageState.defaultImage)
  }
}

// Cleanup function to stop any ongoing animations when component is unmounted
const cleanup = () => {
  if (imageRef.value) {
    // Kill any ongoing GSAP animations on the image element
    gsap.killTweensOf(imageRef.value)
  }
}

// Call cleanup when component is unmounted
onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <section class="about">
    <div class="about__content">
      <article>
        <header class="about__header">
          <h2 class="heading-2">{{ textData.aboutMe[currentLang] }}</h2>
        </header>

        <p
          v-for="(p, i) in textData.paragraphs[currentLang]"
          :key="i"
          class="subtitle"
          v-html="p"
        ></p>
      </article>

      <aside class="about__image">
        <div class="image-wrapper" @click="handleImageClick">
          <div class="image-border"></div>
          <img
            ref="imageRef"
            :src="imageState.currentImage"
            :alt="`Foto Farel - ${textData.aboutMe[currentLang]}`"
            class="animated-image"
          />
        </div>
        <a
          @click="navigateToResume"
          target="_blank"
          class="resume-button"
          aria-label="Buka resume Farel"
        >
          <MoveRight class="resume-icon left" />
          <span class="resume-text">{{ textData.resumeButton[currentLang] }}</span>
          <ScrollText class="resume-icon right" />
        </a>
      </aside>
    </div>

    <section class="techstack-section">
      <div class="about__header">
        <h2 class="heading-2">TechStack</h2>
        <p class="subtitle">{{ textData.techStackParagraph[currentLang] }}</p>
      </div>
      <TechStack />
    </section>
  </section>
</template>

<style scoped>
.about {
  max-width: 1760px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2.25rem;
}

.about__content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2rem;
  align-items: start;
}

.about__header {
  text-align: center;
  margin-bottom: 1.25rem;
}

.about__image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 0;
}

.about__image img {
  width: 260px;
  height: 320px;
  object-fit: cover;
  border-width: 4px 4px 0 4px;
  border-style: solid;
  border-color: var(--color-border);
  cursor: pointer;
}

.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 320px;
  cursor: pointer;
}

.image-border {
  position: absolute;
  width: 260px;
  height: 320px;
  border-width: 4px 4px 0 4px;
  border-style: solid;
  border-color: var(--color-border);
  z-index: 1;
}

.animated-image {
  width: 260px;
  height: 320px;
  object-fit: cover;
  cursor: pointer;
  z-index: 2;
  position: relative;
}

.resume-button {
  display: block;
  width: 260px;
  padding: 0.75rem 0;
  background-color: var(--color-border);
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    transform 0.12s ease;
  text-align: center;
}

.resume-button:hover {
  background-color: var(--color-text);
  color: var(--color-background);
  cursor: pointer;
}

.resume-button .resume-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  stroke-width: 1.6;
  display: inline-block;
}
.resume-button .resume-icon.left {
  margin-right: 0.5rem;
}

.resume-button .resume-icon.left:hover {
  transition: transform 0.3s ease-out;
  transform: rotate(-45deg);
}

.resume-button .resume-icon.right {
  margin-left: 0.5rem;
}
.resume-button .resume-text {
  display: inline-block;
  vertical-align: middle;
}
/* Responsive */

/* rotate left icon on button hover */
.resume-button:hover .resume-icon.left {
  transform: rotate(-28deg);
}
@media (max-width: 1100px) {
  .about__content {
    grid-template-columns: 1fr 280px;
  }
}
@media (max-width: 760px) {
  .about__content {
    grid-template-columns: 1fr;
  }
  .about__image img {
    width: 160px;
    height: 200px;
  }
  .resume-button {
    width: 160px;
  }
}

/* ===== MOBILE XS (max-width: 480px) ===== */
@media (max-width: 480px) {
  .about {
    padding: 1.5rem 1.2rem;
  }

  .about__content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  /* Typography */
  .subtitle {
    font-size: 0.9rem;
    line-height: 1.55;
    margin-bottom: 1rem;
  }

  .heading-2 {
    font-size: 1.35rem;
  }

  /* Image container */
  .about__image {
    margin-top: 0.5rem;
  }

  .image-wrapper,
  .about__image img,
  .image-border {
    width: 140px !important;
    height: 180px !important;
  }

  /* Resume Button */
  .resume-button {
    width: 100% !important;
    max-width: 240px;
    padding: 0.65rem 0;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .resume-text {
    font-size: 0.9rem;
  }

  /* TechStack section */
  .techstack-section {
    margin-top: 2rem;
    text-align: center;
  }

  .techstack-section .subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
  }

  /* General spacing */
  article {
    margin-bottom: 1rem;
  }
}
</style>
