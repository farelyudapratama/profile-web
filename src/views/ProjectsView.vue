<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ProjectCard from '@/components/ProjectCard.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

type Project = ProjectType

const projects = ref<Project[]>(allProjects)
const searchQuery = ref('')
const selectedTag = ref('')
const grid = ref<HTMLElement | null>(null)

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

async function showContextMenu(projectId: number | null, x: number, y: number) {
  contextMenuState.value = { visible: true, x, y, projectId }
  await nextTick()
  const menu = document.querySelector<HTMLElement>('.context-menu')
  if (!menu) return
  const rect = menu.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  let nx = x
  let ny = y

  if (x + rect.width > vw) nx = Math.max(8, x - rect.width)
  if (y + rect.height > vh) ny = Math.max(8, vh - rect.height - 8)

  contextMenuState.value.x = nx
  contextMenuState.value.y = ny
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

const modal = ref({ visible: false, src: '', title: '' })

const openImageFor = (projectId: number | null) => {
  const p = projects.value.find((x) => x.id === projectId)
  if (p) {
    modal.value = {
      visible: true,
      src: p.images[0],
      title: p.title[useLanguageStore().currentLang],
    }
  }
  closeContextMenu()
}

function closeModal() {
  modal.value.visible = false
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
    close: { en: 'Close', id: 'Tutup' },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}

onMounted(async () => {
  await nextTick()
  if (!grid.value) return

  const cards = Array.from(grid.value.querySelectorAll<HTMLElement>('.project-card'))

  cards.forEach((card) => {
    const media = card.querySelector<HTMLElement>('.media')
    if (!media) return

    const onMove = (e: PointerEvent) => {
      const rect = media.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height

      gsap.to(media, { x: dx * 100, y: dy * 8, rotate: dx * 3, duration: 0.22, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(media, { x: 0, y: 0, rotate: 0, duration: 0.28, ease: 'power2.out' })
    }

    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)

    listeners.push(() => card.removeEventListener('pointermove', onMove))
    listeners.push(() => card.removeEventListener('pointerleave', onLeave))

    const onContext = (ev: MouseEvent) => {
      ev.preventDefault()
      const cardEl = card as HTMLElement
      const idAttr = cardEl.getAttribute('data-id')
      const { clientX: x, clientY: y } = ev
      showContextMenu(idAttr ? Number(idAttr) : null, x, y)
    }

    card.addEventListener('contextmenu', onContext)
    listeners.push(() => card.removeEventListener('contextmenu', onContext))
  })

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

  const onDocClick = () => (contextMenuState.value.visible = false)
  document.addEventListener('click', onDocClick)
  listeners.push(() => document.removeEventListener('click', onDocClick))

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      contextMenuState.value.visible = false
    }
  }
  document.addEventListener('keydown', onKey)
  listeners.push(() => document.removeEventListener('keydown', onKey))
})

onBeforeUnmount(() => {
  listeners.forEach((fn) => fn())
})
</script>

<template>
  <div class="projects">
    <div class="header">
      <h2 class="heading-2">My Projects</h2>
      <pre class="subtitle">
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

    <div class="grid" ref="grid">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        :data-id="project.id"
        class="project-card"
        @contextmenu="
          (event: MouseEvent) => {
            event.preventDefault()
            const { clientX: x, clientY: y } = event
            showContextMenu(project.id, x, y)
          }
        "
      />
    </div>

    <ContextMenu
      :visible="contextMenuState.visible"
      :x="contextMenuState.x"
      :y="contextMenuState.y"
      :items="contextMenuItems"
      @close="closeContextMenu"
    />

    <!-- image modal -->
    <div v-if="modal.visible" class="image-modal" @click.self="closeModal">
      <div class="modal-content">
        <img :src="modal.src" :alt="modal.title" />
        <p class="modal-title">{{ modal.title }}</p>
        <button class="btn btn-outline" @click="closeModal">{{ t('close') }}</button>
      </div>
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

/* image modal overlay */
.image-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  background: rgba(6, 6, 10, 0.45);
}
.modal-content {
  max-width: 92vw;
  max-height: 86vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}
.modal-content img {
  max-width: 88vw;
  max-height: 72vh;
  object-fit: contain;
}
.modal-title {
  color: var(--color-text);
  font-weight: 600;
}

/* responsive */
@media (max-width: 640px) {
  .media {
    height: 140px;
  }
  .header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
