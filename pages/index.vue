<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faWandSparkles,
  faGamepad,
  faShieldHeart,
  faRotate,
  faUsers,
  faScrewdriverWrench,
  faPlug,
  faFolderOpen,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faDiscord,
  faWindows,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";

import casaos from "~/assets/images/logos/casaos-wordmark.png";
import cloudron from "~/assets/images/logos/cloudron-wordmark.svg";
import docker from "~/assets/images/logos/docker-wordmark.svg";
import hexos from "~/assets/images/logos/hexos-wordmark.png";
import portainer from "~/assets/images/logos/portainer-wordmark.svg";
import synology from "~/assets/images/logos/synology-wordmark.svg";
import truenas from "~/assets/images/logos/truenas-wordmark.png";
import umbrel from "~/assets/images/logos/umbrel-wordmark.png";
import unraid from "~/assets/images/logos/unraid-wordmark.svg";
import playnite from "~/assets/images/logos/playnite-logo.svg";
import grout from "~/assets/images/logos/grout-logo.svg";
import argosy from "~/assets/images/logos/argosy-logo.svg";

import playniteDetails from "~/assets/images/screenshots/playnite/details.png";
import playniteLibrary from "~/assets/images/screenshots/playnite/library.png";
import playniteSettings from "~/assets/images/screenshots/playnite/settings.png";

import groutDetails from "~/assets/images/screenshots/grout/game-details.png";
import groutMultiSelect from "~/assets/images/screenshots/grout/multi-select.png";
import groutSyncSummary from "~/assets/images/screenshots/grout/sync-summary.png";

import argosyDetails from "~/assets/images/screenshots/argosy/game-details.png";
import argosyLibrary from "~/assets/images/screenshots/argosy/library.png";
import argosyRecommended from "~/assets/images/screenshots/argosy/recommended.png";

interface AppImage {
  src: string;
  alt: string;
}

const PLAYNITE_IMAGES: AppImage[] = [
  { src: playniteLibrary, alt: "Playnite library" },
  { src: playniteDetails, alt: "Playnite game details" },
  { src: playniteSettings, alt: "Playnite settings" },
];

const ARGOSY_IMAGES: AppImage[] = [
  { src: argosyDetails, alt: "Argosy game details" },
  { src: argosyLibrary, alt: "Argosy library" },
  { src: argosyRecommended, alt: "Argosy recommended" },
];

const GROUT_IMAGES: AppImage[] = [
  { src: groutDetails, alt: "Grout game details" },
  { src: groutMultiSelect, alt: "Grout multi-select" },
  { src: groutSyncSummary, alt: "Grout sync summary" },
];

const APPS = [
  {
    id: "playnite",
    name: "Playnite Plugin",
    system: "Windows · Desktop",
    logo: playnite,
    images: PLAYNITE_IMAGES,
    label: "Fig. 3.1 — Playnite",
    tags: [{ text: "Windows", icon: faWindows }, { text: "QR pairing" }],
    body: "Effortlessly integrate your retro game collection into Playnite, the open-source game library manager that provides a unified interface for all of your games on PC.",
    links: {
      label: "Learn more",
      items: [{ text: "playnite.link", href: "https://playnite.link/" }],
    },
    ctaText: "Install",
    ctaHref:
      "https://github.com/rommapp/playnite-plugin?tab=readme-ov-file#installation",
  },
  {
    id: "argosy",
    name: "Argosy Launcher",
    system: "Android · Handhelds",
    logo: argosy,
    images: ARGOSY_IMAGES,
    label: "Fig. 3.2 — Argosy",
    tags: [
      { text: "Android", icon: faAndroid },
      { text: "QR pairing" },
      { text: "Save sync" },
    ],
    body: "Sync your library, download games on demand, track your achievements, and play across devices with automatic save sync, all from a gamepad-first interface designed for Anbernic, Retroid Pocket, Odin, and similar devices.",
    ctaText: "Download",
    ctaHref: "https://github.com/rommapp/argosy-launcher/releases/latest/",
  },
  {
    id: "grout",
    name: "Grout",
    system: "Handheld CFWs",
    logo: grout,
    images: GROUT_IMAGES,
    label: "Fig. 3.3 — Grout",
    tags: [{ text: "Handhelds", icon: faGamepad }, { text: "Save sync" }],
    body: "A lightweight client for your favorite handheld custom firmwares. Download games, box art and BIOS files wirelessly, and sync your saves automatically as you play.",
    links: {
      label: "Works on",
      items: [
        { text: "muOS", href: "https://muos.dev" },
        { text: "Knulli", href: "https://knulli.org" },
        { text: "ROCKNIX", href: "https://rocknix.org" },
        { text: "Spruce (v4)", href: "https://spruceui.github.io/" },
        { text: "NextUI", href: "https://nextui.loveretro.games" },
        { text: "TrimUI", href: "https://trimui.com" },
      ],
    },
    ctaText: "Quick start",
    ctaHref: "https://grout.romm.app/getting-started/",
  },
];

