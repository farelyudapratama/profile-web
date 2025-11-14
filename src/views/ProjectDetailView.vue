<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ExternalLink, Github } from 'lucide-vue-next'
import ImageModal from '@/components/ImageModal.vue'
import { projects } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()
const lang = useLanguageStore()

const id = Number(route.params.id)
const project = projects.find((p) => p.id === id)

const imageModalVisible = ref(false)
const imageModalCurrentIndex = ref(0)
const activeTab = ref<'info' | 'gallery'>('info')
const galleryContainerRef = ref<HTMLDivElement | null>(null)
const scrollContainerRef = ref<HTMLDivElement | null>(null)
const timeline = ref<gsap.core.Timeline | null>(null)
const timeScaleTween = ref<gsap.core.Tween | null>(null)
const isPaused = ref(false)
const pauseTimeout = ref<number | null>(null)
const isLargeScreen = ref(window.innerWidth > 1024)
const allImages = computed(() => {
  const images = project?.images || []
  if (project?.architectureImage) {
    return [...images, project.architectureImage]
  }
  return images
})

const currentLang = computed(() => lang.currentLang || 'id')

const isDetailedProject = computed(() => {
  if (!project) return false
  return !!(
    project.longDescription ||
    project.features ||
    project.challenges ||
    project.architectureImage
  )
})

const setupInfiniteVerticalScroll = () => {
  if (!galleryContainerRef.value || !project || !isLargeScreen.value) return

  gsap.set(galleryContainerRef.value, {
    yPercent: 0,
  })

  if (timeline.value) {
    timeline.value.kill()
  }

  const speed = project.images.length * 15

  timeline.value = gsap
    .timeline({ defaults: { ease: 'power1.inOut', repeat: -1 } })
    .to(galleryContainerRef.value, {
      yPercent: -50,
      duration: speed,
      ease: 'none',
    })
    .set(galleryContainerRef.value, { yPercent: 0 })
}

const pauseScroll = () => {
  if (!timeline.value || !isLargeScreen.value) return
  isPaused.value = true
  if (timeScaleTween.value) timeScaleTween.value.kill()
  timeScaleTween.value = gsap.to(timeline.value, {
    timeScale: 0,
    duration: 0.4,
  })
}

const resumeScroll = () => {
  if (!timeline.value || !isLargeScreen.value) return
  if (pauseTimeout.value) {
    clearTimeout(pauseTimeout.value)
  }
  pauseTimeout.value = window.setTimeout(() => {
    isPaused.value = false
    if (timeScaleTween.value) timeScaleTween.value.kill()
    timeScaleTween.value = gsap.to(timeline.value, {
      timeScale: 1,
      duration: 0.2,
    })
  }, 500)
}

const handleResize = () => {
  const wasLargeScreen = isLargeScreen.value
  isLargeScreen.value = window.innerWidth > 1024

  if (wasLargeScreen !== isLargeScreen.value) {
    if (timeline.value) {
      timeline.value.kill()
      timeline.value = null
    }
    if (isLargeScreen.value) {
      setTimeout(() => {
        setupInfiniteVerticalScroll()
      }, 100)
    }
  }
}

function openFullscreen(imageSrc: string) {
  imageModalCurrentIndex.value = allImages.value.indexOf(imageSrc)
  imageModalVisible.value = true
}

function closeImageModal() {
  imageModalVisible.value = false
}

function updateImageIndex(index: number) {
  imageModalCurrentIndex.value = index
}

