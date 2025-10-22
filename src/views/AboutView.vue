<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import TechStack from '../components/TechStack.vue'

const languageStore = useLanguageStore()

const currentLang = computed(() => languageStore.currentLang || 'id')

const textData = {
  aboutMe: { id: 'Tentang Saya', en: 'About Me' },
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
      `I'm Farel, who self-claims to be a full-stack developer. I like to explore the logic behind every line of code...`,
      `But hey, I'm human too...`,
      `I also can't lie that I'm quite dependent on AI...`,
      `I'm learning not to immediately trust my own code...`,
      `I like systematic approaches...`,
      `My motive is simple: I want to <em>understand</em>, not just <em>master</em>...`,
    ],
  },
}
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
        <img src="/img/photo.png" :alt="`Foto Farel - ${textData.aboutMe[currentLang]}`" />
      </aside>
    </div>

    <TechStack />
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
  justify-content: center;
  align-items: center;
  align-self: center;
}

.about__image img {
  width: 260px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  border: 4px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

/* Responsive */
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
}
</style>
