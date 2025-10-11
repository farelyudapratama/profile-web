<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { House, FolderKanban, User, Blocks, ChevronDown, Menu, X, Languages } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'
import { useLanguageStore } from '@/stores/language'
import type { Component } from 'vue'

const route = useRoute()
const mobileMenuOpen = ref(false)
const languageStore = useLanguageStore()

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

type NavChild = { name: string; path: string; icon: Component }
const isChildActive = (children: NavChild[]): boolean => {
  return children.some((child) => isActive(child.path))
}

const openDropdown = ref<string | null>(null)

const toggleDropdown = (name: string) => {
  openDropdown.value = openDropdown.value === name ? null : name
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // Close any open dropdowns when toggling the mobile menu
  if (mobileMenuOpen.value) {
    openDropdown.value = null
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Close dropdowns when clicking outside
const closeDropdowns = (event: MouseEvent) => {
  if (openDropdown.value && !(event.target as Element).closest('.dropdown')) {
    openDropdown.value = null
  }
}

// Check if we should use mobile layout based on window width
const isMobileView = ref(false)

const updateViewportState = () => {
  isMobileView.value = window.innerWidth < 768
  if (!isMobileView.value) {
    mobileMenuOpen.value = false
  }
}

// Add and remove event listeners to prevent memory leaks
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
  window.addEventListener('resize', updateViewportState)
  updateViewportState()
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
  window.removeEventListener('resize', updateViewportState)
})
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <img
        src="/img/android-chrome-192x192.png"
        alt="Logo"
        class="logo-img"
        width="72"
        height="72"
      />
      <div class="logo-text">
        <h1 class="name">Farel Yuda Pratama</h1>
        <p class="subtitle">Aspiring Software Engineer</p>
      </div>
    </div>

    <div class="divider desktop-only"></div>

    <!-- Desktop Navigation -->
    <div class="nav-links desktop-menu">
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

    <div class="right-section">
      <!-- Language Switcher -->
      <button
        class="icon-button"
        @click="languageStore.toggleLanguage()"
        aria-label="Switch language"
      >
        <Languages />
        <span class="lang-text">{{ languageStore.currentLang.toUpperCase() }}</span>
      </button>

      <ThemeToggle />

      <!-- Mobile Menu Toggle Button -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle mobile menu">
        <Menu v-if="!mobileMenuOpen" />
        <X v-else />
      </button>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div
      class="mobile-menu-overlay"
      :class="{ active: mobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
      <div class="mobile-nav-links">
        <div v-for="item in navItems" :key="item.name" class="mobile-nav-item-wrapper">
          <div v-if="item.children" class="mobile-dropdown">
            <button
              class="mobile-nav-item mobile-dropdown-toggle"
              :class="{ active: isChildActive(item.children) }"
              @click="toggleDropdown(item.name)"
            >
              <component :is="item.icon" />
              <span>{{ item.name }}</span>
              <ChevronDown
                class="mobile-dropdown-arrow"
                :class="{ rotated: openDropdown === item.name }"
              />
            </button>
            <div class="mobile-dropdown-menu" :class="{ show: openDropdown === item.name }">
              <RouterLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.path"
                class="mobile-dropdown-item"
                :class="{ active: isActive(child.path) }"
                @click="closeMobileMenu"
              >
                {{ child.name }}
              </RouterLink>
            </div>
          </div>

          <RouterLink
            v-else
            :to="item.path"
            :class="['mobile-nav-item', { active: isActive(item.path) }]"
            @click="closeMobileMenu"
          >
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Common styles for all screen sizes */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.2rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.logo-img {
  width: 4.5rem;
  height: auto;
  mix-blend-mode: exclusion;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 1.7rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  margin: 0;
  color: var(--color-heading);
  transition: color 0.3s ease;
  white-space: nowrap;
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text);
  transition: color 0.3s ease;
  white-space: nowrap;
}

.divider {
  height: 3rem;
  width: 2px;
  background-color: var(--color-border);
  margin-right: 20px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.icon-button:hover {
  color: var(--color-primary);
  background: var(--color-background-mute);
  transform: translateY(-1px);
}

.lang-text {
  font-size: 1rem;
  font-weight: 500;
}

/* Desktop Menu Styles */
.desktop-menu {
  display: flex;
  gap: 1.5rem;
  margin-right: auto;
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
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text);
}

.dropdown-item:hover {
  color: var(--color-primary);
  background: var(--color-background-mute);
  transform: translateY(-1px);
}

.dropdown-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.dropdown-toggle.active {
  color: var(--color-primary);
  font-weight: 700;
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
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.nav-item span {
  font-weight: 700;
}

.nav-item:hover {
  color: var(--color-primary);
  background: var(--color-background-mute);
  transform: translateY(-1px);
}

.nav-item.active {
  color: var(--color-primary);
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

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s ease;
}

.mobile-menu-toggle:hover {
  color: var(--color-primary);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  position: fixed;
  top: 4.5rem;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: calc(100vh - 4.5rem);
  background: var(--color-background);
  border-left: 1px solid var(--color-border);
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  padding: 1rem;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-overlay {
  display: none;
  position: fixed;
  top: 4.5rem;
  left: 0;
  width: 100%;
  height: calc(100vh - 4.5rem);
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}

.mobile-menu-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-item-wrapper {
  width: 100%;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 1.1rem;
}

.mobile-dropdown-toggle {
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
  color: var(--color-text);
}

.mobile-dropdown-menu {
  display: none;
  flex-direction: column;
  padding-left: 1rem;
  margin-top: 0.5rem;
}

.mobile-dropdown-menu.show {
  display: flex;
}

.mobile-dropdown-item {
  padding: 0.75rem 1rem;
  color: var(--color-text);
  text-decoration: none;
}

.mobile-nav-item.active,
.mobile-dropdown-item.active {
  color: var(--color-primary);
  font-weight: 600;
}

.mobile-dropdown-arrow {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.mobile-dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .name {
    font-size: 1.25rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }

  .nav-item,
  .dropdown-toggle {
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.2rem 1rem;
  }

  .desktop-menu,
  .desktop-only {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .mobile-menu-overlay {
    display: block;
  }

  .logo-img {
    width: 3.5rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.2rem 0.75rem;
  }

  .logo {
    gap: 0.4rem;
  }

  .logo-img {
    width: 3rem;
  }

  .name {
    font-size: 1rem;
  }

  .subtitle {
    font-size: 0.75rem;
  }
}

/* When screen is very small, hide subtitle text */
@media (max-width: 370px) {
  .subtitle {
    display: none;
  }
}
</style>
