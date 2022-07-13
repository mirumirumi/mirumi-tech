<template>
  <div class="index_view">
    <main class="single_column">
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
      <ModulesPagination :page="page" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, SITE_CREATED_AT, PostLink } from "@/lib/defines"
import { today } from "@/lib/utils"

const router = useRouter()
const page = ref(Number(router.currentRoute.value.query.page ?? 1))

const { data: postLinks } = await useFetch<PostLink[]>(`/get-top-indexes`, {
  params: {
    page: page.value,
  },
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
