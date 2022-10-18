<template>
  <div id="app">
    <Head>
      <Script defer crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873410957106428"></Script>
    </Head>
    <ModulesTheHeader />
    <NuxtLoadingIndicator :height="2.9" :duration="1777" :color="'#bb7c1f'" :throttle="199" />
    <NuxtPage id="container" />
    <ModulesTheFooter />
  </div>
</template>

<script setup lang="ts">
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