onMounted(() => {
  if (project && isDetailedProject.value) {
    setTimeout(() => {
      setupInfiniteVerticalScroll()
    }, 100)
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (timeline.value) timeline.value.kill()
  if (timeScaleTween.value) timeScaleTween.value.kill()
  if (pauseTimeout.value) clearTimeout(pauseTimeout.value)
  window.removeEventListener('resize', handleResize)
})

if (!project) {
  router.replace({ name: 'not-found' })
} else if (!(project.longDescription || project.features || project.challenges || project.architectureImage)) {
  router.replace({ name: 'not-found' })
}

const labels = {
  overview: { en: 'Overview', id: 'Gambaran Umum' },
  features: { en: 'Key Features', id: 'Fitur Utama' },
  architecture: { en: 'Architecture', id: 'Arsitektur' },
  techStack: { en: 'Tech Stack', id: 'Tech Stack' },
  challenges: { en: 'Challenges & Solutions', id: 'Tantangan & Solusi' },
  links: { en: 'Links', id: 'Tautan' },
  viewDemo: { en: 'View Live Demo', id: 'Lihat Demo' },
  viewGithub: { en: 'View on GitHub', id: 'Lihat di GitHub' },
  screenshots: { en: 'Screenshots', id: 'Tangkapan Layar' },
  infoTab: { en: 'Info', id: 'Info' },
  galleryTab: { en: 'Gallery', id: 'Galeri' },
}
</script>

<template>
  <section class="project-detail" v-if="project">
    <template v-if="isDetailedProject">
      <div class="mobile-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'info' }"
          @click="activeTab = 'info'"
        >
          {{ labels.infoTab[currentLang] }}
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'gallery' }"
          @click="activeTab = 'gallery'"
        >
          {{ labels.galleryTab[currentLang] }}
        </button>
      </div>

      <div class="detail-container">
        <div class="info-section" :class="{ hidden: activeTab === 'gallery' }">
          <div class="project-title">
            <h2>{{ project.title[currentLang] }}</h2>
          </div>

          <section class="info-block">
            <p class="description">
              {{ project.longDescription?.[currentLang] || project.description[currentLang] }}
            </p>
          </section>

          <section class="info-block" v-if="project.features">
            <ul class="features-list">
              <li v-for="(feature, idx) in project.features[currentLang]" :key="idx">
                {{ feature }}
              </li>
            </ul>
          </section>

          <section class="info-block" v-if="project.architectureImage">
            <div class="architecture-img">
              <img
                :src="project.architectureImage"
                :alt="`${project.title[currentLang]} architecture`"
                @click="openFullscreen(project.architectureImage!)"
              />
            </div>
          </section>

          <section class="info-block">
            <div class="tech-list">
              <span v-for="tech in project.tech" :key="tech" class="tech-badge">{{ tech }}</span>
            </div>
          </section>

          <section class="info-block links-section">
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              <ExternalLink :size="18" />
              <span>{{ labels.viewDemo[currentLang] }}</span>
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline"
            >
              <Github :size="18" />
              <span>{{ labels.viewGithub[currentLang] }}</span>
            </a>
          </section>
        </div>

        <div class="gallery-section" :class="{ hidden: activeTab === 'info' }">
          <h3 class="gallery-title">{{ labels.screenshots[currentLang] }}</h3>

          <div class="vertical-carousel-wrapper">
            <div
              ref="scrollContainerRef"
              class="vertical-carousel-container"
              @mouseenter="pauseScroll"
              @mouseleave="resumeScroll"
            >
              <div ref="galleryContainerRef" class="images-vertical-stack">
                <!-- Group 1 -->
                <div class="vertical-group">
                  <div
                    v-for="(img, index) in project.images"
                    :key="index"
                    class="vertical-image-item"
                    @click="openFullscreen(img)"
                  >
                    <img
                      :src="img"
                      :alt="`${project.title[currentLang]} screenshot ${index + 1}`"
                    />
                  </div>
                </div>
                <!-- Group 2  -->
                <div class="vertical-group duplicate-group">
                  <div
                    v-for="(img, index) in project.images"
                    :key="`duplicate-${index}`"
                    class="vertical-image-item"
                    @click="openFullscreen(img)"
                  >
                    <img
                      :src="img"
                      :alt="`${project.title[currentLang]} screenshot ${index + 1}`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <ImageModal
      :visible="imageModalVisible"
      :images="allImages"
      :current-index="imageModalCurrentIndex"
      :title="project?.title[currentLang]"
      @close="closeImageModal"
      @update:current-index="updateImageIndex"
    />
  </section>
