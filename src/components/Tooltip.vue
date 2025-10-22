<script setup lang="ts">
defineOptions({ name: 'CustomTooltip' })

interface TooltipProps {
  text: string
  x: number
  y: number
}
const props = defineProps<TooltipProps>()
</script>

<template>
  <div class="custom-tooltip" :style="{ left: props.x + 'px', top: props.y + 'px' }">
    {{ props.text }}
  </div>
</template>

<style scoped>
.custom-tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  pointer-events: none;
  transform: translateY(-50%);
  white-space: nowrap;
  z-index: 9999;
  opacity: 0;
  animation: fade-in 0.15s ease forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
