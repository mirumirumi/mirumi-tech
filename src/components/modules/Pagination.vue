<template>
  <div v-if="PAGE_ITEMS < count" class="pagination">
    <Head>
      <Link rel="prev" v-if="1 < _page" :href="prevlLink" />
      <Link rel="next" v-if="_page < pageCount" :href="nextLink" />
    </Head>

    <NuxtLink v-if="1 < _page" :to="{ query: { page: _page - 1 } }" class="arrow prev">
      <PartsSvgIcon :icon="'arrow_left'" :color="'#727272'" :dark="'var(--color-text)'" />
    </NuxtLink>
    <template v-if="_page === 1">
      <div class="page_latest current">
        {{ 1 }}
      </div>
    </template>
    <template v-else>
      <NuxtLink :to="{ query: { _page: 1 } }" class="page_latest">
        {{ 1 }}
      </NuxtLink>
    </template>
    <div v-if="LINKS_TO_SHOW <= _page" class="tententen">
      <PartsSvgIcon :icon="'tententen'" :color="'#727272'" :dark="'var(--color-text)'" />
    </div>

    <template v-for="x in BEFORE_AND_AFTER.slice().reverse()">
      <NuxtLink v-if="1 < _page - x" :to="{ query: { page: _page - x } }">
        {{ _page - x }}
      </NuxtLink>
    </template>
    <div v-if="_page !== 1 && _page !== pageCount" class="current">
      {{ _page }}
    </div>      
    <template v-for="x in BEFORE_AND_AFTER">
      <NuxtLink v-if="_page + x < pageCount" :to="{ query: { page: _page + x } }">
        {{ _page + x }}
      </NuxtLink>
    </template>

    <div v-if="_page <= pageCount - (LINKS_TO_SHOW - 1)" class="tententen">
      <PartsSvgIcon :icon="'tententen'" :color="'#727272'" :dark="'var(--color-text)'" />
    </div>
    <template v-if="_page === pageCount">
      <div class="page_oldest current">
        {{ pageCount }}
      </div>
    </template>
    <template v-else>
      <NuxtLink :to="{ query: { page: pageCount } }" class="page_oldest">
        {{ pageCount }}
      </NuxtLink>
    </template>
    <NuxtLink v-if="_page < pageCount" :to="{ query: { page: _page + 1 } }" class="arrow next">
      <PartsSvgIcon :icon="'arrow_right'" :color="'#727272'" :dark="'var(--color-text)'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import secret from "@/secrets"

const p = defineProps<{
  page: number,
  count: number,
}>()

const router = useRouter()

const PAGE_ITEMS = 13
const LINKS_TO_SHOW = 5  // only odd
const BEFORE_AND_AFTER = [...Array((LINKS_TO_SHOW - 1) / 2).keys()].map((x) => x + 1)

const _page = ref(p.page)
const { page } = toRefs(p)
const pageCount = Math.ceil(p.count / PAGE_ITEMS)

watch(page, () => {
  _page.value = p.page
})

/**
 * generate link urls
 */
const original = secret.ORIGIN + (router.currentRoute.value.path === "/" ? "" : router.currentRoute.value.path)

const prevlLink = computed(() => {
  if (p.page === 2)
    return original
  else
    return original + `?page=${p.page - 1}`
})

const nextLink = computed(() => {
  return original + `?page=${p.page + 1}`
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
.dark {
  .pagination {
    > * {
      color: var(--color-text);
      &:hover {
        background-color: #747270;
      }
    }
    a {
      color: var(--color-text);
    }
    .current {
      background-color: #747270
    }
  }
}
</style>
