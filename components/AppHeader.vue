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
    <!-- signal strip -->
    <div
      aria-hidden="true"
      class="h-px w-full bg-gradient-to-r from-transparent via-cyber-400/60 to-transparent"
    />
    <nav
      class="mx-auto flex h-16 max-w-[88rem] items-center justify-between border-x border-grid px-4 sm:px-6"
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
          class="bevel-out hidden rounded-full border border-grid bg-ink-900/80 px-2.5 py-0.5 font-mono text-[10px] text-cyber-300 transition-colors hover:border-cyber-400/70 sm:block"
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
          class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors hover:text-chrome"
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
          class="bevel-out hidden h-9 w-9 items-center justify-center rounded border border-grid bg-ink-900/60 transition-colors hover:border-primary-400 hover:text-primary-300 sm:flex"
        >
          <FontAwesomeIcon :icon="faHeart" class="h-3.5" />
        </a>
        <a
          href="https://discord.gg/RGPJHNMMwJ"
          target="_blank"
          rel="noopener"
          title="Join the Discord"
          class="bevel-out hidden h-9 w-9 items-center justify-center rounded border border-grid bg-ink-900/60 transition-colors hover:border-primary-400 hover:text-primary-300 sm:flex"
        >
          <FontAwesomeIcon :icon="faDiscord" class="h-3.5" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          title="GitHub repository"
          class="bevel-out flex h-9 items-center gap-2 rounded border border-grid bg-ink-900/60 px-3 text-xs font-semibold text-chrome transition-colors hover:border-cyber-400/70 hover:text-cyber-300"
        >
          <FontAwesomeIcon :icon="faGithub" class="h-4" />
          <span>{{ (githubStars / 1000).toFixed(1) }}K</span>
        </a>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded border border-grid text-chrome md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" class="h-4" />
        </button>
      </div>
    </nav>

    <div
      v-if="menuOpen"
      class="mx-auto max-w-[88rem] border-x border-b border-grid bg-ink-900 md:hidden"
    >
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="block border-b border-grid px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] last:border-b-0 hover:text-chrome"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
