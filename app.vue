<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <div class="md:grid grid-cols-2">
    <div class="p-6 text-center md:text-left flex items-center">
      <section>
        <span class="block text-6xl font-bold mb-1">
          Your beautiful, powerful,
        </span>
        <div class="text-6xl text-primary font-bold mb-3">
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
        >Get Started</Button>
        <Button
          type="button"
          class="p-button-outlined"
        >Live Demo</Button>
      </section>
    </div>
    <div>
      <img
        src="assets/images/blocks/hero/hero-dark.png"
        alt="list of games in library"
        class="hero md:ml-auto block md:h-full object-cover w-full md:w-auto"
      />
    </div>
  </div>
</template>

<style>
@import "assets/css/main.css";
</style>

<style scoped>
.hero {
  object-position: top right;

  @media screen and (min-width: 768px){
    clip-path: polygon(10% 0, 100% 0%, 100% 100%, 2% 100%);
  }

  @media screen and (max-width: 767px){
    display: none;  
  }
} 
</style>
