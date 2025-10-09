<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { projects } from '@/data/projects'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const project = projects.find((p) => p.id === id)

if (!project) {
  // if project not found, navigate back to projects list
  router.replace({ name: 'projects' })
}
</script>

<template>
  <section class="project-detail" v-if="project">
    <h1>{{ project.title }}</h1>
    <div class="media">
      <img :src="project.img" :alt="project.title.en" />
    </div>
    <p>{{ project.description }}</p>
    <div class="tech">
      <span v-for="t in project.tech" :key="t" class="tech-badge">{{ t }}</span>
    </div>
    <div class="links">
      <a v-if="project.github" :href="project.github" target="_blank" rel="noopener"
        >View on GitHub</a
      >
      <a v-if="project.link" :href="project.link" target="_blank" rel="noopener">Open Demo</a>
    </div>
  </section>
</template>

<style scoped>
.project-detail {
  max-width: 900px;
  margin: 3rem auto;
  padding: 1rem;
}
.project-detail .media {
  margin: 1rem 0;
}
.project-detail img {
  max-width: 100%;
  height: auto;
}
.tech-badge {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: var(--color-background-soft);
}
.links a {
  margin-right: 1rem;
}
</style>
