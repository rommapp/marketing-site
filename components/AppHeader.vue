<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faBars,
  faXmark,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

defineProps<{
  githubStars: number;
}>();

// Replaced with the release number by the deploy workflow (sed on this file).
const version = "v<romm_version>";

const menuOpen = ref(false);

const { theme, toggle: toggleTheme, init: initTheme } = useTheme();
onMounted(initTheme);

const navItems = [
  { label: "Docs", href: "https://docs.romm.app" },
  { label: "Demo", href: "https://demo.romm.app" },
  { label: "Contact", href: "mailto:contact@romm.app" },
];
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-grid bg-ink-950/85 backdrop-blur-md"
  >
    <nav
      class="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6"
    >
      <div class="flex items-center gap-3">
        <a
          href="/"
          aria-label="RomM home"
          class="flex flex-row items-center gap-2"
        >
          <img src="/images/blocks/logos/romm.svg" alt="" class="h-7 w-7" />
          <img src="/images/blocks/logos/logotipo.svg" alt="" class="h-5" />
        </a>
        <a
          href="https://github.com/rommapp/romm/releases/latest"
          target="_blank"
          rel="noopener"
          aria-label="Latest RomM release"
          class="hidden border border-grid px-1.5 py-0.5 font-mono text-xs text-primary-300 transition-colors hover:border-primary-400 sm:block"
        >
          {{ version }}
        </a>
      </div>

      <div class="hidden items-center gap-9 md:flex">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="font-mono text-sm font-medium capitalize tracking-[0.2em] transition-colors hover:text-cream"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="flex items-center gap-1">
        <button
          type="button"
          :title="
            theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
          "
          :aria-label="
            theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
          "
          class="flex h-9 w-9 items-center justify-center text-cream transition-colors hover:text-primary-300"
          @click="toggleTheme"
        >
          <FontAwesomeIcon
            :icon="theme === 'light' ? faMoon : faSun"
            class="h-3.5"
          />
        </button>
        <a
          href="https://opencollective.com/romm"
          target="_blank"
          rel="noopener"
          title="Support the project"
          aria-label="Support the project on Open Collective"
          class="hidden h-9 w-9 items-center justify-center transition-colors hover:text-primary-300 sm:flex"
        >
          <FontAwesomeIcon :icon="faHeart" class="h-3.5" />
        </a>
        <a
          href="https://discord.gg/RGPJHNMMwJ"
          target="_blank"
          rel="noopener"
          title="Join the Discord"
          aria-label="Join the RomM Discord"
          class="hidden h-9 w-9 items-center justify-center transition-colors hover:text-primary-300 sm:flex"
        >
          <FontAwesomeIcon :icon="faDiscord" class="h-3.5" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          title="GitHub repository"
          :aria-label="`RomM on GitHub — ${githubStars.toLocaleString()} stars`"
          class="ml-1 flex h-9 items-center gap-2 px-3 font-mono text-xs text-cream transition-colors hover:text-primary-300"
        >
          <FontAwesomeIcon :icon="faGithub" class="h-4" />
          <span aria-hidden="true">{{ (githubStars / 1000).toFixed(1) }}K</span>
        </a>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center text-cream md:hidden"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" class="h-4" />
        </button>
      </div>
    </nav>

    <div
      v-if="menuOpen"
      id="mobile-nav"
      class="mx-auto max-w-[88rem] border-x border-b border-grid bg-ink-900 md:hidden"
    >
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="block border-b border-grid px-6 py-4 font-mono text-sm font-medium capitalize tracking-[0.2em] last:border-b-0 hover:text-cream"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
