<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

const messages = {
  id: {
    welcome: 'Selamat Datang!',
    intro: '"Satu baris kode untuk mengontrol semuanya… atau setidaknya bikin crash semuanya."',
    description:
      'Saya seorang Software Engineer yang bersemangat dalam menciptakan solusi teknologi yang inovatif.',
    explore: 'Jelajahi lebih lanjut untuk mengetahui tentang proyek dan pengalaman saya.',
  },
  en: {
    welcome: 'Welcome!',
    intro: '"One line of code to rule them all… or at least crash them all."',
    description:
      'I am a Software Engineer passionate about creating innovative technology solutions.',
    explore: 'Explore further to learn about my projects and experiences.',
  },
}
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
        {{ messages[languageStore.currentLang].description }}
      </p>
      <p class="explore">
        {{ messages[languageStore.currentLang].explore }}
      </p>
    </div>
    <div class="welcome-image">
      <img src="/img/mas.webp" alt="Profile Picture" class="profile-img" />
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  max-width: 900px;
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
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.intro-quote {
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-text-secondary);
  margin: 0 0 0.5rem 0;
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
}

.description {
  font-size: 1.1rem;
  color: var(--color-text);
}

.explore {
  font-size: 1.05rem;
  color: var(--color-accent-bluec);
  font-weight: 500;
  margin-top: 0.5rem;
}

.welcome-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 100%;
  max-width: 320px;
  max-height: 400px;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(66, 153, 225, 0.13);
  object-fit: cover;
  background: #fff;
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
