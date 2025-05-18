<script setup lang="ts">
import { default as PButton } from "primevue/button";
import Tag from "primevue/tag";
import Divider from "primevue/divider";
import Galleria from "primevue/galleria";
import Image from "primevue/image";
import Dialog from "primevue/dialog";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faListCheck,
  faWandSparkles,
  faGamepad,
  faShieldHeart,
  faRotate,
  faStar,
  faUsers,
  faArrowDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faDiscord,
  faWindows,
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
import muos from "~/assets/images/logos/muos-logo.svg";
import playnite from "~/assets/images/logos/playnite-logo.svg";

import muosGamelist from "~/assets/images/screenshots/muos/gamelist.png";
import muosCollection from "~/assets/images/screenshots/muos/collection.png";
import muosPlatforms from "~/assets/images/screenshots/muos/platforms.png";
import playniteDetails from "~/assets/images/screenshots/playnite/details.png";
import playniteLibrary from "~/assets/images/screenshots/playnite/library.png";
import playniteSettings from "~/assets/images/screenshots/playnite/settings.png";

import { ref, onMounted } from "vue";

interface AppImage {
  src: string;
  alt: string;
}

const MUOS_IMAGES = [
  { src: muosPlatforms, alt: "muOS Platforms" },
  { src: muosGamelist, alt: "muOS Game List" },
  { src: muosCollection, alt: "muOS Collection" },
];

const PLAYNITE_IMAGES = [
  { src: playniteLibrary, alt: "Playnite Library" },
  { src: playniteDetails, alt: "Playnite Details" },
  { src: playniteSettings, alt: "Playnite Settings" },
];

const selectedImage = ref<AppImage | undefined>(undefined);
const dialogVisible = ref(false);

const githubStars = ref<number | null>(null);
const discordMembers = ref<number | null>(null);
const dockerPulls = ref<number | null>(null);

const openDialog = (image: AppImage) => {
  selectedImage.value = image;
  dialogVisible.value = true;
};

const fetchGithubStars = async () => {
  const res = await fetch("https://api.github.com/repos/rommapp/romm");
  const data = await res.json();
  return data.stargazers_count;
};

const fetchDiscordMembers = async () => {
  const res = await fetch(
    "https://discord.com/api/v9/invites/RGPJHNMMwJ?with_counts=true",
  );
  const data = await res.json();
  return data.approximate_member_count;
};

onMounted(async () => {
  githubStars.value = await fetchGithubStars();
  discordMembers.value = await fetchDiscordMembers();
});
</script>

