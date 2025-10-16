<script setup lang="ts">
// no runtime imports needed here
import type { Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

defineProps({
  project: {
    type: Object as () => ProjectType,
    required: true,
  },
})

const lang = useLanguageStore()

const isDemo = (demo?: string) => {
  if (!demo) return false
  return /^https?:\/\//.test(demo) || demo.startsWith('/')
}
</script>

<template>
  <article class="card project-card" :data-id="project.id">
    <div class="media">
      <img :src="project.img" :alt="project.title[lang.currentLang]" />
    </div>

    <div class="body">
      <h3 class="title">{{ project.title[lang.currentLang] }}</h3>
      <p class="desc">{{ project.description[lang.currentLang] }}</p>

      <div class="tech">
        <span v-for="t in project.tech" :key="t" class="tech-badge">{{ t }}</span>
      </div>

      <div class="actions">
        <template v-if="isDemo(project.demo)">
          <a :href="project.demo" class="btn btn-primary" target="_blank" rel="noopener"
            >Live Demo</a
          >
        </template>
        <template v-else-if="project.github">
          <a :href="project.github" class="btn btn-primary" target="_blank" rel="noopener"
            >GitHub</a
          >
        </template>

        <a :href="`/projects/${project.id}`" class="btn btn-primary">Details</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* keep styles consistent with HomeContent's project-card */
.project-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 40%);
  border: 1px solid var(--color-border);
  border-radius: 0%;
  overflow: hidden;
  will-change: transform;
  transition: box-shadow 0.25s ease;
  min-width: 100%;
  min-height: 420px;
  height: 100%;
}
.project-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 180px;
  flex: 1 1 auto;
}

.title {
  font-size: 1.75rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--color-text);
}

.desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
}

.tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  min-height: 2.2rem;
  margin-top: auto;
}

.tech-badge {
  color: var(--color-text);
  border-radius: 0%;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions .btn {
  font-weight: 600;
  flex: 1;
  border-radius: 0%;
  justify-content: center;
}

@media (max-width: 640px) {
  .media {
    height: 140px;
  }
}
</style>
