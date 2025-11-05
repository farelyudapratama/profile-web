import { ref, computed, nextTick } from 'vue'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

type Project = ProjectType

export function useProjectContextMenu() {
  const projects = ref<Project[]>(allProjects)
  
  const contextMenuState = ref({
    visible: false,
    x: 0,
    y: 0,
    projectId: null as number | null,
  })

  const lang = useLanguageStore()
  const t = (key: string) => {
    const strings: Record<string, Record<string, string>> = {
      openGithub: { en: 'Open GitHub', id: 'Buka GitHub' },
      openLiveDemo: { en: 'Open Live Demo', id: 'Buka Demo' },
      enlargeImage: { en: 'Enlarge Image', id: 'Perbesar Gambar' },
    }
    return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
  }

  const selectedProject = computed(() => {
    const id = contextMenuState.value.projectId
    if (id == null) return null
    return projects.value.find((p) => p.id === id) ?? null
  })

  async function showContextMenu(projectId: number | null, x: number, y: number) {
    contextMenuState.value = { visible: true, x, y, projectId }
    await nextTick()
    const menu = document.querySelector<HTMLElement>('.context-menu')
    if (!menu) return
    const rect = menu.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    let nx = x
    let ny = y

    if (x + rect.width > vw) nx = Math.max(8, x - rect.width)
    if (y + rect.height > vh) ny = Math.max(8, vh - rect.height - 8)

    contextMenuState.value.x = nx
    contextMenuState.value.y = ny
  }

  const closeContextMenu = () => {
    contextMenuState.value.visible = false
  }

  const openGithubFor = (projectId: number | null) => {
    const p = projects.value.find((x) => x.id === projectId)
    if (p && p.github) {
      window.open(p.github, '_blank')
    }
    closeContextMenu()
  }

  const openLiveDemoFor = (projectId: number | null) => {
    const p = projects.value.find((x) => x.id === projectId)
    if (p && p.demo) {
      window.open(p.demo, '_blank')
    }
    closeContextMenu()
  }

  const modal = ref({ visible: false, src: '', title: '' })

  const openImageFor = (projectId: number | null) => {
    const p = projects.value.find((x) => x.id === projectId)
    if (p) {
      modal.value = {
        visible: true,
        src: p.images[0],
        title: p.title[useLanguageStore().currentLang],
      }
    }
    closeContextMenu()
  }

  function closeModal() {
    modal.value.visible = false
  }

  const contextMenuItems = computed(() => {
    const project = selectedProject.value
    if (!project) return []

    const items = [
      {
        label: t('openGithub'),
        action: () => openGithubFor(project.id),
        disabled: !project.github,
      },
      {
        label: t('openLiveDemo'),
        action: () => openLiveDemoFor(project.id),
        disabled: !project.demo,
      },
      { separator: true, label: '' },
      {
        label: t('enlargeImage'),
        action: () => openImageFor(project.id),
      },
    ]

    return items
  })

  return {
    contextMenuState,
    selectedProject,
    contextMenuItems,
    showContextMenu,
    closeContextMenu,
    modal,
    openImageFor,
    closeModal,
  }
}