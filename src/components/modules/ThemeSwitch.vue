<template>
  <div class="theme_switch">
    <PartsToggleSwitchForTheme :value="isDark" :switchName="'theme'" @theme="onChange" />
  </div>
</template>

<script setup lang="ts">
const isDark = ref(false)
const history = useCookie<string>("theme")
const theme = useState<string>("theme", () => "")

const onChange = (value: any) => {
  isDark.value = value

  switchTheme(isDark.value)

  if (!isDark.value) {
    history.value = "light"
  } else {
    history.value = "dark"
  }
}

onMounted(() => {
  if (history.value) {
    history.value === "light" ? toLight() : toDark()
    return
  }

  isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches

  switchTheme(isDark.value)
})

watch(isDark, () => {
  switchTheme(isDark.value)
})

function switchTheme(isDark: boolean): void {
  if (!isDark) {
    toLight()
  } else {
    toDark()
  }  
}

onMounted(async () => {
  while (true) {
    if (history.value)
      return

    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    switchTheme(isDark.value)
    
    await delay(5000)
  }
})

function toLight(): void {
  isDark.value = false
  theme.value = "light"
  document.getElementsByTagName("html")[0].classList.remove("dark")
}

function toDark(): void {
  isDark.value = true
  theme.value = "dark"
  document.getElementsByTagName("html")[0].classList.add("dark")
}
</script>

<style lang="scss" scoped>
.theme_switch {
  display: flex;
  align-items: center;
}
</style>
