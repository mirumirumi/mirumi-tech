<template>
  <div class="theme_switch">
    <PartsToggleSwitchForTheme :value="isDark" :switchName="'theme'" @theme="onChange" />
  </div>
</template>

<script setup lang="ts">
import Cookies from "js-cookie"

const isDark = ref(false)
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

  const mqDark = ref(window.matchMedia("(prefers-color-scheme: dark)"))

  if (!mqDark.value) {
    toLight()
  } else {
    toDark()
  }
})

function toLight(): void {
  isDark.value = false
  document.getElementsByTagName("html")[0].classList.remove("darkmode")
}

function toDark(): void {
  isDark.value = true
  document.getElementsByTagName("html")[0].classList.add("darkmode")
}
</script>

<style lang="scss" scoped>
.theme_switch {
  display: flex;
  align-items: center;
}
</style>
