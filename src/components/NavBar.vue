<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { House, FolderKanban, User, Blocks, ChevronDown } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()

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

const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  if (path.includes('#')) {
    return route.hash === path.substring(path.indexOf('#'))
  }
  return route.path.startsWith(path)
}

const isChildActive = (children: any[]): boolean => {
  return children.some((child) => isActive(child.path))
}

const openDropdown = ref<string | null>(null)

const toggleDropdown = (name: string) => {
  openDropdown.value = openDropdown.value === name ? null : name
}

// Close dropdown when clicking outside
const closeDropdowns = (event: MouseEvent) => {
  if (openDropdown.value && !(event.target as Element).closest('.dropdown')) {
    openDropdown.value = null
  }
}

// Add and remove event listener to prevent memory leaks
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<template>
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
        <div v-if="item.children" class="dropdown">
          <button
            class="nav-item dropdown-toggle"
            :class="{ active: isChildActive(item.children) }"
            @click="toggleDropdown(item.name)"
          >
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
            <ChevronDown class="dropdown-arrow" :class="{ rotated: openDropdown === item.name }" />
          </button>
          <div class="dropdown-menu" :class="{ show: openDropdown === item.name }">
            <RouterLink
              v-for="child in item.children"
              :key="child.name"
              :to="child.path"
              class="dropdown-item"
              :class="{ active: isActive(child.path) }"
            >
              {{ child.name }}
            </RouterLink>
          </div>
        </div>

        <RouterLink v-else :to="item.path" :class="['nav-item', { active: isActive(item.path) }]">
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </div>
    </div>

    <ThemeToggle />
  </nav>
</template>

<style scoped>
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
  top: 57px;
  left: 0;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  min-width: 150px;
  display: none;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-menu.show {
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

.dropdown-item.active {
  color: var(--color-primary);
  font-weight: 600;
}

.dropdown-toggle.active {
  color: var(--color-primary);
  font-weight: 600;
  position: relative;
}

.dropdown-toggle.active::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
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
  background-color: var(--color-border);
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
