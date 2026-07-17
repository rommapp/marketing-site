<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRight,
  faBolt,
  faCheck,
  faCloudArrowDown,
  faGamepad,
  faLayerGroup,
  faPlay,
  faRotate,
  faShieldHalved,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";

import playniteLibrary from "~/assets/images/screenshots/playnite/library.png";
import groutDetails from "~/assets/images/screenshots/grout/game-details.png";
import argosyRecommended from "~/assets/images/screenshots/argosy/recommended.png";

const githubStars = ref(3_800);
const discordMembers = ref(3_000);

const features = [
  {
    icon: faWandMagicSparkles,
    number: "01",
    label: "Enrich",
    title: "Turn folders into a living archive.",
    copy: "RomM scans your library and automatically adds artwork, metadata, manuals, and more.",
    accent: "violet",
  },
  {
    icon: faLayerGroup,
    number: "02",
    label: "Organize",
    title: "One library. Every generation.",
    copy: "Browse every platform in a single, responsive collection built for big screens and small ones.",
    accent: "orange",
  },
  {
    icon: faRotate,
    number: "03",
    label: "Connect",
    title: "Your collection, wherever you play.",
    copy: "Sync with your favorite launchers and handhelds without giving up control of your data.",
    accent: "cyan",
  },
];

const integrations = [
  { name: "Playnite", image: playniteLibrary, tag: "Windows" },
  { name: "Grout", image: groutDetails, tag: "Android" },
  { name: "Argosy", image: argosyRecommended, tag: "SteamOS" },
];

const platforms = [
  "Docker",
  "CasaOS",
  "Cloudron",
  "HexOS",
  "Portainer",
  "Synology",
  "TrueNAS",
  "Umbrel",
  "Unraid",
];

const compactNumber = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

onMounted(async () => {
  const [githubResult, discordResult] = await Promise.allSettled([
    fetch("https://api.github.com/repos/rommapp/romm").then((response) =>
      response.json(),
    ),
    fetch(
      "https://discord.com/api/v9/invites/RGPJHNMMwJ?with_counts=true",
    ).then((response) => response.json()),
  ]);

  if (
    githubResult.status === "fulfilled" &&
    githubResult.value.stargazers_count
  ) {
    githubStars.value = githubResult.value.stargazers_count;
  }

  if (
    discordResult.status === "fulfilled" &&
    discordResult.value.approximate_member_count
  ) {
    discordMembers.value = discordResult.value.approximate_member_count;
  }
});
</script>

