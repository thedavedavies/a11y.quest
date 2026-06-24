import { defineConfig, fontProviders } from "astro/config";

const variants = (family, weights) =>
  weights.map((weight) => ({
    weight,
    style: "normal",
    src: [`@fontsource/${family}/files/${family}-latin-${weight}-normal.woff2`],
  }));

export default defineConfig({
  site: "https://a11y.quest",
  build: {
    inlineStylesheets: "always",
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Bricolage Grotesque",
      cssVariable: "--font-display",
      fallbacks: ["system-ui", "sans-serif"],
      options: { variants: variants("bricolage-grotesque", [700, 800]) },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-body",
      fallbacks: ["system-ui", "sans-serif"],
      options: { variants: variants("inter", [400, 600, 700]) },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
      fallbacks: ["ui-monospace", "monospace"],
      options: { variants: variants("geist-mono", [600, 700]) },
    },
  ],
});
