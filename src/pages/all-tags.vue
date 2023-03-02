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
          <li v-for="tag in tags" :key="tag.tag">
            <NuxtLink :to="`/tags/${tag.search_tag}`">
              {{ tag.tag }}
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
import { SITE_FULL_PATH, SITE_CREATED_AT, Tag } from "@/utils/defines"
import secret from "@/secrets"

const router = useRouter()

const { data } = await useFetch(`/get-all-tags`, {
  baseURL: secret.API_BASE_URL,
  headers: {
    Authorization: secret.API_KEY,
  },
})
const tags = ref(data.value as Tag[])

usePageInfo({
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
        @include mobile {
          padding-left: 3em !important;
        }
      }
    }
  }
}
</style>
