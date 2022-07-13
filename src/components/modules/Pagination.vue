<template>
  <div class="pagination">
    <Head>
      <template v-if="1 < page">
        <Link rel="prev" v-if="page === 2" :href="`${originalLink}`" />
        <Link rel="prev" v-else :href="`${originalLink}/page/${page - 1}`" />
      </template>
      <Link rel="next" v-if="page < pageCount" :href="`${originalLink}/page/${page + 1}`" />
    </Head>

    <NuxtLink v-if="1 < page" :to="`${originalLink}/page/${page - 1}`" class="arrow prev">
      <PartsSvgIcon :icon="'arrow_left'" :color="'#727272'" />
    </NuxtLink>
    <template v-if="page === 1">
      <div class="page_latest current">
        {{ 1 }}
      </div>
    </template>
    <template v-else>
      <NuxtLink :to="`${originalLink}/page/1`" class="page_latest">
        {{ 1 }}
      </NuxtLink>
    </template>
    <div v-if="LINKS_TO_SHOW <= page" class="tententen">
      <PartsSvgIcon :icon="'tententen'" :color="'#727272'" />
    </div>

    <template v-for="x in BEFORE_AND_AFTER.slice().reverse()">
      <NuxtLink v-if="1 < page - x" :to="`${originalLink}/page/${page - x}`">
        {{ page - x }}
      </NuxtLink>
    </template>
    <div v-if="page !== 1 && page !== pageCount" class="current">
      {{ page }}
    </div>      
    <template v-for="x in BEFORE_AND_AFTER">
      <NuxtLink v-if="page + x < pageCount" :to="`${originalLink}/page/${page + x}`">
        {{ page + x }}
      </NuxtLink>
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
      <NuxtLink :to="`${originalLink}/page/${pageCount}`" class="page_oldest">
        {{ pageCount }}
      </NuxtLink>
    </template>
    <NuxtLink v-if="page < pageCount" :to="`${originalLink}/page/${page + 1}`" class="arrow next">
      <PartsSvgIcon :icon="'arrow_right'" :color="'#727272'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import secret from "@/secrets/export"

defineProps<{
  page: number,
}>()

const router = useRouter()

const PAGE_ITEMS = 13
const LINKS_TO_SHOW = 5  // only odd
const BEFORE_AND_AFTER = [...Array((LINKS_TO_SHOW - 1) / 2).keys()].map((x) => x + 1)

const { data: postCount } = await useFetch<number>(`/api/get-post-count`)
const pageCount = Math.ceil(postCount.value / PAGE_ITEMS)

const originalLink = computed(() => {
  return secret.ORIGIN + (router.currentRoute.value.path === "/" ? "" : router.currentRoute.value.path.replace(/\/page\/\d+/gmi, ""))
})
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
