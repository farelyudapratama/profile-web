<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import gsap from 'gsap'
import { MoveRight } from 'lucide-vue-next'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'
import ProjectCard from '@/components/ProjectCard.vue'
import ContextMenu from '@/components/ContextMenu.vue'

type Project = ProjectType

const projects = ref<Project[]>(allProjects)
const visibleProjects = ref(projects.value.filter((p) => p.featured))
const grid = ref<HTMLElement | null>(null)
const contextMenuState = ref({
  visible: false,
  x: 0,
  y: 0,
  projectId: null as number | null,
})
const modal = ref({ visible: false, src: '', title: '' })
const listeners: Array<() => void> = []

const lang = useLanguageStore()
const t = (key: string) => {
  const strings: Record<string, Record<string, string>> = {
    recent: { en: 'Recent Projects', id: 'Proyek Terbaru' },
    subtitle: { en: 'The rest live on the Projects page.', id: 'Sisanya ada di halaman Projects.' },
    seeAll: { en: 'See all projects', id: 'Lihat semua proyek' },
    liveDemo: { en: 'Live Demo', id: 'Live Demo' },
    github: { en: 'GitHub', id: 'GitHub' },
    details: { en: 'Details', id: 'Detail' },
    close: { en: 'Close', id: 'Tutup' },
    openGithub: { en: 'Open GitHub', id: 'Buka GitHub' },
    openLiveDemo: { en: 'Open Live Demo', id: 'Buka Demo' },
    enlargeImage: { en: 'Enlarge Image', id: 'Perbesar Gambar' },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}

const selectedProject = computed(() => {
  const id = contextMenuState.value.projectId
  if (id == null) return null
  return projects.value.find((p) => p.id === id) ?? null
})

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
      showContextMenu(idAttr ? Number(idAttr) : null, ev.clientX, ev.clientY)
    }

    card.addEventListener('contextmenu', onContext)
    listeners.push(() => card.removeEventListener('contextmenu', onContext))
  })

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      contextMenuState.value.visible = false
      modal.value.visible = false
    }
  }
  document.addEventListener('keydown', onKey)
  listeners.push(() => document.removeEventListener('keydown', onKey))
})

onBeforeUnmount(() => {
  listeners.forEach((fn) => fn())
})

function openGithubFor(projectId: number | null) {
  const p = projects.value.find((x) => x.id === projectId)
  if (p && p.github) {
    window.open(p.github, '_blank')
  }
  closeContextMenu()
}

function openImageFor(projectId: number | null) {
  const p = projects.value.find((x) => x.id === projectId)
  if (p) {
    modal.value = { visible: true, src: p.img, title: p.title[lang.currentLang] }
  }
  closeContextMenu()
}

function openLiveDemoFor(projectId: number | null) {
  const p = projects.value.find((x) => x.id === projectId)
  if (p && p.demo) {
    window.open(p.demo, '_blank')
  }
  closeContextMenu()
}

function closeModal() {
  modal.value.visible = false
}

function closeContextMenu() {
  contextMenuState.value.visible = false
}

async function showContextMenu(projectId: number | null, x: number, y: number) {
  contextMenuState.value = { visible: true, x, y, projectId }
  await nextTick()
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
</script>

<template>
  <section class="home-content">
    <div class="header">
      <h2 class="heading-2">{{ t('recent') }}</h2>
      <p class="subtitle">{{ t('subtitle') }}</p>
    </div>

    <div class="grid" ref="grid">
      <ProjectCard
        v-for="p in visibleProjects"
        :key="p.id"
        :project="p"
        :data-id="p.id"
        @contextmenu="(event: MouseEvent) => {
          event.preventDefault();
          const { clientX: x, clientY: y } = event;
          showContextMenu(p.id, x, y);
        }"
      />
    </div>

    <div class="more">
      <a href="#/projects" class="btn btn-primary"
        >{{ t('seeAll') }} <MoveRight class="arrow-right"
      /></a>
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
