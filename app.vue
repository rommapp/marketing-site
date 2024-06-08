<script setup lang="ts">
import { default as PButton } from "primevue/button";
import Tag from "primevue/tag";
import Divider from "primevue/divider";
import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";
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
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";

function onGetStarted() {
  window.open(
    "https://github.com/rommapp/romm?tab=readme-ov-file#installation",
    "_blank"
  );
}

function onJoinDiscord() {
  window.open("https://discord.gg/RGPJHNMMwJ", "_blank");
}

const menuItems: MenuItem[] = [
  {
    label: "Features",
    url: "#features",
    key: "features",
    target: "_self",
  },
  {
    label: "Wiki",
    url: "https://github.com/rommapp/romm/wiki",
    key: "wiki",
    target: "_blank",
  },
  {
    label: "Contact",
    url: "mailto:romm@fastmail.com",
    key: "contact",
    target: "_blank",
  },
];
</script>

<template>
  <div class="max-w-[100rem] mx-auto">
    <Menubar
      :model="menuItems"
      :pt="{
        root: 'sticky top-3 mb-6 mx-4 z-40 px-4 md:px-8 bg-white dark:bg-transparent backdrop-blur-lg dark:backdrop-brightness-90 transition-colors border-slate-100 dark:border-slate-800 rounded-md',
        menu: 'ml-auto bg-transparent border-x-0',
        button: 'ml-auto dark:text-white',
        end: 'ml-0',
      }"
    >
      <template #start>
        <div class="flex items-center">
          <a href="https://romm.app" class="flex items-center">
            <nuxt-img
              :src="`images/blocks/logos/romm-dark.svg`"
              alt="romm logo"
              class="w-10 h-10"
            />
            <span class="text-900 text-2xl font-semibold ml-1">RomM</span>
          </a>
          <a
            href="https://github.com/rommapp/romm/releases/latest"
            target="_blank"
          >
            <tag value="v3.2.0" severity="primary" class="ml-3 text-xs"></tag>
          </a>
        </div>
      </template>
      <template #item="{ item, props }">
        <a
          v-ripple
          class="flex items-center"
          v-bind="props.action"
          :href="item.url"
          :target="item.target"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          class="text-900 hover:text-purple-500 border-l ml-4 pl-6 border-slate-100 dark:border-slate-800"
          title="github repository"
        >
          <font-awesome-icon :icon="faGithub" class="text-2xl h-4" />
        </a>
      </template>
    </Menubar>

    <div class="md:grid grid-cols-2 px-6 md:px-0 md:pl-10 md:mb-10">
      <div class="text-left flex items-center">
        <section class="py-8">
          <span class="block text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
            Your beautiful, powerful,
          </span>
          <div
            class="text-4xl sm:text-5xl md:text-6xl text-purple-500 font-bold mb-8 md:mb-4"
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

          <p-button
            type="button"
            class="mr-3 px-6 p-button-raised md:text-lg"
            v-on:click="onGetStarted"
            >Install Now
          </p-button>
        </section>
      </div>
      <div>
        <nuxt-img
          :src="`images/blocks/hero/hero-dark.png`"
          preset="responsive"
          alt="list of games in library"
          class="hero md:ml-auto md:h-full object-cover w-full md:w-auto hidden dark:block"
          :placeholder="[2190, 1550, 40, 20]"
        />
        <nuxt-img
          :src="`images/blocks/hero/hero-light.png`"
          preset="responsive"
          alt="list of games in library"
          class="hero md:ml-auto block md:h-full object-cover w-full md:w-auto dark:hidden"
          :placeholder="[2190, 1550, 40, 20]"
        />
      </div>
    </div>

    <div id="features" class="surface-section px-6 py-8 lg:px-8 md:text-center">
      <div class="text-700 mb-10 md:mb-12 text-2xl">
        The <span class="text-purple-500">most powerful</span> all-in-one app
        for managing your game collection.
      </div>
      <div class="grid grid-rows-6 md:grid-cols-3 md:grid-rows-2">
        <div class="mb-4 sm:mb-6 md:mb-12 md:px-6 flex gap-4 md:block">
          <div>
            <span
              class="mt-1 md:mt-0 p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-100 dark:bg-slate-900"
            >
              <font-awesome-icon
                :icon="faWandSparkles"
                class="text-3xl md:text-4xl w-8 md:w-10 text-purple-500"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-3 font-medium">
              Magical metadata
            </div>
            <div class="text-700 line-height-3">
              Enrich your collection with cover art and detailed metadata from
              <a
                href="https://www.igdb.com/"
                target="_blank"
                rel="noopener"
                class="underline hover:text-purple-500"
              >
                IGDB</a
              >
              and
              <a
                href="https://www.mobygames.com/"
                target="_blank"
                rel="noopener"
                class="underline hover:text-purple-500"
              >
                MobyGames</a
              >.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-12 md:px-6 flex gap-4 md:block">
          <div>
            <span
              class="mt-1 md:mt-0 p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-100 dark:bg-slate-900"
            >
              <font-awesome-icon
                :icon="faListCheck"
                class="text-3xl md:text-4xl w-8 md:w-10 text-purple-500"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-3 font-medium">
              Broad platform support
            </div>
            <div class="text-700 line-height-3">
              Retro or modern, RomM has you covered with support for
              <a
                href="https://github.com/rommapp/romm/wiki/Supported-Platforms"
                target="_blank"
                rel="noopener"
                class="underline hover:text-purple-500"
              >
                400+</a
              >
              systems and platforms.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-12 md:px-6 flex gap-4 md:block">
          <div>
            <span
              class="mt-1 md:mt-0 p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-100 dark:bg-slate-900"
            >
              <font-awesome-icon
                :icon="faGamepad"
                class="text-3xl md:text-4xl w-8 md:w-10 text-purple-500"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-3 font-medium">
              Seamless gameplay
            </div>
            <div class="text-700 line-height-3">
              With
              <a
                href="https://emulatorjs.org/"
                target="_blank"
                rel="noopener"
                class="underline hover:text-purple-500"
              >
                EmulatorJS</a
              >
              built-in, play your favorite games in your browser, no setup
              required.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-12 md:px-6 flex gap-4 md:block">
          <div>
            <span
              class="mt-1 md:mt-0 p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-100 dark:bg-slate-900"
            >
              <font-awesome-icon
                :icon="faRotate"
                class="text-3xl md:text-4xl w-8 md:w-10 text-purple-500"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div
              class="text-900 text-xl mb-1 md:mb-3 font-medium flex items-center md:justify-center"
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
        <div class="mb-4 sm:mb-6 md:mb-12 md:px-6 flex gap-4 md:block">
          <div>
            <span
              class="mt-1 md:mt-0 p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-100 dark:bg-slate-900"
            >
              <font-awesome-icon
                :icon="faGithub"
                class="text-3xl md:text-4xl w-8 md:w-10 text-purple-500"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-3 font-medium">
              Open source
            </div>
            <div class="text-700 line-height-3">
              Built by the community, for the community.<br />
              Fully transparent and licensed under AGPL-3.0.
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mb-6 md:mb-12 md:px-6 flex gap-4 md:block">
          <div>
            <span
              class="mt-1 md:mt-0 p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-100 dark:bg-slate-900"
            >
              <font-awesome-icon
                :icon="faShieldHeart"
                class="text-3xl md:text-4xl w-8 md:w-10 text-purple-500"
              />
            </span>
          </div>
          <div class="md:px-2 xl:px-6">
            <div class="text-900 text-xl mb-1 md:mb-3 font-medium">
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

    <div
      id="discord"
      class="surface-section px-6 py-8 md:py-12 md:px-6 lg:px-8 rounded-lg"
    >
      <div class="text-700 md:text-center">
        <div class="text-purple-600 font-bold mb-3">
          <i class="pi pi-discord"></i>&nbsp;POWERED BY FRIENDSHIP
        </div>
        <div class="text-900 font-bold text-5xl mb-3">Join Our Community</div>
        <div class="text-700 text-2xl mb-6">
          Get help with your setup, share your ideas, and meet other fans of
          RomM
        </div>
        <p-button
          class="font-semibold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
          v-on:click="onJoinDiscord"
        >
          <font-awesome-icon :icon="faDiscord" class="mr-2" />
          Join us
        </p-button>
      </div>
    </div>

    <div
      class="surface-section px-6 py-8 my-6 md:px-4 lg:px-8 flex flex-col md:items-center"
    >
      <div class="text-4xl text-700 font-bold mb-1">People ❤️ RomM</div>

      <div
        class="surface-section flex flex-col sm:flex-row justify-around mt-4"
      >
        <div class="pt-4 md:px-4 xl:px-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="faStar"
              class="text-2xl text-purple-500"
            />
            <div class="font-bold ml-3 text-2xl">1,400+</div>
          </div>
          <div class="ml-10">Github stars</div>
        </div>
        <div class="pt-4 md:px-4 xl:px-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="faUsers"
              class="text-2xl text-purple-500"
            />
            <div class="font-bold ml-3 text-2xl">800+</div>
          </div>
          <div class="ml-10">Discord members</div>
        </div>
        <div class="pt-4 md:px-4 xl:px-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="faArrowDown"
              class="text-2xl text-purple-500"
            />
            <div class="font-bold ml-3 text-2xl">250,000+</div>
          </div>
          <div class="ml-8">Docker pulls</div>
        </div>
      </div>
    </div>
  </div>

  <divider
    class="before:border-t-slate-100 dark:before:border-t-slate-900 m-auto"
  />

  <footer
    class="surface-section py-4 px-4 md:px-8 flex items-center justify-between sm:grid grid-cols-3 m-auto"
  >
    <div class="flex items-center">
      <nuxt-img
        :src="`images/blocks/logos/romm-mono-dark.svg`"
        alt="romm logo"
        class="w-8 h-8 footer-logo"
        loading="lazy"
      />
      <div class="text-700 text-lg md:text-xl ml-2">
        romm<span class="text-purple-500">.</span>app
        <div class="text-700 text-sm text-center sm:hidden">
          Own your games.
        </div>
      </div>
    </div>
    <div class="text-700 text-md text-center hidden sm:block">
      Own your games.
    </div>
    <a
      href="https://github.com/rommapp/marketing-site"
      target="_blank"
      class="text-900 hover:text-purple-500 text-end"
      title="github repository"
    >
      <font-awesome-icon :icon="faGithub" class="text-2xl h-4" />
    </a>
  </footer>
</template>

<style>
.p-menubar.p-menubar-mobile,
.p-menubar.p-menubar-mobile .p-menubar-root-list {
  background-color: theme("colors.slate.50");

  @media (prefers-color-scheme: dark) {
    background-color: theme("colors.slate.950");
  }
}

.p-button {
  background-color: theme("colors.purple.600");
  border-color: theme("colors.purple.600");
  color: theme("colors.white");

  &:hover {
    background-color: theme("colors.purple.500");
    border-color: theme("colors.purple.500");
  }

  &:focus {
    background-color: theme("colors.purple.400");
    border-color: theme("colors.purple.400");
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

#discord {
  background: linear-gradient(
    128deg,
    theme("colors.purple.50") 0%,
    theme("colors.purple.100") 50%,
    theme("colors.purple.50") 100%
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      128deg,
      theme("colors.slate.950") 0%,
      #1d0332 50%,
      theme("colors.slate.950") 100%
    );
  }
}

.footer-logo {
  @media (prefers-color-scheme: light) {
    filter: invert(1);
  }
}
</style>
