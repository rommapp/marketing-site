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
  <header class="sticky top-0 z-50 bg-paper-card/95 backdrop-blur-md">
    <div class="rule-spectrum" aria-hidden="true" />
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between border-b border-ink/15 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3.5">
        <a href="#" class="flex flex-row items-center gap-2.5">
          <img
            src="/images/blocks/logos/romm.svg"
            alt="RomM logo"
            class="h-7 w-7"
          />
          <span
            class="font-display text-xl font-semibold uppercase tracking-[0.18em] text-ink"
          >
            RomM
          </span>
        </a>
        <a
          href="https://github.com/rommapp/romm/releases/latest"
          target="_blank"
          rel="noopener"
          class="hidden border border-ink/25 px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-soft transition-colors hover:border-ink hover:text-ink sm:block"
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
          class="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft transition-colors hover:text-vermilion-600"
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
          class="hidden h-9 w-9 items-center justify-center border border-ink/20 text-ink-soft transition-colors hover:border-vermilion-600 hover:text-vermilion-600 sm:flex"
        >
          <FontAwesomeIcon :icon="faHeart" class="h-3.5" />
        </a>
        <a
          href="https://discord.gg/RGPJHNMMwJ"
          target="_blank"
          rel="noopener"
          title="Join the Discord"
          class="hidden h-9 w-9 items-center justify-center border border-ink/20 text-ink-soft transition-colors hover:border-primary-600 hover:text-primary-600 sm:flex"
        >
          <FontAwesomeIcon :icon="faDiscord" class="h-3.5" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          title="GitHub repository"
          class="flex h-9 items-center gap-2 border border-ink bg-ink px-3 font-display text-xs font-semibold tracking-[0.1em] text-paper-card transition-colors hover:bg-primary-700"
        >
          <FontAwesomeIcon :icon="faGithub" class="h-4" />
          <span>{{ (githubStars / 1000).toFixed(1) }}K</span>
        </a>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" class="h-4" />
        </button>
      </div>
    </nav>

    <div v-if="menuOpen" class="border-b border-ink/15 bg-paper-card md:hidden">
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="block border-b border-ink/10 px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-ink-soft last:border-b-0 hover:text-vermilion-600"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
