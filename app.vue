<script setup lang="ts">
import Button from "primevue/button";
import Tag from "primevue/tag";
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
  faSkullCrossbones,
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
</script>

<template>
  <nav
    class="sticky top-0 z-40 w-full backdrop-blur-lg backdrop-brightness-90 transition-colors border-b border-b-slate-800"
  >
    <div class="flex justify-between items-center px-10 py-2">
      <div class="flex items-center">
        <a href="https://romm.app" class="flex items-center">
          <img
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
          <Tag value="v3.1.0" severity="primary" class="ml-3 text-xs"></Tag>
        </a>
      </div>
      <div class="md:flex items-center">
        <a href="#features" class="text-900 hover:text-purple-500">Features</a>
        <a
          href="https://github.com/rommapp/romm/wiki"
          target="_blank"
          class="text-900 hover:text-purple-500 ml-6"
        >
          Wiki
        </a>
        <a
          href="mailto:romm@fastmail.com"
          class="text-900 hover:text-purple-500 ml-6"
        >
          Contact
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          class="text-900 hover:text-purple-500 border-l ml-6 pl-6 border-slate-800"
        >
          <FontAwesomeIcon :icon="faGithub" class="text-2xl" />
        </a>
      </div>
      <div class="md:hidden">
        <i class="pi pi-bars text-2xl"></i>
      </div>
    </div>
  </nav>

  <div class="md:grid grid-cols-2 pl-10 mb-20 bg-slate-950">
    <div class="text-center md:text-left flex items-center">
      <section>
        <span class="block text-6xl font-bold mb-1">
          Your beautiful, powerful,
        </span>
        <div class="text-6xl text-purple-500 font-bold mb-3">
          self-hosted rom manager
        </div>
        <p class="mt-0 mb-4 surface-700 leading-relaxed">
          Scan, enrich, and browse your game collection with a clean and
          responsive interface. With support for multiple platforms, various
          naming schemes and custom tags, RomM is a must-have for anyone who
          plays on emulators.
        </p>

        <Button
          type="button"
          class="mr-3 p-button-raised"
          v-on:click="onGetStarted"
          >Install Now</Button
        >
      </section>
    </div>
    <div>
      <img
        :src="`images/blocks/hero/hero-dark.png`"
        alt="list of games in library"
        class="hero md:ml-auto block md:h-full object-cover w-full md:w-auto"
      />
    </div>
  </div>

  <div
    id="features"
    class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center bg-slate-950"
  >
    <div class="text-700 mb-12 text-2xl">
      The <span class="text-purple-500">most powerful</span> all-in-one app for
      managing your game collection.
    </div>
    <div class="grid grid-cols-3 grid-rows-2">
      <div class="mb-12 px-6">
        <span class="p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-900">
          <FontAwesomeIcon
            :icon="faWandSparkles"
            class="text-4xl text-purple-500"
          />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Magical metadata</div>
        <div class="text-700 line-height-3 px-6">
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
      <div class="mb-12 px-6">
        <span class="p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-900">
          <FontAwesomeIcon
            :icon="faListCheck"
            class="text-4xl text-purple-500"
          />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">
          Broad platform support
        </div>
        <div class="text-700 line-height-3 px-6">
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
      <div class="mb-12 px-6">
        <span class="p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-900">
          <FontAwesomeIcon :icon="faGamepad" class="text-4xl text-purple-500" />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Seamless gameplay</div>
        <div class="text-700 line-height-3 px-6">
          With
          <a
            href="https://emulatorjs.org/"
            target="_blank"
            rel="noopener"
            class="underline hover:text-purple-500"
          >
            EmulatorJS</a
          >
          built-in, play your favorite games in your browser, no setup required.
        </div>
      </div>
      <div class="mb-12 px-6">
        <span class="p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-900">
          <FontAwesomeIcon :icon="faRotate" class="text-4xl text-purple-500" />
        </span>
        <div
          class="text-900 text-xl mb-3 font-medium flex items-center justify-center"
        >
          <span>Device sync</span>
          <Tag
            value="COMING SOON"
            severity="primary"
            class="text-xs whitespace-nowrap ml-2"
          ></Tag>
        </div>
        <div class="text-700 line-height-3 px-6">
          Sync your games, saves and emulator settings across your devices with
          ease.
        </div>
      </div>
      <div class="mb-12 px-6">
        <span class="p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-900">
          <FontAwesomeIcon :icon="faGithub" class="text-4xl text-purple-500" />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Open source</div>
        <div class="text-700 line-height-3 px-6">
          Built by the community, for the community.<br />
          Fully transparent and licensed under AGPL-3.0.
        </div>
      </div>
      <div class="mb-12 px-6">
        <span class="p-3 shadow-2 mb-4 inline-block rounded-md bg-slate-900">
          <FontAwesomeIcon
            :icon="faShieldHeart"
            class="text-4xl text-purple-500"
          />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Private and secure</div>
        <div class="text-700 line-height-3 px-6">
          Maintain total control of your data.<br />
          Built with security in mind and regularly updated.
        </div>
      </div>
    </div>
  </div>

  <div class="surface-section px-4 py-12 md:px-6 lg:px-8 bg-slate-900">
    <div class="text-700 text-center">
      <div class="text-purple-600 font-bold mb-3">
        <i class="pi pi-discord"></i>&nbsp;POWERED BY FRIENDSHIP
      </div>
      <div class="text-900 font-bold text-5xl mb-3">Join Our Community</div>
      <div class="text-700 text-2xl mb-6">
        Get help with your setup, share your ideas, and meet other fans of RomM
      </div>
      <Button
        class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
        v-on:click="onJoinDiscord"
      >
        <FontAwesomeIcon :icon="faDiscord" class="mr-2" />
        Join us
      </Button>
    </div>
  </div>

  <div class="surface-section px-4 py-8 mt-6 md:px-6 lg:px-8 flex flex-col items-center">
    <div class="text-4xl text-700 font-bold">
      People love RomM
    </div>

    <div class="flex flex-row justify-around mt-8 w-6/12">
      <div class="px-4">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faStar" class="text-2xl text-purple-500" />
          <div class="font-bold ml-3 text-2xl">1300+</div>
        </div>
        <div class="mt-2">stars on Github</div>
      </div>
      <div class="px-4">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faUsers" class="text-2xl text-purple-500" />
          <div class="font-bold ml-3 text-2xl">700+</div>
        </div>
        <div class="mt-2">members on Discord</div>
      </div>
      <div class="px-4">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faArrowDown" class="text-2xl text-purple-500" />
          <div class="font-bold ml-3 text-2xl">100,000+</div>
        </div>
        <div class="mt-2">pulls on Docker</div>
      </div>
      <div class="px-4">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faSkullCrossbones" class="text-2xl text-purple-500" />
          <div class="font-bold ml-3 text-2xl">0</div>
        </div>
        <div class="mt-2">pirated games</div>
      </div>
    </div>
  </div>
</template>

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
</style>
