import { ref, computed, nextTick } from 'vue'
import { projects as allProjects, type Project as ProjectType } from '@/data/projects'
import { useLanguageStore } from '@/stores/language'

type Project = ProjectType

interface ProjectContextMenuOptions {
  onEnlargeImage?: (projectId: number | null) => void
}

export function useProjectContextMenu(options: ProjectContextMenuOptions = {}) {
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

  // We'll return a function that can be used to handle image modal opening
  // This is handled by the parent component now
  const openImageFor = (projectId: number | null) => {
    // This function now just returns the project data needed by parent
    const p = projects.value.find((x) => x.id === projectId)
    if (p) {
      return {
        images: [...(p.images || []), ...(p.architectureImage ? [p.architectureImage] : [])],
        title: p.title[useLanguageStore().currentLang],
        startIndex: 0, // default to first image
      }
    }
    return null
  }

  // Function to get project data for image modal
  const getProjectImageData = (projectId: number | null) => {
    const p = projects.value.find((x) => x.id === projectId)
    if (!p) return null

    // Build all images array
    const images = p.images || []
    if (p.architectureImage) {
      return {
        images: [...images, p.architectureImage],
        title: p.title[useLanguageStore().currentLang] || p.title.en,
      }
    }
    return {
      images: images,
      title: p.title[useLanguageStore().currentLang] || p.title.en,
    }
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
        action: () => {
          if (options.onEnlargeImage) {
            options.onEnlargeImage(selectedProject.value?.id || null)
          }
          closeContextMenu()
        },
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
    getProjectImageData,
    openImageFor: getProjectImageData, // Keep the same name for compatibility
  }
}
