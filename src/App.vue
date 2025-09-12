<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, nextTick, computed, ref } from 'vue'
import { useThemeStore } from './stores/theme'
import ThemeToggle from './components/ThemeToggle.vue'
import { House } from 'lucide-vue-next'

const themeStore = useThemeStore()
const route = useRoute()

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

onMounted(async () => {
  await nextTick()

  themeStore.initTheme()

  themeStore.applyTheme()
})
</script>

<template>
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
