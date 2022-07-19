<template>
  <div class="tooltip" :class="{ 'auto_width': isAutoWidth, 'ws_normal': isDecidedWidth, 'above': isAbove, 'below': isBelow }" :id="uuid">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid"

const p = defineProps<{
  position: "above" | "below",
  shift: string,
}>()

const MAX_WIDTH = 200

const uuid = uuidv4()
const width = ref("")
const height = ref("")
const isAbove = ref(false)
const isBelow = ref(false)
const isDecidedWidth = ref(false)

onMounted(() => {
  const renderedWidth = (document.getElementById(uuid) as HTMLElement).offsetWidth + 1  // roundup

  if (MAX_WIDTH <= renderedWidth) {
    width.value = MAX_WIDTH.toString() + "px"
  } else {
    width.value = renderedWidth.toString() + "px"
  }

  isDecidedWidth.value = true

  height.value = p.shift

  if (p.position === "above") {
    isAbove.value = true
  } else {  // "below"
    isBelow.value = true
  }
})

const isAutoWidth = computed(() => {
  return !width.value.includes("undefined")
})
</script>

<style lang="scss" scoped>
.tooltip {
  --tooltip-bg-color: #434343;

  position: absolute;
  display: inline-block;
  width: auto;
  padding: 0.25em 1.3em 0.35em;
  color: var(--color-text-white);
  font-size: 0.65em;
  text-align: center;
  text-decoration: none;
  border-radius: 7px;
  background-color: var(--tooltip-bg-color);
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.17);
  white-space: nowrap;
  z-index: 1;
  &.above {
    bottom: v-bind(height);
    &::before {
      content: "";
      position: absolute;
      display: inline-block;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-top-color: var(--tooltip-bg-color);
    }
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      border: 7px solid transparent;
      border-top-color: var(--tooltip-bg-color);
    }
  }
  &.below {
    top: v-bind(height);
    &::before {
      content: "";
      position: absolute;
      display: inline-block;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      border: 7px solid transparent;
      border-bottom-color: var(--tooltip-bg-color);
    }
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-bottom-color: var(--tooltip-bg-color);
    }
  }
  &.auto_width {
    width: v-bind(width);
  }
  &.ws_normal {
    white-space: normal;
  }
}
.dark {
  * {
    --tooltip-bg-color: #e3e3e3;
  }
}
</style>
