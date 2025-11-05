<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ExternalLink, Github, ChevronUp, ChevronDown, X } from 'lucide-vue-next'
import { projects } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

const route = useRoute()
const router = useRouter()
const lang = useLanguageStore()

const id = Number(route.params.id)
const project = projects.find((p) => p.id === id)

const currentImageIndex = ref(0)
const fullscreenImage = ref<string | null>(null)
const activeTab = ref<'info' | 'gallery'>('info')

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

const hasMultipleImages = computed(() => {
  return project && project.images.length > 1
})

const canScrollUp = computed(() => currentImageIndex.value > 0)
const canScrollDown = computed(() => {
  if (!project) return false
  return currentImageIndex.value < project.images.length - 1
})

function scrollToImage(index: number) {
  currentImageIndex.value = index
}

function nextImage() {
  if (canScrollDown.value) {
    currentImageIndex.value++
  }
}

function prevImage() {
  if (canScrollUp.value) {
    currentImageIndex.value--
  }
}

function openFullscreen(imageSrc: string) {
  fullscreenImage.value = imageSrc
}

function closeFullscreen() {
  fullscreenImage.value = null
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeFullscreen()
  }
}

if (!project) {
  router.replace({ name: 'projects' })
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
  <section class="project-detail" v-if="project" @keydown="handleKeydown">
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
          <h1 class="project-title">{{ project.title[currentLang] }}</h1>

          <section class="info-block">
            <h2 class="section-title">{{ labels.overview[currentLang] }}</h2>
            <p class="description">
              {{ project.longDescription?.[currentLang] || project.description[currentLang] }}
            </p>
          </section>

          <section class="info-block" v-if="project.features">
            <h2 class="section-title">{{ labels.features[currentLang] }}</h2>
            <ul class="features-list">
              <li v-for="(feature, idx) in project.features[currentLang]" :key="idx">
                {{ feature }}
              </li>
            </ul>
          </section>

          <section class="info-block" v-if="project.architectureImage">
            <h2 class="section-title">{{ labels.architecture[currentLang] }}</h2>
            <div class="architecture-img">
              <img
                :src="project.architectureImage"
                :alt="`${project.title[currentLang]} architecture`"
                @click="openFullscreen(project.architectureImage!)"
              />
            </div>
          </section>

          <section class="info-block">
            <h2 class="section-title">{{ labels.techStack[currentLang] }}</h2>
            <div class="tech-list">
              <span v-for="tech in project.tech" :key="tech" class="tech-badge">{{ tech }}</span>
            </div>
          </section>

          <section class="info-block" v-if="project.challenges">
            <h2 class="section-title">{{ labels.challenges[currentLang] }}</h2>
            <p class="challenges-text">{{ project.challenges[currentLang] }}</p>
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

          <div class="carousel-container">
            <button
              v-if="hasMultipleImages && canScrollUp"
              class="carousel-nav up"
              @click="prevImage"
              aria-label="Previous image"
            >
              <ChevronUp :size="24" />
            </button>

            <div class="images-stack">
              <div
                v-for="(img, index) in project.images"
                :key="index"
                class="stack-item"
                :class="{
                  active: index === currentImageIndex,
                  prev: index < currentImageIndex,
                  next: index > currentImageIndex,
                }"
                :style="{
                  zIndex: project.images.length - Math.abs(currentImageIndex - index),
                  transform: `translateY(${(index - currentImageIndex) * 15}px) scale(${
                    index === currentImageIndex
                      ? 1
                      : 0.92 - Math.abs(index - currentImageIndex) * 0.05
                  })`,
                  opacity:
                    Math.abs(index - currentImageIndex) > 2
                      ? 0
                      : 1 - Math.abs(index - currentImageIndex) * 0.25,
                }"
                @click="index === currentImageIndex && openFullscreen(img)"
              >
                <img :src="img" :alt="`${project.title[currentLang]} screenshot ${index + 1}`" />
              </div>
            </div>

            <button
              v-if="hasMultipleImages && canScrollDown"
              class="carousel-nav down"
              @click="nextImage"
              aria-label="Next image"
            >
              <ChevronDown :size="24" />
            </button>
          </div>

          <div class="dots-indicator" v-if="hasMultipleImages">
            <button
              v-for="(img, index) in project.images"
              :key="index"
              class="dot"
              :class="{ active: index === currentImageIndex }"
              @click="scrollToImage(index)"
              :aria-label="`Go to image ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="simple-container">
        <h1 class="simple-title">{{ project.title[currentLang] }}</h1>

        <p class="simple-description">{{ project.description[currentLang] }}</p>

        <div class="simple-gallery">
          <div class="simple-main-image">
            <img
              :src="project.images[currentImageIndex]"
              :alt="project.title[currentLang]"
              @click="openFullscreen(project.images[currentImageIndex])"
            />
          </div>

          <div v-if="hasMultipleImages" class="simple-thumbnails">
            <button
              v-for="(img, index) in project.images"
              :key="index"
              class="simple-thumb"
              :class="{ active: index === currentImageIndex }"
              @click="scrollToImage(index)"
            >
              <img :src="img" :alt="`${project.title[currentLang]} - ${index + 1}`" />
            </button>
          </div>
        </div>

        <div class="simple-tech">
          <h3 class="simple-tech-title">{{ labels.techStack[currentLang] }}</h3>
          <div class="tech-list">
            <span v-for="tech in project.tech" :key="tech" class="tech-badge">{{ tech }}</span>
          </div>
        </div>

        <div class="simple-links">
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
        </div>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="fullscreenImage" class="fullscreen-modal" @click.self="closeFullscreen">
        <button class="close-btn" @click="closeFullscreen" aria-label="Close fullscreen">
          <X :size="32" />
        </button>
        <img :src="fullscreenImage" :alt="project.title[currentLang]" />
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.project-detail {
  max-width: 1400px;
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
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

/* Info Section (Left) */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.description,
.challenges-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  border: 2px solid var(--color-border);
  border-radius: 8px;
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
  gap: 0.75rem;
}

