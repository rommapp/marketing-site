import { config } from "@fortawesome/fontawesome-svg-core";

// Core CSS is loaded globally via nuxt.config css — stop the runtime from
// injecting a duplicate <style> on the client.
config.autoAddCss = false;

export default defineNuxtPlugin(() => {});
