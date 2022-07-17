<template>
  <div class="theme_switch">
    <PartsToggleSwitchForTheme :value="isDark" :switchName="'theme'" @theme="onChange" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store"
import { usePreferredDark  } from "@vueuse/core"
import Cookies from "js-cookie"

const store = useStore()

const isDark = ref(usePreferredDark())
const history = ref()

const onChange = (value: any) => {
  isDark.value = value

  if (!isDark.value) {
    toLight()
    Cookies.set("theme", "light", { expires: 30 })
  } else {
    toDark()
    Cookies.set("theme", "dark", { expires: 30 })
  }
}

onMounted(() => {
  history.value = Cookies.get("theme")
  if (history.value) {
    history.value === "light" ? toLight() : toDark()
    return
  }

  if (!isDark.value) {
    toLight()
  } else {
    toDark()
  }
})

watch(isDark, () => {
  if (!isDark.value) {
    toLight()
  } else {
    toDark()
  }
})

function toLight(): void {
  isDark.value = false
  store.theme = "light"
  document.getElementsByTagName("html")[0].classList.remove("dark")
}

function toDark(): void {
  isDark.value = true
  store.theme = "dark"
  document.getElementsByTagName("html")[0].classList.add("dark")
}
</script>

<style lang="scss" scoped>
.theme_switch {
  display: flex;
  align-items: center;
}
</style>
