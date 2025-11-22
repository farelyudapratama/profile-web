<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

const messages = {
  id: {
    title: 'Sedang Dalam Pengembangan',
    subtitle: 'Bagian ini sedang dalam proses pembuatan',
    backToHome: 'Kembali ke Beranda',
    contactMe: 'Hubungi Saya',
  },
  en: {
    title: 'Work in Progress',
    subtitle: 'This section is under development',
    backToHome: 'Back to Home',
    contactMe: 'Contact Me',
  },
}
</script>

<template>
  <main class="wip-container">
    <section class="wip-content">
      <div class="wip-illustration">
        <div class="construction-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25a.75.75 0 0 1 .75-.75ZM11.25 7.5v5.25L8.099 9 11.25 7.5Zm3 0 3.152 1.5-3.152 1.75V7.5Zm-6 5.25 3 1.334v4.916l-3-1.75V12.75Zm9 0-3 1.75v4.916l3-1.75V12.75Zm-7.5 6.25v-5.25h1.5v5.25l-1.5-1.75Zm3 0 1.5 1.75V18.75h-1.5v5.25Zm-6 0v-5.25H9v5.25l1.5-1.75Zm9 0v-5.25h1.5v5.25l-1.5-1.75Z"
            />
          </svg>
        </div>
      </div>

      <div class="wip-text-content">
        <h1 class="heading-2 wip-title">
          {{ messages[languageStore.currentLang].title }}
        </h1>
        <p class="subtitle wip-subtitle">
          {{ messages[languageStore.currentLang].subtitle }}
        </p>
        <div class="wip-actions">
          <router-link :to="{ name: 'home' }" class="btn btn-primary">
            {{ messages[languageStore.currentLang].backToHome }}
          </router-link>
          <router-link :to="{ name: 'contact' }" class="btn btn-outline">
            {{ messages[languageStore.currentLang].contactMe }}
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.wip-container {
  max-width: 1660px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 800px;
  gap: 2rem;
}

.wip-illustration {
  margin-bottom: 1rem;
}

.construction-icon {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-background-soft);
  padding: 1.5rem;
  margin: 0 auto 2rem;
  color: var(--color-primary);
}

.construction-icon svg {
  width: 100%;
  height: 100%;
}

.wip-title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.wip-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.wip-description {
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
}

.wip-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .wip-container {
    padding: 2rem 1rem;
  }

  .wip-title {
    font-size: 2rem;
  }

  .wip-subtitle {
    font-size: 1.2rem;
  }

  .wip-description {
    font-size: 1rem;
  }

  .wip-actions {
    flex-direction: column;
    align-items: center;
  }

  .wip-actions .btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>
