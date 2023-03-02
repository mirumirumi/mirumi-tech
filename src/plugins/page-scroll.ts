// // https://github.com/nuxt/framework/discussions/1661

export default defineNuxtPlugin((nuxtApp) => {
  // `page:finish` does not return savedPosition
  nuxtApp.hook("page:start", async () => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  })
})
