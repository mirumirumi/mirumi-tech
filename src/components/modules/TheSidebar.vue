<template>
  <div class="sidebar_wrap" ref="sidebar_wrap">
    <Head>
      <Script crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873410957106428"></Script>
    </Head>
    <aside class="ad" ref="adaside">
      <div ref="adins"></div>
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

const sidebar_wrap = ref()
const adins = ref()
const adspush = ref()
const targetStyle = ref("calc(100vh - 13px * 2)")

onMounted(() => {
  const ins = document.createElement("ins") as HTMLElement
  ins.classList.value = "adsbygoogle"
  ins.style.display = "inline-block"
  ins.style.width = "300px"
  ins.style.height = "250px"
  ins.setAttribute("data-ad-client", "ca-pub-2873410957106428")
  ins.setAttribute("data-ad-slot", "8481345159")
  ins.setAttribute("data-ad-format", "rectangle")
  adins.value.appendChild(ins)
  
  const src = document.createElement("script") as HTMLScriptElement
  src.text = "(adsbygoogle = window.adsbygoogle || []).push({});"
  adspush.value.appendChild(src)

  // https://bit.ly/3MLZyCE
  const observer = new MutationObserver(() => {
    sidebar_wrap.value.style.height = targetStyle.value
  })
  observer.observe(sidebar_wrap.value, {
    attributes: true,
    attributeFilter: ["style"],
  })
})
</script>

<style lang="scss" scoped>
.sidebar_wrap {
  position: sticky;
  top: 6px;
  width: var(--width-sidebar);
  height: v-bind(targetStyle);
  padding: 13px 13px;
  .ad {
    height: 250px;
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
