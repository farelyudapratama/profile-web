<script setup lang="ts">
defineOptions({
  name: 'AppFooter',
})

import { useLanguageStore } from '@/stores/language'

const lang = useLanguageStore()
const t = (key: string) => {
  const strings: Record<string, Record<string, string>> = {
    footerDesc: {
      en: 'Wow, you made it to the footer! No bugs here (hopefully). Thanks for stopping by!',
      id: 'Wow, kamu sampai di footer! Semoga tidak ada bug di sini. Terima kasih sudah mampir!',
    },
    contactMe: {
      en: 'Feel free to contact me anytime, anywhere.',
      id: 'Jangan ragu untuk menghubungi saya kapan saja, di mana saja.',
    },
    letsContact: {
      en: "Let's Contact",
      id: 'Hubungi aku',
    },
  }
  return strings[key] ? (strings[key][lang.currentLang] ?? strings[key].en) : key
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main-3col">
        <div class="footer-left">
          <span class="brand">FYP</span>
          <p class="footer-desc">
            {{ t('footerDesc') }}
          </p>
          <div class="footer-socials">
            <a
              href="mailto:farelyudapratama51@gmail.com"
              title="Email"
              target="_blank"
              rel="noopener"
            >
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
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
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M12 1.545c-6.055 0-10.957 4.877-10.957 10.883c0 4.41 2.643 8.205 6.447 9.912c.398.179.787.108 1.091-.12a1.38 1.38 0 0 0 .532-1.107v-.57l-1.357-.184a.489.489 0 0 1-.03-.005c-.748-.146-1.253-.409-1.623-.788c-.311-.319-.501-.701-.662-1.025l-.056-.113a11.645 11.645 0 0 0-.487-.91c-.135-.214-.24-.324-.344-.393c-.264-.175-.518-.472-.518-.843a.72.72 0 0 1 .26-.56a.844.844 0 0 1 .546-.182c.222 0 .431.068.605.146c.178.08.355.186.52.296c.402.268.798.585 1.133.976c.349.406.596.664.968.717c.306.044.618.045.861.034a2.558 2.558 0 0 1 .166-.56a8.347 8.347 0 0 1-.877-.256c-.654-.232-1.383-.593-1.873-1.14c-.538-.602-.871-1.139-1.057-1.767c-.181-.612-.211-1.275-.211-2.091c0-1.25.541-2.303.947-2.862a8.655 8.655 0 0 1-.335-1.501a3.515 3.515 0 0 1 .001-.968c.05-.293.175-.653.504-.87c.317-.211.689-.202.979-.148c.301.057.614.182.902.325c.469.232.935.542 1.284.805c.602-.177 1.667-.405 2.63-.426h.022c.964.021 1.981.249 2.568.425c.35-.262.815-.573 1.283-.804c.288-.143.6-.268.902-.325c.29-.054.662-.063.98.147c.328.218.454.578.503.871c.051.305.039.646 0 .968a8.661 8.661 0 0 1-.334 1.501c.406.56.947 1.613.947 2.862c0 .816-.03 1.479-.21 2.09c-.187.63-.52 1.166-1.058 1.768c-.49.547-1.219.908-1.873 1.14a8.45 8.45 0 0 1-1.062.297c.123.372.167.673.167.846v3.09c0 .47.219.871.53 1.105c.302.229.69.3 1.088.126c3.84-1.692 6.514-5.497 6.514-9.93c0-6.005-4.9-10.882-10.956-10.882ZM9.476 18.71c-.26.037-.001 0-.001 0h-.003l-.008.002l-.029.004a6.523 6.523 0 0 1-.447.037a5.782 5.782 0 0 1-1.066-.043c-.791-.112-1.272-.672-1.583-1.036l-.03-.034a3.6 3.6 0 0 0-.327-.333c.103.19.21.402.325.63l.01.02l.051.104c.175.348.29.58.481.774c.186.19.476.374 1.062.49l1.794.243a.522.522 0 0 1 .452.518v1.027c0 .8-.375 1.513-.95 1.945a2.087 2.087 0 0 1-2.143.236C2.902 21.427 0 17.27 0 12.428C0 5.836 5.377.5 12 .5s12 5.336 12 11.928c0 4.867-2.939 9.035-7.137 10.886a2.09 2.09 0 0 1-2.137-.247a2.426 2.426 0 0 1-.946-1.942v-3.09c0-.07-.049-.474-.322-1.017a.524.524 0 0 1 .408-.755a7.187 7.187 0 0 0 1.504-.356c.594-.21 1.127-.498 1.444-.852c.471-.526.706-.93.835-1.367c.134-.453.168-.98.168-1.793c0-1.141-.6-2.1-.876-2.409a.523.523 0 0 1-.104-.523a7.82 7.82 0 0 0 .375-1.554c.032-.275.034-.505.006-.671a.457.457 0 0 0-.054-.173a.486.486 0 0 0-.207.009c-.17.032-.387.112-.633.234c-.49.242-1 .6-1.316.856a.52.52 0 0 1-.505.085A9.306 9.306 0 0 0 12 7.296c-1.007.024-2.169.31-2.566.453a.52.52 0 0 1-.505-.085a7.775 7.775 0 0 0-1.316-.856a2.607 2.607 0 0 0-.634-.234a.486.486 0 0 0-.206-.009a.456.456 0 0 0-.054.173c-.028.166-.026.396.006.671A7.89 7.89 0 0 0 7.1 8.963c.063.18.024.38-.104.523c-.276.309-.876 1.268-.876 2.409c0 .812.034 1.34.168 1.793c.13.437.364.84.834 1.367c.318.354.85.642 1.445.852a7.194 7.194 0 0 0 1.503.356a.522.522 0 0 1 .246.945c-.165.118-.274.33-.335.575a1.944 1.944 0 0 0-.056.385v.019a.523.523 0 0 1-.449.523Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/farel-yuda-pratama/"
              title="LinkedIn"
              target="_blank"
              rel="noopener"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 1025 1024"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M896.428 1024h-768q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5h768q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5zm-640-864q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5v-64zm0 192q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v512q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5V352zm640 160q0-80-56-136t-136-56q-44 0-96.5 14t-95.5 39v-21q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v512q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5V576q0-53 37.5-90.5t90.5-37.5t90.5 37.5t37.5 90.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5V512z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/yudhart_fp"
              title="Instagram"
              target="_blank"
              rel="noopener"
            >
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
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
            <span>{{ t('contactMe') }}</span>
            <div class="footer-actions">
              <a href="/contact" class="footer-btn primary">{{ t('letsContact') }}</a>
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
        <div class="badges">
          Build with:
          <a class="badge" href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
          <a class="badge" href="https://www.typescriptlang.org/" target="_blank" rel="noopener"
            >TypeScript</a
          >
          <a class="badge" href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>
          <a class="badge" href="https://greensock.com/gsap/" target="_blank" rel="noopener"
            >GSAP</a
          >
          <a class="badge" href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>
          <a class="badge" href="https://lucide.dev/" target="_blank" rel="noopener">Lucide</a>
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
  border-top: 1px solid var(--color-border);
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
  font-size: 1.25rem;
  font-style: italic;
  text-align: center;
  margin: 0;
}
.footer-quote span {
  font-weight: 500;
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
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid var(--color-border);
}
.badge:hover,
.badge:focus {
  background: var(--color-background-dark);
  border-color: var(--color-text);
  color: var(--color-background);
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
  text-decoration: none;
  font-weight: 600;
  transition:
    background 0.15s,
    transform 0.06s;
}
.footer-btn.primary {
  background: var(--color-primary);
  color: var(--color-background);
  transition:
    background 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-btn.secondary {
  background: var(--color-secondary, #444);
  color: #fff;
  transition:
    background 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-btn:hover {
  transform: translateY(-2px) scale(1.03);
  background: var(--color-accent-green);
  color: var(--color-text);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
}
.footer-btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: none;
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
  font-weight: 500;
  transition: color 0.2s;
  text-align: right;
}
.footer-links-group a:hover {
  color: var(--color-primary);
}
.footer-desc {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
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
  font-weight: 700;
  margin: 0;
}
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

.footer-bottom .badges {
  justify-content: flex-end;
}
</style>
