<template>
  <div class="sidebar_wrap" ref="sidebar_wrap">
    <Head>
      <Script crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873410957106428"></Script>
    </Head>
    <aside class="ad">
      <ClientOnly>
        <ins
          class="adsbygoogle"
          style="display: inline-block; width: 300px; height: 250px;"
          data-ad-client="ca-pub-2873410957106428"
          data-ad-slot="8481345159"
          data-ad-format="rectangle"></ins>
      </ClientOnly>
      <div ref="adspush"></div>
    </aside>
    <aside class="toc">
      <ModulesToc :html="html" />
    </aside>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  html: string,
}>()

const adspush = ref()

onMounted(() => {
  const src = document.createElement("script") as HTMLScriptElement
  src.text = "(adsbygoogle = window.adsbygoogle || []).push({});"
  adspush.value.appendChild(src)  
})
</script>

<style lang="scss" scoped>
.sidebar_wrap {
  position: sticky;
  top: 6px;
  width: var(--width-sidebar);
  height: 263px !important;  // use primitive value to prevent AdSense from overriding parent styles (250px + 13px)
  padding: 13px 13px;
  .ad {
    height: 250px !important;
    ins.adsbygoogle[data-ad-status="unfilled"] {
      display: none !important;
    }
  }
  @include tablet {
    padding: 13px 0 13px 26px;
  }
  @include mobile {
    display: none;
  }
}
</style>
