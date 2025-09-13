<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'animationComplete'): void
}>()

// Only show animation if the show prop is true (which will be true only in dark mode)
const totalBubbles = ref(props.show ? 400 : 0)

// Distribusi gelembung
const getBubbleClass = (index: number): string => {
  const percentage = index / totalBubbles.value
  if (percentage < 0.15) {
    return 'wave-1'
  } else if (percentage < 0.5) {
    return 'wave-2'
  } else {
    return 'wave-3'
  }
}

// Watcher untuk scroll
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

// Animation timeline
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  // Skip animation setup if not showing
  if (!props.show) {
    emit('animationComplete')
    return
  }

  gsap.set('.bubble', {
    y: '100vh',
    opacity: 0,
    scale: () => gsap.utils.random(0.5, 1.5),
    x: () => gsap.utils.random(0, window.innerWidth),
  })

  tl = gsap.timeline({
    onComplete: () => {
      emit('animationComplete')
    },
  })

  // Gelembung Wave 1: Lebih cepat
  tl.to(
    '.wave-1',
    {
      y: `-=${window.innerHeight * 1.5}`,
      opacity: () => gsap.utils.random(0.3, 0.8),
      duration: 2,
      ease: 'power1.out',
      stagger: {
        each: 0.05,
        from: 'random',
      },
    },
    'start',
  )

  // Gelembung Wave 2: Lebih cepat dan lebih rapat
  tl.to(
    '.wave-2',
    {
      y: `-=${window.innerHeight * 1.5}`,
      opacity: () => gsap.utils.random(0.3, 0.8),
      duration: 2.5,
      ease: 'power2.out',
      stagger: {
        each: 0.025,
        from: 'random',
      },
    },
    'start+=0.4',
  )

  // Gelembung Wave 3: Paling cepat dan paling rapat
  tl.to(
    '.wave-3',
    {
      y: `-=${window.innerHeight * 1.5}`,
      opacity: () => gsap.utils.random(0.3, 0.8),
      duration: 3,
      ease: 'power3.out',
      stagger: {
        each: 0.01,
        from: 'random',
      },
    },
    'start+=1',
  )
})

// Clean up GSAP timeline to prevent memory leaks
onUnmounted(() => {
  if (tl) {
    tl.kill()
    tl = null
  }
})
</script>

<template>
  <div v-if="show" class="bubble-overlay">
    <img
      v-for="n in totalBubbles"
      :key="n"
      src="/img/bubble.webp"
      alt="bubble"
      class="bubble"
      :class="getBubbleClass(n)"
      :style="{
        width: `${Math.random() * 120 + 60}px`,
        height: 'auto',
      }"
    />
  </div>
</template>

<style scoped>
/* Bubble */
.bubble-overlay {
  width: 100vw;
  height: 100vh;
  cursor: wait;
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 9999;
}

.bubble {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform, opacity;
}
</style>
