<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, nextTick, watch, ref } from 'vue'
import { useThemeStore } from './stores/theme'
import ThemeToggle from './components/ThemeToggle.vue'
import { House, FolderKanban, User, Blocks } from 'lucide-vue-next'
import { gsap } from 'gsap'

const themeStore = useThemeStore()
const route = useRoute()

// DIUBAH: Jumlah bubble ditingkatkan agar lebih padat
const totalBubbles = ref(400)
const showIntro = ref(true)

// Navigation items (tidak berubah)
const navItems = ref([
  { name: 'Home', path: '/', icon: House },
  { name: 'Project', path: '/projects', icon: FolderKanban },
  { name: 'About', path: '/about', icon: User },
  {
    name: 'Extra',
    icon: Blocks,
    children: [
      { name: 'Blog', path: '/#blog', icon: Blocks },
      { name: 'Guestbook', path: '/#guestbook', icon: Blocks },
    ],
  },
])

// Fungsi isActive (tidak berubah)
const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  if (path.includes('#')) {
    return route.hash === path.substring(path.indexOf('#'))
  }
  return route.path.startsWith(path)
}

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

// Watcher untuk scroll (tidak berubah)
watch(
  showIntro,
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

// Lifecycle hook onMounted
onMounted(async () => {
  await nextTick()
  themeStore.initTheme()
  themeStore.applyTheme()

  gsap.set('.bubble', {
    y: '100vh',
    opacity: 0,
    scale: () => gsap.utils.random(0.5, 1.5),
    x: () => gsap.utils.random(0, window.innerWidth),
  })

  const tl = gsap.timeline({
    onComplete: () => {
      showIntro.value = false
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
    'start+=0.8',
  )
})
</script>

<template>
  <div v-if="showIntro" class="bubble-overlay">
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

  <nav class="navbar">
    <div class="logo">
      <img src="/img/android-chrome-192x192.png" alt="Logo" class="logo-img" />
      <div>
        <h1 class="name">Farel Yuda Pratama</h1>
        <p class="subtitle">Aspiring Software Engineer</p>
      </div>
    </div>

    <div class="divider"></div>

    <div class="nav-links">
      <div v-for="item in navItems" :key="item.name" class="nav-item-wrapper">
        <!-- kalau ada children → dropdown -->
        <div v-if="item.children" class="dropdown">
          <button class="nav-item dropdown-toggle">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </button>
          <div class="dropdown-menu">
            <RouterLink
              v-for="child in item.children"
              :key="child.name"
              :to="child.path"
              class="dropdown-item"
            >
              {{ child.name }}
            </RouterLink>
          </div>
        </div>

        <!-- kalau ga ada children → normal link -->
        <RouterLink v-else :to="item.path" :class="['nav-item', { active: isActive(item.path) }]">
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </div>
    </div>

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
.nav-item-wrapper {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  min-width: 150px;
  display: none;
  flex-direction: column;
  z-index: 1000;
}

.dropdown:hover .dropdown-menu {
  display: flex;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--color-text);
}

.dropdown-item:hover {
  background: var(--color-background-soft);
  color: var(--color-primary);
}

/* Navbar */
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
  background-color: var(--color-border); /* Memberi warna pada divider */
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
