<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'

interface ContextMenuItem {
  label: string
  action?: () => void
  disabled?: boolean
  separator?: boolean
}

interface Props {
  visible: boolean
  x: number
  y: number
  items: ContextMenuItem[]
  adjustPosition?: (rect: DOMRect, vw: number, vh: number) => { x: number; y: number }
}

const props = withDefaults(defineProps<Props>(), {
  adjustPosition: undefined,
})

const emit = defineEmits<{
  close: []
}>()

const menuRef = ref<HTMLElement | null>(null)

// Position adjustment logic
const adjustedX = ref(props.x)
const adjustedY = ref(props.y)

const updatePosition = () => {
  if (!menuRef.value || !props.visible) return

  const menu = menuRef.value
  const rect = menu.getBoundingClientRect()
  let x = props.x
  let y = props.y

  const vw = window.innerWidth
  const vh = window.innerHeight

  if (x + rect.width > vw) {
    x = Math.max(8, x - rect.width)
  }
  if (y + rect.height > vh) {
    y = Math.max(8, vh - rect.height - 8)
  }

  if (props.adjustPosition) {
    const customAdjust = props.adjustPosition(rect, vw, vh)
    x = customAdjust.x
    y = customAdjust.y
  }

  adjustedX.value = x
  adjustedY.value = y
}

watch(
  () => [props.visible, props.x, props.y, props.items],
  async ([visible]) => {
    if (visible) {
      await nextTick()
      updatePosition()
    }
  },
  { immediate: true },
)

const handleClickOutside = (event: Event) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    emit('close')
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  if (props.visible) {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  },
  { immediate: true },
)

const handleItemClick = (item: ContextMenuItem, e: MouseEvent) => {
  e.stopPropagation()
  if (item.disabled || !item.action) return
  item.action()
  emit('close')
}

const handleItemRightClick = (item: ContextMenuItem, e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (item.disabled || !item.action) return
  item.action()
  emit('close')
}

const filteredItems = computed(() => {
  return props.items.filter((item, index) => {
    if (item.separator && index === 0) return false
    if (item.separator && index === props.items.length - 1) return false
    if (item.separator && props.items[index - 1]?.separator) return false
    return true
  })
})
</script>

<template>
  <!-- Gunakan teleport ke body untuk memastikan z-index bekerja dan tidak terhalang overflow -->
  <Teleport to="body">
    <div
      v-if="visible"
      ref="menuRef"
      class="reusable-context-menu"
      :style="{ left: x + 'px', top: y + 'px' }"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="reusable-context-item-wrapper"
      >
        <div v-if="item.separator" class="reusable-context-separator"></div>
        <button
          v-else
          class="reusable-context-item"
          :class="{ disabled: item.disabled }"
          :aria-disabled="item.disabled"
          @click="(e) => handleItemClick(item, e)"
          @contextmenu="(e) => handleItemRightClick(item, e)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.reusable-context-menu {
  position: fixed;
  z-index: 60;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  padding: 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px; /* Tambahkan min-width agar tidak terlalu sempit */
}

.reusable-context-item-wrapper {
  display: flex;
}

.reusable-context-item {
  background: transparent;
  border: none;
  padding: 0.45rem 0.75rem;
  color: var(--color-text);
  font-size: 1.3rem;
  text-align: left;
  cursor: pointer;
  border-radius: 0.35rem;
  width: 100%; /* Agar button mengisi wrapper */
}

.reusable-context-item:hover:not(.disabled) {
  background: var(--color-background-soft);
}

.reusable-context-item.disabled {
  opacity: 0.45;
  pointer-events: none;
  cursor: not-allowed;
}

.reusable-context-separator {
  height: 1px;
  background: var(--color-border);
  margin: 0.25rem 0;
}
</style>
