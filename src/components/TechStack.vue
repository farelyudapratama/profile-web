<script setup lang="ts">
const images = [
  { src: '/img/htmlbrand.svg', alt: 'HTML' },
  { src: '/img/jsbrand.webp', alt: 'JavaScript' },
  { src: '/img/reactbrand.webp', alt: 'React' },
  { src: '/img/phpbrand.webp', alt: 'PHP' },
  { src: '/img/mysqlbrand.webp', alt: 'MySQL' },
  { src: '/img/expressbrand.svg', alt: 'Express.js' },
  { src: '/img/mongodbbrand.svg', alt: 'MongoDB' },
  { src: '/img/pythonbrand.svg', alt: 'Python' },
  { src: '/img/kotlinbrand.svg', alt: 'Kotlin' },
  { src: '/img/firebasebrand.svg', alt: 'Firebase' },
  { src: '/img/gitbrand.svg', alt: 'Git' },
]
</script>

<template>
  <div class="carousel">
    <div class="group">
      <div v-for="(img, i) in images" :key="'a-' + i" class="card">
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>

    <div class="group" aria-hidden="true">
      <div v-for="(img, i) in images" :key="'b-' + i" class="card">
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>

    <div class="group" aria-hidden="true">
      <div v-for="(img, i) in images" :key="'b-' + i" class="card">
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  display: flex;
  overflow-x: auto;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.carousel:hover .group {
  animation-play-state: paused;
}
.group {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 15s linear infinite;
}

.card {
  flex: 0 0 5em;
  height: 5em;
  font-size: 1.5rem;
  text-align: center;
  align-content: center;
  border-radius: 0;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@keyframes spin {
  from {
    translate: 0;
  }
  to {
    translate: -100%;
  }
}
</style>
