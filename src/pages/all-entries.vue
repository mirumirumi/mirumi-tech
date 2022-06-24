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

const postLinks = ref<Array<PostLink>>()




postLinks.value = [{
  slag: "slag1",
  title: "Python で TypeScript の interface のように辞書オブジェクトの型定義を手軽に行う",
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
}, {
  slag: "slag1",
  title: "Vue.js の状態管理ライブラリ Pinia の使い方まとめ",
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
}]





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
          }
        }
      }
    }
  }
}
</style>
