<template>
  <div
    ref="containerRef"
    class="max-w-full select-none overflow-hidden"
    :class="className"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    :style="{
      maskImage:
        'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
    }"
  >
    <div ref="movingContainerRef" class="flex w-fit">
      <div class="flex w-fit items-center gap-10">
        <div
          v-for="(src, index) in elements"
          :key="index"
          class="relative flex shrink-0 items-center justify-center"
          :class="{ 'mr-10': index === elements.length - 1 }"
          :style="{ height: iconHeight + 'px', width: iconWidth + 'px' }"
        >
          <img
            :src="src"
            :alt="`${src.split('/').pop()?.split('.')[0] || 'technology'} icon`"
            :height="iconHeight"
            class="object-contain"
          />
        </div>
      </div>
      <div class="flex w-fit items-center gap-10">
        <div
          v-for="(src, index) in elements"
          :key="`duplicate-${index}`"
          class="relative flex shrink-0 items-center justify-center"
          :class="{ 'mr-10': index === elements.length - 1 }"
          :style="{ height: iconHeight + 'px', width: iconWidth + 'px' }"
        >
          <img
            :src="src"
            :alt="`${src.split('/').pop()?.split('.')[0] || 'technology'} icon`"
            :height="iconHeight"
            class="object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'

// --- Props ---
interface Props {
  isReversed?: boolean
  className?: string
}

const { isReversed = false, className = '' } = defineProps<Props>()

// --- Refs ---
const containerRef = ref<HTMLElement | null>(null)
const movingContainerRef = ref<HTMLDivElement | null>(null)
const timeline = ref<gsap.core.Timeline | null>(null)
const timeScaleTween = ref<gsap.core.Tween | null>(null)

// --- Icons (Asumsikan Anda telah mengimpor SVG sebagai string atau URL) ---
// Karena Vue tidak memiliki `next/image` atau `StaticImageData`, kita asumsikan ini adalah URL string.
// Anda mungkin perlu menyesuaikan cara impor ikon Anda.
const gsapIcon = new URL('@/assets/icons/technologies/gsap.svg', import.meta.url).href
const nextIcon = new URL('@/assets/icons/technologies/next.svg', import.meta.url).href
const reactIcon = new URL('@/assets/icons/technologies/react.svg', import.meta.url).href
const tailwindIcon = new URL('@/assets/icons/technologies/tailwind.svg', import.meta.url).href
const threeIcon = new URL('@/assets/icons/technologies/three.svg', import.meta.url).href
const typescriptIcon = new URL('@/assets/icons/technologies/typescript.svg', import.meta.url).href
const webGLIcon = new URL('@/assets/icons/technologies/webgl.svg', import.meta.url).href

const technologyIcons = [
  gsapIcon,
  nextIcon,
  webGLIcon,
  reactIcon,
  tailwindIcon,
  threeIcon,
  typescriptIcon,
]

const elements = computed(() => [...technologyIcons, ...technologyIcons])

// --- Konstanta Ukuran Ikon ---
// Karena tidak ada `StaticImageData`, kita asumsikan ukuran tetap atau ambil dari elemen DOM setelah render.
const iconHeight = 80 // Atur ukuran yang diinginkan
const iconWidth = 80 // Atur ukuran yang diinginkan

// --- Fungsi GSAP ---
const setupInfiniteMarqueeTimeline = () => {
  if (!movingContainerRef.value) return

  gsap.set(movingContainerRef.value, {
    xPercent: isReversed ? -50 : 0,
  })

  if (timeline.value) {
    timeline.value.kill() // Hapus timeline sebelumnya jika ada
  }

  timeline.value = gsap
    .timeline({ defaults: { ease: 'none', repeat: -1 } })
    .to(movingContainerRef.value, {
      xPercent: isReversed ? 0 : -50,
      duration: 20,
      ease: 'none', // Pastikan ease tetap 'none' untuk gerakan linear
    })
    .set(movingContainerRef.value, { xPercent: 0 }) // Reset ke awal saat selesai satu putaran
}

// --- Event Handlers ---
const onPointerEnter = () => {
  if (!timeline.value) return
  if (timeScaleTween.value) timeScaleTween.value.kill()
  timeScaleTween.value = gsap.to(timeline.value, {
    timeScale: 0.25,
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

// --- Lifecycle Hooks ---
onMounted(() => {
  setupInfiniteMarqueeTimeline()
})

// Cleanup timeline saat komponen di-unmount
onUnmounted(() => {
  if (timeline.value) timeline.value.kill()
  if (timeScaleTween.value) timeScaleTween.value.kill()
})
</script>
