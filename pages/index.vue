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

import v5Gallery from "~/assets/images/screenshots/v5/gallery.jpg";
import v5Details from "~/assets/images/screenshots/v5/details.jpg";
import v5Crt from "~/assets/images/screenshots/v5/crt.jpg";
import v5Patcher from "~/assets/images/screenshots/v5/patcher.jpg";
import v5Permissions from "~/assets/images/screenshots/v5/permissions.jpg";
import v5Music from "~/assets/images/screenshots/v5/music.jpg";

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

// Official screenshots from the 5.0.0 release notes
const V5_IMAGES: AppImage[] = [
  { src: v5Gallery, alt: "RomM 5.0 platform gallery" },
  { src: v5Details, alt: "RomM 5.0 game details" },
  { src: v5Crt, alt: "CRT mode shader" },
  { src: v5Patcher, alt: "Server-side ROM patcher" },
  { src: v5Permissions, alt: "Granular permission system" },
  { src: v5Music, alt: "Built-in music player" },
];

const CHANGELOG = [
  {
    title: "UI overhaul",
    detail: "a new design system, at home with mouse, touch or gamepad",
  },
  { title: "Shared savestates", detail: "pass progress between users" },
  { title: "CRT mode", detail: "a shader for that 90s glow" },
  {
    title: "ROM patching",
    detail: "apply stored or uploaded patches server-side",
  },
  { title: "QR pairing", detail: "connect devices in seconds" },
  {
    title: "Permissions",
    detail: "granular per-user and per-group control",
  },
  {
    title: "And more",
    detail: "interactive 3D boxart, music player, real-time logs",
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

const SLASHES = "/".repeat(240);

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

    <main class="mx-auto max-w-[88rem] border-x border-grid">
      <!-- ============================== HERO ============================== -->
      <section class="relative overflow-hidden border-b border-grid">
        <div aria-hidden="true" class="dot-grid absolute inset-0" />
        <GlyphField />
        <div
          aria-hidden="true"
          class="absolute -top-48 left-1/2 h-[38rem] w-[64rem] max-w-none -translate-x-1/2 rounded-full bg-primary-500/10 blur-[120px]"
        />
        <div aria-hidden="true" class="scanlines absolute inset-0" />

        <div
          class="relative z-10 px-6 pb-16 pt-16 text-center sm:px-10 md:pt-24 lg:px-16"
        >
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div
              class="inline-flex items-center gap-3 border border-grid bg-ink-900/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-300"
            >
              <span
                aria-hidden="true"
                class="h-1.5 w-1.5 animate-pulse bg-primary-400"
              />
              Self-hosted rom manager — system online
            </div>
            <a
              href="https://github.com/rommapp/romm/releases/tag/5.0.0"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 border border-primary-700 bg-primary-950/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-300 transition-colors hover:border-primary-400 hover:text-primary-200"
            >
              <span class="bg-primary-500 px-1.5 font-bold text-ink-950">
                New
              </span>
              RomM 5.0 is out ↗
            </a>
          </div>

          <h1
            class="mx-auto mt-10 font-pixel text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl md:text-5xl xl:text-6xl"
          >
            Your collection,<br />
            <span class="text-primary-400">perfected</span
            ><span class="blink text-primary-400">_</span>
          </h1>

          <p class="mx-auto mt-8 max-w-2xl leading-relaxed text-muted">
            Scan, enrich, browse and play your game collection from one
            beautiful self-hosted app. Metadata from seven providers, save sync
            across your devices, and support for 400+ platforms — RomM is a
            must-have for anyone who plays on emulators.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="https://docs.romm.app" target="_blank" rel="noopener">
              <span class="btn-pixel">Install now</span>
            </a>
            <a href="https://demo.romm.app" target="_blank" rel="noopener">
              <span class="btn-ghost">View demo ↗</span>
            </a>
          </div>

          <div
            class="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            <span
              ><span class="text-primary-400">[license]</span> AGPL-3.0</span
            >
            <span><span class="text-primary-400">[price]</span> $0.00</span>
            <span
              ><span class="text-primary-400">[setup]</span> one container</span
            >
            <span><span class="text-primary-400">[data]</span> 100% yours</span>
          </div>

          <CropFrame class="mx-auto mt-16 max-w-5xl">
            <div
              class="border border-grid bg-ink-900 shadow-2xl shadow-primary-950/50"
            >
              <div
                class="flex items-center justify-between border-b border-grid bg-ink-800 px-3 py-2"
              >
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  <span class="h-2 w-2 bg-primary-500" />
                  <span class="h-2 w-2 bg-primary-700" />
                  <span class="h-2 w-2 bg-grid" />
                </div>
                <span
                  class="font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  romm@server:~/library — v5.0
                </span>
              </div>
              <img
                src="/images/blocks/v5/hero-v5.jpg"
                srcset="
                  /images/blocks/v5/hero-v5.jpg    1x,
                  /images/blocks/v5/hero-v5@2x.jpg 2x
                "
                alt="RomM 5.0 home view showing a game library"
                class="block w-full"
                fetchpriority="high"
              />
            </div>
          </CropFrame>
        </div>
      </section>

      <!-- =========================== WHAT'S NEW =========================== -->
      <section
        id="whats-new"
        class="border-b border-grid px-6 py-20 sm:px-10 lg:px-16"
      >
        <SectionHeading
          index="01"
          label="What's new"
          title="5.0 just dropped"
          subtitle="A ground-up UI overhaul and a stack of new toys, fresh from the July 2026 release."
        />

        <div class="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div class="border border-grid bg-ink-900">
              <div
                class="flex items-center justify-between border-b border-grid bg-ink-800 px-3 py-2"
              >
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  <span class="h-2 w-2 bg-primary-500" />
                  <span class="h-2 w-2 bg-primary-700" />
                  <span class="h-2 w-2 bg-grid" />
                </div>
                <span
                  class="font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  romm@server:~$ changelog --latest
                </span>
              </div>
              <ul class="space-y-3 p-6 font-mono text-xs leading-relaxed">
                <li
                  v-for="entry in CHANGELOG"
                  :key="entry.title"
                  class="flex gap-3"
                >
                  <span aria-hidden="true" class="text-primary-400">+</span>
                  <span>
                    <span class="uppercase text-cream">{{ entry.title }}</span>
                    <span class="text-muted"> — {{ entry.detail }}</span>
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="https://github.com/rommapp/romm/releases/tag/5.0.0"
              target="_blank"
              rel="noopener"
              class="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-primary-300 transition-colors hover:text-primary-200"
            >
              Read the full release notes ↗
            </a>
          </div>
          <CropFrame>
            <AppGallery
              :images="V5_IMAGES"
              label="~/releases/v5.0.0"
              @select="selectedImage = $event"
            />
          </CropFrame>
        </div>
      </section>

      <!-- ========================= PLATFORM STRIP ========================= -->
      <section class="border-b border-grid">
        <div
          class="flex items-center justify-between gap-4 border-b border-grid px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          <span>Runs on everything you already host</span>
          <span aria-hidden="true" class="hidden text-grid sm:block"
            >////////////////</span
          >
        </div>
        <div class="pause-on-hover flex overflow-hidden">
          <div
            v-for="copy in 2"
            :key="copy"
            :aria-hidden="copy === 2"
            class="animate-marquee flex min-w-full shrink-0 items-center"
          >
            <a
              v-for="platform in PLATFORMS"
              :key="platform.name"
              :href="platform.href"
              target="_blank"
              rel="noopener noreferrer"
              :tabindex="copy === 2 ? -1 : undefined"
              class="flex h-24 w-52 shrink-0 items-center justify-center border-r border-grid px-8 opacity-50 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
            >
              <img
                :src="platform.src"
                :alt="platform.name"
                class="max-h-10 w-auto max-w-[8.5rem]"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      <!-- ============================= STATS ============================= -->
      <section class="border-b border-grid">
        <div class="grid grid-cols-2 gap-px bg-grid lg:grid-cols-4">
          <div class="bg-ink-950 p-8 text-center md:p-10">
            <div class="font-pixel text-2xl font-bold text-cream md:text-4xl">
              {{ githubStars.toLocaleString() }}
            </div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              GitHub stars
            </div>
          </div>
          <div class="bg-ink-950 p-8 text-center md:p-10">
            <div class="font-pixel text-2xl font-bold text-cream md:text-4xl">
              {{ discordMembers.toLocaleString() }}
            </div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              Discord members
            </div>
          </div>
          <div class="bg-ink-950 p-8 text-center md:p-10">
            <div class="font-pixel text-2xl font-bold text-cream md:text-4xl">
              1.7M+
            </div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              Docker pulls
            </div>
          </div>
          <div class="bg-ink-950 p-8 text-center md:p-10">
            <div class="font-pixel text-2xl font-bold text-cream md:text-4xl">
              400+
            </div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              Platforms supported
            </div>
          </div>
        </div>
      </section>

      <!-- ============================ FEATURES ============================ -->
      <section
        id="features"
        class="border-b border-grid px-6 py-20 sm:px-10 lg:px-16"
      >
        <SectionHeading
          index="02"
          label="Features"
          title="Every pixel tells a story"
          subtitle="The most powerful all-in-one app for managing — and playing — your game collection."
        />

        <!-- Flagship features -->
        <div
          class="mt-12 grid gap-px border border-grid bg-grid lg:grid-cols-3"
        >
          <div
            class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900 lg:p-10"
          >
            <div class="flex items-center justify-between">
              <FontAwesomeIcon :icon="faGamepad" class="h-7 text-primary-400" />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[01]</span
              >
            </div>
            <h3 class="mt-6 font-pixel text-lg font-bold uppercase text-cream">
              Play in your browser
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              EmulatorJS, MS-DOS and Flash players are built in. Hit Play and
              you're in the game — no cores to configure, no files to move.
            </p>
            <ul
              class="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-wider text-muted"
            >
              <li>
                <span class="text-primary-400">&gt;</span> netplay with friends
              </li>
              <li>
                <span class="text-primary-400">&gt;</span> CRT shader mode
              </li>
              <li>
                <span class="text-primary-400">&gt;</span> per-game core memory
              </li>
            </ul>
            <a
              href="https://docs.romm.app/latest/using/in-browser-play/emulatorjs/"
              target="_blank"
              rel="noopener"
              class="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-primary-300 transition-colors hover:text-primary-200"
              >docs ↗</a
            >
          </div>

          <div
            class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900 lg:p-10"
          >
            <div class="flex items-center justify-between">
              <FontAwesomeIcon :icon="faRotate" class="h-7 text-primary-400" />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[02]</span
              >
            </div>
            <h3 class="mt-6 font-pixel text-lg font-bold uppercase text-cream">
              Saves that follow you
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              A full save-sync engine keeps saves and states in step across your
              devices, with conflict detection when two of them disagree.
            </p>
            <ul
              class="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-wider text-muted"
            >
              <li>
                <span class="text-primary-400">&gt;</span> shared savestates
                between users
              </li>
              <li>
                <span class="text-primary-400">&gt;</span> on-demand, watched or
                scheduled
              </li>
              <li>
                <span class="text-primary-400">&gt;</span> play session tracking
              </li>
            </ul>
            <a
              href="https://docs.romm.app/latest/using/saves-and-states/"
              target="_blank"
              rel="noopener"
              class="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-primary-300 transition-colors hover:text-primary-200"
              >docs ↗</a
            >
          </div>

          <div
            class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900 lg:p-10"
          >
            <div class="flex items-center justify-between">
              <FontAwesomeIcon
                :icon="faWandSparkles"
                class="h-7 text-primary-400"
              />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[03]</span
              >
            </div>
            <h3 class="mt-6 font-pixel text-lg font-bold uppercase text-cream">
              A library that curates itself
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              Cover art, screenshots and deep metadata from IGDB, ScreenScraper,
              MobyGames, LaunchBox, Hasheous and more — matched by hash, not
              guesswork.
            </p>
            <ul
              class="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-wider text-muted"
            >
              <li>
                <span class="text-primary-400">&gt;</span> smart &amp; virtual
                collections
              </li>
              <li>
                <span class="text-primary-400">&gt;</span> RetroAchievements
                progress
              </li>
              <li>
                <span class="text-primary-400">&gt;</span> region-correct
                artwork
              </li>
            </ul>
            <a
              href="https://docs.romm.app/latest/getting-started/metadata-providers/"
              target="_blank"
              rel="noopener"
              class="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-primary-300 transition-colors hover:text-primary-200"
              >docs ↗</a
            >
          </div>
        </div>

        <!-- Supporting features -->
        <div
          class="grid gap-px border border-t-0 border-grid bg-grid sm:grid-cols-2 lg:grid-cols-4"
        >
          <div class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900">
            <div class="flex items-center justify-between">
              <FontAwesomeIcon :icon="faUsers" class="h-6 text-primary-400" />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[04]</span
              >
            </div>
            <h3 class="mt-6 text-lg font-semibold text-cream">
              Multi-user &amp; SSO
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              Granular per-user and per-group permissions, plus
              <a
                href="https://docs.romm.app/latest/administration/oidc/"
                target="_blank"
                rel="noopener"
                class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                >OIDC single sign-on</a
              >
              with Authelia, Authentik, Keycloak and friends.
            </p>
          </div>

          <div class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900">
            <div class="flex items-center justify-between">
              <FontAwesomeIcon
                :icon="faScrewdriverWrench"
                class="h-6 text-primary-400"
              />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[05]</span
              >
            </div>
            <h3 class="mt-6 text-lg font-semibold text-cream">ROM patcher</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              Apply romhacks and translations
              <a
                href="https://docs.romm.app/latest/using/rom-patcher/"
                target="_blank"
                rel="noopener"
                class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                >server-side</a
              >, from stored or uploaded patch files — originals stay untouched.
            </p>
          </div>

          <div class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900">
            <div class="flex items-center justify-between">
              <FontAwesomeIcon :icon="faPlug" class="h-6 text-primary-400" />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[06]</span
              >
            </div>
            <h3 class="mt-6 text-lg font-semibold text-cream">
              Open ecosystem
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              ES-DE and Pegasus exports, LaunchBox import,
              <a
                href="https://docs.romm.app/latest/ecosystem/feed-clients/"
                target="_blank"
                rel="noopener"
                class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                >feed clients</a
              >, and a full
              <a
                href="https://docs.romm.app/latest/developers/api-reference/"
                target="_blank"
                rel="noopener"
                class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                >REST API</a
              >
              with device tokens.
            </p>
          </div>

          <div class="group bg-ink-950 p-8 transition-colors hover:bg-ink-900">
            <div class="flex items-center justify-between">
              <FontAwesomeIcon
                :icon="faShieldHeart"
                class="h-6 text-primary-400"
              />
              <span
                class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                >[07]</span
              >
            </div>
            <h3 class="mt-6 text-lg font-semibold text-cream">
              Free, open, yours
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              AGPL-3.0, no tracking, no upsells. Your games, your data, your
              server — built by the community, for the community.
            </p>
          </div>
        </div>
      </section>

      <!-- ============================== APPS ============================== -->
      <section
        id="apps"
        class="border-b border-grid px-6 py-20 sm:px-10 lg:px-16"
      >
        <SectionHeading
          index="03"
          label="Play anywhere"
          title="Your library, on every screen"
          subtitle="Native apps and integrations that bring your collection to desktops, handhelds and TVs. Pair a device in seconds with a QR code — your saves follow you everywhere."
        />

        <div class="mt-16 flex flex-col gap-20">
          <!-- Playnite -->
          <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <CropFrame>
              <AppGallery
                :images="PLAYNITE_IMAGES"
                label="~/integrations/playnite"
                @select="selectedImage = $event"
              />
            </CropFrame>
            <div>
              <div class="flex items-start justify-between gap-6">
                <div>
                  <div class="flex flex-wrap gap-2">
                    <div
                      class="inline-flex items-center gap-2 border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary-300"
                    >
                      <FontAwesomeIcon :icon="faWindows" class="h-3" />
                      Windows
                    </div>
                    <div
                      class="inline-flex items-center border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
                    >
                      QR pairing
                    </div>
                  </div>
                  <h3
                    class="mt-5 font-pixel text-xl font-bold uppercase text-cream md:text-2xl"
                  >
                    Playnite Plugin
                  </h3>
                </div>
                <img :src="playnite" alt="Playnite logo" class="h-16 w-16" />
              </div>
              <p class="mt-4 leading-relaxed text-muted">
                Effortlessly integrate your retro game collection into Playnite
                with our plugin.
                <a
                  href="https://playnite.link/"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >Playnite</a
                >
                is an open-source game library manager that provides a unified
                interface for all of your games on PC.
              </p>
              <a
                href="https://github.com/rommapp/playnite-plugin?tab=readme-ov-file#installation"
                target="_blank"
                rel="noopener"
                class="mt-8 inline-block"
              >
                <span class="btn-ghost">Install ↗</span>
              </a>
            </div>
          </div>

          <!-- Argosy -->
          <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <CropFrame class="lg:order-2">
              <AppGallery
                :images="ARGOSY_IMAGES"
                label="~/apps/argosy"
                @select="selectedImage = $event"
              />
            </CropFrame>
            <div class="lg:order-1">
              <div class="flex items-start justify-between gap-6">
                <div>
                  <div class="flex flex-wrap gap-2">
                    <div
                      class="inline-flex items-center gap-2 border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary-300"
                    >
                      <FontAwesomeIcon :icon="faAndroid" class="h-3" />
                      Android
                    </div>
                    <div
                      class="inline-flex items-center border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
                    >
                      QR pairing
                    </div>
                    <div
                      class="inline-flex items-center border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
                    >
                      Save sync
                    </div>
                  </div>
                  <h3
                    class="mt-5 font-pixel text-xl font-bold uppercase text-cream md:text-2xl"
                  >
                    Argosy Launcher
                  </h3>
                </div>
                <img :src="argosy" alt="Argosy logo" class="h-16 w-16" />
              </div>
              <p class="mt-4 leading-relaxed text-muted">
                Sync your library, download games on demand, track your
                achievements, and play across devices with automatic save sync,
                all from a gamepad-first interface designed for Anbernic,
                Retroid Pocket, Odin, and similar devices.
              </p>
              <a
                href="https://github.com/rommapp/argosy-launcher/releases/latest/"
                target="_blank"
                rel="noopener"
                class="mt-8 inline-block"
              >
                <span class="btn-ghost">Download ↗</span>
              </a>
            </div>
          </div>

          <!-- Grout -->
          <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <CropFrame>
              <AppGallery
                :images="GROUT_IMAGES"
                label="~/apps/grout"
                @select="selectedImage = $event"
              />
            </CropFrame>
            <div>
              <div class="flex items-start justify-between gap-6">
                <div>
                  <div class="flex flex-wrap gap-2">
                    <div
                      class="inline-flex items-center gap-2 border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary-300"
                    >
                      <FontAwesomeIcon :icon="faGamepad" class="h-3" />
                      Handhelds
                    </div>
                    <div
                      class="inline-flex items-center border border-grid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
                    >
                      Save sync
                    </div>
                  </div>
                  <h3
                    class="mt-5 font-pixel text-xl font-bold uppercase text-cream md:text-2xl"
                  >
                    Grout
                  </h3>
                </div>
                <img :src="grout" alt="Grout logo" class="h-16 w-16" />
              </div>
              <p class="mt-4 leading-relaxed text-muted">
                A lightweight client for your favorite handheld CFWs, available
                on
                <a
                  href="https://muos.dev"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >muOS</a
                >,
                <a
                  href="https://knulli.org"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >Knulli</a
                >,
                <a
                  href="https://rocknix.org"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >ROCKNIX</a
                >,
                <a
                  href="https://spruceui.github.io/"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >Spruce (v4)</a
                >,
                <a
                  href="https://nextui.loveretro.games"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >NextUI</a
                >
                and
                <a
                  href="https://trimui.com"
                  target="_blank"
                  rel="noopener"
                  class="underline decoration-grid underline-offset-4 transition-colors hover:text-primary-300"
                  >TrimUI</a
                >. Download games, box art and BIOS files wirelessly, and sync
                your saves automatically as you play.
              </p>
              <a
                href="https://grout.romm.app/getting-started/"
                target="_blank"
                rel="noopener"
                class="mt-8 inline-block"
              >
                <span class="btn-ghost">Quick start ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- =========================== COMMUNITY =========================== -->
      <section class="relative overflow-hidden border-b border-grid">
        <GlyphField />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,116,232,0.16),transparent_65%)]"
        />
        <div class="relative z-10 px-6 py-24 text-center sm:px-10 lg:px-16">
          <div
            class="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary-400"
          >
            <span>04</span>
            <span class="text-muted">//</span>
            <span>Powered by friendship</span>
          </div>
          <h2
            class="mt-6 font-pixel text-2xl font-bold uppercase text-cream sm:text-3xl md:text-4xl"
          >
            Join the party
          </h2>
          <p class="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
            Get help with your setup, share your ideas, and meet other fans of
            RomM.
          </p>
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/RGPJHNMMwJ"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-pixel">
                <FontAwesomeIcon :icon="faDiscord" class="h-4" />
                Join the Discord
              </span>
            </a>
            <a
              href="https://github.com/rommapp/romm"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-ghost">
                <FontAwesomeIcon :icon="faGithub" class="h-4" />
                Contribute
              </span>
            </a>
          </div>
        </div>
      </section>

      <!-- ============================= FOOTER ============================= -->
      <footer>
        <div class="grid gap-px bg-grid sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-ink-950 p-8">
            <h4
              class="font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
            >
              Project
            </h4>
            <ul class="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://docs.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Documentation</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/getting-started/quick-start/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Quick start</a
                >
              </li>
              <li>
                <a
                  href="https://demo.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Live demo</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/romm"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >GitHub</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/romm/releases/latest"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Latest release</a
                >
              </li>
            </ul>
          </div>
          <div class="bg-ink-950 p-8">
            <h4
              class="font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
            >
              Apps
            </h4>
            <ul class="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/rommapp/playnite-plugin"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Playnite plugin</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/rommapp/argosy-launcher"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Argosy launcher</a
                >
              </li>
              <li>
                <a
                  href="https://grout.romm.app"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Grout</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/ecosystem/first-party-apps/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >First-party apps</a
                >
              </li>
            </ul>
          </div>
          <div class="bg-ink-950 p-8">
            <h4
              class="font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
            >
              Ecosystem
            </h4>
            <ul class="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://docs.romm.app/latest/platforms/supported-platforms/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Supported platforms</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/getting-started/metadata-providers/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Metadata providers</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/ecosystem/feed-clients/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Feed clients</a
                >
              </li>
              <li>
                <a
                  href="https://docs.romm.app/latest/developers/api-reference/"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >API reference</a
                >
              </li>
            </ul>
          </div>
          <div class="bg-ink-950 p-8">
            <h4
              class="font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
            >
              Community
            </h4>
            <ul class="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://discord.gg/RGPJHNMMwJ"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Discord</a
                >
              </li>
              <li>
                <a
                  href="https://opencollective.com/romm"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-primary-300"
                  >Open Collective</a
                >
              </li>
              <li>
                <a
                  href="mailto:contact@romm.app"
                  class="transition-colors hover:text-primary-300"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex flex-wrap items-center justify-between gap-4 border-t border-grid px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
        >
          <span>Your collection, perfected.</span>
          <span class="hidden md:block">© The RomM Project — AGPL-3.0</span>
          <img
            src="https://app.aikido.dev/assets/badges/label-only-dark-theme.svg"
            alt="Aikido Security Audit Report"
            class="h-6"
          />
        </div>

        <div class="relative overflow-hidden border-t border-grid">
          <div
            aria-hidden="true"
            class="overflow-hidden whitespace-nowrap px-2 pt-4 font-mono text-[10px] text-grid"
          >
            {{ SLASHES }}
          </div>
          <div
            aria-hidden="true"
            class="select-none bg-gradient-to-b from-primary-300 via-primary-600 to-ink-950 bg-clip-text px-4 pb-2 pt-4 text-center font-pixel text-[clamp(4rem,17vw,15rem)] font-bold leading-none text-transparent"
          >
            ROMM
          </div>
        </div>
      </footer>
    </main>

    <!-- ============================ LIGHTBOX ============================ -->
    <Teleport to="body">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm sm:p-10"
        @click="selectedImage = undefined"
      >
        <CropFrame class="w-full max-w-5xl" @click.stop>
          <div class="border border-grid bg-ink-900">
            <div
              class="flex items-center justify-between border-b border-grid bg-ink-800 px-3 py-2"
            >
              <span
                class="font-mono text-[10px] uppercase tracking-widest text-muted"
              >
                {{ selectedImage.alt }}
              </span>
              <button
                type="button"
                class="font-mono text-xs text-muted transition-colors hover:text-cream"
                aria-label="Close"
                @click="selectedImage = undefined"
              >
                [x]
              </button>
            </div>
            <img
              :src="selectedImage.src"
              :alt="selectedImage.alt"
              class="block max-h-[80vh] w-full object-contain"
            />
          </div>
        </CropFrame>
      </div>
    </Teleport>
  </div>
</template>
