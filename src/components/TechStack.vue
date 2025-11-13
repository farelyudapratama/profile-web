<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'

interface Props {
  isReversed?: boolean
  className?: string
  iconWidth?: number
  iconHeight?: number
  speed?: number
}

const {
  isReversed = false,
  className = '',
  iconWidth = 100,
  iconHeight = 100,
  speed = 20,
} = withDefaults(defineProps<Props>(), {
  iconWidth: 100,
  iconHeight: 100,
  speed: 20,
})

const containerRef = ref<HTMLElement | null>(null)
const movingContainerRef = ref<HTMLDivElement | null>(null)
const timeline = ref<gsap.core.Timeline | null>(null)
const timeScaleTween = ref<gsap.core.Tween | null>(null)

const images = [
  { src: '/img/htmlbrand.svg', alt: 'HTML' },
  { src: '/img/jsbrand.webp', alt: 'JavaScript' },
  { src: '/img/reactbrand.webp', alt: 'React' },
  { src: '/img/phpbrand.webp', alt: 'PHP' },
  { src: '/img/mysqlbrand.webp', alt: 'MySQL' },
  { src: '/img/expressbrand.svg', alt: 'Express.js' },
  { src: '/img/mongodbbrand.svg', alt: 'MongoDB' },
  { src: '/img/pythonbrand.svg', alt: 'Python' },
  { src: '/img/kotlinbrand.svg', alt: 'Kotlin' },
  { src: '/img/firebasebrand.svg', alt: 'Firebase' },
  { src: '/img/gitbrand.svg', alt: 'Git' },
]

const elements = computed(() => [...images, ...images])

const setupInfiniteMarqueeTimeline = () => {
  if (!movingContainerRef.value) return

  gsap.set(movingContainerRef.value, {
    xPercent: isReversed ? -50 : 0, // Atur posisi awal
  })

  if (timeline.value) {
    timeline.value.kill() // Hapus timeline sebelumnya jika ada
  }

  timeline.value = gsap
    .timeline({ defaults: { ease: 'none', repeat: -1 } })
    .to(movingContainerRef.value, {
      xPercent: isReversed ? 0 : -50, // Geser ke kiri atau kanan
      duration: speed, // Durasi berdasarkan props
      ease: 'none', // Jaga kecepatan linear
    })
    .set(movingContainerRef.value, { xPercent: isReversed ? -50 : 0 }) // Reset ke posisi awal setelah satu putaran
}

// --- Event Handlers ---
const onPointerEnter = () => {
  if (!timeline.value) return
  if (timeScaleTween.value) timeScaleTween.value.kill()
  timeScaleTween.value = gsap.to(timeline.value, {
    timeScale: 0,
    duration: 0.4,
  })
}

const onPointerLeave = () => {
  if (!timeline.value) return
  if (timeScaleTween.value) timeScaleTween.value.kill()
  timeScaleTween.value = gsap.to(timeline.value, {
    timeScale: 1,
    duration: 0.2,
  })
}

onMounted(() => {
  setupInfiniteMarqueeTimeline()
})

onUnmounted(() => {
  if (timeline.value) timeline.value.kill()
  if (timeScaleTween.value) timeScaleTween.value.kill()
})
</script>

<template>
  <div
    ref="containerRef"
    class="max-w-full select-none overflow-hidden"
    :class="className"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <div ref="movingContainerRef" class="flex w-fit">
      <!-- Group 1 -->
      <div class="flex w-fit items-center">
        <div
          v-for="(img, index) in elements"
          :key="index"
          class="icon-container"
          :style="{ height: iconHeight + 'px', width: iconWidth + 'px' }"
        >
          <img :src="img.src" :alt="img.alt" class="icon-image" />
        </div>
      </div>
      <!-- Group 2 (Duplikat) -->
      <div class="flex w-fit items-center">
        <div
          v-for="(img, index) in elements"
          :key="`duplicate-${index}`"
          class="icon-container"
          :style="{ height: iconHeight + 'px', width: iconWidth + 'px' }"
        >
          <img :src="img.src" :alt="img.alt" class="icon-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max-w-full {
  width: 100%;
  border: 1px solid var(--color-border);
}
.select-none {
  user-select: none;
}
.overflow-hidden {
  overflow: hidden;
}
.flex {
  display: flex;
}
.w-fit {
  width: fit-content;
}
.items-center {
  align-items: center;
}
.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
  border-right: none;
  padding: 20px;
  transition: all 0.3s ease;
}

.icon-container:last-child {
  border-right: 1px solid var(--color-border);
}

.icon-container:hover {
  border: 1px solid var(--color-border-hover);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
