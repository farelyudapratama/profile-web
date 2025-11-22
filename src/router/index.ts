import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
// import AboutView from '../views/AboutView.vue'
import ResumeView from '../views/ResumeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import WorkInProgressView from '../views/WorkInProgressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
      props: true,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumeView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: WorkInProgressView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: WorkInProgressView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
