<template>
  <div class="all_entries_view">
    <main class="single_column">
      <header>
        <h1>
          すべての記事
        </h1>
      </header>
      <div id="content">
        <ul>
          <li v-for="post in postLinks" :key="post.slag">
            <NuxtLink :to="`/${post.slag}`">
              {{ post.title }}
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
import { SITE_FULL_PATH, SITE_CREATED_AT, PostLink } from "@/lib/defines"
import { today } from "@/lib/utils"

const router = useRouter()
const config = useRuntimeConfig()

const { data: postLinks } = await useFetch<PostLink[]>(`get-top-indexes`, {
  key: "get-top-indexes",  // to silence error
  baseURL: config.baseURL,
  headers: {
    "x-api-key": config.key,
  },
  params: {},  // no cacheable
})

useSetMeta({
  title: "すべての記事",
  description: "mirumi.tech のすべての記事一覧です。",
  keywords: "みるめも,みるみ,blog,technology,programming,articles",
  url: SITE_FULL_PATH + "/" + router.currentRoute.value.path,
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
})
</script>

<style lang="scss" scoped>
.all_entries_view {
  main {
    #content {
      ul {
        li {
          margin: 0;
          line-height: 1.5;
          a {
            font-size: 0.88em;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
