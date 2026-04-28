// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  // Shopify embedded apps run entirely in an iframe — disable SSR
  ssr: false,
  // Tell Vue compiler that s-* and ui-* tags are native custom elements,
  // not Vue components — suppresses all "Failed to resolve component" warnings
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('s-') || tag.startsWith('ui-'),
    },
  },
  // Allow any tunnel hostname (cloudflare, ngrok, etc.)
  vite: {
    server: {
      allowedHosts: true,
    },
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://cdn.shopify.com' },
        {
          rel: 'preload',
          as: 'script',
          href: 'https://cdn.shopify.com/shopifycloud/app-bridge.js',
          fetchpriority: 'high',
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { 
          name: 'shopify-api-key', 
          content: '89080ece086f2ac81d370d26fb0148d2',
          // 'critical' or a low number forces this to render first
          tagPriority: 0 
        },
      ],
      script: [
        {
          src: 'https://cdn.shopify.com/shopifycloud/app-bridge.js',
          tagPriority: 1,
        },
        {
          src: 'https://cdn.shopify.com/shopifycloud/polaris.js',
          tagPriority: 2,
        },
      ],
    },
  },
})