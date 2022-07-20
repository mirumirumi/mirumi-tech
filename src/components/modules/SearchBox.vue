<template>
  <div class="search_box">
    <input type="text" class="input" placeholder="Search for..." :id="uuid" 
      v-model="query"
      @keydown.enter.prevent="move"
    >
    <PartsSvgIcon :icon="'search'" :color="'#bbbbba'" @click="move" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid"

const p = defineProps<{
  query?: string,
}>()

const emit = defineEmits<{
  (e: "closeSearchBox"): void,
}>()

const router = useRouter()

const uuid = uuidv4()
const query = ref("")

onMounted(() => {
  if (router.currentRoute.value.path.includes("/search")) {
    query.value = p.query ?? ""
  } else if (query.value === "") {
    (document.getElementById(uuid) as HTMLElement).focus()  // 😠
  }
})

watch(p, () => {
  query.value = p.query ?? ""
})

const move = () => {
  router.push({ path: "/search", query: { q: query.value } })
  emit("closeSearchBox")
}
</script>

<style lang="scss" scoped>
.search_box {
  position: relative;
  width: 100%;
  height: 100%;
  input {
    padding: 0.395em 2em 0.355em 1.3em;
    line-height: 2.1;
    border: 1.9px solid #e5e5e5;
    border-radius: 31px;
  }
  svg {
    right: 1.7em;
    cursor: pointer;
  }
}
</style>
