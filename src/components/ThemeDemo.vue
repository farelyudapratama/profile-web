<template>
  <div class="theme-demo">
    <div class="demo-section">
      <h2 class="heading-2">🎨 Theme Demo</h2>
      <p class="text-muted">Showcase of the custom theme system</p>
    </div>

    <div class="demo-grid">
      <!-- Color Palette -->
      <div class="card">
        <h3 class="heading-3">Color Palette</h3>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-swatch bg-primary"></div>
            <span>Primary</span>
          </div>
          <div class="color-item">
            <div class="color-swatch bg-accent-blue"></div>
            <span>Blue</span>
          </div>
          <div class="color-item">
            <div class="color-swatch bg-accent-green"></div>
            <span>Green</span>
          </div>
          <div class="color-item">
            <div class="color-swatch bg-accent-red"></div>
            <span>Red</span>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="card">
        <h3 class="heading-3">Buttons</h3>
        <div class="button-grid">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-outline">Outline</button>
          <button class="btn btn-accent-blue">Blue</button>
          <button class="btn btn-accent-green">Green</button>
          <button class="btn btn-accent-red">Red</button>
        </div>
      </div>

      <!-- Typography -->
      <div class="card">
        <h3 class="heading-3">Typography</h3>
        <div class="typography-demo">
          <h1 class="heading-1">Heading 1</h1>
          <h2 class="heading-2">Heading 2</h2>
          <h3 class="heading-3">Heading 3</h3>
          <p class="text-default">Default text paragraph</p>
          <p class="text-muted">Muted text paragraph</p>
        </div>
      </div>

      <!-- Form Elements -->
      <div class="card">
        <h3 class="heading-3">Form Elements</h3>
        <div class="form-demo">
          <input type="text" class="input" placeholder="Enter text here..." />
          <input type="email" class="input" placeholder="Email address" />
          <div class="divider"></div>
          <button class="btn btn-primary">Submit Form</button>
        </div>
      </div>
    </div>

    <!-- Current Theme Info -->
    <div class="card theme-info">
      <h3 class="heading-3">Theme Information</h3>
      <div class="theme-details">
        <p><strong>Current Mode:</strong> {{ themeStore.themeMode }}</p>
        <p><strong>Active Theme:</strong> {{ themeStore.currentTheme }}</p>
        <p><strong>System Preference:</strong> {{ systemPreference }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const systemPreference = ref<string>('unknown')

onMounted(() => {
  // Get system preference
  const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches
  systemPreference.value = isDarkSystem ? 'dark' : 'light'

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    systemPreference.value = e.matches ? 'dark' : 'light'
  })
})
</script>

<style scoped>
.theme-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-section {
  text-align: center;
  margin-bottom: 3rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.color-swatch {
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  border: 2px solid var(--color-border);
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.typography-demo {
  margin-top: 1rem;
}

.typography-demo > * {
  margin-bottom: 0.75rem;
}

.form-demo {
  margin-top: 1rem;
}

.form-demo .input {
  width: 100%;
  margin-bottom: 1rem;
}

.theme-info {
  grid-column: 1 / -1;
}

.theme-details {
  margin-top: 1rem;
}

.theme-details p {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .theme-demo {
    padding: 1rem;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .button-grid {
    flex-direction: column;
  }

  .color-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
