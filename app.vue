<script setup lang="ts">
import { useNuxtApp } from "#app";
import Button from "primevue/button";
import Tag from 'primevue/tag';

const nuxtApp = useNuxtApp();
</script>

<template>
  <nav class="sticky top-0 z-40 w-full backdrop-blur-lg backdrop-brightness-90 transition-colors border-b border-b-neutral-800">
    <div class="flex justify-between items-center px-10 py-2">
      <div class="flex items-center">
        <img
          :src="`/_nuxt/assets/images/blocks/logos/romm-${nuxtApp.$config.theme}.svg`"
          alt="romm logo"
          class="w-10 h-10"
        />
        <span class="text-900 text-2xl font-semibold ml-1">RomM</span>
        <Tag value="v3.1.0" severity="primary" class="ml-3 text-xs"></Tag>
      </div>
      <div class="md:flex items-center"> 
        <a href="#" class="text-900 hover:text-blue-500">Features</a>
        <a href="#" class="text-900 hover:text-blue-500 ml-4">Pricing</a>
        <a href="#" class="text-900 hover:text-blue-500 ml-4">Docs</a>
        <a href="#" class="text-900 hover:text-blue-500 ml-4">Blog</a>
        <a href="#" class="text-900 hover:text-blue-500 ml-4">Contact</a>
        <span class="mx-4 text-neutral-800">|</span>
        <a href="#" class="text-900 hover:text-blue-500">Github</a>
      </div>
      <div class="md:hidden">
        <i class="pi pi-bars text-2xl"></i>
      </div>
    </div>
  </nav>
  <div class="md:grid grid-cols-2 pl-10">
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

        <Button type="button" class="mr-3 p-button-raised">Get Started</Button>
        <Button type="button" class="p-button-outlined">Live Demo</Button>
      </section>
    </div>
    <div>
      <img
        :src="`/_nuxt/assets/images/blocks/hero/hero-${nuxtApp.$config.theme}.png`"
        alt="list of games in library"
        class="hero md:ml-auto block md:h-full object-cover w-full md:w-auto"
      />
    </div>
  </div>

  <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
    <div class="mb-3 font-bold text-3xl">
      <span class="text-900">One Product, </span>
      <span class="text-blue-600">Many Solutions</span>
    </div>
    <div class="text-700 mb-6">
      Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
    </div>
    <div class="grid grid-cols-3 grid-rows-2">
      <div class="mb-4 px-5">
        <span
          class="p-3 shadow-2 mb-3 inline-block surface-card"
          style="border-radius: 10px"
        >
          <i class="pi pi-desktop text-4xl text-blue-500"></i>
        </span>
        <div class="text-900 text-xl mb-3 font-medium">
          Built for Developers
        </div>
        <span class="text-700 line-height-3"
          >Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.</span
        >
      </div>
      <div class="mb-4 px-5">
        <span
          class="p-3 shadow-2 mb-3 inline-block surface-card"
          style="border-radius: 10px"
        >
          <i class="pi pi-lock text-4xl text-blue-500"></i>
        </span>
        <div class="text-900 text-xl mb-3 font-medium">
          End-to-End Encryption
        </div>
        <span class="text-700 line-height-3"
          >Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin
          aliquam ultrices sagittis.</span
        >
      </div>
      <div class="col-12 md:col-4 mb-4 px-5">
        <span
          class="p-3 shadow-2 mb-3 inline-block surface-card"
          style="border-radius: 10px"
        >
          <i class="pi pi-check-circle text-4xl text-blue-500"></i>
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Easy to Use</div>
        <span class="text-700 line-height-3"
          >Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat
          ac tincidunt vitae semper.</span
        >
      </div>
      <div class="col-12 md:col-4 mb-4 px-5">
        <span
          class="p-3 shadow-2 mb-3 inline-block surface-card"
          style="border-radius: 10px"
        >
          <i class="pi pi-globe text-4xl text-blue-500"></i>
        </span>
        <div class="text-900 text-xl mb-3 font-medium">
          Fast & Global Support
        </div>
        <span class="text-700 line-height-3"
          >Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum
          tellus.</span
        >
      </div>
      <div class="col-12 md:col-4 mb-4 px-5">
        <span
          class="p-3 shadow-2 mb-3 inline-block surface-card"
          style="border-radius: 10px"
        >
          <i class="pi pi-github text-4xl text-blue-500"></i>
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Open Source</div>
        <span class="text-700 line-height-3"
          >Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec
          adipiscing tristique risus nec feugiat.
        </span>
      </div>
      <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
        <span
          class="p-3 shadow-2 mb-3 inline-block surface-card"
          style="border-radius: 10px"
        >
          <i class="pi pi-shield text-4xl text-blue-500"></i>
        </span>
        <div class="text-900 text-xl mb-3 font-medium">Trusted Security</div>
        <span class="text-700 line-height-3"
          >Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus
          aliquam eleifend.</span
        >
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
