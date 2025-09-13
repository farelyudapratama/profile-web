<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import NavBar from './components/NavBar.vue'
import IntroAnimation from './components/IntroAnimation.vue'

const themeStore = useThemeStore()
const showIntro = ref(themeStore.isDark)

const handleAnimationComplete = () => {
  showIntro.value = false
}

onMounted(async () => {
  await nextTick()
  themeStore.initTheme()
  themeStore.applyTheme()
})
</script>

<template>
  <IntroAnimation :show="showIntro" @animation-complete="handleAnimationComplete" />
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
