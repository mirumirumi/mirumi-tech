<template>
  <div class="post_id_view">
    <main>
      <article>
        <header>
          <h1>
            {{ post.title }}
          </h1>
          <div class="meta">
            <div class="created_at">
              <PartsSvgIcon :icon="'edit'" :color="'#9e9e9e'" />
              <time :datetime="datetime(post.createdAt)">{{ post.createdAt }}</time>
            </div>
            <div class="updated_at">
              <PartsSvgIcon :icon="'update'" :color="'#9e9e9e'" />
              <time :datetime="datetime(post.updatedAt)">{{ post.updatedAt }}</time>
            </div>
          </div>
          <div class="tags">
            <NuxtLink :to="`/tags/${tag}`" v-for="tag in post.tags" :key="tag">
              {{ tag }}
            </NuxtLink>
          </div>
        </header>
        <div id="content" v-html="post.html">
        </div>
        <footer>
          <!-- (｡･ڡ･｡) -->
        </footer>
      </article>
    </main>
    <ModulesTheSidebar :html="post.html" />
    <Body>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/plugins/autoloader/prism-autoloader.min.js"></Script>
    </Body>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, PostData } from "@/lib/defines"
import { zeroPadding } from "@/lib/utils"
import Prism from "prismjs"
import m2h from "@/lib/markdown-to-html"

const router = useRouter()

onMounted(() => {
  Prism.manual = true
  Prism.highlightAll()
})








const post: PostData = {
  title: "Vue.js の状態管理ライブラリ Pinia の使い方まとめ",
  createdAt: "2022/4/15",
  updatedAt: "2022/12/9",
  tags: ["Vue.js", "TypeScript"],
  html: m2h(markdown),
}







const datetime = (datetime: string) => {
  return `${datetime.slice(0, 4)}-${zeroPadding(Number(datetime.replace(/\d{4}\/(\d\d*)\/.*?$/gmi, "$1")), 2)}-${zeroPadding((Number(datetime.replace(/\d{4}\/\d\d*\/(.*?)$/gmi, "$1"))), 2)}`
}

useSetMeta({
  title: post.title,
  description: generateMetaDescription(post.html),
  keywords: post.tags.join(","),
  url: SITE_FULL_PATH + "/" + router.currentRoute.value.params.postId,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
})

function generateMetaDescription(html: string): string {
  return html.replace(/(<.*?>|\n|^\n)/gmi, "").replace(/<h[234].*?>.*?<\/h[234]>/gmi, "").slice(0, 100)  // https://regex101.com/r/ke1Ymn/1
}
</script>

<style lang="scss" scoped>
.post_id_view {
  display: flex;
  main {
    width: calc(100% - 331px);
    padding: 0px 47.5px;
    article {
      header {
        h1 {
          margin: 0.888rem 0 0.7rem;
          font-size: 1.444em;
          font-weight: bold;
          line-height: 1.25;
        }
        .meta {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.23em;
          margin-bottom: 0.111em;
          color: #9e9e9e;
          font-size: 0.7em;
          font-weight: bold;
          .created_at, .updated_at {
            position: relative;
            svg {
              top: 1.7px;
              transform: scale(0.95);
            }
            time {
              display: inline-block;
              margin-left: 1.3em;
            }
          }
        }
        .tags {
          a {
            display: inline-block;
            margin-right: 0.7em;
            color: #9e9e9e;
            font-size: 0.777em;
            text-decoration: none;
            word-break: break-all;
            transition: all 0.23s ease-in-out;
            &:hover {
              color: #c27c3e;
              text-decoration: underline;
            }
            &::after {
              content: ",";
              display: inline-block;
              margin: auto 0em auto 0.1em;
              font-family: "Open Sans";
            }
            &:last-child::after {
              content: none;
            }
          }
        }
      }
    }
  }
}
</style>
