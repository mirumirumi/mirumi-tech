<template>
  <div id="app">
    <ClientOnly>
      <Head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873410957106428" crossorigin="anonymous"></Script>
      </Head>
    </ClientOnly>
    <ModulesTheHeader />
    <NuxtLayout>
      <NuxtLoadingIndicator :height="2.9" :duration="1777" :color="'#bb7c1f'" :throttle="199" />
      <NuxtPage id="container" />
    </NuxtLayout>
    <ModulesTheFooter />
    <div ref="ad"></div>
  </div>
</template>

<script setup lang="ts">
// app.vue acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page

// to allow route transitions between pages, a page must have a single route element (HTML comments are also considered elements)

const ad = ref()

onMounted(() => {
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.text = "(adsbygoogle = window.adsbygoogle || []).push({});"

  ad.value.appendChild(script)
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
