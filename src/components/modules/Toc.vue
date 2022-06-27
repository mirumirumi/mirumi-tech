<template>
  <div class="toc">
    <h3 class="widget_title">
      Contents
    </h3>
    <div class="toc_body">
      <ul class="h2">
        <li v-for="tocItem in tocItems" class="h2" :key="tocItem.innerText">
          <template v-if="!Array.isArray(tocItem)">
            <NuxtLink :to="`${router.currentRoute.value.fullPath}#${tocItem.innerText}`">
              {{ tocItem.innerText }}
            </NuxtLink>
          </template>
          <template v-else>
            <ul class="h3">
              <li v-for="h3s in tocItem" class="h3" :key="h3s.innerText">
                <template v-if="!Array.isArray(h3s)">
                  <NuxtLink :to="`${router.currentRoute.value.fullPath}#${h3s.innerText}`">
                    {{ h3s.innerText }}
                  </NuxtLink>
                </template>
                <template v-else>
                  <ul class="h4">
                    <li v-for="h4s in h3s" class="h4" :key="h4s.innerText">
                      <NuxtLink :to="`${router.currentRoute.value.fullPath}#${h4s.innerText}`">
                        {{ h4s.innerText }}
                      </NuxtLink>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const p = defineProps<{
  html: string,
}>()

const tocItems = ref<any>([])  // 😠
const heads = [...p.html.matchAll(/<h[234].*?>(.*?)<\/h[234]>/gmi)]

for (let i = 0; i < heads.length; i++) {
  const _depth = heads[i][0].slice(1, 3) as "h2" | "h3" | "h4"

  if (_depth === "h2") {
    tocItems.value.push({
      depth: _depth,
      innerText: heads[i][1],
    })
  } else if (_depth === "h3") {
    if (heads[i - 1][0].slice(1, 3) === "h2") {  // it's safe to assume the first cant be `h3`
      tocItems.value.push(Array())
    }

    tocItems.value.at(-1).push({
      depth: _depth,
      innerText: heads[i][1],
    })
  } else if (_depth === "h4") {
    if (heads[i - 1][0].slice(1, 3) === "h3") {
      tocItems.value.at(-1).push(Array())
    }

    tocItems.value.at(-1).at(-1).push({
      depth: _depth,
      innerText: heads[i][1],
    })
  }
}
</script>

<style lang="scss" scoped>
.toc {
  .widget_title {
    color: #6d6a65;
  }
  .toc_body {
    max-height: calc(100vh - 380px) !important;
    padding-right: 17px;
    font-size: 0.8em;
    overflow-y: auto;
    a {
      text-decoration: none;
    }
    ul.h2 {
      li.h2 {
        line-height: 1.8;
        a {
          color: #525252;
          font-weight: bold;
          transition: 0.1s;
        }
        ul.h3 {
          margin: 0.3em auto 1em;
          padding-left: 1.3em;
          li.h3 {
            line-height: 1.55;
            a {
              color: #9a9a9a;
              font-size: 0.95em;
              font-weight: bold;
            }
            ul.h4 {
              margin: 0.3em auto 1em;
              padding-left: 1.3em;
              li.h4 {
                line-height: 1.4;
                a {
                  color: #878787;
                  font-size: 0.93em;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
