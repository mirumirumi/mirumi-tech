<template>
  <div class="pagination">
    <Head>
      <Link rel="prev" v-if="1 < page" :href="prevlLink" />
      <Link rel="next" v-if="page < pageCount" :href="movePage(page + 1)" />
    </Head>

    <a v-if="1 < page" :href="prevlLink" class="arrow prev">
      <PartsSvgIcon :icon="'arrow_left'" :color="'#727272'" />
    </a>
    <template v-if="page === 1">
      <div class="page_latest current">
        {{ 1 }}
      </div>
    </template>
    <template v-else>
      <a :href="latestLink" class="page_latest">
        {{ 1 }}
      </a>
    </template>
    <div v-if="LINKS_TO_SHOW <= page" class="tententen">
      <PartsSvgIcon :icon="'tententen'" :color="'#727272'" />
    </div>

    <template v-for="x in BEFORE_AND_AFTER.slice().reverse()">
      <a v-if="1 < page - x" :href="movePage(page - x)">
        {{ page - x }}
      </a>
    </template>
    <div v-if="page !== 1 && page !== pageCount" class="current">
      {{ page }}
    </div>      
    <template v-for="x in BEFORE_AND_AFTER">
      <a v-if="page + x < pageCount" :href="movePage(page + x)">
        {{ page + x }}
      </a>
    </template>

    <div v-if="page <= pageCount - (LINKS_TO_SHOW - 1)" class="tententen">
      <PartsSvgIcon :icon="'tententen'" :color="'#727272'" />
    </div>
    <template v-if="page === pageCount">
      <div class="page_oldest current">
        {{ pageCount }}
      </div>
    </template>
    <template v-else>
      <a :href="movePage(pageCount)" class="page_oldest">
        {{ pageCount }}
      </a>
    </template>
    <a v-if="page < pageCount" :href="movePage(page + 1)" class="arrow next">
      <PartsSvgIcon :icon="'arrow_right'" :color="'#727272'" />
    </a>
  </div>
</template>

<script setup lang="ts">
import secret from "@/secrets"

const p = defineProps<{
  page: number,
}>()

const router = useRouter()

const PAGE_ITEMS = 13
const LINKS_TO_SHOW = 5  // only odd
const BEFORE_AND_AFTER = [...Array((LINKS_TO_SHOW - 1) / 2).keys()].map((x) => x + 1)

const { data: postCount } = await useFetch<number>(`/get-post-count`)
const pageCount = Math.ceil(postCount.value / PAGE_ITEMS)

/**
 * generate link urls
 */
const original = secret.ORIGIN + (router.currentRoute.value.path === "/" ? "" : router.currentRoute.value.path)

const latestLink = computed(() => {
  return original + `?page=1`
})

const prevlLink = computed(() => {
  if (p.page === 2)
    return original
  else
    return original + `?page=${p.page - 1}`
})

const movePage = (page: number): string => {
  return original + `?page=${page}`
}
</script>

<style lang="scss" scoped>
.pagination {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2.3em 0 1em;
  > * {
    display: flex;
    justify-content: center;
    width: 46px;
    height: 45.5px;
    margin: 0 0.3em;
    color: #727272;
    font-size: 0.95em;
    font-weight: bold;
    line-height: 44.4px;
    border-radius: 50%;
    transition: 0.23s all ease-out;
    &:hover {
      background-color: #f5efeb;
    }
  }
  a {
    color: #727272;
    text-decoration: none;
  }
  .arrow {
    svg {
      width: 0.5em;
    }
  }
  .current {
    background-color: #f5efeb;
    pointer-events: none;
    &:hover {
      background-color: transparent;
    }
  }
  .tententen {
    svg {
      width: 0.7em;
    }
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
