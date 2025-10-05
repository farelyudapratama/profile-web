import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref<'id' | 'en'>('en')

  function toggleLanguage() {
    currentLang.value = currentLang.value === 'id' ? 'en' : 'id'
  }

  return { currentLang, toggleLanguage }
})
