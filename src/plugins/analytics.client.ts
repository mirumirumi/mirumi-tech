import { defineNuxtPlugin } from "#app"
import VueGtag from "vue-gtag"

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()

  nuxtApp.vueApp.use(VueGtag, {
    appName: "mirumi.tech",
    pageTrackerScreenviewEnabled: true,
    config: { id: "G-E70FH0L09H" },
  }, router)
})
