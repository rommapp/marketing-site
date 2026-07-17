<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

defineProps<{
  githubStars: number;
}>();

// Replaced with the release number by the deploy workflow (sed on this file).
const version = "v<romm_version>";

const menuOpen = ref(false);

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
      class="mx-auto flex h-16 max-w-[88rem] items-center justify-between border-grid px-4 sm:px-6"
    >
      <div class="flex items-center gap-3">
        <a href="#" class="flex flex-row items-center gap-2">
          <img
            src="/images/blocks/logos/romm.svg"
            alt="RomM logo"
            class="h-7 w-7"
          />
          <img
            src="/images/blocks/logos/logotipo.svg"
            alt="RomM logotype"
            class="h-5"
          />
        </a>
        <a
          href="https://github.com/rommapp/romm/releases/latest"
          target="_blank"
          rel="noopener"
          class="hidden border border-grid px-1.5 py-0.5 font-mono text-[10px] text-primary-300 transition-colors hover:border-primary-400 sm:block"
        >
          {{ version }}
        </a>
      </div>

      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-cream"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="https://opencollective.com/romm"
          target="_blank"
          rel="noopener"
          title="Support the project"
          class="hidden h-9 w-9 items-center justify-center border border-grid transition-colors hover:border-primary-400 hover:text-primary-300 sm:flex"
        >
          <FontAwesomeIcon :icon="faHeart" class="h-3.5" />
        </a>
        <a
          href="https://discord.gg/RGPJHNMMwJ"
          target="_blank"
          rel="noopener"
          title="Join the Discord"
          class="hidden h-9 w-9 items-center justify-center border border-grid transition-colors hover:border-primary-400 hover:text-primary-300 sm:flex"
        >
          <FontAwesomeIcon :icon="faDiscord" class="h-3.5" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          title="GitHub repository"
          class="flex h-9 items-center gap-2 border border-grid px-3 font-mono text-xs text-cream transition-colors hover:border-primary-400 hover:text-primary-300"
        >
          <FontAwesomeIcon :icon="faGithub" class="h-4" />
          <span>{{ (githubStars / 1000).toFixed(1) }}K</span>
        </a>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center border border-grid text-cream md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" class="h-4" />
        </button>
      </div>
    </nav>

    <div
      v-if="menuOpen"
      class="mx-auto max-w-[88rem] border-b border-grid bg-ink-900 md:hidden"
    >
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="block border-b border-grid px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] last:border-b-0 hover:text-cream"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
