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
  faLock,
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
    label: "playnite.plugin",
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
    label: "argosy.launcher",
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
    label: "grout.client",
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

const FEATURES = [
  {
    icon: faGamepad,
    title: "Play in your browser",
    body: "EmulatorJS, MS-DOS and Flash players are built in. Hit Play and you're in the game — no cores to configure, no files to move.",
    href: "https://docs.romm.app/latest/using/in-browser-play/emulatorjs/",
    size: "featured",
    orb: "radial-gradient(circle at 32% 28%, #a6e4ff, #00a8e8 60%, #005076)",
    glow: "rgba(0, 168, 232, 0.55)",
  },
  {
    icon: faRotate,
    title: "Saves that follow you",
    body: "A full save-sync engine keeps saves and states in step across your devices, with conflict detection when two of them disagree.",
    href: "https://docs.romm.app/latest/using/saves-and-states/",
    size: "wide",
    orb: "radial-gradient(circle at 32% 28%, #d8f76e, #a5db13 60%, #5c7f04)",
    glow: "rgba(165, 219, 19, 0.5)",
  },
  {
    icon: faWandSparkles,
    title: "Magical metadata",
    body: "Cover art, screenshots and deep metadata from IGDB, ScreenScraper, LaunchBox, RetroAchievements and more — matched by hash, not guesswork.",
    href: "https://docs.romm.app/latest/getting-started/metadata-providers/",
    size: "wide",
    orb: "radial-gradient(circle at 32% 28%, #bdb3ff, #8a7cff 60%, #4d3fb8)",
    glow: "rgba(138, 124, 255, 0.5)",
  },
  {
    icon: faUsers,
    title: "Multiplayer",
    body: "Granular per-user controls, plus OIDC single sign-on with Authelia, Authentik, Keycloak and friends.",
    href: "https://docs.romm.app/latest/administration/oidc/",
    size: "small",
    orb: "radial-gradient(circle at 32% 28%, #ff9bdd, #ff3eb5 60%, #a3126c)",
    glow: "rgba(255, 62, 181, 0.45)",
  },
  {
    icon: faScrewdriverWrench,
    title: "ROM patcher",
    body: "Apply romhacks and translations server-side, from stored or uploaded patch files.",
    href: "https://docs.romm.app/latest/using/rom-patcher/",
    size: "small",
    orb: "radial-gradient(circle at 32% 28%, #a6e4ff, #00a8e8 60%, #005076)",
    glow: "rgba(0, 168, 232, 0.55)",
  },
  {
    icon: faPlug,
    title: "Ecosystem",
    body: "ES-DE and Pegasus exports, LaunchBox import, feed clients, and a full REST API with device tokens.",
    href: "https://docs.romm.app/latest/developers/api-reference/",
    size: "small",
    orb: "radial-gradient(circle at 32% 28%, #d8f76e, #a5db13 60%, #5c7f04)",
    glow: "rgba(165, 219, 19, 0.5)",
  },
  {
    icon: faShieldHeart,
    title: "Free forever",
    body: "AGPL-3.0, no tracking, no upsells. Your games, your data, your server.",
    href: "https://github.com/rommapp/romm",
    size: "small",
    orb: "radial-gradient(circle at 32% 28%, #ff9bdd, #ff3eb5 60%, #a3126c)",
    glow: "rgba(255, 62, 181, 0.45)",
  },
];

const FEATURE_SPAN: Record<string, string> = {
  featured: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  small: "",
};

