<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'

type Project = ProjectType

const projects = ref<Project[]>(allProjects)
const visibleProjects = ref(projects.value.filter((p) => p.featured))
const grid = ref<HTMLElement | null>(null)
const context = ref({ visible: false, x: 0, y: 0, projectId: null as number | null })
const modal = ref({ visible: false, src: '', title: '' })
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
  if (p && p.github) window.open(p.github, '_blank')
}

function openImageFor(projectId: number | null) {
  const p = projects.value.find((x) => x.id === projectId)
  if (p) {
    modal.value = { visible: true, src: p.img, title: p.title }
  }
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
      <h2>Recent Projects</h2>
      <p class="subtitle">The rest live on the Projects page.</p>
    </div>

    <div class="grid" ref="grid">
      <article v-for="p in visibleProjects" :key="p.id" class="card project-card" :data-id="p.id">
        <div class="media">
          <img :src="p.img" :alt="p.title" />
          <div class="badge">New-ish</div>
        </div>

        <div class="body">
          <h3 class="title">{{ p.title }}</h3>
          <p class="desc">{{ p.description }}</p>

          <div class="tech">
            <span v-for="t in p.tech" :key="t" class="tech-badge">{{ t }}</span>
          </div>

          <div class="actions">
            <a :href="p.link || '#'" class="btn btn-primary">View Project</a>
            <a :href="p.link || '#/projects'" class="btn btn-outline">Details</a>
          </div>
        </div>
      </article>
    </div>

    <div class="more">
      <a href="#/projects" class="btn btn-outline">See all projects</a>
    </div>

    <!-- custom context menu -->
    <div
      v-if="context.visible"
      class="context-menu"
      :style="{ left: context.x + 'px', top: context.y + 'px' }"
    >
      <button class="context-item" @click="openGithubFor(context.projectId)">Open GitHub</button>
      <button class="context-item" @click="openImageFor(context.projectId)">Enlarge Image</button>
    </div>

    <!-- image modal -->
    <div v-if="modal.visible" class="image-modal" @click.self="closeModal">
      <div class="modal-content">
        <img :src="modal.src" :alt="modal.title" />
        <p class="modal-title">{{ modal.title }}</p>
        <button class="btn btn-outline" @click="closeModal">Close</button>
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
  gap: 2rem;
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
}

.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  justify-items: center;
}

.project-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 40%);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  will-change: transform;
  transition: box-shadow 0.25s ease;
}
.project-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.media {
  position: relative;
  height: 160px;
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

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 180px;
}

.title {
  font-size: 1.125rem;
  color: var(--color-text);
}

.desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.3;
}

.tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-badge {
  background: var(--color-background-soft);
  color: var(--color-text);
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid var(--color-border);
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.actions .btn {
  flex: 1;
  justify-content: center;
}

.more {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
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
  text-align: left;
  cursor: pointer;
  border-radius: 0.35rem;
}
.context-item:hover {
  background: var(--color-background-soft);
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