.tech-badge {
  padding: 0.5rem 1rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.links-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid;
}

.btn-primary {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-outline:hover {
  background: var(--color-border);
}

/* Gallery Section (Right) */
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

.carousel-container {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  z-index: 10;
}

.carousel-nav:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateX(-50%) scale(1.1);
}

.carousel-nav.up {
  top: 1rem;
}

.carousel-nav.down {
  bottom: 1rem;
}

.images-stack {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stack-item {
  position: absolute;
  width: 90%;
  max-width: 500px;
  aspect-ratio: 16 / 10;
  border: 3px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  background: var(--color-background-soft);
}

.stack-item.active {
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.stack-item.active:hover {
  transform: translateY(0) scale(1.02) !important;
}

.stack-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dots-indicator {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.dot.active {
  background: var(--color-text);
  transform: scale(1.3);
}

.dot:hover {
  transform: scale(1.2);
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

.fullscreen-modal img {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  border-radius: 8px;
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
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

/* Simple Layout Styles */
.simple-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  text-align: center;
}

.simple-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.simple-description {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto;
}

.simple-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.simple-main-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  background: var(--color-background-soft);
}

.simple-main-image:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.simple-main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.simple-thumbnails {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.simple-thumb {
  width: 100px;
  height: 70px;
  border: 2px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-background-soft);
  padding: 0;
}

.simple-thumb:hover {
  border-color: var(--color-text);
  transform: scale(1.05);
}

.simple-thumb.active {
  border-color: var(--color-text);
  box-shadow: 0 0 0 2px var(--color-text);
}

.simple-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.simple-tech {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.simple-tech-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.simple-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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

  .carousel-container {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .carousel-container {
    height: 400px;
  }

  .stack-item {
    width: 95%;
  }

  .links-section {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  /* Simple layout responsive */
  .simple-title {
    font-size: 1.875rem;
  }

  .simple-description {
    font-size: 1rem;
  }

  .simple-main-image {
    aspect-ratio: 4 / 3;
  }

  .simple-thumb {
    width: 70px;
    height: 50px;
  }

  .simple-links {
    flex-direction: column;
  }

  .simple-links .btn {
    width: 100%;
  }
}
</style>
