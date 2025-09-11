<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

function toggleTheme() {
  themeStore.toggleTheme()
}

function getCurrentThemeLabel() {
  const labels = {
    light: 'Light',
    dark: 'Dark',
  }
  return labels[themeStore.themeMode]
}

function getNextThemeLabel() {
  // Simple toggle between light and dark
  return themeStore.themeMode === 'light' ? 'Dark' : 'Light'
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="`Switch to ${getNextThemeLabel()} theme`"
    aria-label="Toggle theme"
  >
    <div class="theme-icon">
      <!-- Sun Icon for Light Theme -->
      <svg
        v-if="themeStore.themeMode === 'light'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        />
      </svg>

      <!-- Moon Icon for Dark Theme -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </div>

    <span class="theme-label">{{ getCurrentThemeLabel() }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.theme-toggle:hover {
  background: var(--color-background-mute);
  border-color: var(--color-border-hover);
  transform: translateY(-1px);
}

.theme-toggle:active {
  transform: translateY(0);
}

.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.theme-label {
  font-family: inherit;
}

/* Responsive - hide label on small screens */
@media (max-width: 640px) {
  .theme-label {
    display: none;
  }

  .theme-toggle {
    padding: 0.5rem;
  }
}
</style>
