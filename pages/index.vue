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

// The hero figure's specimen annotations, Eyewitness-style
const CALLOUTS_LEFT = [
  { text: "Metadata from seven providers", top: "16%" },
  { text: "Box art in full resolution", top: "58%" },
];

const CALLOUTS_RIGHT = [
  { text: "Smart collections & filters", top: "30%" },
  { text: "One click to play in the browser", top: "72%" },
];

const HERO_WORDS = [
  "Scanning",
  "Metadata",
  "Save Sync",
  "In-Browser Play",
  "ROM Patching",
  "400+ Platforms",
];

// ------------------------- Table of contents -------------------------
const CONTENTS = [
  {
    num: "I",
    title: "The Method",
    note: "How a pile of files becomes a library",
    folio: "2",
    href: "#method",
  },
  {
    num: "II",
    title: "What's Inside",
    note: "Features, figures and findings",
    folio: "8",
    href: "#features",
  },
  {
    num: "III",
    title: "A Field Guide to Your Devices",
    note: "Apps for desktops, handhelds and TVs",
    folio: "22",
    href: "#apps",
  },
  {
    num: "IV",
    title: "The Society of Collectors",
    note: "Join the community",
    folio: "31",
    href: "#community",
  },
  {
    num: "A",
    title: "Appendix A — Supported Platforms",
    note: "400+ consoles, computers and arcades",
    folio: "38",
    href: "#appendix-a",
  },
  {
    num: "B",
    title: "Appendix B — Where It Runs",
    note: "Install RomM on your favorite server",
    folio: "42",
    href: "#appendix-b",
  },
  {
    num: "—",
    title: "Index",
    note: "Every link, alphabetized-ish",
    folio: "44",
    href: "#index",
  },
];

// ------------------------- Chapter I: the method -------------------------
const STEPS = [
  {
    icon: faFolderOpen,
    numeral: "I",
    accent: "text-primary-600",
    title: "Scan",
    body: "Point RomM at your ROM folders. It identifies your games across 400+ platforms — no renaming, no spreadsheets.",
  },
  {
    icon: faWandSparkles,
    numeral: "II",
    accent: "text-vermilion-600",
    title: "Enrich",
    body: "Cover art, screenshots and deep metadata arrive from seven providers, matched by file hash rather than guesswork.",
  },
  {
    icon: faPlay,
    numeral: "III",
    accent: "text-forest-600",
    title: "Play",
    body: "Launch games in your browser or on any paired device, with your saves following you everywhere you go.",
  },
];

// ------------------------- Chapter II: features -------------------------
const FEATURED = {
  icon: faGamepad,
  title: "Play in your browser",
  body: "EmulatorJS, MS-DOS and Flash players are built in. Press Play and you are in the game — no cores to configure, no files to move. Your session is saved to the server the moment you set the controller down.",
  href: "https://docs.romm.app/latest/using/in-browser-play/emulatorjs/",
};

const SIDE_FEATURES = [
  {
    icon: faRotate,
    bar: "bg-gold-500",
    accent: "text-gold-600",
    title: "Saves that follow you",
    body: "A full save-sync engine keeps saves and states in step across your devices, with conflict detection when two of them disagree.",
    xref: "See also — Fig. 3.2, saves in the field.",
    href: "https://docs.romm.app/latest/using/saves-and-states/",
  },
  {
    icon: faWandSparkles,
    bar: "bg-plum-500",
    accent: "text-plum-500",
    title: "A catalogue, curated",
    body: "Cover art, screenshots and deep metadata from IGDB, ScreenScraper, LaunchBox, RetroAchievements and more — matched by hash, not guesswork.",
    xref: "See also — Plate I, the collection, catalogued.",
    href: "https://docs.romm.app/latest/getting-started/metadata-providers/",
  },
];

const SMALL_FEATURES = [
  {
    icon: faUsers,
    bar: "bg-vermilion-500",
    accent: "text-vermilion-600",
    title: "Multiplayer",
    body: "Granular per-user controls, plus OIDC single sign-on with Authelia, Authentik, Keycloak and friends.",
    href: "https://docs.romm.app/latest/administration/oidc/",
  },
  {
    icon: faScrewdriverWrench,
    bar: "bg-forest-500",
    accent: "text-forest-600",
    title: "ROM patcher",
    body: "Apply romhacks and translations server-side, from stored or uploaded patch files.",
    href: "https://docs.romm.app/latest/using/rom-patcher/",
  },
  {
    icon: faPlug,
    bar: "bg-primary-600",
    accent: "text-primary-600",
    title: "Ecosystem",
    body: "ES-DE and Pegasus exports, LaunchBox import, feed clients, and a full REST API with device tokens.",
    href: "https://docs.romm.app/latest/developers/api-reference/",
  },
];

