<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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
  </nav>

  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--nav-bg);
  color: var(--text-color);
  padding: 0.8rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo-icon {
  font-size: 1.8rem;
  color: #a855f7;
  font-weight: bold;
}

.name {
  font-size: 1rem;
  margin: 0;
}

.subtitle {
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
