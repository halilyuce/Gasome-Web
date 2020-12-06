export default {
  router: {
    base: '/',
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Gasome',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Gamer Social Media',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Customize the progress-bar color
  loading: { color: '#6e00ff' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'vuesax/dist/vuesax.css',
    'boxicons/css/boxicons.min.css',
    '~assets/scss/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/vuesax'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  tailwindcss: {
    config: {
      plugins: [require('tailwindcss-dark-mode')()],
      darkMode: 'class',
      colorMode: {
        classSuffix: '',
      },
      theme: {
        darkSelector: '.dark-mode',
        backgroundColor: (theme) => ({
          ...theme('colors'),
          black: '#1e2023',
        }),
      },
      corePlugins: {
        preflight: false,
      },
      purgeCSS: {
        whitelist: ['dark-mode'],
      },
      variants: {
        backgroundColor: [
          'dark',
          'dark-hover',
          'dark-group-hover',
          'dark-even',
          'dark-odd',
          'hover',
          'responsive',
        ],
        borderColor: [
          'dark',
          'dark-focus',
          'dark-focus-within',
          'hover',
          'responsive',
        ],
        textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
      },
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    storageKey: 'mode',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
