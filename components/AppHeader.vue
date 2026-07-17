<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

defineProps<{ githubStars: number }>();

const menuOpen = ref(false);
const compactNumber = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
</script>

<template>
  <header class="header-shell">
    <nav class="header-nav">
      <a class="brand" href="/" aria-label="RomM home">
        <img
          class="brand-icon"
          src="/images/blocks/logos/romm-light.svg"
          alt=""
        />
        <img
          class="brand-wordmark"
          src="/images/blocks/logos/logotipo.svg"
          alt="RomM"
        />
        <span>OPEN SOURCE</span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" />
      </button>

      <div class="nav-cluster" :class="{ open: menuOpen }">
        <div class="nav-links">
          <a href="#features" @click="menuOpen = false">Features</a>
          <a href="#experience" @click="menuOpen = false">Experience</a>
          <a href="#integrations" @click="menuOpen = false">Integrations</a>
          <a href="https://docs.romm.app" target="_blank" rel="noopener"
            >Docs</a
          >
        </div>
        <div class="nav-actions">
          <a
            class="github-link"
            href="https://github.com/rommapp/romm"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon :icon="faGithub" />
            {{ compactNumber(githubStars) }}
          </a>
          <a
            class="install-link"
            href="https://docs.romm.app"
            target="_blank"
            rel="noopener"
            >Install RomM</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header-shell {
  position: relative;
  z-index: 20;
  width: min(1440px, calc(100% - 48px));
  margin: 0 auto;
  padding-top: 20px;
}
.header-nav {
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 7px 8px 7px 20px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(12, 12, 16, 0.72);
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}
.brand {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #96939e;
  text-decoration: none;
}
.brand-icon {
  width: 28px;
  height: 28px;
}
.brand-wordmark {
  width: 58px;
  filter: invert(1);
}
.brand span {
  padding-left: 16px;
  border-left: 1px solid #34333b;
  font:
    700 8px/1 ui-monospace,
    monospace;
  letter-spacing: 0.14em;
}
.nav-cluster {
  display: flex;
  align-items: center;
  flex: 1;
}
.nav-links {
  display: flex;
  gap: clamp(20px, 3vw, 42px);
  margin: 0 auto;
}
.nav-links a {
  position: relative;
  color: #a3a0aa;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -8px;
  height: 1px;
  background: #b7ff57;
  transition: right 0.2s ease;
}
.nav-links a:hover {
  color: white;
}
.nav-links a:hover::after {
  right: 0;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.github-link,
.install-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 15px;
  color: #e6e2ea;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
}
.github-link {
  gap: 8px;
  border: 1px solid #35343d;
}
.github-link:hover {
  border-color: #66636f;
}
.install-link {
  background: #f1ede5;
  color: #111015;
}
.install-link:hover {
  background: #b7ff57;
}
.menu-toggle {
  display: none;
  margin-left: auto;
  border: 0;
  color: white;
  background: transparent;
  font-size: 20px;
}
@media (max-width: 840px) {
  .header-shell {
    width: calc(100% - 28px);
  }
  .header-nav {
    padding: 8px 12px;
  }
  .brand span {
    display: none;
  }
  .menu-toggle {
    display: block;
  }
  .nav-cluster {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    display: none;
    padding: 18px;
    border: 1px solid #34333d;
    background: rgba(10, 10, 14, 0.97);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  }
  .nav-cluster.open {
    display: block;
  }
  .nav-links {
    display: grid;
    gap: 0;
  }
  .nav-links a {
    padding: 15px 4px;
    border-bottom: 1px solid #26262d;
    font-size: 14px;
  }
  .nav-links a::after {
    display: none;
  }
  .nav-actions {
    margin-top: 18px;
  }
  .github-link,
  .install-link {
    flex: 1;
  }
}
</style>
