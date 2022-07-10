<template>
  <div class="tag_name_view">
    <main class="single_column">
      <header>
        <h1>
          <PartsSvgIcon :icon="'tag'" :color="'#4e4e4e'" />
          <span>{{ tagName }}</span>
        </h1>
      </header>
      <ul class="posts">
        <li class="post" v-for="post in postLinks" :key="post.slag">
          <NuxtLink :to="`/${post.slag}`">
            <article>
              <h2>
                {{ post.title }}
              </h2>
              <div class="meta">
                <div class="created_at">
                  <PartsSvgIcon :icon="'edit'" :color="'#9e9e9e'" />
                  <span>{{ post.created_at }}</span>
                </div>
                <div class="updated_at">
                  <PartsSvgIcon :icon="'update'" :color="'#9e9e9e'" />
                  <span>{{ post.updated_at }}</span>
                </div>
              </div>
            </article>
          </NuxtLink>
        </li>
      </ul>    
    </main>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, SITE_CREATED_AT, PostLink } from "@/lib/defines"
import { today } from "@/lib/utils"

const router = useRouter()
const tagName = router.currentRoute.value.params.tagName

const postLinks = ref<Array<PostLink>>()






postLinks.value = [{
  slag: "slag1",
  title: "Python で TypeScript の interface のように辞書オブジェクトの型定義を手軽に行う",
  created_at: SITE_CREATED_AT,
  updated_at: today(),
}, {
  slag: "slag1",
  title: "Vue.js の状態管理ライブラリ Pinia の使い方まとめ",
  created_at: SITE_CREATED_AT,
  updated_at: today(),
}]







useSetMeta({
  title: tagName as string,
  description: `${tagName} のタグがついた記事一覧です。`,
  keywords: "みるめも,みるみ,blog,technology,programming,tag," + tagName,
  url: SITE_FULL_PATH + "/tags/" + tagName,
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
})
</script>

<style lang="scss" scoped>
.tag_name_view {
  main {
    header {
      h1 {
        position: relative;
        margin: 0 0 1.7em;
        svg {
          top: 5px;
          width: 0.9em;
        }
        span {
          margin-left: 1.5em;
        }
      }
    }
  }
}
</style>
