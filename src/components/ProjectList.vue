<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Project as ProjectType } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'

const props = defineProps({
  projects: {
    type: Array as () => ProjectType[],
    default: () => [],
  },
  enableFilters: {
    type: Boolean,
    default: true,
  },
})

const searchQuery = ref('')
const selectedTag = ref('')

const tags = computed(() => {
  const allTags = props.projects.flatMap((p) => p.tech)
  return Array.from(new Set(allTags))
})

const filtered = computed(() => {
  return props.projects.filter((project) => {
    const matchesSearch =
      project.title.en.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.en.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesTag = selectedTag.value ? project.tech.includes(selectedTag.value) : true

    return matchesSearch && matchesTag
  })
})
</script>

<template>
  <div class="project-list">
    <div v-if="enableFilters" class="filters">
      <input v-model="searchQuery" class="input search" :placeholder="'Search projects...'" />
      <select v-model="selectedTag" class="input select">
        <option value="">All Tags</option>
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <div class="grid">
      <ProjectCard v-for="p in filtered" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<style scoped>
.project-list {
  width: 100%;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 1rem;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
