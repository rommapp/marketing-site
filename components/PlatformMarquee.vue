<script setup lang="ts">
const modules = import.meta.glob("~/assets/images/platforms/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const icons = Object.entries(modules).map(([path, src]) => {
  const slug = path.split("/").pop()!.replace(".svg", "");
  return { slug, name: slug.replace(/-/g, " "), src };
});
</script>

<template>
  <div
    class="pause-on-hover [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
  >
    <div class="flex overflow-hidden border-b border-grid">
      <div
        v-for="copy in 2"
        :key="copy"
        :aria-hidden="copy === 2"
        class="flex min-w-full shrink-0 items-center animate-marquee"
        style="animation-duration: 150s"
      >
        <div
          v-for="icon in icons"
          :key="icon.slug"
          :title="icon.name"
          class="group flex h-28 w-32 shrink-0 flex-col items-center justify-center gap-2.5 border-r border-grid px-3"
        >
          <img
            :src="icon.src"
            :alt="icon.name"
            class="h-11 w-11 object-contain opacity-60 saturate-[.35] transition-all duration-200 group-hover:opacity-100 group-hover:saturate-100"
            loading="lazy"
            decoding="async"
          />
          <span
            class="w-full truncate text-center font-mono text-[9px] uppercase tracking-widest text-grid transition-colors duration-200 group-hover:text-primary-300"
          >
            {{ icon.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
