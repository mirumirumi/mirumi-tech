<template>
  <div class="theme_switch">
    <PartsToggleSwitchForTheme :value="false" :switchName="'theme'" @theme="onChange" />
  </div>
</template>

<script setup lang="ts">
import {  } from "@/lib/utils"
import {  } from "@/lib/defines"

/* default value: light (= false) */



const onChange = () => {

}


</script>

<style lang="scss" scoped>
.theme_switch {
  display: flex;
  align-items: center;
  
}
</style>
