import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  // State
  const themeMode = ref<ThemeMode>('light')

  // Load theme from localStorage on store initialization
  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      themeMode.value = savedTheme
    } else {
      // Default to system preference if no valid theme is saved
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      themeMode.value = prefersDark ? 'dark' : 'light'
    }
  }

  try {
    loadTheme()
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error)
  }

  // Computed
  const isDark = computed(() => {
    return themeMode.value === 'dark'
  })

  const currentTheme = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  // Actions
  function setTheme(mode: ThemeMode) {
    const apply = () => {
      themeMode.value = mode
      localStorage.setItem('theme-mode', mode)
      applyTheme()
    }

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        apply()
      })

      // sementara disable interaksi
      document.documentElement.classList.add('is-transitioning')

      // kalau transisi selesai, aktifkan lagi
      transition.finished.finally(() => {
        document.documentElement.classList.remove('is-transitioning')
      })
    } else {
      apply()
    }
  }


  function toggleTheme() {
    // Simply toggle between light and dark
    const newTheme: ThemeMode = themeMode.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  function applyTheme() {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('light-theme', 'dark-theme')

    // Apply theme class based on current theme
    root.classList.add(`${themeMode.value}-theme`)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const themeColor = isDark.value ? '#1F2937' : '#F3F4F6'
      metaThemeColor.setAttribute('content', themeColor)
    }
  }

  // Initialize theme on store creation
  function initTheme() {
    applyTheme()
  }

  return {
    // State
    themeMode,

    // Getters
    isDark,
    currentTheme,

    // Actions
    setTheme,
    toggleTheme,
    applyTheme,
    initTheme
  }
})