const PLATFORMS = [
  {
    name: "CasaOS",
    href: "https://community.bigbeartechworld.com/t/added-romm-to-bigbearcasaos/206",
    src: casaos,
  },
  {
    name: "Cloudron",
    href: "https://www.cloudron.io/store/app.romm.cloudronapp.html",
    src: cloudron,
  },
  {
    name: "Docker",
    href: "https://hub.docker.com/r/rommapp/romm",
    src: docker,
  },
  { name: "HexOS", href: "https://hexos.com/", src: hexos },
  { name: "Portainer", href: "https://www.portainer.io/", src: portainer },
  { name: "Synology", href: "https://www.synology.com/", src: synology },
  {
    name: "TrueNAS",
    href: "https://www.truenas.com/apps/#:~:text=romm",
    src: truenas,
  },
  { name: "Umbrel", href: "https://apps.umbrel.com/app/romm", src: umbrel },
  {
    name: "Unraid",
    href: "https://unraid.net/community/apps?q=romm#r",
    src: unraid,
  },
];

// ------------------------- Table of contents -------------------------
const CONTENTS = [
  {
    num: "1",
    title: "The Method",
    note: "How a pile of files becomes a library",
    href: "#method",
  },
  {
    num: "2",
    title: "What's Inside",
    note: "Features, figures and findings",
    href: "#features",
  },
  {
    num: "3",
    title: "A Field Guide to Your Devices",
    note: "Apps for desktops, handhelds and TVs",
    href: "#apps",
  },
  {
    num: "4",
    title: "The Society of Collectors",
    note: "Join the community",
    href: "#community",
  },
  {
    num: "A",
    title: "Appendix A — Supported platforms",
    note: "400+ consoles, computers and arcades",
    href: "#appendix-a",
  },
  {
    num: "B",
    title: "Appendix B — Where it runs",
    note: "Install RomM on your favorite server",
    href: "#appendix-b",
  },
  {
    num: "✶",
    title: "Index",
    note: "Every link, alphabetized-ish",
    href: "#index",
  },
];

// ------------------------- Chapter 1: the method -------------------------
const STEPS = [
  {
    icon: faFolderOpen,
    accent: "bg-cerulean-500",
    title: "Scan",
    body: "Point RomM at your ROM folders. It identifies your games across 400+ platforms — no renaming, no spreadsheets.",
  },
  {
    icon: faWandSparkles,
    accent: "bg-grape-500",
    title: "Enrich",
    body: "Cover art, screenshots and deep metadata arrive from seven providers, matched by file hash rather than guesswork.",
  },
  {
    icon: faPlay,
    accent: "bg-kelly-500",
    title: "Play",
    body: "Launch games in your browser or on any paired device, with your saves following you everywhere you go.",
  },
];

