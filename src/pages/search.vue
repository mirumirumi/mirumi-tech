<template>
  <div class="search_view">
    <Head>
      <Meta name="robots" content="noindex" />
    </Head>
    <main class="single_column">
      <header>
        <h1>
          <PartsSvgIcon :icon="'search'" :color="'#4e4e4e'" :dark="'var(--color-text)'" />
          <span v-if="!isNoQuery">{{ query }}</span>
          <span v-else>検索キーワードを入力してください :)</span>
        </h1>
      </header>
      <ModulesSearchBox :query="(query as string)" />
      <TransitionGroup name="fade">
        <div v-if="isLoading" class="csr_loading">
          <PartsLoadSpinner :kind="'long'" />
        </div>
        <div v-else-if="postLinks.length === 0 && !isNoQuery" class="no_content">
          お探しの記事はまだ存在しないみたいです！
        </div>
        <ul v-else class="posts">
          <li class="post" v-for="post in postLinks" :key="post.slag">
            <NuxtLink :to="`/${post.slag}`">
              <article>
                <h2>
                  {{ post.title }}
                </h2>
                <div class="meta">
                  <div class="created_at">
                    <PartsSvgIcon :icon="'edit'" :color="'#9e9e9e'" />
                    <span>{{ friendlyDatetime(post.created_at) }}</span>
                  </div>
                  <div class="updated_at" v-if="post.updated_at">
                    <PartsSvgIcon :icon="'update'" :color="'#9e9e9e'" />
                    <span>{{ friendlyDatetime(post.updated_at) }}</span>
                  </div>
                </div>
              </article>
            </NuxtLink>
          </li>
        </ul>
      </TransitionGroup>
    </main>
  </div>
</template>

<script setup lang="ts">
// only one page, no pagination, no more load

import { SITE_FULL_PATH, SITE_CREATED_AT, PostLink } from "@/lib/defines"
import { friendlyDatetime, today } from "@/lib/utils"
import secret from "@/secrets"

const router = useRouter()
const query = ref(router.currentRoute.value.query.q ?? "")

const isNoQuery = computed(() => {
  return query.value === ""
})

const { data } = await useFetch(`/search-post`, {
  baseURL: secret.API_BASE_URL,
  headers: {
    Authorization: secret.API_KEY,
  },
  params: {
    query: query.value,
  },
})
const postLinks = ref(data.value as PostLink[])

/**
 * CSR
 */
const isLoading = ref(false)

watch(router.currentRoute, async (new_, old_) => {
  if (new_.query.q !== old_.query.q) {
    isLoading.value = true

    query.value = new_.query.q as string
  
    postLinks.value = await $fetch(`/search-post`, {
      baseURL: secret.API_BASE_URL,
      headers: {
        Authorization: secret.API_KEY,
      },
      params: {
        query: query.value,
      },
    })

    isLoading.value = false
  }
})

useSetMeta({
  title: query.value as string,
  description: `${query.value} を含む記事一覧です。`,
  keywords: "みるめも,みるみ,blog,technology,programming,search,",
  url: SITE_FULL_PATH + "/search",
  createdAt: SITE_CREATED_AT,
  updatedAt: today(),
})
</script>

<style lang="scss" scoped>
.search_view {
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
    .search_box {
      margin: -0.9em auto 2.5em;
    }
    .no_content {
      font-size: 0.9em;
      text-align: center;
    }
  }
}
</style>
