export default function ({ store, req }) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  const isMobile = /mobile/i.test(userAgent)
  store.dispatch('setDevice', isMobile ? 'Mobile' : 'Desktop')
}
