<script setup lang="ts">
import { useHead } from '@unhead/vue'
import TheWelcome from '../components/TheWelcome.vue'
import HomeContent from '../components/HomeContent.vue'

useHead({
  title: 'Farel Yuda Pratama - Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Portfolio of Farel Yuda Pratama, An Informatics Student at Universitas Gunadarma, and Bangkit Academy Graduate focused on Android Development.',
    },
  ],
})
</script>

<template>
  <main>
    <TheWelcome />
    <HomeContent />
  </main>
</template>
