<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next'
import { useLanguageStore } from '@/stores/language'
import ProjectList from '@/components/ProjectList.vue'
import TechStack from '@/components/TechStack.vue'

const lang = useLanguageStore()
const t = (key: string) => {
  const strings: Record<string, Record<string, string>> = {
    recent: { en: 'Recent Projects', id: 'Proyek Terbaru' },
    subtitle: { en: 'The rest live on the Projects page.', id: 'Sisanya ada di halaman Projects.' },
    seeAll: { en: 'See all projects', id: 'Lihat semua proyek' },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}
</script>

<template>
  <section class="home-content">
    <div class="header">
      <h2 class="heading-2">{{ t('recent') }}</h2>
      <p class="subtitle">{{ t('subtitle') }}</p>
    </div>

    <!-- Tech Stack Section -->
    <TechStack />

    <ProjectList project-type="featured" :show-filters="false" />

    <div class="more">
      <a href="#/projects" class="btn btn-primary"
        >{{ t('seeAll') }} <MoveRight class="arrow-right"
      /></a>
    </div>
  </section>
</template>

<style scoped>
.home-content {
  max-width: 1640px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.home-content p {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.more .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  font-weight: 700;
  border-radius: 0%;
  border: 1px solid var(--color-border);
}

.arrow-right {
  transition: transform 0.3s ease-out;
}

.btn-primary:hover .arrow-right {
  transform: rotate(-45deg);
}

/* responsive */
@media (max-width: 640px) {
  .header h2 {
    font-size: 2rem;
  }
}
</style>