const STATS = [
  { value: "", key: "stars", label: "GitHub stars" },
  { value: "", key: "discord", label: "Discord members" },
  { value: "1.7M+", key: "", label: "Docker pulls" },
  { value: "#1", key: "", label: "on Hackernews" },
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
  <div class="mesh min-h-screen">
    <AppHeader :githubStars="githubStars" />

    <main>
      <!-- ========================= WELCOME SPLASH ========================= -->
      <section class="relative overflow-hidden">
        <GlyphField />

        <!-- big glossy chrome orb, floating off-canvas -->
        <div
          aria-hidden="true"
          class="animate-float pointer-events-none absolute -left-24 top-40 hidden h-64 w-64 rounded-full opacity-70 lg:block"
          style="
            background: radial-gradient(
              circle at 32% 28%,
              #ffffff 0%,
              #dce6ee 40%,
              #9fb4c4 70%,
              #e9f0f5 100%
            );
            box-shadow:
              inset -14px -18px 40px rgba(62, 96, 118, 0.35),
              0 20px 60px rgba(6, 38, 63, 0.2);
          "
        />

        <div
          class="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 text-center sm:px-10"
        >
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div
              class="glass-sm inline-flex items-center gap-2 !rounded-full px-4 py-1.5 font-tech text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft"
            >
              the self-hosted rom manager
            </div>
            <a
              href="https://github.com/rommapp/romm/releases/tag/5.0.0"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-tech text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-transform hover:scale-105"
              style="
                background: linear-gradient(
                  92deg,
                  #00a8e8,
                  #8a7cff 50%,
                  #ff3eb5
                );
                box-shadow: 0 4px 14px rgba(138, 124, 255, 0.45);
              "
            >
              ✦ romm 5.0 is here →
            </a>
          </div>

          <h1
            class="mx-auto mt-12 max-w-4xl font-display text-4xl lowercase leading-[1.15] text-ink sm:text-5xl md:text-6xl"
          >
            your collection.<br />
            <span class="iridescent">perfected.</span>
          </h1>

          <p
            class="mx-auto mt-8 max-w-2xl font-tech text-lg leading-relaxed text-ink-soft"
          >
            Scan, enrich, browse and play your game collection from one
            beautiful self-hosted app. Metadata from seven providers, save sync
            across your devices, and support for 400+ platforms.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.romm.app/latest/getting-started/quick-start/"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-gel"
                ><span class="relative">install now</span></span
              >
            </a>
            <a href="https://demo.romm.app" target="_blank" rel="noopener">
              <span class="btn-gel btn-gel--chrome">
                <span class="relative">launch demo →</span>
              </span>
            </a>
          </div>

          <!-- the library, inside a millennium browser window -->
          <div class="mx-auto mt-16 max-w-4xl">
            <div
              class="overflow-hidden rounded-2xl border border-chrome-300 shadow-glass"
            >
              <!-- browser chrome -->
              <div
                class="chrome-bar flex items-center gap-3 border-b border-chrome-300 px-4 py-2.5"
              >
                <span class="flex items-center gap-1.5" aria-hidden="true">
                  <span
                    class="h-3 w-3 rounded-full border border-red-400/60"
                    style="
                      background: radial-gradient(
                        circle at 35% 30%,
                        #ffb3ab,
                        #f4574a
                      );
                    "
                  />
                  <span
                    class="h-3 w-3 rounded-full border border-amber-400/60"
                    style="
                      background: radial-gradient(
                        circle at 35% 30%,
                        #ffe3a3,
                        #f5b31b
                      );
                    "
                  />
                  <span
                    class="h-3 w-3 rounded-full border border-green-500/60"
                    style="
                      background: radial-gradient(
                        circle at 35% 30%,
                        #b8f5b1,
                        #34c748
                      );
                    "
                  />
                </span>
                <span
                  class="flex flex-1 items-center gap-2 rounded-full border border-chrome-300 bg-white px-3 py-1 text-left font-mono text-[11px] text-ink-soft"
                >
                  <FontAwesomeIcon
                    :icon="faLock"
                    class="h-2.5 text-lime-600"
                    aria-hidden="true"
                  />
                  http://romm.local/library
                </span>
                <span
                  aria-hidden="true"
                  class="hidden font-tech text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint sm:block"
                >
                  100%
                </span>
              </div>
              <div class="relative bg-primary-950">
                <img
                  alt="The RomM collection view"
                  src="/images/blocks/v5/collection.png"
                  srcset="
                    /images/blocks/v5/collection.png    1x,
                    /images/blocks/v5/collection@2x.png 2x
                  "
                  class="block w-full"
                  fetchpriority="high"
                />
                <!-- glossy screen reflection -->
                <div
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/20 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================= PLATFORM TICKER ======================= -->
      <section class="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <div class="glass overflow-hidden">
          <div
            class="flex items-center justify-between gap-4 border-b border-white/70 px-6 py-3 font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-ink-faint"
          >
            <span class="text-primary-600">✦ 400+ supported platforms</span>
            <span aria-hidden="true" class="hidden sm:block">
              consoles · handhelds · computers · arcade
            </span>
          </div>
          <PlatformMarquee />
        </div>
      </section>

      <!-- ============================ FEATURES ============================ -->
      <section id="features" class="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <SectionHeading
          label="Features"
          title="every playthrough tells a story"
          subtitle="The most powerful all-in-one app for managing and playing your retro game collection."
        />

        <!-- glass bento grid -->
        <div
          class="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <a
            v-for="feature in FEATURES"
            :key="feature.href"
            :href="feature.href"
            target="_blank"
            rel="noopener"
            :class="[FEATURE_SPAN[feature.size]]"
            class="glass group relative overflow-hidden p-7 transition-all duration-200 hover:-translate-y-1 hover:bg-white/80"
          >
            <!-- soft color glow behind the card content -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
              :style="{ background: feature.glow }"
            />

            <div class="relative flex items-center gap-4">
              <!-- gel orb icon -->
              <span
                class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover:scale-110"
                :style="{
                  background: feature.orb,
                  boxShadow: `0 4px 12px ${feature.glow}, inset 0 2px 3px rgba(255,255,255,0.7)`,
                }"
              >
                <FontAwesomeIcon :icon="feature.icon" class="drop-shadow" />
              </span>
              <h3
                class="flex-1 font-display leading-snug text-ink"
                :class="
                  feature.size === 'featured'
                    ? 'text-lg md:text-xl'
                    : 'text-base'
                "
              >
                {{ feature.title }}
              </h3>
              <span
                aria-hidden="true"
                class="shrink-0 self-start font-tech text-sm font-bold text-chrome-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary-500"
              >
                →
              </span>
            </div>

            <p
              class="relative mt-4 text-sm leading-relaxed text-ink-soft"
              :class="
                feature.size === 'featured' ? 'max-w-md md:text-base' : ''
              "
            >
              {{ feature.body }}
            </p>
          </a>
        </div>
      </section>

      <!-- ============================== APPS ============================== -->
      <section id="apps" class="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <SectionHeading
          label="Play anywhere"
          title="your library on every device"
          subtitle="Native apps and integrations that bring your collection to desktops, handhelds and TVs. Pair a device in seconds with a QR code, and your saves follow you everywhere."
        />

        <div class="mt-12">
          <AppConsole :apps="APPS" @select="selectedImage = $event" />
        </div>
      </section>

      <!-- ====================== STATS + INSTALL BASE ====================== -->
      <section class="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div class="glass overflow-hidden">
          <div class="chrome-bar border-b border-chrome-300 px-6 py-3">
            <span
              class="font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft"
            >
              system status · all systems glossy
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
            <div
              v-for="stat in STATS"
              :key="stat.label"
              class="lcd p-4 text-center"
            >
              <div
                class="font-display text-2xl md:text-3xl"
                style="text-shadow: 0 0 12px rgba(111, 210, 255, 0.8)"
              >
                <template v-if="stat.key === 'stars'">
                  {{ githubStars.toLocaleString() }}
                </template>
                <template v-else-if="stat.key === 'discord'">
                  {{ discordMembers.toLocaleString() }}
                </template>
                <template v-else>{{ stat.value }}</template>
              </div>
              <div
                class="mt-2 font-tech text-[10px] font-bold uppercase tracking-[0.25em] text-primary-400/80"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>

          <!-- install base -->
          <div
            class="border-t border-white/70 px-6 py-3 font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-ink-faint"
          >
            runs on every major platform and operating system
          </div>
          <div
            class="pause-on-hover flex overflow-hidden border-t border-white/70"
          >
            <div
              v-for="copy in 2"
              :key="copy"
              :aria-hidden="copy === 2"
              class="animate-marquee-reverse flex min-w-full shrink-0 items-center"
              style="animation-duration: 25s"
            >
              <a
                v-for="platform in PLATFORMS"
                :key="platform.name"
                :href="platform.href"
                target="_blank"
                rel="noopener noreferrer"
                :tabindex="copy === 2 ? -1 : undefined"
                class="flex h-20 w-48 shrink-0 items-center justify-center px-8 opacity-50 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              >
                <img
                  :src="platform.src"
                  :alt="platform.name"
                  class="max-h-9 w-auto max-w-[8rem]"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- =========================== COMMUNITY =========================== -->
      <section class="relative overflow-hidden">
        <GlyphField />
        <div
          class="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-8 text-center sm:px-10"
        >
          <div
            class="glass-sm inline-flex items-center gap-2 !rounded-full px-4 py-1.5 font-tech text-[11px] font-bold uppercase tracking-[0.3em] text-magenta-500"
          >
            ✦ powered by friendship
          </div>
          <h2 class="mt-6 font-display text-3xl lowercase text-ink sm:text-4xl">
            join the <span class="iridescent">party</span>
          </h2>
          <p
            class="mx-auto mt-4 max-w-xl font-tech text-lg leading-relaxed text-ink-soft"
          >
            Get help with your setup, share your ideas, and meet other fans of
            RomM.
          </p>
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/RGPJHNMMwJ"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-gel">
                <FontAwesomeIcon :icon="faDiscord" class="relative h-4" />
                <span class="relative">join the discord</span>
              </span>
            </a>
            <a
              href="https://github.com/rommapp/romm"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-gel btn-gel--chrome">
                <FontAwesomeIcon :icon="faGithub" class="relative h-4" />
                <span class="relative">contribute</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <!-- ============================= FOOTER ============================= -->
      <footer
        class="relative overflow-hidden text-primary-100"
        style="
          background: linear-gradient(
            180deg,
            #003852 0%,
            #062a3d 40%,
            #041c2b 100%
          );
        "
      >
        <!-- glossy top reflection -->
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/15 to-transparent"
        />
        <div
          class="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-4"
        >
          <div>
            <h4
              class="font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300"
            >
              Project
            </h4>
            <ul class="mt-4 space-y-2 font-tech text-sm">
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
            </ul>
          </div>
          <div>
            <h4
              class="font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300"
            >
              Apps
            </h4>
            <ul class="mt-4 space-y-2 font-tech text-sm">
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
            </ul>
          </div>
          <div>
            <h4
              class="font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300"
            >
              Ecosystem
            </h4>
            <ul class="mt-4 space-y-2 font-tech text-sm">
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
          <div>
            <h4
              class="font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300"
            >
              Community
            </h4>
            <ul class="mt-4 space-y-2 font-tech text-sm">
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

        <div class="relative border-t border-white/10 py-5">
          <div
            class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 font-tech text-[10px] font-bold uppercase tracking-[0.2em] text-primary-300/80 sm:px-10"
          >
            <span>your collection. perfected.</span>
            <span class="hidden md:block">© The RomM Project · AGPL-3.0</span>
            <span
              aria-label="Secured with Aikido"
              class="inline-flex items-stretch overflow-hidden rounded-full border border-white/20"
            >
              <span
                class="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 text-primary-200"
              >
                <FontAwesomeIcon
                  :icon="faShieldHeart"
                  class="h-2.5 text-lime-400"
                />
                Secured with
              </span>
              <span
                class="flex items-center px-2.5 py-1 font-bold text-primary-950"
                style="
                  background: linear-gradient(
                    180deg,
                    #6fd2ff,
                    #00a8e8 50%,
                    #0089c7
                  );
                "
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
        class="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950/80 p-4 backdrop-blur-md sm:p-10"
        @click="selectedImage = undefined"
      >
        <div
          class="overflow-hidden rounded-2xl border border-chrome-300 bg-white shadow-glass"
        >
          <div
            class="chrome-bar flex items-center justify-between border-b border-chrome-300 px-4 py-2"
          >
            <span
              class="font-tech text-xs font-bold uppercase tracking-widest text-ink-soft"
            >
              {{ selectedImage.alt }}
            </span>
            <button
              type="button"
              class="ml-4 flex h-5 w-5 items-center justify-center rounded-full border border-red-400/60 font-mono text-[10px] font-bold text-red-900"
              style="
                background: radial-gradient(
                  circle at 35% 30%,
                  #ffb3ab,
                  #f4574a
                );
              "
              aria-label="Close"
              @click="selectedImage = undefined"
            >
              ×
            </button>
          </div>
          <img
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="block max-h-[80vh] w-full bg-primary-950 object-contain"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
