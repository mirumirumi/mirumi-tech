<template>
  <div id="app">
    <ModulesTheHeader />
    <NuxtLoadingIndicator :height="2.9" :duration="1777" :color="'#bb7c1f'" :throttle="199" />
    <NuxtPage id="container" />
    <ModulesTheFooter />
    <div id="script1"></div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

onMounted(async () => {
  if (router.currentRoute.value.name !== "slag") return

  const script1 = document.getElementById("script1") as HTMLDivElement

  const src1 = document.createElement("script")
  src1.defer = true
  src1.crossOrigin = "anonymous"
  src1.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873410957106428"
  script1.appendChild(src1)
})
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  #container {
    width: var(--width-max-screen);
    margin: 0 auto;
    padding: 0.7em 0.5em 1em;
    @include tablet {
      width: 100%;
    }
    @include mobile {
      width: 100%;
      padding: 1.7em 0.87em 1em;
    }
  }
}
</style>
