<script setup lang="ts">
defineOptions({
  name: 'AppFooter',
})
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main-3col">
        <div class="footer-left">
          <span class="brand">FYP</span>
          <p class="footer-desc">
            Wow, you made it to the footer! No bugs here (hopefully). Thanks for stopping by!
          </p>
          <div class="footer-socials">
            <a
              href="mailto:farelyudapratama@gmail.com"
              title="Email"
              target="_blank"
              rel="noopener"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.5m-18 0A2 2 0 0 1 5 5.5h14a2 2 0 0 1 2 2m-18 0 9 6.5 9-6.5"
                />
              </svg>
            </a>
            <a
              href="https://github.com/farelyudapratama"
              title="GitHub"
              target="_blank"
              rel="noopener"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.848-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/farelyudapratama"
              title="LinkedIn"
              target="_blank"
              rel="noopener"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M16 8a6 6 0 0 1 6 6v5.5a.5.5 0 0 1-.5.5H18a.5.5 0 0 1-.5-.5V14a2 2 0 0 0-4 0v5.5a.5.5 0 0 1-.5.5h-3.5a.5.5 0 0 1-.5-.5V8.5a.5.5 0 0 1 .5-.5H9a.5.5 0 0 1 .5.5V9"
                />
                <circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
            <a
              href="https://instagram.com/farelyudapratama"
              title="Instagram"
              target="_blank"
              rel="noopener"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect
                  width="16"
                  height="16"
                  x="4"
                  y="4"
                  rx="4"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5" />
                <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-center">
          <div class="footer-quote">
            <span>Feel free to contact me anytime, anywhere.</span>
            <div class="footer-actions">
              <a href="/contact" class="footer-btn primary">Let's Contact</a>
              <a href="/resume" class="footer-btn secondary" target="_blank" rel="noopener"
                >Resume</a
              >
            </div>
          </div>
        </div>
        <div class="footer-right">
          <div class="footer-links-group">
            <span class="footer-title">Explore</span>
            <nav>
              <a href="/">Home</a>
              <a href="/projects">Projects</a>
              <a href="/about">About</a>
            </nav>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">©2025 Farel Yuda Pratama. All rights reserved.</p>
        <div class="badges" aria-hidden="true">
          <span class="badge">Vue 3</span>
          <span class="badge">TypeScript</span>
          <span class="badge">Vite</span>
          <span class="badge">GSAP</span>
          <span class="badge">Pinia</span>
          <span class="badge">Lucide</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  position: relative;
  left: 0;
  background: var(--color-background);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  z-index: 40;
  padding: 1.25rem 0;
}

.footer-container {
  max-width: 1640px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-main-3col {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}
.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
  flex: 1 1 0;
}
.footer-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
}
.footer-quote {
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  font-style: italic;
  text-align: center;
  margin: 0;
}
.footer-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  flex: 1 1 0;
  justify-content: flex-end;
}
.footer-links-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.7rem;
}
.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}
.badge {
  display: inline-block;
  padding: 0.28rem 0.6rem;
  border-radius: 0.45rem;
  background: rgba(255, 255, 255, 0.012);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.02);
}
.badge:hover,
.badge:focus {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.06);
  color: var(--color-text);
}
.footer-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}
.footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition:
    background 0.15s,
    transform 0.06s;
}
.footer-btn.primary {
  background: var(--color-primary);
  color: #fff;
}
.footer-btn.secondary {
  background: var(--color-secondary, #444);
  color: #fff;
}
.footer-btn:hover {
  transform: translateY(-1px);
}
.footer-btn:active {
  transform: translateY(0);
}
.footer-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 0.2rem;
  align-self: flex-end;
}
.footer-links-group nav {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-end;
}
.footer-links-group a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
  text-align: right;
}
.footer-links-group a:hover {
  color: var(--color-primary);
}
.footer-desc {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.footer-socials {
  display: flex;
  gap: 0.7rem;
  margin-top: 0.2rem;
}
.footer-socials a {
  color: var(--color-text-secondary);
  transition: color 0.2s;
}
.footer-socials a:hover {
  color: var(--color-primary);
}
.brand {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-text);
}
.footer-copyright {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding-top: 1rem;
}

.footer-bottom .badges {
  justify-content: flex-end;
  opacity: 0.78;
}
@media (max-width: 1200px) {
  .footer-main-3col {
    flex-direction: column;
    gap: 2rem;
    align-items: stretch;
  }
  .footer-center {
    margin: 1.5rem 0 0 0;
  }
  .footer-right {
    flex-direction: column;
    align-items: flex-end;
    gap: 1.5rem;
  }
  .footer-links-group {
    align-items: flex-end;
  }
}
@media (max-width: 900px) {
  .footer-main-3col {
    flex-direction: column;
    gap: 2rem;
  }
  .footer-right {
    flex-direction: column;
    align-items: flex-end;
    gap: 1.5rem;
  }
  .footer-links-group {
    align-items: flex-end;
  }
}
@media (max-width: 600px) {
  .footer-main-3col {
    flex-direction: column;
    gap: 1.5rem;
  }
  .footer {
    padding: 2rem 0.5rem 1rem 0.5rem;
  }
  .footer-right {
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }
  .footer-center {
    margin: 1rem 0 0 0;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }
  .footer-bottom .badges {
    justify-content: center;
  }
  .badge {
    padding: 0.18rem 0.45rem;
    font-size: 0.82rem;
  }
}
</style>
