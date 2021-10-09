const prefix = '/api/'

export default function ({ app, $axios }) {
  $axios.onRequest((config) => {
    let lang = app.i18n.getLocaleCookie()
    let locale = lang + '-' + lang.toUpperCase()

    if (locale) {
      $axios.setHeader('Accept-Language', locale)
    }

    // The proxy is disabled in prod mode => write own rewritePath here
    if (config.url.startsWith(prefix)) {
      config.url = config.url.replace(prefix, process.env.API_URL + '/')
    }

    return config
  })
}
