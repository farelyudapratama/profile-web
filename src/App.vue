<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
// import IntroAnimation from './components/IntroAnimation.vue'

const themeStore = useThemeStore()
// const showIntro = ref(themeStore.isDark)

// const handleAnimationComplete = () => {
//   showIntro.value = false
// }

onMounted(async () => {
  await nextTick()
  themeStore.initTheme()
  themeStore.applyTheme()
})
</script>

<template>
  <div class="app-root">
    <NavBar />
    <main class="app-main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-main {
  flex: 1 1 auto;
}
</style>
