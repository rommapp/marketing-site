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
    label: "~/integrations/playnite",
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
    label: "~/apps/argosy",
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
    label: "~/apps/grout",
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

const COMMUNITY_APPS = [
  {
    name: "romm-ios-app",
    platform: "iOS",
    description: "Native iOS app for your library",
    href: "https://github.com/ilyas-hallak/romm-ios-app",
    author: "ilyas-hallak",
  },
  {
    name: "RetroArch Sync",
    platform: "Desktop",
    description: "Sync your RetroArch library with RomM",
    href: "https://github.com/Covin90/romm-retroarch-sync",
    author: "Covin90",
  },
  {
    name: "RomMate",
    platform: "Desktop",
    description: "Desktop app for browsing your collection",
    href: "https://github.com/brenoprata10/rommate",
    author: "brenoprata10",
  },
  {
    name: "romm-client",
    platform: "Desktop",
    description: "Desktop client for your server",
    href: "https://github.com/chaun14/romm-client",
    author: "chaun14",
  },
  {
    name: "Freegosy",
    platform: "Desktop",
    description: "All-in-one manager: download, launch, sync saves",
    href: "https://github.com/abduznik/freegosy",
    author: "abduznik",
  },
  {
    name: "DeckyRommSync",
    platform: "SteamOS",
    description: "Downloader and syncer for the Steam Deck",
    href: "https://github.com/danielcopper/decky-romm-sync",
    author: "danielcopper",
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
    n: "01",
    icon: faGamepad,
    title: "Play in your browser",
    body: "EmulatorJS, MS-DOS and Flash players are built in. Hit Play and you're in the game — no cores to configure, no files to move.",
    href: "https://docs.romm.app/latest/using/in-browser-play/emulatorjs/",
    size: "featured",
  },
  {
    n: "02",
    icon: faRotate,
    title: "Saves that follow you",
    body: "A full save-sync engine keeps saves and states in step across your devices, with conflict detection when two of them disagree.",
    href: "https://docs.romm.app/latest/using/saves-and-states/",
    size: "wide",
  },
  {
    n: "03",
    icon: faWandSparkles,
    title: "Magical metadata",
    body: "Cover art, screenshots and deep metadata from IGDB, ScreenScraper, LaunchBox, RetroAchievements and more — matched by hash, not guesswork.",
    href: "https://docs.romm.app/latest/getting-started/metadata-providers/",
    size: "wide",
  },
  {
    n: "04",
    icon: faUsers,
    title: "Multiplayer",
    body: "Granular per-user controls, plus OIDC single sign-on with Authelia, Authentik, Keycloak and friends.",
    href: "https://docs.romm.app/latest/administration/oidc/",
    size: "small",
  },
  {
    n: "05",
    icon: faScrewdriverWrench,
    title: "ROM patcher",
    body: "Apply romhacks and translations server-side, from stored or uploaded patch files.",
    href: "https://docs.romm.app/latest/using/rom-patcher/",
    size: "small",
  },
  {
    n: "06",
    icon: faPlug,
    title: "Ecosystem",
    body: "ES-DE and Pegasus exports, LaunchBox import, feed clients, and a full REST API with device tokens.",
    href: "https://docs.romm.app/latest/developers/api-reference/",
    size: "small",
  },
  {
    n: "07",
    icon: faShieldHeart,
    title: "Free forever",
    body: "AGPL-3.0, no tracking, no upsells. Your games, your data, your server.",
    href: "https://github.com/rommapp/romm",
    size: "small",
  },
];

const FEATURE_SPAN: Record<string, string> = {
  featured: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  small: "",
};

