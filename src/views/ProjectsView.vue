<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'ProjectsView',
})
</script>

<template>
  <div class="projects">
    <h1>My Projects</h1>
    <p>Here are some of my projects.</p>
  </div>
</template>

<style scoped>
.projects {
  padding: 2rem;
}

h1 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text);
}
</style>