// ------------------------- Chapter 2: features -------------------------
const FEATURED = {
  icon: faGamepad,
  title: "Play in your browser",
  body: "EmulatorJS, MS-DOS and Flash players are built in. Hit Play and you're in the game — no cores to configure, no files to move.",
  href: "https://docs.romm.app/latest/using/in-browser-play/emulatorjs/",
};

const SIDE_FEATURES = [
  {
    icon: faRotate,
    accent: "bg-sun-500",
    title: "Saves that follow you",
    body: "A full save-sync engine keeps saves and states in step across your devices, with conflict detection when two of them disagree.",
    href: "https://docs.romm.app/latest/using/saves-and-states/",
  },
  {
    icon: faWandSparkles,
    accent: "bg-grape-500",
    title: "Magical metadata",
    body: "Cover art, screenshots and deep metadata from IGDB, ScreenScraper, LaunchBox, RetroAchievements and more — matched by hash, not guesswork.",
    href: "https://docs.romm.app/latest/getting-started/metadata-providers/",
  },
];

const SMALL_FEATURES = [
  {
    icon: faUsers,
    accent: "bg-tomato-500",
    title: "Multiplayer",
    body: "Granular per-user controls, plus OIDC single sign-on with Authelia, Authentik, Keycloak and friends.",
    href: "https://docs.romm.app/latest/administration/oidc/",
  },
  {
    icon: faScrewdriverWrench,
    accent: "bg-kelly-500",
    title: "ROM patcher",
    body: "Apply romhacks and translations server-side, from stored or uploaded patch files.",
    href: "https://docs.romm.app/latest/using/rom-patcher/",
  },
  {
    icon: faPlug,
    accent: "bg-primary-500",
    title: "Ecosystem",
    body: "ES-DE and Pegasus exports, LaunchBox import, feed clients, and a full REST API with device tokens.",
    href: "https://docs.romm.app/latest/developers/api-reference/",
  },
];

const STATS = [
  { value: "", key: "stars", label: "GitHub stars", accent: "bg-sun-500" },
  {
    value: "",
    key: "discord",
    label: "Discord members",
    accent: "bg-grape-500",
  },
  { value: "1.7M+", key: "", label: "Docker pulls", accent: "bg-cerulean-500" },
  { value: "#1", key: "", label: "on Hackernews", accent: "bg-tomato-500" },
];

// Hand-placed hero stars — static so server and client agree
const HERO_STARS = [
  { top: "12%", left: "8%", size: "text-xl", delay: "0s" },
  { top: "22%", left: "88%", size: "text-2xl", delay: "0.6s" },
  { top: "8%", left: "62%", size: "text-base", delay: "1.2s" },
  { top: "38%", left: "4%", size: "text-base", delay: "1.8s" },
  { top: "16%", left: "30%", size: "text-sm", delay: "0.9s" },
  { top: "42%", left: "94%", size: "text-lg", delay: "0.3s" },
  { top: "55%", left: "10%", size: "text-sm", delay: "1.5s" },
  { top: "60%", left: "90%", size: "text-base", delay: "2.1s" },
];

const githubStars = ref<number>(3_800);
const discordMembers = ref<number>(3_000);
const selectedImage = ref<AppImage | undefined>(undefined);

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") selectedImage.value = undefined;
};

onMounted(async () => {
  window.addEventListener("keydown", onKeydown);
  try {
    const res = await fetch("https://api.github.com/repos/rommapp/romm");
    const data = await res.json();
    if (data.stargazers_count) githubStars.value = data.stargazers_count;
  } catch {
    /* keep the fallback count */
  }
  try {
    const res = await fetch(
      "https://discord.com/api/v9/invites/RGPJHNMMwJ?with_counts=true",
    );
    const data = await res.json();
    if (data.approximate_member_count) {
      discordMembers.value = data.approximate_member_count;
    }
  } catch {
    /* keep the fallback count */
  }
});

onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div>
    <AppHeader :githubStars="githubStars" />

    <main>
      <!-- ======================= TITLE PAGE (HERO) ======================= -->
      <section class="sky relative overflow-hidden">
        <div aria-hidden="true" class="halftone absolute inset-0 opacity-20" />

        <!-- twinkling stars in the upper sky -->
        <span
          v-for="(star, i) in HERO_STARS"
          :key="i"
          aria-hidden="true"
          class="animate-twinkle pointer-events-none absolute select-none text-sun-300"
          :class="star.size"
          :style="{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }"
        >
          ✶
        </span>

        <!-- glossy planet rising behind the plate -->
        <div
          aria-hidden="true"
          class="animate-bob pointer-events-none absolute -right-16 top-24 hidden h-56 w-56 rounded-full opacity-90 sm:right-[6%] sm:block"
          style="
            background: radial-gradient(
              circle at 32% 28%,
              #ffe08a 0%,
              #ffc629 35%,
              #f0a800 70%,
              #c78a00 100%
            );
            box-shadow:
              inset -12px -14px 30px rgba(0, 0, 0, 0.25),
              0 0 60px rgba(255, 198, 41, 0.35);
          "
        />

        <div
          class="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-20 text-center sm:px-10"
        >
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div
              class="inline-flex items-center rounded-full border-2 border-white/40 bg-white/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm"
            >
              The self-hosted ROM manager
            </div>
            <a
              href="https://github.com/rommapp/romm/releases/tag/5.0.0"
              target="_blank"
              rel="noopener"
              class="group inline-flex items-center gap-2 rounded-full border-2 border-sun-500 bg-sun-500 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink transition-transform hover:-rotate-1 hover:scale-105"
            >
              ✶ New edition! RomM 5.0 →
            </a>
          </div>

          <h1
            class="mx-auto mt-10 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
            style="text-shadow: 0 3px 0 rgba(16, 28, 70, 0.45)"
          >
            The grand atlas of
            <span class="text-sun-400">your game collection</span>
          </h1>

          <p
            class="mx-auto mt-8 max-w-2xl font-serif text-lg leading-relaxed text-white/90"
          >
            Scan, enrich, browse and play your games from one beautiful
            self-hosted app. Metadata from seven providers, save sync across
            your devices, and support for 400+ platforms — everything a curious
            collector could ask for.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.romm.app/latest/getting-started/quick-start/"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-cdrom btn-cdrom--sun">Start exploring</span>
            </a>
            <a href="https://demo.romm.app" target="_blank" rel="noopener">
              <span class="btn-page">View the demo →</span>
            </a>
          </div>

          <!-- Plate I: the collection, pasted onto the sky -->
          <figure class="mx-auto mt-16 max-w-4xl">
            <div class="plate -rotate-1 overflow-hidden p-2 sm:p-3">
              <img
                alt="The RomM collection view"
                src="/images/blocks/v5/collection.png"
                srcset="
                  /images/blocks/v5/collection.png    1x,
                  /images/blocks/v5/collection@2x.png 2x
                "
                class="block w-full rounded-lg"
                fetchpriority="high"
              />
            </div>
            <figcaption
              class="mt-5 inline-block -rotate-1 rounded-md bg-white/90 px-4 py-1.5 font-serif text-sm italic text-ink shadow-plate-sm"
            >
              Plate I. — A well-kept collection, in its natural habitat.
            </figcaption>
          </figure>
        </div>

        <!-- torn-paper edge into the page -->
        <svg
          aria-hidden="true"
          class="relative z-10 -mb-px block w-full text-paper"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0 40h1440V18c-40 6-90-10-140-4s-90 16-150 10-110-20-170-14-100 18-160 16S690 8 630 12 520 30 460 28 350 8 290 12 180 30 120 26 40 12 0 20z"
          />
        </svg>
      </section>

      <!-- ======================== TABLE OF CONTENTS ======================== -->
      <section class="bg-paper">
        <div class="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <div class="plate overflow-hidden">
            <div
              class="border-b-[3px] border-ink bg-sun-500 px-6 py-3 text-center"
            >
              <span
                class="font-display text-xl font-bold tracking-wide text-ink"
              >
                Table of Contents
              </span>
            </div>
            <nav class="bg-paper-card px-6 py-4 sm:px-8">
              <a
                v-for="entry in CONTENTS"
                :key="entry.href"
                :href="entry.href"
                class="group flex items-baseline gap-3 border-b border-ink/10 py-3.5 last:border-b-0"
              >
                <span
                  class="flex h-7 w-7 shrink-0 -translate-y-0.5 items-center justify-center self-center rounded-full border-2 border-ink bg-paper font-display text-sm font-bold text-ink transition-colors group-hover:bg-sun-500"
                >
                  {{ entry.num }}
                </span>
                <span
                  class="font-display text-lg font-bold text-ink transition-colors group-hover:text-primary-600"
                >
                  {{ entry.title }}
                </span>
                <span
                  aria-hidden="true"
                  class="mx-1 flex-1 border-b-2 border-dotted border-ink/25"
                />
                <span
                  class="hidden shrink-0 font-serif text-sm italic text-ink-soft sm:block"
                >
                  {{ entry.note }}
                </span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      <!-- ===================== CHAPTER 1 · THE METHOD ===================== -->
      <section
        id="method"
        class="graph-paper scroll-mt-20 border-t-2 border-rule bg-paper"
      >
        <div class="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <SectionHeading
            chapter="1"
            label="The Method"
            title="From shoebox to showcase"
            subtitle="Three steps stand between a folder of mystery files and a library you'll want to show off."
          />

          <div class="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <div
              v-for="(step, i) in STEPS"
              :key="step.title"
              class="relative flex flex-col items-center text-center"
            >
              <!-- connecting dotted line to the next step -->
              <span
                v-if="i < STEPS.length - 1"
                aria-hidden="true"
                class="absolute left-[60%] top-9 hidden w-[80%] border-t-[3px] border-dotted border-ink/30 md:block"
              />
              <span
                class="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[3px] border-ink text-2xl text-white shadow-plate-sm"
                :class="step.accent"
              >
                <FontAwesomeIcon :icon="step.icon" />
              </span>
              <span
                class="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink-faint"
              >
                Step {{ i + 1 }}
              </span>
              <h3 class="mt-1 font-display text-2xl font-bold text-ink">
                {{ step.title }}
              </h3>
              <p
                class="mt-3 max-w-xs font-serif text-sm leading-relaxed text-ink-soft"
              >
                {{ step.body }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== CHAPTER 2 · WHAT'S INSIDE ==================== -->
      <section
        id="features"
        class="scroll-mt-20 border-t-2 border-rule bg-paper"
      >
        <div class="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <SectionHeading
            chapter="2"
            label="What's Inside"
            title="Every playthrough tells a story"
            subtitle="The most powerful all-in-one app for managing and playing your retro game collection."
          />

          <!-- Textbook spread: featured article + sidebar fact boxes -->
          <div class="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <!-- main article -->
            <article
              class="relative overflow-hidden rounded-xl border-2 border-ink bg-paper-card shadow-plate"
            >
              <span
                aria-hidden="true"
                class="absolute inset-x-0 top-0 z-10 h-1.5 bg-cerulean-500"
              />
              <div class="p-7 sm:p-9">
                <div class="flex items-center gap-4">
                  <span
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cerulean-500 text-lg text-white shadow-plate-sm"
                  >
                    <FontAwesomeIcon :icon="FEATURED.icon" />
                  </span>
                  <h3
                    class="font-display text-2xl font-bold text-ink md:text-3xl"
                  >
                    {{ FEATURED.title }}
                  </h3>
                </div>
                <p
                  class="mt-4 max-w-xl font-serif text-base leading-relaxed text-ink-soft"
                >
                  {{ FEATURED.body }}
                </p>
                <a
                  :href="FEATURED.href"
                  target="_blank"
                  rel="noopener"
                  class="mt-5 inline-block"
                >
                  <span class="btn-page">Read the docs →</span>
                </a>
              </div>
              <figure class="px-7 pb-7 sm:px-9 sm:pb-9">
                <div class="plate rotate-1 overflow-hidden p-1.5">
                  <img
                    alt="Playing a game in the browser with EmulatorJS"
                    src="/images/blocks/v5/gallery.png"
                    srcset="
                      /images/blocks/v5/gallery.png    1x,
                      /images/blocks/v5/gallery@2x.png 2x
                    "
                    class="block w-full rounded-md"
                    loading="lazy"
                  />
                </div>
                <figcaption
                  class="mt-3 text-center font-serif text-xs italic text-ink-soft"
                >
                  Plate II. — The library, ready for launch.
                </figcaption>
              </figure>
            </article>

            <!-- sidebar fact boxes -->
            <div class="flex flex-col gap-8">
              <a
                v-for="feature in SIDE_FEATURES"
                :key="feature.href"
                :href="feature.href"
                target="_blank"
                rel="noopener"
                class="group relative flex-1 overflow-hidden rounded-xl border-2 border-ink bg-paper-card p-7 shadow-plate-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-plate"
              >
                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 top-0 h-1.5"
                  :class="feature.accent"
                />
                <div class="flex items-center gap-4">
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink text-white shadow-plate-sm transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
                    :class="feature.accent"
                  >
                    <FontAwesomeIcon :icon="feature.icon" />
                  </span>
                  <h3
                    class="flex-1 font-display text-xl font-bold leading-snug text-ink"
                  >
                    {{ feature.title }}
                  </h3>
                  <span
                    aria-hidden="true"
                    class="shrink-0 self-start font-serif text-lg italic text-ink-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary-600"
                  >
                    →
                  </span>
                </div>
                <p
                  class="mt-4 font-serif text-sm leading-relaxed text-ink-soft"
                >
                  {{ feature.body }}
                </p>
              </a>
            </div>
          </div>

          <!-- bottom row: compact entries + did-you-know box -->
          <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <a
              v-for="feature in SMALL_FEATURES"
              :key="feature.href"
              :href="feature.href"
              target="_blank"
              rel="noopener"
              class="group relative overflow-hidden rounded-xl border-2 border-ink bg-paper-card p-6 shadow-plate-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-plate"
            >
              <span
                aria-hidden="true"
                class="absolute inset-x-0 top-0 h-1.5"
                :class="feature.accent"
              />
              <div class="flex items-center gap-3">
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-sm text-white shadow-plate-sm transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
                  :class="feature.accent"
                >
                  <FontAwesomeIcon :icon="feature.icon" />
                </span>
                <h3
                  class="font-display text-lg font-bold leading-snug text-ink"
                >
                  {{ feature.title }}
                </h3>
              </div>
              <p class="mt-3 font-serif text-sm leading-relaxed text-ink-soft">
                {{ feature.body }}
              </p>
            </a>

            <!-- Did you know? -->
            <a
              href="https://github.com/rommapp/romm"
              target="_blank"
              rel="noopener"
              class="group relative -rotate-1 overflow-hidden rounded-xl border-2 border-ink bg-sun-500 p-6 shadow-plate-sm transition-all duration-200 hover:rotate-0 hover:shadow-plate"
            >
              <div
                class="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink/70"
              >
                ✶ Did you know?
              </div>
              <h3
                class="mt-2 font-display text-lg font-bold leading-snug text-ink"
              >
                RomM is free, forever.
              </h3>
              <p class="mt-2 font-serif text-sm leading-relaxed text-ink/80">
                AGPL-3.0, no tracking, no upsells. Your games, your data, your
                server.
              </p>
            </a>
          </div>
        </div>
      </section>

      <!-- ===================== CHAPTER 3 · FIELD GUIDE ===================== -->
      <section
        id="apps"
        class="scroll-mt-20 border-t-2 border-rule bg-paper pb-20 pt-20"
      >
        <div class="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading
            chapter="3"
            label="Play anywhere"
            title="Your library on every device"
            subtitle="Native apps and integrations that bring your collection to desktops, handhelds and TVs. Pair a device in seconds with a QR code, and your saves follow you everywhere."
          />

          <div class="mt-14">
            <AppConsole :apps="APPS" @select="selectedImage = $event" />
          </div>
        </div>
      </section>

      <!-- ================== CHAPTER 4 · THE SOCIETY + FACTS ================== -->
      <section
        id="community"
        class="relative scroll-mt-20 overflow-hidden border-t-2 border-rule bg-paper-warm"
      >
        <GlyphField />
        <div class="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <SectionHeading
            chapter="4"
            label="The Society of Collectors"
            title="Powered by friendship"
            subtitle="Get help with your setup, share your ideas, and meet other fans of RomM."
          />

          <!-- by the numbers -->
          <div class="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div
              v-for="stat in STATS"
              :key="stat.label"
              class="relative overflow-hidden rounded-xl border-2 border-ink bg-paper-card p-6 text-center shadow-plate-sm"
            >
              <span
                aria-hidden="true"
                class="absolute inset-x-0 top-0 h-1.5"
                :class="stat.accent"
              />
              <div class="font-display text-4xl font-bold text-ink md:text-5xl">
                <template v-if="stat.key === 'stars'">
                  {{ githubStars.toLocaleString() }}
                </template>
                <template v-else-if="stat.key === 'discord'">
                  {{ discordMembers.toLocaleString() }}
                </template>
                <template v-else>{{ stat.value }}</template>
              </div>
              <div class="mt-2 font-serif text-sm italic text-ink-soft">
                {{ stat.label }}
              </div>
            </div>
          </div>

          <div class="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/RGPJHNMMwJ"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-cdrom">
                <FontAwesomeIcon :icon="faDiscord" class="h-4" />
                Join the Discord
              </span>
            </a>
            <a
              href="https://github.com/rommapp/romm"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-page">
                <FontAwesomeIcon :icon="faGithub" class="h-4" />
                Contribute
              </span>
            </a>
          </div>
        </div>
      </section>

      <!-- ================= APPENDIX A · SUPPORTED PLATFORMS ================= -->
      <section
        id="appendix-a"
        class="scroll-mt-20 border-t-2 border-rule bg-paper"
      >
        <div class="mx-auto max-w-7xl px-6 pt-16 sm:px-10">
          <SectionHeading
            prefix="Appendix"
            chapter="A"
            label="Supported platforms"
            title="400+ platforms, catalogued"
            subtitle="Consoles, handhelds, computers and arcade boards — if you can emulate it, RomM can shelve it."
          />
        </div>
        <div class="mt-10 border-t border-rule pb-4">
          <PlatformMarquee />
        </div>
        <div
          class="mx-auto max-w-7xl px-6 pb-12 text-center font-serif text-sm italic text-ink-soft sm:px-10"
        >
          A brief excerpt from the
          <a
            href="https://docs.romm.app/latest/platforms/supported-platforms/"
            target="_blank"
            rel="noopener"
            class="text-primary-600 underline decoration-dotted underline-offset-4 hover:text-primary-700"
            >full catalogue</a
          >.
        </div>
      </section>

      <!-- =================== APPENDIX B · WHERE IT RUNS =================== -->
      <section
        id="appendix-b"
        class="scroll-mt-20 border-t-2 border-rule bg-paper"
      >
        <div class="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          <SectionHeading
            prefix="Appendix"
            chapter="B"
            label="Where it runs"
            title="At home on any server"
            subtitle="One-click installs and templates for every major self-hosting platform and operating system."
          />

          <div
            class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9 lg:gap-3"
          >
            <a
              v-for="platform in PLATFORMS"
              :key="platform.name"
              :href="platform.href"
              target="_blank"
              rel="noopener noreferrer"
              :title="platform.name"
              class="flex h-20 items-center justify-center rounded-xl border-2 border-ink/15 bg-paper-card px-4 opacity-70 grayscale transition-all duration-200 hover:-translate-y-1 hover:border-ink hover:opacity-100 hover:shadow-plate-sm hover:grayscale-0"
            >
              <img
                :src="platform.src"
                :alt="platform.name"
                class="max-h-8 w-auto max-w-full"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      <!-- ============================= INDEX ============================= -->
      <footer id="index" class="scroll-mt-20 bg-primary-950 text-primary-100">
        <div class="rainbow-rule" aria-hidden="true" />
        <div class="mx-auto max-w-7xl px-6 pt-10 sm:px-10">
          <span
            class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300"
          >
            Index
          </span>
        </div>
        <div
          class="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4"
        >
          <div>
            <h4
              class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-sun-400"
            >
              Project
            </h4>
            <ul class="mt-4 space-y-2 font-serif text-sm">
              <li>
                <a
                  href="https://docs.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Documentation</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/getting-started/quick-start/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Quick start</a
                >
              </li>
              <li>
                <a
                  href="https://demo.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Live demo</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/romm"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >GitHub</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-sun-400"
            >
              Apps
            </h4>
            <ul class="mt-4 space-y-2 font-serif text-sm">
              <li>
                <a
                  href="https://github.com/rommapp/playnite-plugin"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Playnite plugin</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/argosy-launcher"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Argosy launcher</a
                >
              </li>
              <li>
                <a
                  href="https://grout.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Grout</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-sun-400"
            >
              Ecosystem
            </h4>
            <ul class="mt-4 space-y-2 font-serif text-sm">
              <li>
                <a
                  href="https://docs.romm.app/latest/platforms/supported-platforms/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Supported platforms</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/getting-started/metadata-providers/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Metadata providers</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/ecosystem/feed-clients/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Feed clients</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/developers/api-reference/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >API reference</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-sun-400"
            >
              Community
            </h4>
            <ul class="mt-4 space-y-2 font-serif text-sm">
              <li>
                <a
                  href="https://discord.gg/RGPJHNMMwJ"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Discord</a
                >
              </li>
              <li>
                <a
                  href="https://opencollective.com/romm"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-sun-300"
                  >Open Collective</a
                >
              </li>
              <li>
                <a
                  href="mailto:contact@romm.app"
                  class="transition-colors hover:text-sun-300"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-primary-800 py-5">
          <div
            class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-300 sm:px-10"
          >
            <span>The grand atlas of your game collection.</span>
            <span class="hidden md:block">
              © The RomM Project · AGPL-3.0
            </span>
            <span
              aria-label="Secured with Aikido"
              class="inline-flex items-stretch overflow-hidden rounded-md border border-primary-700"
            >
              <span
                class="flex items-center gap-1.5 bg-primary-900 px-2.5 py-1 text-primary-200"
              >
                <FontAwesomeIcon
                  :icon="faShieldHeart"
                  class="h-2.5 text-sun-400"
                />
                Secured with
              </span>
              <span
                class="flex items-center bg-sun-500 px-2.5 py-1 font-bold text-ink"
              >
                Aikido
              </span>
            </span>
          </div>
        </div>
      </footer>
    </main>

    <!-- ============================ LIGHTBOX ============================ -->
    <Teleport to="body">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-10"
        @click="selectedImage = undefined"
      >
        <div class="plate overflow-hidden">
          <div
            class="flex items-center justify-between border-b-2 border-ink/10 bg-paper px-4 py-2"
          >
            <span class="font-serif text-sm italic text-ink-soft">
              {{ selectedImage.alt }}
            </span>
            <button
              type="button"
              class="ml-4 font-mono text-xs font-bold text-ink-faint transition-colors hover:text-ink"
              aria-label="Close"
              @click="selectedImage = undefined"
            >
              [x]
            </button>
          </div>
          <img
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="block max-h-[80vh] w-full bg-white object-contain"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
