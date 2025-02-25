// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/fonts.css', '@/assets/css/fonts.css'],
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/image', '@pinia/nuxt'],
  googleFonts: {
    families: {
      "Noto Serif": [400, 500, 600, 700],
    },
    display: 'swap',
  },
  runtimeConfig: {
    apiUrl: process.env.API_URL,
    public: {
      beServerUrl:  process.env.API_URL,
    }
  },
  devtools: { enabled: true }
})