<template>
  <div class="max-w-[100rem] mx-auto">
    <AppHeader />

    <div class="md:grid grid-cols-2 px-6 md:px-0 md:pl-10 md:mb-10">
      <div class="text-left flex items-center">
        <section class="py-8">
          <span class="block text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
            Your beautiful, powerful,
          </span>
          <div
            class="text-4xl sm:text-5xl md:text-6xl text-primary font-bold mb-8 md:mb-4"
          >
            self-hosted rom manager
          </div>
          <div
            class="mb-8 md:mb-4 text-lg md:text-md surface-700 leading-relaxed"
          >
            <p class="mt-0">
              Scan, enrich, and browse your game collection with a clean and
              responsive interface.
            </p>
            <p class="hidden md:block mt-0">
              With support for multiple platforms, various naming schemes and
              custom tags, RomM is a must-have for anyone who plays on
              emulators.
            </p>
          </div>

          <a href="https://docs.romm.app" target="_blank" rel="noopener">
            <PButton raised type="button" class="mr-3 px-6 md:text-lg"
              >Install Now
            </PButton>
          </a>
          <a href="https://demo.romm.app" target="_blank" rel="noopener">
            <PButton raised outlined type="button" class="px-6 md:text-lg"
              >View Demo
            </PButton>
          </a>
        </section>
      </div>
      <div>
        <Image
          :src="`images/blocks/hero/hero-dark.png`"
          preset="responsive"
          alt="list of games in library"
          class="hero md:ml-auto md:h-full object-cover w-full md:w-auto hidden dark:block"
          :placeholder="[2190, 1550, 40, 20]"
        />
        <Image
          :src="`images/blocks/hero/hero-light.png`"
          preset="responsive"
          alt="list of games in library"
          class="hero md:ml-auto block md:h-full object-cover w-full md:w-auto dark:hidden"
          :placeholder="[2190, 1550, 40, 20]"
        />
      </div>
    </div>

    <div id="features" class="surface-section px-6 py-8 lg:px-8">
      <div class="text-700 mb-10 md:mb-12 text-2xl text-center">
        The <span class="text-primary">most powerful</span> all-in-one app for
        managing your game collection.
      </div>
      <div class="grid md:grid-cols-2">
        <div class="mb-4 sm:mb-6 md:mb-8 md:px-6 flex flex-row gap-4">
          <div>
            <span
              class="mt-1 p-3 shadow-2 inline-block rounded-md bg-light-surface dark:bg-dark-surface"
            >
              <FontAwesomeIcon
                :icon="faWandSparkles"
                class="text-3xl md:text-4xl w-8 md:w-10 text-primary"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-2 font-medium">
              Magical metadata
            </div>
            <div class="text-700 line-height-3">
              Enrich your collection with cover art and detailed metadata from
              <a
                href="https://www.igdb.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-primary"
              >
                IGDB</a
              >,
              <a
                href="https://www.screenscraper.fr"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-primary"
              >
                Screenscraper</a
              >
              and
              <a
                href="https://www.mobygames.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-primary"
              >
                MobyGames</a
              >.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-8 md:px-6 flex flex-row gap-4">
          <div>
            <span
              class="mt-1 p-3 shadow-2 inline-block rounded-md bg-light-surface dark:bg-dark-surface"
            >
              <FontAwesomeIcon
                :icon="faListCheck"
                class="text-3xl md:text-4xl w-8 md:w-10 text-primary"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-2 font-medium">
              Broad platform support
            </div>
            <div class="text-700 line-height-3">
              Retro or modern, RomM has you covered with support for
              <a
                href="https://docs.romm.app/latest/Platforms-and-Players/Supported-Platforms"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-primary"
              >
                400+</a
              >
              systems and platforms.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-8 md:px-6 flex flex-row gap-4">
          <div>
            <span
              class="mt-1 p-3 shadow-2 inline-block rounded-md bg-light-surface dark:bg-dark-surface"
            >
              <FontAwesomeIcon
                :icon="faGamepad"
                class="text-3xl md:text-4xl w-8 md:w-10 text-primary"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-2 font-medium">
              Seamless gameplay
            </div>
            <div class="text-700 line-height-3">
              With
              <a
                href="https://emulatorjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-primary"
              >
                EmulatorJS</a
              >
              built-in, play your favorite games in your browser, no setup
              required.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-8 md:px-6 flex flex-row gap-4">
          <div>
            <span
              class="mt-1 p-3 shadow-2 inline-block rounded-md bg-light-surface dark:bg-dark-surface"
            >
              <FontAwesomeIcon
                :icon="faRotate"
                class="text-3xl md:text-4xl w-8 md:w-10 text-primary"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div
              class="text-900 text-xl mb-1 md:mb-2 font-medium flex flex-row items-center"
            >
              <span>Device sync</span>
              <tag
                value="COMING SOON"
                severity="primary"
                class="text-xs whitespace-nowrap ml-2"
              ></tag>
            </div>
            <div class="text-700 line-height-3">
              Sync your games, saves and emulator settings across your devices
              with ease.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-8 md:px-6 flex flex-row gap-4">
          <div>
            <span
              class="mt-1 p-3 shadow-2 inline-block rounded-md bg-light-surface dark:bg-dark-surface"
            >
              <FontAwesomeIcon
                :icon="faGithub"
                class="text-3xl md:text-4xl w-8 md:w-10 text-primary"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-2 font-medium">
              Open source
            </div>
            <div class="text-700 line-height-3">
              Built by the community, for the community.<br />
              Fully transparent and licensed under AGPL-3.0.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-8 md:px-6 flex gap-4">
          <div>
            <span
              class="mt-1 p-3 shadow-2 inline-block rounded-md bg-light-surface dark:bg-dark-surface"
            >
              <FontAwesomeIcon
                :icon="faShieldHeart"
                class="text-3xl md:text-4xl w-8 md:w-10 text-primary"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-2 font-medium">
              Private and secure
            </div>
            <div class="text-700 line-height-3">
              Maintain total control of your data.<br />
              Built with security in mind and regularly updated.
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="platforms-section" class="mt-8 mb-12">
      <div class="text-700 text-2xl text-center">
        Available on <span class="text-primary">every major platform</span> and
        operating system
      </div>

      <div class="relative w-full m-auto md:w-11/12">
        <div
          class="fade-left h-[12rem] w-[12rem] block absolute top-0 left-0 z-20"
        />
        <div
          class="marquee-wrapper overflow-hidden flex items-center justify-center flex-shrink-0 gap-20"
        >
          <template v-for="(_, i) in Array.from({ length: 3 })" :key="i">
            <div
              class="marquee flex items-center flex-shrink-0 gap-20 justify-around min-w-[100%]"
            >
              <a
                href="https://community.bigbeartechworld.com/t/added-romm-to-bigbearcasaos/206"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="casaos" alt="CasaOS" />
              </a>
              <a
                href="https://www.cloudron.io/store/app.romm.cloudronapp.html"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="cloudron" alt="Cloudron" />
              </a>
              <a
                href="https://hub.docker.com/r/rommapp/romm"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="docker" alt="Docker" />
              </a>
              <a
                href="https://hexos.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="hexos" alt="HexOS" />
              </a>
              <a
                href="https://www.portainer.io/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="portainer" alt="Portainer" />
              </a>
              <a
                href="https://www.synology.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="synology" alt="Synology" />
              </a>
              <a
                href="https://www.truenas.com/apps/#:~:text=romm"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="truenas" alt="TrueNAS" />
              </a>
              <a
                href="https://apps.umbrel.com/app/romm"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="umbrel" alt="Umbrel" />
              </a>
              <a
                href="https://unraid.net/community/apps?q=romm#r"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center aspect-square h-[12rem]"
              >
                <Image class="w-[100%]" :src="unraid" alt="Unraid" />
              </a>
            </div>
          </template>
        </div>
        <div
          class="fade-right h-[12rem] w-[12rem] block absolute top-0 right-0 z-20"
        />
      </div>
    </section>

    <section id="apps-section" class="mb-20">
      <div class="text-700 text-2xl text-center mb-16">
        Native apps and integrations to
        <span class="text-primary">play your games anywhere</span>
      </div>

      <div class="flex flex-col gap-12 lg:gap-24">
        <div
          class="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20 m-auto w-10/12"
        >
          <div
            class="mx-auto w-[42rem] py-8 pr-12 shadow-2 rounded-lg bg-light-surface dark:bg-dark-surface"
          >
            <Galleria
              :value="MUOS_IMAGES"
              :numVisible="5"
              circular
              autoPlay
              class="max-w-2xl mx-auto"
              :showThumbnails="false"
              showIndicators
              changeItemOnIndicatorHover
              indicatorsPosition="left"
            >
              <template #item="slotProps">
                <Image
                  :src="slotProps.item.src"
                  :alt="slotProps.item.alt"
                  class="w-full block shadow-lg cursor-pointer"
                  image-class="rounded-lg h-[300px]"
                  @click="openDialog(slotProps.item)"
                />
              </template>
            </Galleria>
          </div>

          <div class="flex flex-col md:flex-row items-start gap-6">
            <div class="flex flex-col justify-between h-[100%] py-6">
              <div>
                <div class="flex flex-row justify-between pr-4 pb-3">
                  <div>
                    <div class="flex items-center text-primary mb-6">
                      <FontAwesomeIcon :icon="faGamepad" />
                      <span class="uppercase ml-2">handhelds</span>
                    </div>
                    <div class="text-2xl font-bold">muOS App</div>
                  </div>
                  <Image :src="muos" alt="muOS" image-class="w-20 h-20" />
                </div>
                <div
                  class="leading-relaxed md:max-w-screen-md lg:max-w-screen-lg"
                >
                  Browse and download games directly to your Anbernic device
                  running muOS over Wi-Fi.
                  <a
                    href="https://muos.dev"
                    target="_blank"
                    rel="noopener"
                    class="underline text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-primary-700"
                    >muOS</a
                  >
                  is highly customizable alternative firmware for the
                  <a
                    href="https://muos.dev/devices/anbernic"
                    target="_blank"
                    rel="noopener"
                    class="underline text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-primary-700"
                  >
                    Anbernic family</a
                  >
                  of retro handhelds.
                </div>
              </div>
              <a
                href="https://github.com/rommapp/muos-app?tab=readme-ov-file#installation"
                target="_blank"
                rel="noopener"
                class="flex flex-row items-end justify-between mt-4"
              >
                <PButton raised outlined size="large"> Download </PButton>
              </a>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20 m-auto w-10/12"
        >
          <div
            class="mx-auto w-[42rem] py-8 pr-12 shadow-2 rounded-lg bg-light-surface dark:bg-dark-surface"
          >
            <Galleria
              :value="PLAYNITE_IMAGES"
              :numVisible="5"
              circular
              autoPlay
              class="max-w-2xl mx-auto"
              :showThumbnails="false"
              showIndicators
              changeItemOnIndicatorHover
              indicatorsPosition="left"
            >
              <template #item="slotProps">
                <Image
                  :src="slotProps.item.src"
                  :alt="slotProps.item.alt"
                  class="w-full block shadow-lg cursor-pointer"
                  image-class="rounded-lg h-[250px]"
                  @click="openDialog(slotProps.item)"
                />
              </template>
            </Galleria>
          </div>

          <div class="flex flex-col md:flex-row items-start gap-6">
            <div class="flex flex-col justify-between h-[100%] py-6">
              <div>
                <div class="flex flex-row justify-between pr-4 pb-3">
                  <div>
                    <div class="flex items-center text-primary mb-6">
                      <FontAwesomeIcon :icon="faWindows" />
                      <span class="uppercase ml-2">windows</span>
                    </div>
                    <div class="text-2xl font-bold">Playnite Plugin</div>
                  </div>
                  <Image
                    :src="playnite"
                    alt="Playnite"
                    image-class="w-20 h-20"
                  />
                </div>
                <div
                  class="leading-relaxed md:max-w-screen-md lg:max-w-screen-lg"
                >
                  Effortlessly integrate your retro game collection into
                  Playnite with our plugin.
                  <a
                    href="https://playnite.link/ "
                    target="_blank"
                    rel="noopener"
                    class="underline text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-primary-700"
                  >
                    Playnite</a
                  >
                  is an open-source game library manager that provide a unified
                  interface for all of your games on PC.
                </div>
              </div>
              <a
                href="https://github.com/rommapp/playnite-plugin?tab=readme-ov-file#installation"
                target="_blank"
                rel="noopener"
                class="flex flex-row items-end justify-between mt-4"
              >
                <PButton raised outlined size="large"> Install </PButton>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        v-model:visible="dialogVisible"
        modal
        :header="selectedImage?.alt"
        class="max-w-4xl"
      >
        <img :src="selectedImage?.src" class="w-full rounded-lg" />
      </Dialog>
    </section>

    <section
      id="discord-section"
      class="surface-section px-6 py-8 md:py-12 md:px-6 lg:px-8 rounded-lg bg-light-surface dark:bg-dark-surface"
    >
      <div class="text-700 md:text-center">
        <div class="text-primary-600 font-bold mb-3">
          <i class="pi pi-discord"></i>&nbsp;POWERED BY FRIENDSHIP
        </div>
        <div class="text-900 font-bold text-5xl mb-3">Join Our Community</div>
        <div class="text-700 text-2xl mb-6">
          Get help with your setup, share your ideas, and meet other fans of
          RomM
        </div>
        <a href="https://discord.gg/RGPJHNMMwJ" target="_blank" rel="noopener">
          <PButton
            raised
            rounded
            class="font-semibold px-5 py-3 white-space-nowrap"
          >
            <FontAwesomeIcon :icon="faDiscord" class="mr-2" />
            Join us
          </PButton>
        </a>
      </div>
    </section>

    <section
      class="surface-section px-6 py-8 my-6 md:px-4 lg:px-8 flex flex-col md:items-center"
    >
      <div class="text-4xl text-700 font-bold mb-1">
        People
        <FontAwesomeIcon :icon="faHeart" class="text-3xl text-primary" /> RomM
      </div>

      <div
        class="surface-section flex flex-col sm:flex-row justify-around mt-4"
      >
        <div class="pt-4 md:px-4 xl:px-6">
          <div class="flex items-center">
            <FontAwesomeIcon :icon="faStar" class="text-2xl text-primary" />
            <div class="font-bold ml-3 text-2xl">
              {{ githubStars !== null ? githubStars.toLocaleString() : "..." }}
            </div>
          </div>
          <div class="ml-10">Github stars</div>
        </div>
        <div class="pt-4 md:px-4 xl:px-6">
          <div class="flex items-center">
            <FontAwesomeIcon :icon="faUsers" class="text-2xl text-primary" />
            <div class="font-bold ml-3 text-2xl">
              {{
                discordMembers !== null
                  ? discordMembers.toLocaleString()
                  : "..."
              }}
            </div>
          </div>
          <div class="ml-10">Discord members</div>
        </div>
        <div class="pt-4 md:px-4 xl:px-6">
          <div class="flex items-center">
            <FontAwesomeIcon
              :icon="faArrowDown"
              class="text-2xl text-primary"
            />
            <div class="font-bold ml-3 text-2xl">1M+</div>
          </div>
          <div class="ml-8">Docker pulls</div>
        </div>
      </div>
    </section>
  </div>

  <divider
    class="before:border-t-light-toplayer dark:before:border-t-dark-toplayer m-auto"
  />

  <footer
    class="surface-section py-4 px-4 md:px-8 flex items-center justify-between sm:grid grid-cols-3 m-auto"
  >
    <div class="flex items-center">
      <Image
        :src="`images/blocks/logos/romm-light.svg`"
        alt="romm logo"
        class="w-6 h-6 footer-logo"
        loading="lazy"
      />
      <div class="text-700 text-lg md:text-xl ml-2">
        romm<span class="text-primary">.</span>app
      </div>
    </div>
    <div class="text-700 text-md text-center hidden sm:block">
      Your collection, perfected.
    </div>
    <a
      href="https://github.com/rommapp/marketing-site"
      target="_blank"
      rel="noopener"
      class="text-900 hover:text-primary text-end"
      title="github repository"
    >
      <FontAwesomeIcon :icon="faGithub" class="text-2xl h-4" />
    </a>
  </footer>
