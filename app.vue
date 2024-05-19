<script setup lang="ts">
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Divider from "primevue/divider";
import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";
import Tag from "primevue/tag";

const menuItems: MenuItem[] = [
  {
    label: "Features",
    url: "/#features",
    key: "features",
    target: "_self",
  },
  {
    label: "Documentation",
    url: "/docs/latest",
    key: "docs",
    target: "_self",
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
        root: 'sticky top-3 mb-6 z-40 px-4 md:px-8 bg-white dark:bg-transparent backdrop-blur-lg dark:backdrop-brightness-90 transition-colors border-slate-100 dark:border-slate-800 rounded-md',
        menu: 'ml-auto bg-transparent border-x-0',
        button: 'ml-auto dark:text-white',
        end: 'ml-0',
      }"
    >
      <template #start>
        <div class="flex items-center">
          <a href="/" class="flex items-center">
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
            <tag value="v3.1.0" severity="primary" class="ml-3 text-xs"></tag>
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

    <NuxtPage />
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
</style>

<style scoped>
.footer-logo {
  @media (prefers-color-scheme: light) {
    filter: invert(1);
  }
}
</style>
