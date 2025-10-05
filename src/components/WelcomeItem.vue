<script setup lang="ts">
import { ref } from 'vue'

const aboutMe = ref(
  'Saya masih di awal perjalanan saya di dunia teknologi, khususnya di pengembangan aplikasi dan AI. Saya senang mencoba hal baru, belajar dari proses, dan menemukan cara agar teknologi bisa bermanfaat dalam kehidupan sehari-hari. Portofolio ini adalah catatan kecil dari apa yang sudah saya pelajari sejauh ini.',
)

const learningApproach = ref(
  'Saya menempatkan proses belajar sebagai prioritas: bereksperimen, gagal cepat, lalu memperbaiki. Pendekatan saya praktis — membangun proyek nyata sebagai cara memahami konsep. Saya suka tantangan yang memaksa struktur berpikir dan meningkatkan kemampuan teknis secara nyata.',
)
</script>

<template>
  <div class="item">
    <i class="icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#42b983" stroke-width="2" fill="#e0f7fa" />
        <path
          d="M12 8v4l3 2"
          stroke="#42b983"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </i>
    <div class="details">
      <h3>Tentang Saya</h3>
      <p>{{ aboutMe }}</p>
      <h3>Cara Belajar</h3>
      <p>{{ learningApproach }}</p>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
  background: linear-gradient(90deg, #e0f7fa 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(66, 185, 131, 0.08);
  padding: 2rem 1.5rem;
  align-items: flex-start;
  transition: box-shadow 0.2s;
}
.item:hover {
  box-shadow: 0 8px 32px rgba(66, 185, 131, 0.15);
}

.details {
  flex: 1;
  margin-left: 1.5rem;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.1);
  border: 2px solid #42b983;
}

h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #42b983;
  letter-spacing: 0.5px;
}

p {
  font-size: 1.05rem;
  color: #333;
  margin-bottom: 1.2rem;
  line-height: 1.7;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 2rem 2.5rem;
  }
}
</style>
