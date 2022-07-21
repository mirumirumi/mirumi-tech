<template>
  <div class="index_view">
    <main class="single_column">
      <TransitionGroup name="fade">
        <div v-if="isLoading" class="csr_loading">
          <PartsLoadSpinner :kind="'long'" />
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
      <ClientOnly>
        <ModulesPagination :page="page" :count="count" />
      </ClientOnly>
    </main>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, SITE_CREATED_AT, ResIndexesAPI } from "@/lib/defines"
import { friendlyDatetime, today } from "@/lib/utils"
import secret from "@/secrets"

const router = useRouter()
const page = ref(Number(router.currentRoute.value.query.page ?? 1))

const data = await $fetch<ResIndexesAPI>(`/get-top-indexes`, {
  baseURL: secret.API_BASE_URL,
  headers: {
    Authorization: secret.API_KEY,
  },
  params: {
    page: page.value,
  },
})

const postLinks = ref(data.items)
const count = ref(data.count)

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

    const data = await $fetch<ResIndexesAPI>(`/get-top-indexes`, {
      baseURL: secret.API_BASE_URL,
      headers: {
        Authorization: secret.API_KEY,
      },
      params: {
        page: page.value,
      },
    })
    postLinks.value = data.items

    isLoading.value = false
  }
})

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
</style>
