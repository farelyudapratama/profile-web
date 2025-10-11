<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

type Project = ProjectType

const projects = ref<Project[]>(allProjects)
const searchQuery = ref('')
const selectedTag = ref('')

const tags = computed(() => {
  const allTags = projects.value.flatMap((project) => project.tech)
  return Array.from(new Set(allTags))
})

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    const matchesSearch =
      project.title.en.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.en.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesTag = selectedTag.value ? project.tech.includes(selectedTag.value) : true

    return matchesSearch && matchesTag
  })
})

const lang = useLanguageStore()
const t = (key: string) => {
  const strings: Record<string, Record<string, string>> = {
    searchPlaceholder: { en: 'Search projects...', id: 'Cari proyek...' },
    filterByTag: { en: 'Filter by tag', id: 'Filter berdasarkan tag' },
    allTags: { en: 'All Tags', id: 'Semua Tag' },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}
</script>

<template>
  <div class="projects">
    <div class="header">
      <h2>My Projects</h2>
      <pre>
Ini beberapa proyek yang pernah aku buat.
Ada yang beneran kelar, ada yang stuck di episode 'coming soon' selamanya
Doain aja kedepannya lebih banyak yang sukses daripada yang ngendok ae di folder 'nanti dilanjut'.</pre
      >
    </div>

    <div class="filters">
      <input
        v-model="searchQuery"
        :placeholder="t('searchPlaceholder')"
        class="input search"
        type="text"
      />

      <select v-model="selectedTag" class="input select">
        <option value="">{{ t('allTags') }}</option>
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <div class="grid">
      <article
        v-for="project in filteredProjects"
        :key="project.id"
        class="card project-card"
        :data-id="project.id"
      >
        <div class="media">
          <img :src="project.img" :alt="project.title[lang.currentLang]" />
        </div>

        <div class="body">
          <h3 class="title">{{ project.title[lang.currentLang] }}</h3>
          <p class="desc">{{ project.description[lang.currentLang] }}</p>

          <div class="tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-badge">{{ tech }}</span>
          </div>

          <div class="actions">
            <a
              v-if="project.demo"
              :href="project.demo"
              class="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Live Demo
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              class="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </div>
        </div>
      </article>
    </div>
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

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  justify-items: center;
  align-items: stretch;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