// Ghost glyph sized to the card's footprint (col-span × row-span)
const FEATURE_GLYPH: Record<string, string> = {
  featured: "text-[13rem] -bottom-10 -right-8",
  wide: "text-[9rem] -bottom-8 -right-6",
  small: "text-[6rem] -bottom-5 -right-4",
};

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
        <img
          aria-hidden="true"
          alt=""
          src="/images/blocks/v5/collection.png"
          srcset="
            /images/blocks/v5/collection.png    1x,
            /images/blocks/v5/collection@2x.png 2x
          "
          class="absolute inset-0 h-full w-full object-cover object-center opacity-50"
          fetchpriority="high"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950"
        />
        <div aria-hidden="true" class="dot-grid absolute inset-0" />
        <div
          aria-hidden="true"
          class="absolute -top-48 left-1/2 h-[38rem] w-[64rem] max-w-none -translate-x-1/2 rounded-full bg-primary-500/10 blur-[120px]"
        />
        <div aria-hidden="true" class="scanlines absolute inset-0" />

        <div class="relative z-10 px-6 py-24 text-center sm:px-10 lg:px-16">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div
              class="inline-flex items-center gap-3 border border-grid bg-ink-900/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-300"
            >
              Self-hosted rom manager
            </div>
            <a
              href="https://github.com/rommapp/romm/releases/tag/5.0.0"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 border border-primary-700 bg-primary-950/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-300 transition-colors hover:border-primary-400 hover:text-primary-200"
            >
              <span class="bg-primary-500 px-1.5 font-bold text-ink-950">
                New
              </span>
              RomM 5.0 is out ↗
            </a>
          </div>

          <h1
            class="mx-auto mt-10 font-pixel text-3xl uppercase leading-tight text-cream sm:text-4xl md:text-5xl xl:text-6xl"
          >
            Your collection,<br />
            <span class="text-primary-400">perfected</span
            ><span class="blink text-primary-400">_</span>
          </h1>

          <p class="mx-auto mt-8 max-w-2xl leading-relaxed">
            Scan, enrich, browse and play your game collection from one
            beautiful self-hosted app. Metadata from seven providers, save sync
            across your devices, and support for 400+ platforms. RomM is a
            must-have for anyone who plays on emulators.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.romm.app/latest/getting-started/quick-start/"
              target="_blank"
              rel="noopener"
            >
              <span class="btn-pixel">Install now</span>
            </a>
            <a href="https://demo.romm.app" target="_blank" rel="noopener">
              <span class="btn-ghost">View demo ↗</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ======================= SUPPORTED PLATFORMS ======================= -->
      <section class="border-b border-grid">
        <div
          class="flex items-center justify-between gap-4 border-b border-grid px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          <span>400+ supported platforms</span>
          <span aria-hidden="true" class="hidden text-grid sm:block">
            consoles • handhelds • computers • arcade
          </span>
        </div>
        <PlatformMarquee />
      </section>

      <!-- ============================ FEATURES ============================ -->
      <section
        id="features"
        class="border-b border-grid px-6 py-16 sm:px-10 lg:px-16"
      >
        <SectionHeading
          label="Features"
          title="Every playthrough tells a story"
          subtitle="The most powerful all-in-one app for managing and playing your retro game collection."
        />

        <!-- Bento feature grid -->
        <div
          class="mt-12 grid auto-rows-fr gap-px border border-grid bg-grid sm:grid-cols-2 lg:grid-cols-4"
        >
          <a
            v-for="feature in FEATURES"
            :key="feature.n"
            :href="feature.href"
            target="_blank"
            rel="noopener"
            :class="[FEATURE_SPAN[feature.size]]"
            class="group relative overflow-hidden bg-ink-950 p-8 transition-colors duration-200 hover:bg-ink-900"
          >
            <!-- animated top accent -->
            <span
              aria-hidden="true"
              class="absolute inset-x-0 top-0 h-0.5 w-0 bg-primary-500 transition-all duration-300 ease-out group-hover:w-full"
            />
            <!-- oversized ghost glyph, scaled to the card's footprint -->
            <FontAwesomeIcon
              :icon="feature.icon"
              aria-hidden="true"
              :class="FEATURE_GLYPH[feature.size]"
              class="pointer-events-none absolute text-primary-500/[0.04] transition-transform duration-500 group-hover:scale-110 group-hover:text-primary-500/[0.07]"
            />

            <div class="relative flex items-center gap-4">
              <span
                class="bevel-out flex h-10 w-10 shrink-0 items-center justify-center border border-grid bg-ink-900 text-primary-400 transition-colors duration-200 group-hover:border-primary-500 group-hover:text-primary-300"
              >
                <FontAwesomeIcon :icon="feature.icon" />
              </span>
              <h3
                class="flex-1 font-pixel uppercase leading-snug text-cream"
                :class="
                  feature.size === 'featured'
                    ? 'text-xl md:text-2xl'
                    : 'text-lg'
                "
              >
                {{ feature.title }}
              </h3>
              <span
                aria-hidden="true"
                class="shrink-0 self-start font-mono text-[11px] text-grid transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-200"
              >
                ↗
              </span>
            </div>

            <p
              class="relative mt-4 text-sm leading-relaxed text-muted"
              :class="
                feature.size === 'featured' ? 'max-w-md md:text-base' : ''
              "
            >
              {{ feature.body }}
            </p>
          </a>
        </div>
      </section>

      <!-- ========================= PLATFORM STRIP ========================= -->
      <section class="border-b border-grid">
        <div
          class="flex items-center justify-between gap-4 border-b border-grid px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          <span>Available on every major platform and operating system</span>
        </div>
        <div class="pause-on-hover flex overflow-hidden">
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

      <!-- ============================== APPS ============================== -->
      <section id="apps" class="border-grid px-6 pt-20 sm:px-10 lg:px-16">
        <SectionHeading
          label="Play anywhere"
          title="Your library on every device"
          subtitle="Native apps and integrations that bring your collection to desktops, handhelds and TVs. Pair a device in seconds with a QR code, and your saves follow you everywhere."
        />
      </section>

      <div class="mt-16 border-t border-grid">
        <AppConsole :apps="APPS" @select="selectedImage = $event" />
      </div>

      <section class="border-b border-grid px-6 sm:px-10 lg:px-16">
        <!-- Community apps -->
        <div class="my-16">
          <div class="flex items-center gap-4">
            <span
              class="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-primary-400"
            >
              Built by the community
            </span>
            <span aria-hidden="true" class="h-px flex-1 bg-grid" />
          </div>
          <div
            class="mt-6 grid gap-px border border-grid bg-grid sm:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="app in COMMUNITY_APPS"
              :key="app.name"
              class="group relative flex flex-col bg-ink-950 p-6 transition-colors hover:bg-ink-900"
            >
              <div class="flex items-center justify-between gap-3">
                <span
                  class="border border-grid px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-primary-300"
                >
                  {{ app.platform }}
                </span>
                <span
                  aria-hidden="true"
                  class="font-mono text-xs text-grid transition-colors group-hover:text-primary-400"
                  >↗</span
                >
              </div>
              <h4 class="mt-5 font-mono text-sm font-bold text-cream">
                <a
                  :href="app.href"
                  target="_blank"
                  rel="noopener"
                  class="after:absolute after:inset-0"
                  >{{ app.name }}</a
                >
              </h4>
              <p class="mt-2 text-xs leading-relaxed text-muted">
                {{ app.description }}
              </p>
              <p class="mt-auto pt-4 font-mono text-[10px] text-muted">
                by
                <a
                  :href="`https://github.com/${app.author}`"
                  target="_blank"
                  rel="noopener"
                  class="relative z-10 text-primary-300 transition-colors hover:text-primary-200"
                  >@{{ app.author }}</a
                >
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================= STATS ============================= -->
      <section class="border-b border-grid">
        <div class="grid grid-cols-2 gap-px bg-grid lg:grid-cols-4">
          <div class="bg-ink-950 p-4 text-center">
            <div class="font-pixel text-2xl text-cream md:text-4xl">
              {{ githubStars.toLocaleString() }}
            </div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              GitHub stars
            </div>
          </div>
          <div class="bg-ink-950 p-4 text-center">
            <div class="font-pixel text-2xl text-cream md:text-4xl">
              {{ discordMembers.toLocaleString() }}
            </div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              Discord members
            </div>
          </div>
          <div class="bg-ink-950 p-4 text-center">
            <div class="font-pixel text-2xl text-cream md:text-4xl">1.7M+</div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              Docker pulls
            </div>
          </div>
          <div class="bg-ink-950 p-4 text-center">
            <div class="font-pixel text-2xl text-cream md:text-4xl">#1</div>
            <div
              class="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              on Hackernews
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
            class="mt-6 font-pixel text-2xl uppercase text-cream sm:text-3xl md:text-4xl"
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
          <span class="hidden md:block">© The RomM Project · AGPL-3.0</span>
          <span
            aria-label="Secured with Aikido"
            class="bevel-out inline-flex items-stretch border border-grid font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            <span
              class="flex items-center gap-1.5 bg-ink-800 px-2.5 py-1 text-muted"
            >
              <FontAwesomeIcon
                :icon="faShieldHeart"
                class="h-2.5 text-primary-400"
              />
              Secured with
            </span>
            <span
              class="flex items-center bg-primary-500 px-2.5 py-1 font-bold text-ink-950"
            >
              Aikido
            </span>
          </span>
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
      </div>
    </Teleport>
  </div>
</template>
