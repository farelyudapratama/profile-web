<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import gsap from 'gsap'
import { MoveRight } from 'lucide-vue-next'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

type Project = ProjectType

const projects = ref<Project[]>(allProjects)
const visibleProjects = ref(projects.value.filter((p) => p.featured))
const grid = ref<HTMLElement | null>(null)
const context = ref({ visible: false, x: 0, y: 0, projectId: null as number | null })
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
  const id = context.value.projectId
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

  const onDocClick = () => (context.value.visible = false)
  document.addEventListener('click', onDocClick)
  listeners.push(() => document.removeEventListener('click', onDocClick))

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      context.value.visible = false
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
  context.value.visible = false
}

function openImageFor(projectId: number | null) {
  const p = projects.value.find((x) => x.id === projectId)
  if (p) {
    modal.value = { visible: true, src: p.img, title: p.title[lang.currentLang] }
  }
  context.value.visible = false
}

function openLiveDemoFor(projectId: number | null) {
  const p = projects.value.find((x) => x.id === projectId)
  if (p && p.demo) {
    window.open(p.demo, '_blank')
  }
  context.value.visible = false
}

function isDemo(demo?: string) {
  if (!demo) return false
  return /^https?:\/\//.test(demo) || demo.startsWith('/')
}

function closeModal() {
  modal.value.visible = false
}

async function showContextMenu(projectId: number | null, x: number, y: number) {
  context.value = { visible: true, x, y, projectId }
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

  context.value.x = nx
  context.value.y = ny
}
</script>

<template>
  <section class="home-content">
    <div class="header">
      <h2>{{ t('recent') }}</h2>
      <p class="subtitle">{{ t('subtitle') }}</p>
    </div>

    <div class="grid" ref="grid">
      <article v-for="p in visibleProjects" :key="p.id" class="card project-card" :data-id="p.id">
        <div class="media">
          <img :src="p.img" :alt="p.title[lang.currentLang]" />
        </div>

        <div class="body">
          <h3 class="title">{{ p.title[lang.currentLang] }}</h3>
          <p class="desc">{{ p.description[lang.currentLang] }}</p>

          <div class="tech">
            <span v-for="t in p.tech" :key="t" class="tech-badge">{{ t }}</span>
          </div>

          <div class="actions">
            <template v-if="isDemo(p.demo)">
              <a :href="p.demo" class="btn btn-primary" target="_blank" rel="noopener">{{
                t('liveDemo')
              }}</a>
            </template>
            <template v-else-if="p.github">
              <a :href="p.github" class="btn btn-primary" target="_blank" rel="noopener">{{
                t('github')
              }}</a>
            </template>

            <a :href="`/projects/${p.id}`" class="btn btn-primary">{{ t('details') }}</a>
          </div>
        </div>
      </article>
    </div>

    <div class="more">
      <a href="#/projects" class="btn btn-primary"
        >{{ t('seeAll') }} <MoveRight class="arrow-right"
      /></a>
    </div>

    <!-- custom context menu -->
    <div
      v-if="context.visible"
      class="context-menu"
      :style="{ left: context.x + 'px', top: context.y + 'px' }"
    >
      <button
        class="context-item"
        :class="{ disabled: !selectedProject || !selectedProject.github }"
        :aria-disabled="!selectedProject || !selectedProject.github"
        @click="selectedProject && selectedProject.github ? openGithubFor(context.projectId) : null"
      >
        {{ t('openGithub') }}
      </button>

      <button
        class="context-item"
        :class="{ disabled: !selectedProject || !selectedProject.demo }"
        :aria-disabled="!selectedProject || !selectedProject.demo"
        @click="selectedProject && selectedProject.demo ? openLiveDemoFor(context.projectId) : null"
      >
        {{ t('openLiveDemo') }}
      </button>

      <button class="context-item" @click="openImageFor(context.projectId)">
        {{ t('enlargeImage') }}
      </button>
    </div>

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
  max-width: 1660px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 2rem;
  text-align: center;
}

.home-content h2 {
  font-size: 4.5rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--color-text);
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

.media {
  position: relative;
  height: 160px;
  min-height: 160px;
  background: var(--color-background-mute);
  display: flex;
  align-items: center;
  justify-content: center;
}
.media img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: saturate(1.05) contrast(1.02);
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
  margin-top: auto;
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

/* context menu */
.context-menu {
  position: fixed;
  z-index: 60;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  padding: 0.35rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.context-item {
  background: transparent;
  border: none;
  padding: 0.45rem 0.75rem;
  color: var(--color-text);
  font-size: 1.3rem;
  text-align: left;
  cursor: pointer;
  border-radius: 0.35rem;
}
.context-item:hover {
  background: var(--color-background-soft);
}

.context-item.disabled {
  opacity: 0.45;
  pointer-events: none;
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
