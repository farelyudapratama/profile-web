<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

type Project = ProjectType

const projects = ref<Project[]>(allProjects)
const searchQuery = ref('')
const selectedTag = ref('')

const contextMenuState = ref({
  visible: false,
  x: 0,
  y: 0,
  projectId: null as number | null,
})

const listeners: Array<() => void> = []

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

const selectedProject = computed(() => {
  const id = contextMenuState.value.projectId
  if (id == null) return null
  return projects.value.find((p) => p.id === id) ?? null
})

const showContextMenu = async (projectId: number, event: MouseEvent) => {
  event.preventDefault()
  const { clientX: x, clientY: y } = event
  contextMenuState.value = { visible: true, x, y, projectId }

  await nextTick()
  const menu = document.querySelector<HTMLElement>('.reusable-context-menu')
  if (!menu) return
  const preventRightClick = (e: MouseEvent) => {
    if (contextMenuState.value.visible) {
      const menu = document.querySelector<HTMLElement>('.context-menu')
      if (menu && !menu.contains(e.target as Node)) {
        return
      }
      e.preventDefault()
    }
  }
  document.addEventListener('contextmenu', preventRightClick)
  listeners.push(() => document.removeEventListener('contextmenu', preventRightClick))
  const rect = menu.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  let adjustedX = x
  let adjustedY = y

  if (x + rect.width > vw) adjustedX = Math.max(8, x - rect.width)
  if (y + rect.height > vh) adjustedY = Math.max(8, vh - rect.height - 8)

  contextMenuState.value.x = adjustedX
  contextMenuState.value.y = adjustedY
}

const closeContextMenu = () => {
  contextMenuState.value.visible = false
}

const contextMenuItems = computed(() => {
  const project = selectedProject.value
  if (!project) return []

  const items = [
    {
      label: t('openGithub'),
      action: () => openGithubFor(project.id),
      disabled: !project.github,
    },
    {
      label: t('openLiveDemo'),
      action: () => openLiveDemoFor(project.id),
      disabled: !project.demo,
    },
    { separator: true, label: '' },
    {
      label: t('enlargeImage'),
      action: () => openImageFor(project.id),
    },
  ]

  return items
})

const openGithubFor = (projectId: number | null) => {
  const p = projects.value.find((x) => x.id === projectId)
  if (p && p.github) {
    window.open(p.github, '_blank')
  }
  closeContextMenu()
}

const openLiveDemoFor = (projectId: number | null) => {
  const p = projects.value.find((x) => x.id === projectId)
  if (p && p.demo) {
    window.open(p.demo, '_blank')
  }
  closeContextMenu()
}

const openImageFor = (projectId: number | null) => {
  const p = projects.value.find((x) => x.id === projectId)
  if (p) {
    console.log('Membuka gambar untuk:', p.img, p.title[useLanguageStore().currentLang])
  }
  closeContextMenu()
}

const lang = useLanguageStore()
const t = (key: string) => {
  const strings: Record<string, Record<string, string>> = {
    searchPlaceholder: { en: 'Search projects...', id: 'Cari proyek...' },
    filterByTag: { en: 'Filter by tag', id: 'Filter berdasarkan tag' },
    allTags: { en: 'All Tags', id: 'Semua Tag' },
    openGithub: { en: 'Open GitHub', id: 'Buka GitHub' },
    openLiveDemo: { en: 'Open Live Demo', id: 'Buka Demo' },
    enlargeImage: { en: 'Enlarge Image', id: 'Perbesar Gambar' },
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
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        @contextmenu="(event: MouseEvent) => showContextMenu(project.id, event)"
        class="project-card-wrapper"
      />
    </div>

    <ContextMenu
      :visible="contextMenuState.visible"
      :x="contextMenuState.x"
      :y="contextMenuState.y"
      :items="contextMenuItems"
      @close="closeContextMenu"
    />
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
  gap: 1rem;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