const STATS = [
  { value: "", key: "stars", label: "Stars on GitHub" },
  { value: "", key: "discord", label: "Members on Discord" },
  { value: "1.7M+", key: "", label: "Pulls on Docker Hub" },
  { value: "#1", key: "", label: "On Hacker News" },
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
      <!-- ======================= FRONTISPIECE (HERO) ======================= -->
      <section class="relative overflow-hidden bg-paper-card">
        <!-- a compact disc, resting beside the title -->
        <div
          aria-hidden="true"
          class="cd absolute left-[6%] top-72 hidden h-24 w-24 lg:block"
        />

        <!-- ALL NEW · 5.0 EDITION diamond -->
        <a
          href="https://github.com/rommapp/romm/releases/tag/5.0.0"
          target="_blank"
          rel="noopener"
          class="absolute right-[7%] top-40 hidden h-24 w-24 rotate-45 items-center justify-center border border-ink bg-ink shadow-card transition-colors hover:bg-primary-700 lg:flex"
        >
          <span
            class="-rotate-45 text-center font-display text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-paper-card"
          >
            All New
            <span class="block text-2xl leading-none text-gold-300">5.0</span>
            Edition
          </span>
        </a>

        <div
          class="relative mx-auto max-w-7xl px-6 pb-24 pt-16 text-center sm:px-10"
        >
          <!-- kicker -->
          <div class="flex items-center justify-center gap-5">
            <span aria-hidden="true" class="h-px w-10 bg-ink/25 sm:w-24" />
            <span class="kicker whitespace-nowrap text-ink-faint">
              The Self-Hosted ROM Manager
            </span>
            <span aria-hidden="true" class="h-px w-10 bg-ink/25 sm:w-24" />
          </div>

          <!-- masthead title, between its rules -->
          <div class="mx-auto mt-8 max-w-4xl border-y border-ink/40 py-7">
            <h1
              class="font-display text-7xl font-medium uppercase leading-none tracking-[0.16em] text-ink sm:text-8xl md:text-[8.5rem]"
            >
              RomM
            </h1>
            <div
              class="mx-auto mt-6 flex max-w-2xl flex-wrap items-baseline justify-center gap-x-3 gap-y-1 border-t border-ink/15 pt-4 font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-faint"
            >
              <template v-for="(word, i) in HERO_WORDS" :key="word">
                <span v-if="i > 0" aria-hidden="true" class="text-ink/30"
                  >·</span
                >
                <span>{{ word }}</span>
              </template>
            </div>
          </div>

          <p
            class="mx-auto mt-8 max-w-2xl font-display text-2xl italic leading-snug text-ink sm:text-[1.7rem]"
          >
            The library that shows you what other launchers only tell you.
          </p>

          <p
            class="mx-auto mt-5 max-w-xl font-serif text-base leading-relaxed text-ink-soft"
          >
            Scan, enrich, browse and play your game collection from one
            self-hosted app — metadata from seven providers, saves in step
            across every device, and more than four hundred platforms shelved.
          </p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.romm.app/latest/getting-started/quick-start/"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-folio">Get started</span>
            </a>
            <a href="https://demo.romm.app" target="_blank" rel="noopener">
              <span class="btn-plate">View the demo</span>
            </a>
          </div>

          <!-- press-clipping badges -->
          <div class="mt-10 flex flex-wrap items-stretch justify-center gap-3">
            <span class="border border-ink/25 bg-paper-card px-5 py-2.5">
              <span
                class="block font-display text-sm font-semibold tracking-wide text-ink"
              >
                “★ {{ (githubStars / 1000).toFixed(1) }}K”
              </span>
              <span class="block font-serif text-[11px] italic text-ink-soft">
                — Stargazers, GitHub
              </span>
            </span>
            <span class="border border-ink/25 bg-paper-card px-5 py-2.5">
              <span
                class="block font-display text-sm font-semibold tracking-wide text-ink"
              >
                “#1”
              </span>
              <span class="block font-serif text-[11px] italic text-ink-soft">
                — Front page, Hacker News
              </span>
            </span>
            <span class="border border-ink/25 bg-paper-card px-5 py-2.5">
              <span
                class="block font-display text-sm font-semibold tracking-wide text-ink"
              >
                “1.7M+”
              </span>
              <span class="block font-serif text-[11px] italic text-ink-soft">
                — Pulls, Docker Hub
              </span>
            </span>
          </div>

          <!-- Plate I: the collection, annotated like a specimen -->
          <figure class="mx-auto mt-16 max-w-6xl">
            <div class="relative mx-auto max-w-3xl">
              <div class="panel p-2 shadow-float sm:p-3">
                <img
                  alt="The RomM collection view"
                  src="/images/blocks/v5/collection.png"
                  srcset="
                    /images/blocks/v5/collection.png    1x,
                    /images/blocks/v5/collection@2x.png 2x
                  "
                  class="block w-full border border-ink/15"
                  fetchpriority="high"
                />
              </div>

              <div
                v-for="callout in CALLOUTS_LEFT"
                :key="callout.text"
                aria-hidden="true"
                class="absolute -left-60 hidden w-56 items-center justify-end gap-3 xl:flex"
                :style="{ top: callout.top }"
              >
                <span
                  class="text-right font-display text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-ink-soft"
                >
                  {{ callout.text }}
                </span>
                <span class="h-px w-14 shrink-0 bg-ink/40" />
                <span
                  class="h-1.5 w-1.5 shrink-0 rounded-full border border-ink bg-paper-card"
                />
              </div>

              <div
                v-for="callout in CALLOUTS_RIGHT"
                :key="callout.text"
                aria-hidden="true"
                class="absolute -right-60 hidden w-56 items-center justify-start gap-3 xl:flex"
                :style="{ top: callout.top }"
              >
                <span
                  class="h-1.5 w-1.5 shrink-0 rounded-full border border-ink bg-paper-card"
                />
                <span class="h-px w-14 shrink-0 bg-ink/40" />
                <span
                  class="text-left font-display text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-ink-soft"
                >
                  {{ callout.text }}
                </span>
              </div>
            </div>

            <figcaption class="mt-6">
              <span
                class="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-vermilion-600"
              >
                Plate I
              </span>
              <span class="font-serif text-sm italic text-ink-soft">
                &nbsp;·&nbsp; The collection, catalogued — RomM 5.0 in its
                natural habitat.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- ======================== TABLE OF CONTENTS ======================== -->
      <section class="border-t border-ink/10 bg-paper">
        <div class="mx-auto max-w-3xl px-6 py-20 sm:px-10">
          <div class="panel overflow-hidden">
            <div class="masthead px-6 py-3.5 text-center">
              <span
                class="font-display text-sm font-semibold uppercase tracking-[0.3em]"
              >
                Table of Contents
              </span>
            </div>
            <nav class="px-6 py-4 sm:px-9">
              <a
                v-for="entry in CONTENTS"
                :key="entry.href"
                :href="entry.href"
                class="group flex items-baseline gap-4 border-b border-ink/10 py-4 last:border-b-0"
              >
                <span
                  class="w-7 shrink-0 text-right font-display text-sm font-semibold text-vermilion-600"
                >
                  {{ entry.num }}
                </span>
                <span
                  class="font-display text-lg font-medium text-ink transition-colors group-hover:text-primary-700"
                >
                  {{ entry.title }}
                </span>
                <span
                  aria-hidden="true"
                  class="mx-1 flex-1 border-b border-dotted border-ink/30"
                />
                <span
                  class="hidden shrink-0 font-serif text-sm italic text-ink-soft sm:block"
                >
                  {{ entry.note }}
                </span>
                <span class="shrink-0 font-display text-sm text-ink-faint">
                  {{ entry.folio }}
                </span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      <!-- ===================== CHAPTER I · THE METHOD ===================== -->
      <section
        id="method"
        class="graph-paper scroll-mt-20 border-t border-ink/10 bg-paper-card"
      >
        <div class="mx-auto max-w-7xl px-6 py-24 sm:px-10">
          <SectionHeading
            chapter="I"
            label="The Method"
            title="From shoebox to showcase"
            subtitle="Three steps stand between a folder of mystery files and a library you'll want to show off."
          />

          <div
            class="relative mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-3 md:gap-8"
          >
            <div
              v-for="(step, i) in STEPS"
              :key="step.title"
              class="relative flex flex-col items-center text-center"
            >
              <!-- connecting dotted line to the next step -->
              <span
                v-if="i < STEPS.length - 1"
                aria-hidden="true"
                class="absolute left-[62%] top-9 hidden w-[76%] border-t border-dotted border-ink/30 md:block"
              />
              <span
                class="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-ink/30 bg-paper-card text-xl shadow-card"
                :class="step.accent"
              >
                <FontAwesomeIcon :icon="step.icon" />
              </span>
              <span class="kicker mt-5 text-[9px] text-ink-faint">
                Step {{ step.numeral }}
              </span>
              <h3 class="mt-1.5 font-display text-3xl font-medium text-ink">
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

      <!-- ==================== CHAPTER II · WHAT'S INSIDE ==================== -->
      <section
        id="features"
        class="scroll-mt-20 border-t border-ink/10 bg-paper"
      >
        <div class="mx-auto max-w-7xl px-6 py-24 sm:px-10">
          <SectionHeading
            chapter="II"
            label="What's Inside"
            title="Every playthrough tells a story"
            subtitle="The most capable all-in-one app for managing and playing your retro game collection."
          />

          <!-- Encyclopedia spread: featured article + sidebar entries -->
          <div class="mt-14 grid gap-7 lg:grid-cols-[1.5fr_1fr]">
            <!-- main article -->
            <article class="panel relative overflow-hidden">
              <span
                aria-hidden="true"
                class="absolute inset-x-0 top-0 h-[3px] bg-primary-600"
              />
              <div class="p-7 sm:p-10">
                <div class="flex items-center gap-4">
                  <span
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/25 bg-paper-card text-lg text-primary-600"
                  >
                    <FontAwesomeIcon :icon="FEATURED.icon" />
                  </span>
                  <h3
                    class="font-display text-3xl font-medium text-ink md:text-4xl"
                  >
                    {{ FEATURED.title }}
                  </h3>
                </div>
                <p
                  class="drop-cap mt-6 max-w-xl font-serif text-base leading-relaxed text-ink-soft"
                >
                  {{ FEATURED.body }}
                </p>
                <a
                  :href="FEATURED.href"
                  target="_blank"
                  rel="noopener"
                  class="mt-6 inline-block"
                >
                  <span class="btn-plate btn-plate--sm">Read the docs →</span>
                </a>
              </div>
              <figure class="px-7 pb-8 sm:px-10 sm:pb-10">
                <div class="panel overflow-hidden p-1.5 sm:p-2">
                  <img
                    alt="Playing a game in the browser with EmulatorJS"
                    src="/images/blocks/v5/gallery.png"
                    srcset="
                      /images/blocks/v5/gallery.png    1x,
                      /images/blocks/v5/gallery@2x.png 2x
                    "
                    class="block w-full border border-ink/15"
                    loading="lazy"
                  />
                </div>
                <figcaption class="mt-3.5 text-center">
                  <span
                    class="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-vermilion-600"
                  >
                    Fig. 2
                  </span>
                  <span class="font-serif text-xs italic text-ink-soft">
                    &nbsp;·&nbsp; The library, ready for launch.
                  </span>
                </figcaption>
              </figure>
            </article>

            <!-- sidebar entries -->
            <div class="flex flex-col gap-7">
              <a
                v-for="feature in SIDE_FEATURES"
                :key="feature.href"
                :href="feature.href"
                target="_blank"
                rel="noopener"
                class="panel group relative flex flex-1 flex-col overflow-hidden p-7 transition-shadow duration-200 hover:shadow-float"
              >
                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 top-0 h-[3px]"
                  :class="feature.bar"
                />
                <div class="flex items-center gap-4">
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/25 bg-paper-card"
                    :class="feature.accent"
                  >
                    <FontAwesomeIcon :icon="feature.icon" />
                  </span>
                  <h3
                    class="flex-1 font-display text-2xl font-medium leading-snug text-ink"
                  >
                    {{ feature.title }}
                  </h3>
                  <span
                    aria-hidden="true"
                    class="shrink-0 self-start font-serif text-lg italic text-ink-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary-700"
                  >
                    →
                  </span>
                </div>
                <p
                  class="mb-6 mt-4 font-serif text-sm leading-relaxed text-ink-soft"
                >
                  {{ feature.body }}
                </p>
                <span
                  class="mt-auto block border-t border-ink/10 pt-3.5 font-serif text-xs italic text-ink-faint"
                >
                  {{ feature.xref }}
                </span>
              </a>
            </div>
          </div>

          <!-- bottom row: compact entries + nota bene -->
          <div class="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            <a
              v-for="feature in SMALL_FEATURES"
              :key="feature.href"
              :href="feature.href"
              target="_blank"
              rel="noopener"
              class="panel group relative overflow-hidden p-6 transition-shadow duration-200 hover:shadow-float"
            >
              <span
                aria-hidden="true"
                class="absolute inset-x-0 top-0 h-[3px]"
                :class="feature.bar"
              />
              <div class="flex items-center gap-3.5">
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/25 bg-paper-card text-sm"
                  :class="feature.accent"
                >
                  <FontAwesomeIcon :icon="feature.icon" />
                </span>
                <h3
                  class="font-display text-xl font-medium leading-snug text-ink"
                >
                  {{ feature.title }}
                </h3>
              </div>
              <p
                class="mt-3.5 font-serif text-sm leading-relaxed text-ink-soft"
              >
                {{ feature.body }}
              </p>
            </a>

            <!-- nota bene -->
            <a
              href="https://github.com/rommapp/romm"
              target="_blank"
              rel="noopener"
              class="group relative overflow-hidden border border-gold-600/40 bg-gold-100 p-6 shadow-card transition-shadow duration-200 hover:shadow-float"
            >
              <div class="kicker text-[9px] text-gold-700">Did you know?</div>
              <h3
                class="mt-2.5 font-display text-xl font-medium leading-snug text-ink"
              >
                RomM is free, forever.
              </h3>
              <p
                class="mt-2.5 font-serif text-sm leading-relaxed text-ink-soft"
              >
                AGPL-3.0, no tracking, no upsells. Your games, your data, your
                server.
              </p>
            </a>
          </div>
        </div>
      </section>

      <!-- ===================== CHAPTER III · FIELD GUIDE ===================== -->
      <section
        id="apps"
        class="scroll-mt-20 border-t border-ink/10 bg-paper-card py-24"
      >
        <div class="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading
            chapter="III"
            label="Play Anywhere"
            title="Your library on every device"
            subtitle="Native apps and integrations that bring your collection to desktops, handhelds and TVs. Pair a device in seconds with a QR code, and your saves follow you everywhere."
          />

          <div class="mt-16">
            <AppConsole :apps="APPS" @select="selectedImage = $event" />
          </div>
        </div>
      </section>

      <!-- ================== CHAPTER IV · THE SOCIETY ================== -->
      <section
        id="community"
        class="relative scroll-mt-20 overflow-hidden border-t border-ink/10 bg-paper-warm"
      >
        <GlyphField />
        <div class="relative mx-auto max-w-7xl px-6 py-24 sm:px-10">
          <SectionHeading
            chapter="IV"
            label="The Society of Collectors"
            title="In very good company"
            subtitle="Get help with your setup, share your ideas, and meet other keepers of well-ordered libraries."
          />

          <!-- vital statistics, ruled like a reference table -->
          <div
            class="mx-auto mt-14 grid max-w-4xl grid-cols-2 border-y border-ink/20 lg:grid-cols-4"
          >
            <div
              v-for="(stat, i) in STATS"
              :key="stat.label"
              class="flex flex-col items-center gap-2 border-ink/15 px-4 py-8 text-center"
              :class="{
                'border-l': i % 2 === 1,
                'lg:border-l': i > 0,
                'border-t lg:border-t-0': i > 1,
              }"
            >
              <div
                class="font-display text-4xl font-medium text-ink md:text-5xl"
              >
                <template v-if="stat.key === 'stars'">
                  {{ githubStars.toLocaleString() }}
                </template>
                <template v-else-if="stat.key === 'discord'">
                  {{ discordMembers.toLocaleString() }}
                </template>
                <template v-else>{{ stat.value }}</template>
              </div>
              <div class="kicker text-[9px] text-ink-faint">
                {{ stat.label }}
              </div>
            </div>
          </div>

          <div class="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/RGPJHNMMwJ"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-folio">
                <FontAwesomeIcon :icon="faDiscord" class="h-4" />
                Join the Discord
              </span>
            </a>
            <a
              href="https://github.com/rommapp/romm"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-plate">
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
        class="scroll-mt-20 border-t border-ink/10 bg-paper-card"
      >
        <div class="mx-auto max-w-7xl px-6 pt-20 sm:px-10">
          <SectionHeading
            prefix="Appendix"
            chapter="A"
            label="Supported Platforms"
            title="400+ platforms, catalogued"
            subtitle="Consoles, handhelds, computers and arcade boards — if you can emulate it, RomM can shelve it."
          />
        </div>
        <div class="mt-12 border-y border-ink/10">
          <PlatformMarquee />
        </div>
        <div
          class="mx-auto max-w-7xl px-6 py-8 text-center font-serif text-sm italic text-ink-soft sm:px-10"
        >
          A brief excerpt from the
          <a
            href="https://docs.romm.app/latest/platforms/supported-platforms/"
            target="_blank"
            rel="noopener"
            class="text-primary-700 underline decoration-dotted underline-offset-4 transition-colors hover:text-vermilion-600"
            >full catalogue</a
          >.
        </div>
      </section>

      <!-- =================== APPENDIX B · WHERE IT RUNS =================== -->
      <section
        id="appendix-b"
        class="scroll-mt-20 border-t border-ink/10 bg-paper"
      >
        <div class="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <SectionHeading
            prefix="Appendix"
            chapter="B"
            label="Where It Runs"
            title="At home on any server"
            subtitle="One-click installs and templates for every major self-hosting platform and operating system."
          />

          <div
            class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9 lg:gap-3"
          >
            <a
              v-for="platform in PLATFORMS"
              :key="platform.name"
              :href="platform.href"
              target="_blank"
              rel="noopener noreferrer"
              :title="platform.name"
              class="flex h-20 items-center justify-center border border-ink/15 bg-paper-card px-4 opacity-70 grayscale transition-all duration-200 hover:border-ink/50 hover:opacity-100 hover:shadow-card hover:grayscale-0"
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
      <footer id="index" class="scroll-mt-20 bg-ink text-paper">
        <div class="rule-spectrum" aria-hidden="true" />
        <div class="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
          <span class="kicker text-gold-400">Index</span>
        </div>
        <div
          class="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4"
        >
          <div>
            <h4 class="kicker text-[10px] text-gold-400">Project</h4>
            <ul class="mt-5 space-y-2.5 font-serif text-sm text-paper/75">
              <li>
                <a
                  href="https://docs.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Documentation</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/getting-started/quick-start/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Quick start</a
                >
              </li>
              <li>
                <a
                  href="https://demo.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Live demo</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/romm"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >GitHub</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="kicker text-[10px] text-gold-400">Apps</h4>
            <ul class="mt-5 space-y-2.5 font-serif text-sm text-paper/75">
              <li>
                <a
                  href="https://github.com/rommapp/playnite-plugin"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Playnite plugin</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/argosy-launcher"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Argosy launcher</a
                >
              </li>
              <li>
                <a
                  href="https://grout.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Grout</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="kicker text-[10px] text-gold-400">Ecosystem</h4>
            <ul class="mt-5 space-y-2.5 font-serif text-sm text-paper/75">
              <li>
                <a
                  href="https://docs.romm.app/latest/platforms/supported-platforms/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Supported platforms</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/getting-started/metadata-providers/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Metadata providers</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/ecosystem/feed-clients/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Feed clients</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/developers/api-reference/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >API reference</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="kicker text-[10px] text-gold-400">Community</h4>
            <ul class="mt-5 space-y-2.5 font-serif text-sm text-paper/75">
              <li>
                <a
                  href="https://discord.gg/RGPJHNMMwJ"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Discord</a
                >
              </li>
              <li>
                <a
                  href="https://opencollective.com/romm"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-300"
                  >Open Collective</a
                >
              </li>
              <li>
                <a
                  href="mailto:contact@romm.app"
                  class="transition-colors hover:text-gold-300"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/15 py-6">
          <div
            class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 sm:px-10"
          >
            <span class="font-serif text-xs italic text-paper/60">
              Set in EB Garamond &amp; Gelasio · Bound with care by the RomM
              Project · AGPL-3.0
            </span>
            <span
              aria-label="Secured with Aikido"
              class="inline-flex items-stretch overflow-hidden border border-white/25"
            >
              <span
                class="flex items-center gap-1.5 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-paper/70"
              >
                <FontAwesomeIcon
                  :icon="faShieldHeart"
                  class="h-2.5 text-gold-400"
                />
                Secured with
              </span>
              <span
                class="flex items-center bg-gold-500 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-ink"
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
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-10"
        @click="selectedImage = undefined"
      >
        <div class="panel overflow-hidden">
          <div
            class="flex items-center justify-between border-b border-ink/15 px-4 py-2.5"
          >
            <span class="font-serif text-sm italic text-ink-soft">
              {{ selectedImage.alt }}
            </span>
            <button
              type="button"
              class="kicker ml-4 text-[10px] text-ink-faint transition-colors hover:text-ink"
              aria-label="Close"
              @click="selectedImage = undefined"
            >
              Close ×
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
