<template>
  <div class="index_view">
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
                <span>{{ post.createdAt }}</span>
              </div>
              <div class="updated_at">
                <PartsSvgIcon :icon="'update'" :color="'#9e9e9e'" />
                <span>{{ post.updatedAt }}</span>
              </div>
            </div>
          </article>
        </NuxtLink>
      </li>
    </ul>    
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, SITE_CREATED_AT, PostLink } from "@/lib/defines"
import { today } from "@/lib/utils"

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
  title: "mirumi.tech",
  description: "みるみの技術ブログ",
  keywords: "みるめも,みるみ,blog,technology,programming",
  url: SITE_FULL_PATH,
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
})
</script>

<style lang="scss" scoped>
.index_view {
  .posts {
    width: 728px;
    margin: auto;
    .post {
      a {
        display: block;
        margin-bottom: 0.99em;
        padding: 1.5% 0 calc(1.5% + 1.1em) 7px;
        border-bottom: dotted 2.3px #e3deda;
        color: $text;
        text-decoration: none;
        article {
          h2 {
            margin: 0 0 0.5em 0;
            font-size: 0.95em;
            line-height: 1.4;
          }
          .meta {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.5em;
            color: #9e9e9e;
            font-size: 0.7em;
            .created_at, .updated_at {
              position: relative;
              svg {
                top: 2px;
                transform: scale(0.95);
              }
              span {
                display: inline-block;
                margin-left: 1.5em;
              }
            }
          }
        }
      }
    }
  }
}
</style>
