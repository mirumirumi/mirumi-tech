import { defineNuxtConfig } from "nuxt"

export default defineNuxtConfig({
  app: {
    baseURL: "/",  // can override by NUXT_APP_BASE_URL
    buildAssetsDir: "_nuxt",
    head: {
      charset: "utf-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { name: "sign", content: "880f27e6d0c4daf6c6143beb568a73075f02b75d53e690e6bb79297435d7cf5a8404a4c84ba35416556b92628987d76b9067a4a4ef5d30f63b2b7d0f89b0a26b" },
        { name: "robots", content: "max-image-preview:large" },
        { name: "description", content: "みるみの技術ブログ" },
        { name: "keywords", content: "みるめも,みるみ,blog,technology,programming" },
        { name: "thumbnail", content: "/main-visual.png" },
        { property: "og:type", content: "website" },
        { property: "og:description", content: "みるみの技術ブログ" },
        { property: "og:title", content: "mirumi.tech" },
        { property: "og:url", content: "https://mirumi.tech" },
        { property: "og:image", content: "/main-visual.png" },
        { property: "og:site_name", content: "mirumi.tech" },
        { property: "og:locale", content: "ja_JP" },
        { property: "og:app_id", content: "" },
        { property: "twitter:title", content: "mirumi.tech" },
        { property: "twitter:url", content: "https://mirumi.tech" },
        { property: "twitter:description", content: "みるみの技術ブログ" },
        { name: "twitter:domain", content: "mirumi.tech" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "/main-visual.png" },
      ],
      link: [
        { rel: "icon", href: "/site-icon.png" },
        { rel: "canonical", href: "https://mirumi.tech" },
      ],
      style: [],
      script: [],
    },
  },
  autoImports: {
    dirs: [
      "@/composables",
    ],
  },
  buildModules: [
    "@pinia/nuxt",  // what does it mean?
  ],
  components: {
    dirs: [
      "@/components",
    ],
  },
  nitro: {
    srcDir: "src/",
  },
  pages: true,
  runtimeConfig: {  // fallback defaults
    api: {
      endpointBaseUrl: "",
      key: "",
    },
    externalApi: {
      secret: "",  
    },
    // anything under public and app will be exposed to the frontend
  },
  srcDir: "src/",
  ssr: true,
  typescript: {
    strict: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/scss.scss";
            @import "@/assets/styles/content.scss";
            @import "@/assets/styles/syntaxhighlight.scss";
          `,
        },
      },
    },
    server: {
      watch: {
        usePolling: true,  // maybe only in WSL2
      },
    },
  },
})