</template>

<style>
body,
.p-menubar.p-menubar-mobile,
.p-menubar.p-menubar-mobile .p-menubar-root-list {
  background-color: theme("colors.light.background");

  @media (prefers-color-scheme: dark) {
    background-color: theme("colors.dark.background");
  }
}

.p-button {
  background-color: theme("colors.primary.600");
  border-color: theme("colors.primary.600");
  color: theme("colors.white");

  &:hover {
    background-color: theme("colors.primary.500");
    border-color: theme("colors.primary.500");
  }

  &:focus {
    background-color: theme("colors.primary.400");
    border-color: theme("colors.primary.400");
  }
}

.p-button-outlined {
  background-color: transparent;
  color: theme("colors.primary.600");

  &:hover {
    background-color: transparent;
    color: theme("colors.primary.500");
  }

  &:focus {
    background-color: transparent;
    color: theme("colors.primary.400");
  }
}
</style>

<style scoped>
.hero {
  object-position: top right;

  @media screen and (min-width: 768px) {
    clip-path: polygon(10% 0, 100% 0%, 100% 100%, 2% 100%);
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}

#discord-section {
  background: linear-gradient(
    90deg,
    theme("colors.light.background") 0%,
    theme("colors.light.surface") 50%,
    theme("colors.light.background") 100%
  );
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      90deg,
      theme("colors.dark.background") 0%,
      theme("colors.dark.surface") 50%,
      theme("colors.dark.background") 100%
    );
  }
}

.fade-left {
  background: linear-gradient(
    to right,
    theme("colors.light.background"),
    transparent
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      to right,
      theme("colors.dark.background"),
      transparent
    );
  }
}

.fade-right {
  background: linear-gradient(
    to left,
    theme("colors.light.background"),
    transparent
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      to left,
      theme("colors.dark.background"),
      transparent
    );
  }
}

.marquee-wrapper:hover .marquee {
  animation-play-state: paused;
}

.marquee {
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translate(0);
  }
  to {
    transform: translate(calc(-100% - 6rem));
  }
}

.footer-logo {
  @media (prefers-color-scheme: light) {
    filter: invert(1);
  }
}
</style>
