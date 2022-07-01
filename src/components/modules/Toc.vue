<template>
  <div class="toc">
    <h3 class="widget_title">
      Contents
    </h3>
    <div class="toc_body">
      <ul class="h2">
        <li v-for="tocItem in tocItems" class="h2" :class="{ 'highlight': tocItem.isHighlight }" :key="tocItem.innerText">
          <template v-if="!Array.isArray(tocItem)">
            <a :href="`#${tocItem.link}`">
              {{ tocItem.innerText }}
            </a>
          </template>
          <template v-else>
            <ul class="h3">
              <li v-for="h3s in tocItem" class="h3" :class="{ 'highlight': h3s.isHighlight }" :key="h3s.innerText">
                <template v-if="!Array.isArray(h3s)">
                  <a :href="`#${h3s.link}`">
                    {{ h3s.innerText }}
                  </a>
                </template>
                <template v-else>
                  <ul class="h4">
                    <li v-for="h4s in h3s" class="h4" :class="{ 'highlight': h4s.isHighlight }" :key="h4s.innerText">
                      <a :href="`#${h4s.link}`">
                        {{ h4s.innerText }}
                      </a>
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
import _ from "lodash"

const p = defineProps<{
  html: string,
}>()

/**
 * generate toc
 */
const tocItems = ref<any>([])  // 😠
const heads = [...p.html.matchAll(/<h[234].*?>(.*?)<\/h[234]>/gmi)]

for (let i = 0; i < heads.length; i++) {
  const _depth = heads[i][0].slice(1, 3) as "h2" | "h3" | "h4"

  if (_depth === "h2") {
    tocItems.value.push({
      depth: _depth,
      innerText: heads[i][1],
      link: encodeURI(heads[i][1]),
      isHighlight: false,
    })
  } else if (_depth === "h3") {
    if (heads[i - 1][0].slice(1, 3) === "h2") {  // it's safe to assume the first cant be `h3`
      tocItems.value.push(Array())
    }

    tocItems.value.at(-1).push({
      depth: _depth,
      innerText: heads[i][1],
      link: encodeURI(heads[i][1]),
      isHighlight: false,
    })
  } else if (_depth === "h4") {
    if (heads[i - 1][0].slice(1, 3) === "h3") {
      tocItems.value.at(-1).push(Array())
    }

    tocItems.value.at(-1).at(-1).push({
      depth: _depth,
      innerText: heads[i][1],
      link: encodeURI(heads[i][1]),
      isHighlight: false,
    })
  }
}

/**
 * auto adulation highlight
 * (just highlight the `h` elem that comes to the center of the viewport (1/3~2/3), power equality whether it comes from the top or the bottom)
 */
const CENTER_START = window.innerHeight / 3
const CENTER_END = CENTER_START * 2

onMounted(() => {
  const headings = document.getElementsByClassName("toc_item")

  // if the first heading is not caught by the trigger, highlight it first
  const theFirst = headings[0]
  if (theFirst.getBoundingClientRect().top < CENTER_START) {
    tocItems.value[0].isHighlight = true
  }

  // in normal case
  window.addEventListener("scroll", () => {
    for (const heading of headings) {
      if (isSeenCenter(heading)) {
        const index = Number((heading as HTMLElement).dataset.tocIndex)

        highlight(index)
      }
    }
  })
})

function isSeenCenter(elem: Element): boolean {
  const { top, bottom } = elem.getBoundingClientRect()
  return CENTER_START <= top && bottom <= CENTER_END
}

function highlight(index: number): void {
  let progres = 1
  let i = 0
  let j = 0
  let k = 0

  while (progres <= index) {
    if (!_.isArray(tocItems.value[i])) {
      if (progres === index) {
        disableHighlightAll(); tocItems.value[i].isHighlight = true; return
      }
      progres++; i++
    } else {
      if (!tocItems.value[i][j]) {
        i++; j = 0; continue
      }
      if (!_.isArray(tocItems.value[i][j])) {
        if (progres === index) {
          disableHighlightAll(); tocItems.value[i][j].isHighlight = true; return
        }
        progres++; j++
      } else {
        if (!tocItems.value[i][j][k]) {
          j++; k = 0; continue
        }
        if (progres === index) {
          disableHighlightAll(); tocItems.value[i][j][k].isHighlight = true; return
        }
        progres++; k++
      }
    }
  }
}

function disableHighlightAll(): void {
  for (const i of tocItems.value) {
    if (!_.isArray(i)) {
      i.isHighlight = false
    } else {
      for (const j of i) {
        if (!_.isArray(j)) {
          j.isHighlight = false
        } else {
          for (const k of j) {
            k.isHighlight = false
          }
        }
      }
    }
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
    padding: 0 17px 17px 0;
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
    li.highlight {
      background-color: #6d6a65;
    }
  }
}
</style>