<template>
  <main class="site-shell">
    <section class="hero-section">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-glow hero-glow-one" aria-hidden="true"></div>
      <div class="hero-glow hero-glow-two" aria-hidden="true"></div>

      <AppHeader :github-stars="githubStars" />

      <div class="hero-content page-width">
        <div class="hero-copy">
          <div class="eyebrow reveal-item">
            <span class="status-dot"></span>
            The open-source game library
          </div>

          <h1 class="hero-title reveal-item">
            Every game.<br />
            <span>One beautiful</span><br />
            place to play.
          </h1>

          <p class="hero-description reveal-item">
            RomM transforms a folder of ROMs into a rich, self-hosted library —
            organized, enriched, and entirely yours.
          </p>

          <div class="hero-actions reveal-item">
            <a
              class="button button-primary"
              href="https://docs.romm.app"
              target="_blank"
              rel="noopener"
            >
              Start your library
              <FontAwesomeIcon :icon="faArrowRight" />
            </a>
            <a
              class="button button-ghost"
              href="https://demo.romm.app"
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon :icon="faPlay" />
              Explore the demo
            </a>
          </div>

          <div class="hero-proof reveal-item">
            <div class="proof-item">
              <FontAwesomeIcon :icon="faGithub" />
              <strong>{{ compactNumber(githubStars) }}</strong>
              <span>GitHub stars</span>
            </div>
            <div class="proof-divider"></div>
            <div class="proof-item">
              <FontAwesomeIcon :icon="faDiscord" />
              <strong>{{ compactNumber(discordMembers) }}</strong>
              <span>collectors</span>
            </div>
          </div>
        </div>

        <div class="hero-visual reveal-item">
          <div class="visual-label visual-label-top">LIBRARY // 01</div>
          <div class="poster-frame">
            <div class="poster-image"></div>
            <div class="poster-shade"></div>
            <div class="poster-ui">
              <div>
                <span class="poster-kicker">Now playing</span>
                <strong>Build the collection<br />you always wanted.</strong>
              </div>
              <span class="poster-play"
                ><FontAwesomeIcon :icon="faPlay"
              /></span>
            </div>
          </div>
          <div class="visual-label visual-label-bottom">
            SELF-HOSTED // ALWAYS YOURS
          </div>
          <div class="pixel-mark" aria-hidden="true">
            <span v-for="index in 16" :key="index"></span>
          </div>
        </div>
      </div>

      <div class="platform-strip">
        <div class="platform-track">
          <span class="platform-intro">Runs beautifully on</span>
          <span
            v-for="platform in platforms"
            :key="platform"
            class="platform-name"
            >{{ platform }}</span
          >
        </div>
      </div>
    </section>

    <section id="features" class="manifesto-section page-width">
      <div class="section-index">
        <span>01</span>
        <span>THE COLLECTION</span>
      </div>
      <div class="manifesto-copy">
        <p>
          Your game collection is more than a list of files.
          <span
            >It is a personal history of worlds explored, bosses beaten, and
            weekends lost.</span
          >
        </p>
      </div>
      <div class="manifesto-aside">
        <span class="mono-label">ROMM // YOUR ARCHIVE</span>
        <p>Preserve it. Curate it. Play it.</p>
      </div>
    </section>

    <section class="feature-section page-width">
      <article
        v-for="feature in features"
        :key="feature.number"
        class="feature-card"
        :class="`accent-${feature.accent}`"
      >
        <div class="feature-topline">
          <span>{{ feature.number }} / {{ feature.label }}</span>
          <FontAwesomeIcon :icon="feature.icon" />
        </div>
        <div class="feature-art" aria-hidden="true">
          <div class="feature-orbit orbit-one"></div>
          <div class="feature-orbit orbit-two"></div>
          <div class="feature-core">
            <FontAwesomeIcon :icon="feature.icon" />
          </div>
        </div>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.copy }}</p>
        <a href="https://docs.romm.app" target="_blank" rel="noopener">
          Learn more <FontAwesomeIcon :icon="faArrowRight" />
        </a>
      </article>
    </section>

    <section id="experience" class="showcase-section">
      <div class="showcase-grid" aria-hidden="true"></div>
      <div class="page-width showcase-inner">
        <div class="showcase-copy">
          <div class="section-index light">
            <span>02</span>
            <span>THE EXPERIENCE</span>
          </div>
          <h2>A console for<br /><em>your entire history.</em></h2>
          <p>
            Fast enough for thousands of games. Familiar enough for everyone.
            Detailed enough for the collector who notices everything.
          </p>
          <ul>
            <li>
              <FontAwesomeIcon :icon="faCheck" /> Rich metadata and artwork
            </li>
            <li>
              <FontAwesomeIcon :icon="faCheck" /> Save and play from any device
            </li>
            <li><FontAwesomeIcon :icon="faCheck" /> Multi-user collections</li>
          </ul>
        </div>

        <div class="browser-stage">
          <div class="browser-chrome">
            <div class="browser-dots">
              <span></span><span></span><span></span>
            </div>
            <span>romm.local/library</span>
            <span class="secure-dot"></span>
          </div>
          <img
            src="/images/blocks/hero/hero-dark.png"
            alt="A library of games inside RomM"
          />
          <div class="floating-card floating-card-left">
            <FontAwesomeIcon :icon="faGamepad" />
            <div><strong>12,482</strong><span>Games indexed</span></div>
          </div>
          <div class="floating-card floating-card-right">
            <FontAwesomeIcon :icon="faBolt" />
            <div><strong>Ready</strong><span>Library synced</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="integrations" class="integrations-section page-width">
      <div class="integrations-heading">
        <div class="section-index">
          <span>03</span>
          <span>PLAY YOUR WAY</span>
        </div>
        <h2>From archive<br />to <em>adventure.</em></h2>
        <p>RomM meets your games where you play them.</p>
      </div>

      <div class="integration-grid">
        <article
          v-for="(integration, index) in integrations"
          :key="integration.name"
          class="integration-card"
        >
          <div class="integration-image">
            <img
              :src="integration.image"
              :alt="`${integration.name} integration preview`"
            />
            <span>{{ integration.tag }}</span>
          </div>
          <div class="integration-meta">
            <span>0{{ index + 1 }}</span>
            <div>
              <strong>{{ integration.name }}</strong
              ><small>Connected experience</small>
            </div>
            <FontAwesomeIcon :icon="faArrowRight" />
          </div>
        </article>
      </div>
    </section>

    <section id="open-source" class="open-section page-width">
      <div class="open-visual">
        <div class="open-grid" aria-hidden="true"></div>
        <div class="ascii-logo" aria-label="RomM">
          <span>R</span><span>O</span><span>M</span><span>M</span>
        </div>
        <div class="code-lines">
          <span>root@romm:~$ docker compose up -d</span>
          <span>✓ library mounted</span>
          <span>✓ metadata indexed</span>
          <span>✓ ready to play</span>
        </div>
      </div>
      <div class="open-copy">
        <div class="section-index light">
          <span>04</span>
          <span>OPEN BY DESIGN</span>
        </div>
        <h2>Your games.<br /><em>Your rules.</em></h2>
        <p>
          No subscriptions. No walled gardens. RomM is open source, self-hosted,
          and built by people who believe your collection should remain yours.
        </p>
        <div class="open-points">
          <div>
            <FontAwesomeIcon :icon="faShieldHalved" /><span
              ><strong>Private</strong>Keep your data at home.</span
            >
          </div>
          <div>
            <FontAwesomeIcon :icon="faCloudArrowDown" /><span
              ><strong>Portable</strong>Move it whenever you want.</span
            >
          </div>
        </div>
        <a
          class="text-link"
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
        >
          View the source <FontAwesomeIcon :icon="faArrowRight" />
        </a>
      </div>
    </section>

    <section class="cta-section page-width">
      <div class="cta-noise" aria-hidden="true"></div>
      <div class="cta-copy">
        <span class="mono-label">PRESS START // WHEN READY</span>
        <h2>Your library is waiting.</h2>
        <p>From scattered files to a collection worth exploring.</p>
      </div>
      <div class="cta-actions">
        <a
          class="button button-light"
          href="https://docs.romm.app"
          target="_blank"
          rel="noopener"
        >
          Install RomM <FontAwesomeIcon :icon="faArrowRight" />
        </a>
        <span>Free · Open source · Yours forever</span>
      </div>
    </section>

    <footer class="site-footer page-width">
      <div class="footer-brand">
        <div class="footer-logo">
          <img
            class="footer-logo-icon"
            src="/images/blocks/logos/romm-dark.svg"
            alt=""
          />
          <img
            class="footer-logo-word"
            src="/images/blocks/logos/logotipo.svg"
            alt="RomM"
          />
        </div>
        <p>The beautiful, powerful, self-hosted ROM manager.</p>
      </div>
      <div class="footer-links">
        <div>
          <span>Product</span><a href="#features">Features</a
          ><a href="#integrations">Integrations</a
          ><a href="https://demo.romm.app">Demo</a>
        </div>
        <div>
          <span>Resources</span><a href="https://docs.romm.app">Documentation</a
          ><a href="https://github.com/rommapp/romm">GitHub</a
          ><a href="mailto:contact@romm.app">Contact</a>
        </div>
        <div>
          <span>Community</span
          ><a href="https://discord.gg/RGPJHNMMwJ">Discord</a
          ><a href="https://opencollective.com/romm">Support us</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} The RomM Project</span>
        <span>BUILT FOR PLAYERS // BY PLAYERS</span>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.site-shell {
  overflow: hidden;
  background: #f2f0e9;
  color: #151419;
}
.page-width {
  width: min(1440px, calc(100% - 48px));
  margin-inline: auto;
}
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #08090c;
  color: #f8f5ee;
}
.hero-grid,
.showcase-grid {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.09) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, black, transparent 86%);
}
.hero-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(80px);
  pointer-events: none;
}
.hero-glow-one {
  width: 45vw;
  height: 45vw;
  right: 5%;
  top: 12%;
  background: rgba(119, 91, 255, 0.22);
}
.hero-glow-two {
  width: 30vw;
  height: 30vw;
  right: 20%;
  bottom: -12%;
  background: rgba(255, 83, 32, 0.18);
}
.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: clamp(40px, 6vw, 100px);
  min-height: calc(100vh - 170px);
  padding: 48px 0 82px;
}
.hero-copy {
  padding-left: clamp(0px, 3vw, 52px);
}
.eyebrow,
.mono-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font:
    600 11px/1 ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.status-dot {
  width: 7px;
  height: 7px;
  background: #b7ff57;
  box-shadow: 0 0 16px #b7ff57;
}
.hero-title {
  margin: 28px 0 24px;
  font:
    500 clamp(56px, 6.6vw, 108px) / 0.86 Georgia,
    "Times New Roman",
    serif;
  letter-spacing: -0.065em;
}
.hero-title span {
  color: #a995ff;
  font-style: italic;
}
.hero-description {
  max-width: 570px;
  color: #aaa9b2;
  font-size: clamp(17px, 1.3vw, 21px);
  line-height: 1.55;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 54px;
  padding: 0 22px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
}
.button-primary {
  background: #9c84ff;
  color: #0b0910;
  box-shadow: 6px 6px 0 #e75e31;
}
.button-primary:hover {
  background: #b5a4ff;
}
.button-ghost {
  border-color: #36363e;
  color: #f7f3ea;
  background: rgba(255, 255, 255, 0.03);
}
.button-ghost:hover {
  border-color: #706f7a;
  background: rgba(255, 255, 255, 0.07);
}
.hero-proof {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 42px;
  color: #777782;
}
.proof-item {
  display: grid;
  grid-template-columns: 20px auto;
  column-gap: 8px;
  align-items: center;
}
.proof-item svg {
  grid-row: 1 / span 2;
  font-size: 18px;
  color: #cbc8d3;
}
.proof-item strong {
  color: white;
  font-size: 14px;
  line-height: 1;
}
.proof-item span {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.proof-divider {
  width: 1px;
  height: 28px;
  background: #313139;
}
.hero-visual {
  position: relative;
  justify-self: end;
  width: min(100%, 770px);
  padding: 30px;
}
.poster-frame {
  position: relative;
  aspect-ratio: 0.88;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #111;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  clip-path: polygon(0 0, 94% 0, 100% 6%, 100% 100%, 0 100%);
}
.poster-image {
  position: absolute;
  inset: 0;
  background-image: url("/images/blocks/hero/hero-dark.png");
  background-size: auto 100%;
  background-position: 34% center;
  transform: scale(1.02);
  filter: saturate(0.86) contrast(1.08);
}
.poster-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(9, 9, 13, 0.08),
      rgba(9, 9, 13, 0.1) 42%,
      rgba(7, 7, 10, 0.95)
    ),
    linear-gradient(90deg, rgba(120, 92, 255, 0.16), transparent 50%);
}
.poster-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.18;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.14) 1px,
    transparent 1px,
    transparent 4px
  );
  mix-blend-mode: overlay;
}
.poster-ui {
  position: absolute;
  inset: auto 32px 32px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.poster-kicker {
  display: block;
  margin-bottom: 10px;
  color: #b7ff57;
  font:
    600 10px/1 ui-monospace,
    monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.poster-ui strong {
  font:
    500 clamp(25px, 2.4vw, 42px) / 1 Georgia,
    serif;
  letter-spacing: -0.035em;
}
.poster-play {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  flex: 0 0 auto;
  border-radius: 50%;
  color: #151319;
  background: #f6f1e7;
}
.visual-label {
  position: absolute;
  z-index: 3;
  padding: 8px 10px;
  background: #e9e3d8;
  color: #111116;
  font:
    700 9px/1 ui-monospace,
    monospace;
  letter-spacing: 0.12em;
}
.visual-label-top {
  top: 2px;
  right: 10%;
}
.visual-label-bottom {
  bottom: 0;
  left: 7px;
}
.pixel-mark {
  position: absolute;
  top: 0;
  left: -4px;
  display: grid;
  grid-template-columns: repeat(4, 8px);
  gap: 3px;
  transform: rotate(8deg);
}
.pixel-mark span {
  width: 8px;
  height: 8px;
  background: #e75e31;
}
.pixel-mark span:nth-child(3n),
.pixel-mark span:nth-child(5n) {
  opacity: 0;
}
.platform-strip {
  position: relative;
  z-index: 3;
  overflow: hidden;
  border-top: 1px solid #27272e;
  background: rgba(5, 5, 8, 0.68);
}
.platform-track {
  display: flex;
  align-items: center;
  width: max-content;
  min-width: 100%;
  padding: 21px max(24px, calc((100vw - 1440px) / 2));
}
.platform-intro {
  margin-right: 44px;
  color: #71717a;
  font:
    600 9px/1 ui-monospace,
    monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.platform-name {
  padding: 0 30px;
  border-left: 1px solid #2b2b31;
  color: #c8c5cc;
  font-size: 13px;
  font-weight: 700;
}
.manifesto-section {
  display: grid;
  grid-template-columns: 180px 1fr 230px;
  gap: 56px;
  padding-block: 135px 110px;
  border-bottom: 1px solid #cfccc4;
}
.section-index {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-top: 8px;
  font:
    700 10px/1 ui-monospace,
    monospace;
  letter-spacing: 0.12em;
}
.section-index span:first-child {
  color: #7a5fff;
}
.section-index.light {
  color: #aaa7b3;
}
.section-index.light span:first-child {
  color: #b7ff57;
}
.manifesto-copy p {
  max-width: 850px;
  margin: 0;
  font:
    500 clamp(36px, 4.3vw, 67px) / 1.04 Georgia,
    serif;
  letter-spacing: -0.045em;
}
.manifesto-copy span {
  color: #9b9790;
}
.manifesto-aside {
  align-self: end;
  padding-bottom: 8px;
}
.manifesto-aside p {
  margin: 15px 0 0;
  color: #6d6964;
  font-size: 14px;
}
.feature-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding-block: 22px 140px;
}
.feature-card {
  position: relative;
  overflow: hidden;
  min-height: 620px;
  padding: 26px;
  border: 1px solid #d1cec6;
  background: #f7f5ef;
}
.feature-topline {
  display: flex;
  justify-content: space-between;
  font:
    700 10px/1 ui-monospace,
    monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.feature-topline svg {
  font-size: 14px;
}
.feature-art {
  position: relative;
  display: grid;
  place-items: center;
  height: 300px;
  margin: 45px -26px 34px;
  overflow: hidden;
  background: #e9e6de;
}
.accent-violet .feature-art {
  background: #cabfff;
}
.accent-orange .feature-art {
  background: #ff9a63;
}
.accent-cyan .feature-art {
  background: #83dbe3;
}
.feature-orbit {
  position: absolute;
  border: 1px solid rgba(20, 19, 24, 0.32);
  border-radius: 50%;
}
.orbit-one {
  width: 250px;
  height: 250px;
}
.orbit-two {
  width: 390px;
  height: 160px;
  transform: rotate(-24deg);
}
.feature-core {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 94px;
  height: 94px;
  border: 1px solid #17161b;
  background: #f5f1e9;
  box-shadow: 12px 12px 0 rgba(20, 19, 24, 0.15);
  font-size: 34px;
  transform: rotate(-4deg);
}
.feature-card h2 {
  margin: 0 0 16px;
  font:
    500 clamp(27px, 2.3vw, 38px) / 1.02 Georgia,
    serif;
  letter-spacing: -0.035em;
}
.feature-card p {
  min-height: 70px;
  margin: 0;
  color: #69655f;
  font-size: 14px;
  line-height: 1.6;
}
.feature-card a,
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 25px;
  color: inherit;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
}
.feature-card a svg,
.text-link svg {
  transition: transform 0.2s ease;
}
.feature-card a:hover svg,
.text-link:hover svg {
  transform: translateX(5px);
}
.showcase-section {
  position: relative;
  overflow: hidden;
  padding: 130px 0 150px;
  color: #f7f4ec;
  background: #0a0a0e;
}
.showcase-grid {
  mask-image: linear-gradient(90deg, black, transparent);
}
.showcase-inner {
  position: relative;
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 80px;
  align-items: center;
}
.showcase-copy h2,
.integrations-heading h2,
.open-copy h2 {
  margin: 32px 0 24px;
  font:
    500 clamp(48px, 5.5vw, 80px) / 0.95 Georgia,
    serif;
  letter-spacing: -0.055em;
}
.showcase-copy h2 em,
.integrations-heading h2 em,
.open-copy h2 em {
  color: #a58cff;
  font-weight: inherit;
}
.showcase-copy > p,
.open-copy > p {
  color: #97949e;
  font-size: 17px;
  line-height: 1.65;
}
.showcase-copy ul {
  display: grid;
  gap: 14px;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
  color: #d5d1d9;
  font-size: 13px;
}
.showcase-copy li {
  display: flex;
  gap: 12px;
  align-items: center;
}
.showcase-copy li svg {
  color: #b7ff57;
}
.browser-stage {
  position: relative;
  border: 1px solid #35343e;
  background: #131319;
  box-shadow: 0 45px 120px rgba(0, 0, 0, 0.65);
  transform: perspective(1200px) rotateY(-3deg) rotateX(1deg);
}
.browser-chrome {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 44px;
  padding: 0 15px;
  border-bottom: 1px solid #313039;
  color: #797782;
  font:
    500 9px/1 ui-monospace,
    monospace;
}
.browser-dots {
  display: flex;
  gap: 6px;
}
.browser-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4a4853;
}
.secure-dot {
  justify-self: end;
  width: 7px;
  height: 7px;
  background: #b7ff57;
  box-shadow: 0 0 8px #b7ff57;
}
.browser-stage > img {
  display: block;
  width: 100%;
}
.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 175px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(18, 17, 24, 0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}
.floating-card svg {
  color: #b7ff57;
}
.floating-card div {
  display: grid;
}
.floating-card strong {
  font-size: 14px;
}
.floating-card span {
  color: #888590;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.floating-card-left {
  left: -55px;
  bottom: 15%;
}
.floating-card-right {
  right: -28px;
  top: 20%;
}
.integrations-section {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 80px;
  padding-block: 140px;
}
.integrations-heading h2 {
  margin-top: 30px;
  font-size: clamp(48px, 5vw, 70px);
}
.integrations-heading h2 em {
  color: #e75e31;
}
.integrations-heading p {
  color: #77736d;
  line-height: 1.6;
}
.integration-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  align-items: end;
}
.integration-card:nth-child(2) {
  transform: translateY(45px);
}
.integration-image {
  position: relative;
  aspect-ratio: 0.78;
  overflow: hidden;
  background: #17171b;
}
.integration-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
  filter: saturate(0.75) contrast(1.05);
  transition:
    transform 0.45s ease,
    filter 0.45s ease;
}
.integration-card:hover img {
  transform: scale(1.035);
  filter: saturate(1);
}
.integration-image span {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 7px 9px;
  color: #101014;
  background: #b7ff57;
  font:
    700 8px/1 ui-monospace,
    monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.integration-meta {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 15px;
  padding: 17px 3px;
  border-bottom: 1px solid #c8c5be;
}
.integration-meta > span {
  color: #8a8580;
  font:
    700 9px ui-monospace,
    monospace;
}
.integration-meta div {
  display: grid;
}
.integration-meta strong {
  font:
    500 20px Georgia,
    serif;
}
.integration-meta small {
  color: #8a8580;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.open-section {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  min-height: 680px;
  padding: 0;
  color: #f4f0e8;
  background: #17161b;
}
.open-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 65px;
  background: #cbbd74;
  color: #17161b;
}
.open-grid {
  position: absolute;
  inset: 0;
  opacity: 0.24;
  background-image: radial-gradient(#17161b 1px, transparent 1px);
  background-size: 8px 8px;
}
.ascii-logo {
  position: relative;
  z-index: 1;
  display: flex;
  font:
    900 clamp(70px, 10vw, 150px) / 0.8 ui-monospace,
    monospace;
  letter-spacing: -0.16em;
  text-shadow: 8px 8px 0 rgba(23, 22, 27, 0.13);
}
.ascii-logo span:nth-child(even) {
  color: transparent;
  -webkit-text-stroke: 2px #17161b;
}
.code-lines {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 8px;
  width: min(470px, 100%);
  margin-top: 55px;
  padding: 20px;
  border: 1px solid #17161b;
  background: rgba(245, 232, 166, 0.55);
  font:
    600 11px/1.3 ui-monospace,
    monospace;
}
.code-lines span:not(:first-child) {
  color: #4d5c21;
}
.open-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(45px, 6vw, 90px);
}
.open-copy h2 {
  font-size: clamp(48px, 5vw, 72px);
}
.open-copy h2 em {
  color: #d2c57e;
}
.open-points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 32px;
}
.open-points > div {
  display: flex;
  gap: 14px;
}
.open-points svg {
  color: #d2c57e;
  font-size: 20px;
}
.open-points span {
  display: grid;
  color: #87848d;
  font-size: 11px;
  line-height: 1.5;
}
.open-points strong {
  color: #f6f2ea;
  font-size: 13px;
}
.cta-section {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 60px;
  overflow: hidden;
  margin-top: 24px;
  padding: clamp(48px, 7vw, 100px);
  color: #101014;
  background: linear-gradient(120deg, #835fff, #d470ff 48%, #ff8154);
}
.cta-noise {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image: repeating-linear-gradient(
    90deg,
    transparent 0 3px,
    rgba(255, 255, 255, 0.25) 3px 4px
  );
  mix-blend-mode: overlay;
}
.cta-copy,
.cta-actions {
  position: relative;
  z-index: 1;
}
.cta-copy h2 {
  margin: 22px 0 12px;
  font:
    500 clamp(54px, 7vw, 100px) / 0.9 Georgia,
    serif;
  letter-spacing: -0.06em;
}
.cta-copy p {
  margin: 0;
  font-size: 17px;
}
.cta-actions {
  display: grid;
  gap: 15px;
  justify-items: start;
}
.button-light {
  background: #f7f2e8;
  color: #111015;
  box-shadow: 6px 6px 0 #151419;
}
.button-light:hover {
  background: white;
}
.cta-actions > span {
  font:
    600 9px/1 ui-monospace,
    monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.site-footer {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 80px;
  padding-block: 90px 30px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer-logo-icon {
  width: 34px;
}
.footer-logo-word {
  width: 78px;
}
.footer-brand p {
  max-width: 250px;
  color: #7e7a74;
  font-size: 13px;
  line-height: 1.55;
}
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
}
.footer-links div {
  display: grid;
  align-content: start;
  gap: 10px;
}
.footer-links span {
  margin-bottom: 8px;
  font:
    800 9px/1 ui-monospace,
    monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.footer-links a {
  color: #77736d;
  font-size: 12px;
  text-decoration: none;
}
.footer-links a:hover {
  color: #6e52f4;
}
.footer-bottom {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 22px;
  border-top: 1px solid #d2cfc7;
  color: #8c8881;
  font:
    600 9px/1 ui-monospace,
    monospace;
  letter-spacing: 0.09em;
}
.reveal-item {
  animation: reveal 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.reveal-item:nth-child(2) {
  animation-delay: 0.08s;
}
.reveal-item:nth-child(3) {
  animation-delay: 0.16s;
}
.reveal-item:nth-child(4) {
  animation-delay: 0.24s;
}
.reveal-item:nth-child(5) {
  animation-delay: 0.32s;
}
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal-item {
    animation: none;
  }
  * {
    scroll-behavior: auto !important;
  }
}
@media (max-width: 1100px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
  }
  .hero-title {
    font-size: clamp(54px, 7vw, 76px);
  }
  .manifesto-section {
    grid-template-columns: 120px 1fr;
  }
  .manifesto-aside {
    display: none;
  }
  .feature-card {
    min-height: 560px;
  }
  .feature-art {
    height: 245px;
  }
  .showcase-inner {
    grid-template-columns: 1fr;
  }
  .showcase-copy {
    max-width: 680px;
  }
  .browser-stage {
    margin-left: 50px;
  }
  .integrations-section {
    grid-template-columns: 1fr;
  }
  .integrations-heading {
    max-width: 500px;
  }
  .integration-grid {
    margin-top: 10px;
  }
}
@media (max-width: 780px) {
  .page-width {
    width: min(100% - 28px, 1440px);
  }
  .hero-content {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 55px;
  }
  .hero-copy {
    padding: 0;
  }
  .hero-title {
    font-size: clamp(53px, 16vw, 76px);
  }
  .hero-visual {
    width: 100%;
    padding: 20px 0 35px;
  }
  .poster-frame {
    aspect-ratio: 1 / 1.1;
  }
  .pixel-mark {
    display: none;
  }
  .platform-track {
    overflow: hidden;
    padding-left: 14px;
  }
  .platform-name {
    padding-inline: 18px;
  }
  .manifesto-section {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-block: 90px 70px;
  }
  .manifesto-copy p {
    font-size: 40px;
  }
  .feature-section {
    grid-template-columns: 1fr;
    padding-bottom: 90px;
  }
  .feature-card {
    min-height: 0;
  }
  .feature-card p {
    min-height: 0;
  }
  .showcase-section {
    padding-block: 90px;
  }
  .showcase-inner {
    gap: 55px;
  }
  .browser-stage {
    margin: 0;
    transform: none;
  }
  .floating-card {
    display: none;
  }
  .integration-grid {
    grid-template-columns: 1fr;
  }
  .integration-card:nth-child(2) {
    transform: none;
  }
  .integration-image {
    aspect-ratio: 1.25;
  }
  .integrations-section {
    padding-block: 95px;
  }
  .open-section {
    grid-template-columns: 1fr;
    width: 100%;
  }
  .open-visual {
    min-height: 430px;
    padding: 38px 25px;
  }
  .open-copy {
    padding: 65px 28px 75px;
  }
  .cta-section {
    grid-template-columns: 1fr;
    gap: 35px;
    padding: 55px 28px;
  }
  .cta-copy h2 {
    font-size: 58px;
  }
  .site-footer {
    grid-template-columns: 1fr;
    gap: 45px;
  }
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-bottom {
    gap: 20px;
    flex-direction: column;
  }
}
</style>
