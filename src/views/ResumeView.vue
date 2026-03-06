<script setup lang="ts">
import { computed } from 'vue'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  ExternalLink,
} from 'lucide-vue-next'
import { useLanguageStore } from '@/stores/language'
import { resumeData } from '@/data/resume'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Resume - Farel Yuda Pratama',
  meta: [
    {
      name: 'description',
      content: 'View the professional resume of Farel Yuda Pratama, including education, experience, and skills as a Full-Stack and Android Developer.',
    },
  ],
})

const languageStore = useLanguageStore()
const currentLang = computed(() => languageStore.currentLang || 'id')

const textLabels = {
  resumeTitle: { id: 'Resume', en: 'Resume' },
  personalInfo: { id: 'Informasi Pribadi', en: 'Personal Information' },
  contact: { id: 'Kontak', en: 'Contact' },
  experience: { id: 'Pengalaman Kerja', en: 'Work Experience' },
  education: { id: 'Pendidikan', en: 'Education' },
  skills: { id: 'Keahlian', en: 'Skills' },
  projects: { id: 'Proyek', en: 'Projects' },
  present: { id: 'Sekarang', en: 'Present' },
  viewProject: { id: 'Lihat Proyek', en: 'View Project' },
}
</script>

<template>
  <div class="resume-container">
    <header class="resume-header">
      <div class="header-content">
        <div class="personal-info">
          <h1 class="name">{{ resumeData.personalInfo.name[currentLang] }}</h1>
          <h2 class="title">{{ resumeData.personalInfo.title[currentLang] }}</h2>

          <div class="summary">
            <p
              v-for="(paragraph, index) in resumeData.personalInfo.summary[currentLang]"
              :key="index"
              class="summary-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="contact-info">
          <h3 class="section-subtitle">{{ textLabels.contact[currentLang] }}</h3>
          <div class="contact-item">
            <Mail class="contact-icon" />
            <span>{{ resumeData.personalInfo.email }}</span>
          </div>
          <div class="contact-item">
            <Phone class="contact-icon" />
            <span>{{ resumeData.personalInfo.phone }}</span>
          </div>
          <div class="contact-item">
            <MapPin class="contact-icon" />
            <span>{{ resumeData.personalInfo.location[currentLang] }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="resume-main">
      <!-- Experience Section -->
      <section class="resume-section">
        <div class="section-header">
          <Briefcase class="section-icon" />
          <h2 class="section-title">{{ textLabels.experience[currentLang] }}</h2>
        </div>

        <div v-for="exp in resumeData.experiences" :key="exp.id" class="experience-item">
          <div class="experience-header">
            <h3 class="job-title">{{ exp.position[currentLang] }}</h3>
            <span class="company">{{ exp.company[currentLang] }}</span>
          </div>

          <div class="experience-details">
            <div class="period">
              <Calendar class="period-icon" />
              <span>{{ exp.period[currentLang] }}</span>
            </div>
          </div>

          <ul class="experience-description">
            <li v-for="(desc, index) in exp.description[currentLang]" :key="index">
              {{ desc }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Education Section -->
      <section class="resume-section">
        <div class="section-header">
          <GraduationCap class="section-icon" />
          <h2 class="section-title">{{ textLabels.education[currentLang] }}</h2>
        </div>

        <div v-for="edu in resumeData.education" :key="edu.id" class="education-item">
          <div class="education-header">
            <h3 class="degree">{{ edu.degree[currentLang] }}</h3>
            <span class="institution">{{ edu.institution[currentLang] }}</span>
          </div>

          <div class="education-details">
            <div class="field">{{ edu.field[currentLang] }}</div>
            <div class="period">
              <Calendar class="period-icon" />
              <span>{{ edu.period[currentLang] }}</span>
            </div>
          </div>

          <p v-if="edu.description" class="education-description">
            {{ edu.description[currentLang] }}
          </p>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="resume-section">
        <div class="section-header">
          <Code class="section-icon" />
          <h2 class="section-title">{{ textLabels.skills[currentLang] }}</h2>
        </div>

        <div v-for="skill in resumeData.skills" :key="skill.id" class="skills-category">
          <h3 class="category-title">{{ skill.category[currentLang] }}</h3>
          <div class="skills-list">
            <span v-for="(item, index) in skill.items" :key="index" class="skill-item">
              {{ item[currentLang] }}
            </span>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="resume-section">
        <div class="section-header">
          <FileText class="section-icon" />
          <h2 class="section-title">{{ textLabels.projects[currentLang] }}</h2>
        </div>

        <div v-for="project in resumeData.projects" :key="project.id" class="project-item">
          <h3 class="project-title">{{ project.title[currentLang] }}</h3>
          <p class="project-description">{{ project.description[currentLang] }}</p>

          <div class="technologies">
            <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">
              {{ tech }}
            </span>
          </div>

          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link"
          >
            <span>{{ textLabels.viewProject[currentLang] }}</span>
            <ExternalLink class="link-icon" />
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--color-background);
  color: var(--color-text);
}

.resume-header {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.header-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.personal-info .name {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  color: var(--color-heading);
}

.personal-info .title {
  font-size: 1.5rem;
  margin: 0 0 1.5rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.summary {
  margin-top: 1.5rem;
}

.summary-paragraph {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  margin: 0 0 1rem;
  color: var(--color-heading);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0;
}

.contact-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--color-primary);
}

.resume-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.resume-section {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.section-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary);
}

.section-title {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-heading);
}

.experience-item,
.education-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.experience-item:last-child,
.education-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.experience-header,
.education-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.job-title,
.degree {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
}

.company,
.institution {
  font-size: 1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.experience-details,
.education-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.field {
  font-style: italic;
}

.period {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
}

.period-icon {
  width: 1rem;
  height: 1rem;
}

.experience-description {
  margin: 0;
  padding-left: 1.2rem;
}

.experience-description li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.education-description {
  margin: 0.5rem 0 0;
  font-style: italic;
  color: var(--color-text-secondary);
}

.skills-category {
  margin-bottom: 1.5rem;
}

.skills-category:last-child {
  margin-bottom: 0;
}

.category-title {
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
  color: var(--color-heading);
  font-weight: 600;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  background-color: var(--color-surface);
  color: var(--color-text);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  border: 1px solid var(--color-border);
}

.project-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.project-title {
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  color: var(--color-heading);
}

.project-description {
  margin: 0.5rem 0;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.tech-tag {
  background-color: var(--color-primary-light);
  color: var(--color-primary-contrast);
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.5rem;
}

.project-link:hover {
  color: var(--color-primary-hover);
}

.link-icon {
  width: 1rem;
  height: 1rem;
}

/* Responsive design */
@media (max-width: 900px) {
  .resume-main {
    grid-template-columns: 1fr;
  }

  .header-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .resume-container {
    padding: 1rem;
  }

  .resume-header {
    padding: 1.5rem;
  }

  .experience-header,
  .education-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .experience-details,
  .education-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .personal-info .name {
    font-size: 2rem;
  }

  .personal-info .title {
    font-size: 1.2rem;
  }
}
</style>
