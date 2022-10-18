<template>
  <div class="sidebar_wrap" ref="sidebar_wrap">
    <aside class="ad" ref="insads">
      <ClientOnly>
        <ins
          class="adsbygoogle"
          style="display: inline-block; width: 300px; height: 250px;"
          data-ad-client="ca-pub-2873410957106428"
          data-ad-slot="8481345159"
          data-ad-format="rectangle"></ins>
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

const insads = ref()

onMounted(() => {
  while (insads.value.firstChild) { insads.value.removeChild(insads.value.firstChild) }
    
  // @ts-ignore
  (adsbygoogle = window.adsbygoogle || []).push({});
})
</script>

<style lang="scss" scoped>
.sidebar_wrap {
  position: sticky;
  top: 6px;
  width: var(--width-sidebar);
  height: 100vh;  // use primitive value to prevent AdSense from overriding parent styles
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
