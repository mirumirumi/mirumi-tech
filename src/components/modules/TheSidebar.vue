<template>
  <div class="sidebar_wrap" ref="sidebar_wrap">
    <Head>
      <Script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873410957106428"></Script>
    </Head>
    <aside class="ad">
      <ClientOnly>
        <ins 
          class="adsbygoogle"
          style="display: inline-block; width: 300px; height: 250px;"
          data-ad-client="ca-pub-2873410957106428"
          data-ad-slot="8481345159"
          data-ad-format="rectangle"></ins>
        <!-- <div ref="script2"></div> -->
      </ClientOnly>
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

const sidebar_wrap = ref()
const script2 = ref()

onMounted(() => {
  (adsbygoogle = window.adsbygoogle || []).push({});

  // const src2 = document.createElement("script")
  // src2.id = "src2"
  // src2.text = "(adsbygoogle = window.adsbygoogle || []).push({});"
  // script2.value.appendChild(src2)
})
</script>

<style lang="scss" scoped>
.sidebar_wrap {
  position: sticky;
  top: 6px;
  width: var(--width-sidebar);
  height: 100vh;
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
