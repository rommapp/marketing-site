<script setup lang="ts">
import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const menuItems: MenuItem[] = [
  {
    label: "Docs",
    url: "https://docs.romm.app",
    key: "docs",
    target: "_blank",
    rel: "noopener",
  },
  {
    label: "Demo",
    url: "https://demo.romm.app",
    key: "demo",
    target: "_blank",
    rel: "noopener",
  },
  {
    label: "Contact",
    url: "mailto:contact@romm.app",
    key: "contact",
    target: "_blank",
    rel: "noopener",
  },
];
</script>

<template>
  <Menubar
    :model="menuItems"
    :pt="{
      root: 'sticky top-3 mb-6 mx-4 z-40 px-4 md:px-8 bg-white dark:bg-transparent backdrop-blur-lg dark:backdrop-brightness-90 transition-colors border-light-toplayer dark:border-dark-toplayer rounded-md',
      menu: 'ml-auto bg-transparent border-x-0',
      button: 'ml-auto dark:text-white',
      end: 'ml-0',
    }"
  >
    <template #start>
      <div class="flex items-center">
        <a href="https://romm.app" class="flex items-center">
          <nuxt-img
            :src="`images/blocks/logos/romm.svg`"
            alt="romm logo"
            class="w-8 h-8 rounded-full"
          />
          <span class="text-900 text-2xl font-semibold ml-2">RomM</span>
        </a>
        <a
          href="https://github.com/rommapp/romm/releases/latest"
          target="_blank"
          rel="noopener"
        >
          <tag
            value="v<romm_version>"
            severity="primary"
            class="ml-3 text-xs"
          ></tag>
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
        <span>{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <div class="mt-2">
        <a
          href="https://opencollective.com/romm"
          target="_blank"
          rel="noopener"
          class="hover:text-primary border-l ml-4 pl-6 inline-flex border-light-toplayer dark:border-dark-toplayer"
          title="support the project"
        >
          <FontAwesomeIcon :icon="faDonate" class="text-2xl h-4" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          class="hover:text-primary ml-4 pr-2 inline-flex items-center h-[24px] rounded-full bg-light-surface dark:bg-dark-surface"
          title="github repository"
        >
          <FontAwesomeIcon :icon="faGithub" class="text-2xl h-4" />
          <span class="text-xs pl-1">3.4K</span>
        </a>
      </div>
    </template>
  </Menubar>
</template>
