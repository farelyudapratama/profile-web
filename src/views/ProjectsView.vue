<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue'
import { useLanguageStore } from '@/stores/language'

const lang = useLanguageStore()
const t = (key: string) => {
  const strings: Record<string, Record<string, string>> = {
    title: { en: 'My Projects', id: 'Proyek Saya' },
    subtitle: {
      en: 'These are some projects I have made.\nSome are actually finished, some are stuck in the "coming soon" episode forever.\nJust hope that in the future there will be more success than those stuck in the "continue later" folder.',
      id: 'Ini beberapa proyek yang pernah aku buat.\nAda yang beneran kelar, ada yang stuck di episode "coming soon" selamanya.\nDoain aja kedepannya lebih banyak yang sukses daripada yang ngendok ae di folder "nanti dilanjut".',
    },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}
</script>

<template>
  <div class="projects">
    <div class="header">
      <h2 class="heading-2">{{ t('title') }}</h2>
      <div class="subtitle">{{ t('subtitle') }}</div>
    </div>

    <ProjectList project-type="all" :show-filters="true" />
  </div>
</template>

<style scoped>
.projects {
  max-width: 1640px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

/* responsive */
@media (max-width: 640px) {
  .header h2 {
    font-size: 2rem;
  }
}
</style>
