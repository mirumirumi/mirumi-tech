<template>
  <div class="all_tags_view">
    <main class="single_column">
      <header>
        <h1>
          すべてのタグ
        </h1>
      </header>
      <div id="content">
        <ul>
          <li v-for="tag in tags" :key="tag">
            <NuxtLink :to="`/tags/${tag}`">
              {{ tag }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <footer>
        <!-- (｡･ڡ･｡) -->
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, SITE_CREATED_AT } from "@/lib/defines"
import { today } from "@/lib/utils"

const router = useRouter()
const config = useRuntimeConfig()

const { data: tags } = await useFetch(`get-all-tags`, {
  key: "get-all-tags",  // to silence error
  baseURL: config.baseURL,
  headers: {
    "x-api-key": config.key,
  },
  params: {},  // no cacheable
})

useSetMeta({
  title: "すべてのタグ",
  description: "mirumi.tech のすべてのタグ一覧です。",
  keywords: "みるめも,みるみ,blog,technology,programming,tags",
  url: SITE_FULL_PATH + "/" + router.currentRoute.value.path,
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
})
</script>

<style lang="scss" scoped>
.all_tags_view {
  main {
    #content {
      ul {
        li {
          margin: 0;
          line-height: 1.5;
          a {
            font-size: 0.88em;
          }
        }
      }
    }
  }
}
</style>
