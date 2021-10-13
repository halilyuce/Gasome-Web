require('dotenv').config()
export default {
  target: 'static',
  ssr: false,
  router: {
    base: '/',
    middleware: ['auth'],
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Gasome | Gamer Social Media',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Social Media Application based on games for gamers. You can find the closest gamers to you easily. Explore new games and meet with gamers around you.',
      },

      // Global
      { name: 'author', content: 'https://gasome.com' },
      { name: 'publisher', content: 'https://gasome.com' },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Gasome | Gamer Social Media',
      },
      { name: 'theme-color', content: '#6e00ff' },

      // Facebook & LinkedIn
      { property: 'og:title', content: 'Gasome | Gamer Social Media' },
      {
        property: 'og:description',
        content:
          'Social Media Application based on games for gamers. You can find the closest gamers to you easily. Explore new games and meet with gamers around you.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://gasome.com' },
      { property: 'og:image', content: '/appIcon.png' },
      { property: 'og:image:width', content: '512' },
      { property: 'og:image:height', content: '512' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'Gasome | Gamer Social Media' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@gasomecom' },
      { name: 'twitter:creator', content: '@gasomecom' },
      { name: 'twitter:title', content: 'Gasome | Gamer Social Media' },
      {
        name: 'twitter:description',
        content:
          'Social Media Application based on games for gamers. You can find the closest gamers to you easily. Explore new games and meet with gamers around you.',
      },
      { name: 'twitter:image', content: '/appIcon.png' },
      { name: 'twitter:image:width', content: '512' },
      { name: 'twitter:image:height', content: '512' },
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
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/vue-cool-lightbox.client.js',
    '@/plugins/infinite-scroll.client.js',
    '@/plugins/helpers',
    '@/plugins/axios.js',
    '@/plugins/ga.client.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
    '@nuxtjs/laravel-echo',
  ],

  echo: {
    broadcaster: 'socket.io',
    host:
      process.env.NODE_ENV === 'production'
        ? 'https://api.gasome.com'
        : 'http://api.gasome.com:6001',
    authEndpoint: 'https://api.gasome.com/broadcasting/auth',
    authModule: true,
    path: process.env.NODE_ENV === 'production' ? '/ws/socket.io' : '',
    connectOnLogin: true,
    disconnectOnLogout: true,
    plugins: ['@/plugins/echo'],
    forceTLS: false,
  },

  moment: {
    timezone: true,
  },

  tailwindcss: {
    config: {
      plugins: [
        require('tailwindcss-dark-mode')(),
        require('@tailwindcss/aspect-ratio'),
      ],
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
        extend: {
          colors: {
            'content-bg': '#161719',
          },
        },
        fontSize: {
          '2xs': '.65rem',
          xs: '.75rem',
          sm: '.875rem',
          tiny: '.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
          '6xl': '3.75rem',
          '7xl': '4.5rem',
          '8xl': '6rem',
          '9xl': '8rem',
        },
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
    fallback: 'dark',
    storageKey: 'mode',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/i18n',
  ],
  //i18n config
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-EN',
        file: 'en.js',
      },
      {
        name: 'Türkçe',
        code: 'tr',
        iso: 'tr-TR',
        file: 'tr.js',
      },
    ],
    langDir: 'language/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },

  // runtime config
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    axios: {
      browserBaseURL: process.env.API_URL,
    },
  },
  privateRuntimeConfig: {
    apiId: process.env.CLIENT_ID,
    apiSecret: process.env.CLIENT_SECRET,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: process.env.API_URL,
  },

  proxy: {
    '/api/': {
      target: process.env.API_URL,
      pathRewrite: { '^/api/': '' },
      secure: false,
      changeOrigin: true,
    },
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          // autoFetch: false,
        },
        endpoints: {
          login: { url: '/api/oauth/token', method: 'post' },
          logout: false,
          user: { url: '/api/user', method: 'get' },
        },
      },
    },
  },

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
