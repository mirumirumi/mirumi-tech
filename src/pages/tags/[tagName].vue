<template>
  <div class="tag_name_view">
    <main class="single_column">
      <header>
        <h1>
          <PartsSvgIcon :icon="'tag'" :color="'#4e4e4e'" :dark="'var(--color-text)'" />
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
      <ClientOnly>
        <ModulesPagination :page="page" :count="count" />
      </ClientOnly>
    </main>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, SITE_CREATED_AT, ResIndexesAPI } from "@/lib/defines"
import { today, friendlyDatetime } from "@/lib/utils"
import secret from "@/secrets"

const router = useRouter()
const tagName = ref(router.currentRoute.value.params.tagName as string)
const page = ref(Number(router.currentRoute.value.params.pageNumber ?? 1))

const data = ref<ResIndexesAPI>(await $fetch(`/get-tag-indexes`, {
  baseURL: secret.API_BASE_URL,
  headers: {
    Authorization: secret.API_KEY,
  },
  params: {
    tag: tagName.value,
    page: page.value,
  },
}))

const postLinks = ref(data.value.items)
const count = ref(data.value.count)

/**
 * CSR
 */
const isLoading = ref(false)

watch(router.currentRoute, async (new_, old_) => {
  if (
    new_.query.page !== old_.query.page 
    || (!new_.query.page && old_.query.page)
  ) {
    isLoading.value = true

    page.value = Number(new_.query.page ?? 1)

    const data: ResIndexesAPI = await $fetch(`/get-tag-indexes`, {
      baseURL: secret.API_BASE_URL,
      headers: {
        Authorization: secret.API_KEY,
      },
      params: {
        tag: tagName.value,
        page: page.value,
      },
    })
    postLinks.value = data.items

    isLoading.value = false
  }
})

useSetMeta({
  title: tagName.value,
  description: `${tagName.value} のタグがついた記事一覧です。`,
  keywords: "みるめも,みるみ,blog,technology,programming,tag," + tagName.value,
  url: SITE_FULL_PATH + "/tags/" + tagName.value,
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
