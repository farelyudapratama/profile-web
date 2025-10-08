<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

const messages = {
  id: {
    welcome: 'Yo, Aku Farel!',
    intro: '"Satu baris kode untuk mengontrol semuanya… atau setidaknya bikin crash semuanya."',
    description:
      'Aku ingin menjadi software engineer yang menikmati proses belajar. Aku tahu jalan ini panjang, penuh tantangan, tapi justru di situlah serunya. Setiap proyek kecil, setiap ide, dan setiap percobaan adalah bagian dari perjalanan itu.',
  },
  en: {
    welcome: 'Hi, I’m Farel!',
    intro: '"One line of code to rule them all… or at least crash them all."',
    description:
      'I aspire to become a software engineer who truly enjoys the journey of learning. The road may be long and challenging, but that’s exactly what makes it meaningful. Every small project, idea, and experiment is a step forward in that journey.',
  },
}

const descriptionLines = computed(() => {
  const desc = messages[languageStore.currentLang].description
  // Pisahkan berdasarkan titik diikuti spasi, lalu filter jika kosong
  return desc
    .split('. ')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
})
</script>

<template>
  <section class="welcome-section">
    <div class="welcome-content">
      <h1 class="welcome-title">
        {{ messages[languageStore.currentLang].welcome }}
      </h1>
      <blockquote class="intro-quote">
        {{ messages[languageStore.currentLang].intro }}
      </blockquote>
      <p class="description">
        <span v-for="(line, idx) in descriptionLines" :key="idx">
          {{ line }}<span v-if="idx !== descriptionLines.length - 1"><br /></span>
        </span>
      </p>
    </div>
    <div class="welcome-image">
      <img src="/img/mas.webp" alt="Profile Picture" class="profile-img" />
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  max-width: 1660px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
}

.welcome-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 200px;
}

.welcome-title {
  font-size: 3rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.intro-quote {
  font-size: 2rem;
  font-style: italic;
  color: var(--color-text-secondary);
  margin: 0 0 0.5rem 0;
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
}

.description {
  font-size: 1.5rem;
  color: var(--color-text);
}

.welcome-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
}

.profile-img {
  width: 100%;
  max-width: 640px;
  max-height: 800px;
  border-radius: 2.5rem;
  box-shadow: 0 4px 24px rgba(66, 153, 225, 0.13);
  object-fit: cover;
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 29%,
    rgb(241, 241, 241) 50%,
    var(--color-background) 100%
  );
}

@media (max-width: 900px) {
  .welcome-section {
    flex-direction: column;
    padding: 2rem 1rem;
    gap: 2rem;
  }
  .welcome-content {
    align-items: center;
    text-align: center;
  }
  .welcome-title {
    font-size: 2rem;
  }
  .intro-quote {
    font-size: 1.1rem;
    padding-left: 0.7rem;
  }
}

@media (max-width: 600px) {
  .welcome-section {
    padding: 1rem 0.5rem;
    border-radius: 1rem;
  }
  .profile-img {
    max-width: 180px;
    max-height: 220px;
    border-radius: 1rem;
  }
  .welcome-title {
    font-size: 1.5rem;
  }
  .intro-quote {
    font-size: 1rem;
  }
}
</style>
