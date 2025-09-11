<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick } from 'vue'
import { useThemeStore } from './stores/theme'
import ThemeToggle from './components/ThemeToggle.vue'

const themeStore = useThemeStore()

onMounted(async () => {
  // Make sure DOM is fully mounted before applying theme
  await nextTick()

  // Initialize theme system when app mounts
  themeStore.initTheme()

  // Apply theme immediately
  themeStore.applyTheme()
})
</script>

<template>
  <nav class="navbar">
    <!--Logo & Tittle  -->
    <div class="logo">
      <span class="logo-icon">F</span>
      <div>
        <h1 class="name">Farel Yuda Pratama</h1>
        <p class="subtitle">Aspiring Software Engineer</p>
      </div>
    </div>

    <!-- Theme Toggle -->
    <ThemeToggle />
  </nav>

  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.8rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo-icon {
  font-size: 1.8rem;
  color: var(--color-primary);
  font-weight: bold;
  transition: color 0.3s ease;
}

.name {
  font-size: 1rem;
  margin: 0;
  color: var(--color-heading);
  transition: color 0.3s ease;
}

.subtitle {
  font-size: 0.8rem;
  opacity: 0.7;
  color: var(--color-text);
  transition: color 0.3s ease;
}
</style>
