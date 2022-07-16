<template>
  <div id="app">
    <ModulesTheHeader />
    <NuxtLayout>
      <NuxtLoadingIndicator :height="2.9" :duration="1777" :color="'#bb7c1f'" :throttle="199" />
      <NuxtPage id="container" />
    </NuxtLayout>
    <ModulesTheFooter />
  </div>
</template>

<script setup lang="ts">
// app.vue acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page

// to allow route transitions between pages, a page must have a single route element (HTML comments are also considered elements)
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  #container {
    width: $max_screen_width;
    margin: 0 auto;
    padding: 0.7em 0.5em 1em;
    @include mobile {
      width: 100%;
      padding: 1.7em 0.87em 1em;
    }
  }
}
</style>
