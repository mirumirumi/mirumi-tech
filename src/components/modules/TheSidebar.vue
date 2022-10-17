<template>
  <div class="sidebar_wrap" ref="sidebar_wrap">
    <aside class="ad">
      <ClientOnly>
        <ins 
          v-once
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
import { delay } from "@/lib/utils"

defineProps<{
  html: string,
}>()

const sidebar_wrap = ref()

onMounted(async () => {
  await delay(1111)
  sidebar_wrap.value.style.height = "calc(100vh - 13px * 2)"
})
</script>

<style lang="scss" scoped>
.sidebar_wrap {
  position: sticky;
  top: 6px;
  width: var(--width-sidebar);
  height: calc(100vh - 13px * 2);
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
