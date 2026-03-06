<template>
  <div class="contact">
    <h1>Contact Me</h1>
    <p>Feel free to reach out to me through any of the following channels:</p>
    
    <div class="contact-info">
      <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <span>email@example.com</span>
      </div>
      <div class="contact-item">
        <i class="fab fa-github"></i>
        <span>github.com/username</span>
      </div>
      <div class="contact-item">
        <i class="fab fa-linkedin"></i>
        <span>linkedin.com/in/username</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Contact - Farel Yuda Pratama',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Farel Yuda Pratama for collaborations, freelance work, or any inquiries about web and Android development.',
    },
  ],
})
</script>

<style scoped>
.contact {
  padding: 2rem;
}

h1 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text);
  margin-bottom: 2rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-mute);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: var(--color-background);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-item i {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.contact-item span {
  color: var(--color-text);
  font-size: 1.1rem;
}
</style>