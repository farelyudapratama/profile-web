<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import ProjectCard from '@/components/ProjectCard.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import ImageModal from '@/components/ImageModal.vue'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'
import { useProjectContextMenu } from '@/composables/useProjectContextMenu'

type Project = ProjectType

interface Props {
  projectType?: 'all' | 'featured'
  showFilters?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  projectType: 'all',
  showFilters: true,
})

const projects = ref<Project[]>(allProjects)
const searchQuery = ref('')
const selectedTag = ref('')
const grid = ref<HTMLElement | null>(null)

// Handle context menu "enlarge image" action
function handleEnlargeImage(projectId: number | null) {
  if (projectId) {
    const imageData = openImageFor(projectId)
    if (imageData) {
      imageModalImages.value = imageData.images
      imageModalTitle.value = imageData.title
      imageModalCurrentIndex.value = 0 // Mulai dari gambar pertama
      imageModalVisible.value = true
    }
  }
}

// Dapatkan semua nilai composable - atur callback untuk aksi perbesar gambar
const { contextMenuState, contextMenuItems, showContextMenu, closeContextMenu, openImageFor } =
  useProjectContextMenu({ onEnlargeImage: handleEnlargeImage })

const imageModalVisible = ref(false)
const imageModalImages = ref<string[]>([])
const imageModalCurrentIndex = ref(0)
const imageModalTitle = ref('')

function openImageModal(imageSrc: string, projectId: number) {
  const project = projects.value.find((p) => p.id === projectId)
  if (!project) return

  // Bikin array semua gambar
  const images = project.images || []
  if (project.architectureImage) {
    imageModalImages.value = [...images, project.architectureImage]
  } else {
    imageModalImages.value = images
  }

  // Cari index gambar yang diklik
  imageModalCurrentIndex.value = imageModalImages.value.indexOf(imageSrc)
  imageModalTitle.value = project.title[useLanguageStore().currentLang] || project.title.en

  imageModalVisible.value = true
}

function closeImageModal() {
  imageModalVisible.value = false
}

function updateImageIndex(index: number) {
  imageModalCurrentIndex.value = index
}

type FilteredProjects = ProjectType[]
const filteredProjects = computed<FilteredProjects>(() => {
  const baseProjects =
    props.projectType === 'featured'
      ? projects.value.filter((project) => project.featured)
      : projects.value

  return baseProjects.filter((project) => {
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
    openGithub: { en: 'Open GitHub', id: 'Buka GitHub' },
    openLiveDemo: { en: 'Open Live Demo', id: 'Buka Demo' },
    enlargeImage: { en: 'Enlarge Image', id: 'Perbesar Gambar' },
    close: { en: 'Close', id: 'Tutup' },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}

const tags = computed(() => {
  const allTags = filteredProjects.value.flatMap((project) => project.tech)
  return Array.from(new Set(allTags))
})

const listeners: Array<() => void> = []

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
        closeContextMenu()
      }
      e.preventDefault()
    }
  }
  document.addEventListener('contextmenu', preventRightClick)
  listeners.push(() => document.removeEventListener('contextmenu', preventRightClick))

  const onDocClick = () => closeContextMenu()
  document.addEventListener('click', onDocClick)
  listeners.push(() => document.removeEventListener('click', onDocClick))

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeContextMenu()
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
  <div class="project-list">
    <div v-if="showFilters" class="filters">
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
        @open-image="openImageModal"
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

    <!-- Reusable image modal -->
    <ImageModal
      :visible="imageModalVisible"
      :images="imageModalImages"
      :current-index="imageModalCurrentIndex"
      :title="imageModalTitle"
      @close="closeImageModal"
      @update:current-index="updateImageIndex"
    />
  </div>
</template>

<style scoped>
.project-list {
  width: 100%;
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

.project-list .project-card {
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
.project-list .project-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.project-list .body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 180px;
  flex: 1 1 auto;
}

.project-list .title {
  font-size: 1.75rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--color-text);
}

.project-list .desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
}

.project-list .tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  min-height: 2.2rem;
  margin-top: auto;
}

.project-list .tech-badge {
  color: var(--color-text);
  border-radius: 0%;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
}

.project-list .actions {
  display: flex;
  gap: 0.5rem;
}

.project-list .actions .btn {
  font-weight: 600;
  flex: 1;
  border-radius: 0%;
  justify-content: center;
}

/* responsive */
@media (max-width: 640px) {
  .project-list .media {
    height: 140px;
  }
}

@media (max-width: 900px) {
  .project-list .grid {
    grid-template-columns: 1fr;
  }
}
</style>
