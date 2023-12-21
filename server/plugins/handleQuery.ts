export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if (response.headers?.location?.includes('cfcache=')) {
      const host = 'https://emoji.6mzy.com'
      const url = new URL(response.headers.location, host)
      const params = new URLSearchParams(url.search)
      params.delete('cfcache')
      url.search = params.toString()
      response.headers.location = url.toString().replace(host, '')
      response.headers['Cache-Control'] = 'max-age=86400, must-revalidate'
    }
  })
})
