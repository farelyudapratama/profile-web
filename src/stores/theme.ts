import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  // State
  const themeMode = ref<ThemeMode>('system')

  // Load theme from localStorage on store initialization
  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      themeMode.value = savedTheme
    }
  }

  try {
    loadTheme()
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error)
  }

  // Computed
  const isDark = computed(() => {
    if (themeMode.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return themeMode.value === 'dark'
  })

  const currentTheme = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  // Actions
  function setTheme(mode: ThemeMode) {
    themeMode.value = mode
    localStorage.setItem('theme-mode', mode)
    applyTheme()
  }

  function toggleTheme() {
    const modes: ThemeMode[] = ['light', 'dark', 'system']
    const currentIndex = modes.indexOf(themeMode.value)
    const nextIndex = (currentIndex + 1) % modes.length
    setTheme(modes[nextIndex])
  }

  function applyTheme() {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('light-theme', 'dark-theme')

    // Apply theme class based on mode
    if (themeMode.value !== 'system') {
      root.classList.add(`${themeMode.value}-theme`)
    } else {
      // In system mode, we don't add a class, and let the media query handle it
    }

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

    // Listen for system theme changes when in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (themeMode.value === 'system') {
        applyTheme()
      }
    })
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