</template>

<style scoped>
.project-detail {
  max-width: 90vw;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 100vh;
}

.mobile-tabs {
  display: none;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
}

.tab-btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.tab-btn.active {
  color: var(--color-text);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-text);
}

.detail-container {
  display: grid;
  border: 1px solid var(--color-border);
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

.info-section {
  display: flex;
  flex-direction: column;
}

.project-title {
  border: 1px solid var(--color-border);
}

.project-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  padding: 1.5rem;
}

.info-block {
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  padding: 1.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
}

.features-list li {
  padding-left: 1.5rem;
  position: relative;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.features-list li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--color-text);
  font-weight: bold;
}

.architecture-img {
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.architecture-img:hover {
  transform: scale(1.02);
}

.architecture-img img {
  width: 100%;
  height: auto;
  display: block;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
}

.tech-badge {
  flex: 1 1 0;
  min-width: 100px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
}

.links-section {
  display: flex;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-background);
  border-color: var(--color-border);
  font-weight: 600;
}

.btn-primary::before {
  background: var(--color-accent-green);
  color: var(--color-text);
}

.btn-primary:hover {
  color: #fff;
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-outline:hover {
  background: var(--color-border);
}

.gallery-section {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
}

.vertical-carousel-wrapper {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.vertical-carousel-container {
  flex: 1;
  max-width: 600px;
  height: 80vh;
  overflow: hidden;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  margin: 0 auto;
}

.images-vertical-stack {
  display: flex;
  flex-direction: column;
  width: 100%;
  will-change: transform;
}

.vertical-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

.duplicate-group {
  display: flex;
}

@media (max-width: 1024px) {
  .duplicate-group {
    display: none;
  }
}

.vertical-image-item {
  width: 100%;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
  background: var(--color-background);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-image-item img {
  width: 90%;
  height: auto;
  display: block;
  object-fit: contain;
  margin: 0 auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
}

.vertical-image-item:last-child {
  border-bottom: none;
}

.vertical-image-item:hover {
  background: var(--color-background-soft);
  transform: scale(1.02);
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fullscreen Modal */
.fullscreen-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  padding: 2rem;
}

.image-wrapper {
  position: relative;
  max-width: 95%;
  max-height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-modal img {
  max-width: 100%;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}

.click-area {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  z-index: 10;
  cursor: pointer;
}

.click-left {
  left: 0;
  cursor: w-resize;
}

.click-right {
  right: 0;
  cursor: e-resize;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  z-index: 20;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 1rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  z-index: 20;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.nav-prev {
  left: 2rem;
}

.nav-next {
  right: 2rem;
}

.image-counter {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  z-index: 20;
}

/* Responsive */
@media (max-width: 1024px) {
  .detail-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .gallery-section {
    position: relative;
    top: 0;
  }

  .mobile-tabs {
    display: flex;
  }

  .info-section.hidden,
  .gallery-section.hidden {
    display: none;
  }

  .vertical-carousel-container {
    height: 60vh;
    max-width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .vertical-carousel-wrapper {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }

  .vertical-carousel-container {
    height: 50vh;
    max-width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .vertical-image-item {
    padding: 0.5rem;
  }

  .links-section {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  /* Fullscreen modal responsive */
  .nav-btn {
    padding: 0.75rem;
  }

  .nav-prev {
    left: 1rem;
  }

  .nav-next {
    right: 1rem;
  }

  .close-btn {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem;
  }

  .image-counter {
    bottom: 1rem;
    font-size: 0.8rem;
  }

  .click-area {
    width: 45%;
  }
}
</style>
