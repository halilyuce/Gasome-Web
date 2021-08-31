require('dotenv').config()
export default {
  ssr: false,
  router: {
    base: '/',
    middleware: ['auth'],
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
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/vue-cool-lightbox.client.js',
    '@/plugins/helpers',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
  ],

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
  ],

  // runtime config
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
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
