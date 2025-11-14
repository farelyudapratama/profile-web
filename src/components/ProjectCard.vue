<script setup lang="ts">
import type { Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'
import { ref, computed } from 'vue'
import { onUnmounted } from 'vue'

const props = defineProps({
  project: {
    type: Object as () => ProjectType,
    required: true,
  },
})

const emit = defineEmits<{
  openImage: [imageSrc: string, projectId: number]
}>()

const lang = useLanguageStore()

const isDemo = (demo?: string) => {
  if (!demo) return false
  return /^https?:\/\//.test(demo) || demo.startsWith('/')
}

const hasDetailedInfo = computed(() => {
  return !!(
    props.project.longDescription ||
    props.project.features ||
    props.project.challenges ||
    props.project.architectureImage
  )
})

// State untuk slider
const currentIndex = ref(0)
const direction = ref(1) // 1 untuk maju (kanan ke kiri), -1 untuk mundur
const sliderContainer = ref<HTMLElement | null>(null)

// untuk mengamankan akses ke project.images
const totalImages = computed(() => props.project.images?.length || 0)

// Fungsi untuk memperbarui gambar berikutnya
const goToNextImage = () => {
  if (totalImages.value <= 1) return // Jika hanya ada satu gambar, tidak perlu berpindah

  // Jika mencapai akhir, ubah arah menjadi mundur
  if (currentIndex.value === totalImages.value - 1) {
    direction.value = -1
  }
  // Jika mencapai awal, ubah arah menjadi maju
  else if (currentIndex.value === 0) {
    direction.value = 1
  }

  // Update index berdasarkan arah
  const nextIndex = currentIndex.value + direction.value

  // Cek apakah nextIndex valid, jika tidak, reset arah dan posisi
  if (nextIndex >= totalImages.value) {
    currentIndex.value = totalImages.value - 2 // Gambar sebelum terakhir
    direction.value = -1 // Balik arah
  } else if (nextIndex < 0) {
    currentIndex.value = 1 // Gambar kedua
    direction.value = 1 // Maju arah
  } else {
    currentIndex.value = nextIndex
  }
}

function handleMediaClick() {
  // Cek ukuran layar jika lebih dari 768px tidak bisa klik
  if (window.innerWidth > 768) {
    return
  }

  // Pada layar yang lebih kecil, izinkan klik langsung untuk membuka modal gambar
  if (
    props.project.images &&
    props.project.images.length > 0 &&
    currentIndex.value < props.project.images.length
  ) {
    emit('openImage', props.project.images[currentIndex.value], props.project.id)
  }
}

let intervalId: number | undefined
if (totalImages.value > 1) {
  intervalId = window.setInterval(goToNextImage, 3000)
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <article class="card project-card" :data-id="project.id">
    <div class="media" @click="handleMediaClick">
      <div class="slider-container" ref="sliderContainer">
        <img
          v-for="(img, index) in project.images"
          :key="index"
          :src="img"
          :alt="project.title[lang.currentLang]"
          class="slider-image"
          :class="{ active: index === currentIndex }"
        />
      </div>
    </div>

    <div class="body">
      <h3 class="title">{{ project.title[lang.currentLang] }}</h3>
      <p class="desc">{{ project.description[lang.currentLang] }}</p>

      <div class="tech">
        <span v-for="t in project.tech" :key="t" class="tech-badge">{{ t }}</span>
      </div>

      <div class="actions">
        <template v-if="isDemo(project.demo)">
          <a :href="project.demo" class="btn btn-primary" target="_blank" rel="noopener"
            >Live Demo</a
          >
        </template>
        <template v-else-if="project.github">
          <a :href="project.github" class="btn btn-primary" target="_blank" rel="noopener"
            >GitHub</a
          >
        </template>

        <a v-if="hasDetailedInfo" :href="`/projects/${project.id}`" class="btn btn-primary">Details</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
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
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.slider-image.active {
  opacity: 1;
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

@media (max-width: 640px) {
  .media {
    height: 140px;
  }
}
</style>
