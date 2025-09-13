<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, nextTick, watch, ref } from 'vue'
import { useThemeStore } from './stores/theme'
import ThemeToggle from './components/ThemeToggle.vue'
import { House } from 'lucide-vue-next'
import { gsap } from 'gsap'

const themeStore = useThemeStore()
const route = useRoute()

const bubbles = ref(400) // jumlah bubble
const showIntro = ref(true) // state overlay intro

// Navigation items
const navItems = ref([
  { name: 'Home', path: '/', icon: House },
  { name: 'Project', path: '/projects', icon: House },
  { name: 'About', path: '/about', icon: House },
  { name: 'Contact', path: '/#contact', icon: House },
])
// Computed property to determine if a nav item is active
const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

watch(
  showIntro,
  (newValue) => {
    if (newValue) {
      // Disable scroll dan paksa scroll ke top
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = '0'
      document.body.style.left = '0'
      document.body.style.right = '0'
      window.scrollTo(0, 0)
    } else {
      // Enable scroll kembali
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
    }
  },
  { immediate: true },
)

onMounted(async () => {
  await nextTick()

  themeStore.initTheme()

  themeStore.applyTheme()
  const tl = gsap.timeline({
    onComplete: () => {
      showIntro.value = false
    },
  })

  tl.to('.bubble', {
    y: () => gsap.utils.random(-200, -600),
    x: () => gsap.utils.random(-200, 200),
    scale: () => gsap.utils.random(0.5, 1.5),
    opacity: 0,
    duration: () => gsap.utils.random(2, 4),
    stagger: {
      each: 0.05, // jarak antar animasi
      amount: 1.5, // total waktu distribusi animasi
      from: 'random', // acak urutan bubble
    },
    ease: 'power2.out',
    onComplete: function () {
      ;(this.targets() as HTMLElement[]).forEach((el) => el.remove())
    },
  })
})
</script>

<template>
  <div v-if="showIntro" class="bubble-overlay">
    <span
      v-for="n in bubbles"
      :key="n"
      class="bubble"
      :style="{
        top: `${Math.random() * 120 + -10}vh`,
        left: `${Math.random() * 120 + -10}vw`,
        width: `200px`,
        height: `200px`,
        background: `rgba(173,216,230,${Math.random() * 0.5 + 0.5})`,
      }"
    ></span>
  </div>

  <nav class="navbar">
    <!--Logo & Tittle  -->
    <div class="logo">
      <img src="/img/android-chrome-192x192.png" alt="Logo" class="logo-img" />
      <div>
        <h1 class="name">Farel Yuda Pratama</h1>
        <p class="subtitle">Aspiring Software Engineer</p>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Navigation Links -->
    <div class="nav-links">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        :class="['nav-item', { active: isActive(item.path) }]"
      >
        <component :is="item.icon" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>

    <!-- Theme Toggle -->
    <ThemeToggle />
  </nav>

  <RouterView />
</template>

<style scoped>
/* Bubble */
.bubble-overlay {
  width: 100vw;
  height: 100vh;
  cursor: wait;
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 9999;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  will-change: transform, opacity;
}

.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.2rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s ease;
  max-height: 4.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-right: 1rem;
}

.logo-img {
  width: 4.5rem;
  mix-blend-mode: exclusion;
}

.name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
  transition: color 0.3s ease;
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.divider {
  height: 3rem;
  width: 2px;
  margin-right: 20px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  margin-right: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--color-primary);
  background-color: var(--color-background-soft);
}

.nav-item.active {
  color: var(--color-primary);
  font-weight: 600;
  position: relative;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 2px;
}
</style>
