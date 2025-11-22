<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted } from 'vue'

interface Props {
  visible: boolean
  images: string[]
  currentIndex: number
  title?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'update:currentIndex', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentImage = computed(() => {
  if (props.images.length === 0) return undefined
  return props.images[props.currentIndex]
})

const hasNext = computed(() => props.currentIndex < props.images.length - 1)
const hasPrev = computed(() => props.currentIndex > 0)

function nextImage() {
  if (hasNext.value) {
    emit('update:currentIndex', props.currentIndex + 1)
  }
}

function prevImage() {
  if (hasPrev.value) {
    emit('update:currentIndex', props.currentIndex - 1)
  }
}

function handleImageClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const halfWidth = rect.width / 2

  if (clickX < halfWidth) {
    prevImage()
  } else {
    nextImage()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

defineExpose({
  nextImage,
  prevImage,
})
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fullscreen-modal" @click.self="$emit('close')">
      <button class="close-btn" @click="$emit('close')" aria-label="Close fullscreen">
        <X :size="32" />
      </button>

      <!-- Navigation Arrows -->
      <button
        v-if="hasPrev"
        class="nav-btn nav-prev"
        @click="prevImage"
        aria-label="Previous image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button v-if="hasNext" class="nav-btn nav-next" @click="nextImage" aria-label="Next image">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- Image with split overlay for navigation -->
      <div class="image-wrapper">
        <div v-if="hasPrev" class="click-area click-left" @click="prevImage"></div>
        <img
          :src="currentImage"
          :alt="title || 'Project screenshot'"
          @click="handleImageClick"
          class="modal-image"
        />
        <div v-if="hasNext" class="click-area click-right" @click="nextImage"></div>
      </div>

      <!-- Image counter -->
      <div v-if="images.length > 1" class="image-counter">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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

.modal-image {
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
@media (max-width: 768px) {
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
