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
import { SITE_FULL_PATH, SITE_CREATED_AT, ResIndexesAPI } from "@/lib/defines"
import { today } from "@/lib/utils"
import secret from "@/secrets"

const router = useRouter()

const { data } = await useFetch(`/get-top-indexes`, {
  baseURL: secret.API_BASE_URL,
  headers: {
    Authorization: secret.API_KEY,
  },
  params: {
    page: "all",
  },
})
const postLinks = ref((data.value as ResIndexesAPI).items)

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
