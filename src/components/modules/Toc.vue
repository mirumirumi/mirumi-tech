<template>
  <div v-if="1 <= tocItems.length" class="toc">
    <h3 class="widget_title">
      Contents
    </h3>
    <div class="toc_body">
      <ul class="h2">
        <li v-for="tocItem in tocItems" class="h2" :class="{ 'highlight': tocItem.isHighlight }" :data-index="tocItem.index" :key="tocItem.innerText">
          <template v-if="!Array.isArray(tocItem)">
            <a :href="`#${tocItem.link}`" @click="jump">
              {{ tocItem.innerText }}
            </a>
          </template>
          <template v-else>
            <ul class="h3">
              <li v-for="h3s in tocItem" class="h3" :class="{ 'highlight': h3s.isHighlight }" :data-index="h3s.index" :key="h3s.innerText">
                <template v-if="!Array.isArray(h3s)">
                  <a :href="`#${h3s.link}`" @click="jump">
                    {{ h3s.innerText }}
                  </a>
                </template>
                <template v-else>
                  <ul class="h4">
                    <li v-for="h4s in h3s" class="h4" :class="{ 'highlight': h4s.isHighlight }" :data-index="h4s.index" :key="h4s.innerText">
                      <a :href="`#${h4s.link}`" @click="jump">
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

const router = useRouter()

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
      index: i + 1,
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
      index: i + 1,
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
      index: i + 1,
    })
  }
}

/**
 * jump to the anchor
 */
const jump = (elem: Event | undefined, linkHash: string = "") => {
  disableHighlightAll()

  if (elem) {
    // for clicking toc links manually
    const target = (elem.target as HTMLElement)?.closest("li")
    const index = Number(target?.dataset.index)

    highlight(index)
  } else {
    // for on page loaded automatically
    const index = searchHasLinkHash(linkHash)

    highlight(index)
  }
}

/**
 * auto adulation highlight
 * (just highlight the `h` elem that comes to the center of the viewport (1/3~2/3), power equality whether it comes from the top or the bottom)
 */
onMounted(async () => {
  do {
    await delay(100)
  } while (!document.getElementById("content"))

  const CENTER_START = window.innerHeight / 3
  const CENTER_END = CENTER_START * 2

  const headings = document.getElementsByClassName("toc_item")

  // on page loaded (with hash link)
  const hash = router.currentRoute.value.hash
  if (hash) {
    jump(undefined, hash)
  }

  // on page loaded (in normal case)
  let centerElem
  try {
    centerElem = pickElemInTheContent()
  }
  catch (e) {
    console.error(e)
    return
  }
  
  if (centerElem) {
    if (/h\d/gmi.test(centerElem?.tagName)) {
      const index = Number((centerElem as HTMLElement).dataset.tocIndex)
  
      highlight(index)
    } else {
      // if center elem is not directly under of `#content`
      for (let i = 1; i < 111; i++) {  // 😠
        const parent: HTMLElement = centerElem.parentElement ?? document.getElementById("content") as HTMLElement

        if (parent.id !== "content")
          centerElem = parent
        else
          break
      }

      // search the closest `h` elem (above direction)
      for (let i = 0; i < (document.getElementById("content") as HTMLElement).childElementCount; i++) {
        if (!centerElem?.previousElementSibling)
          break

        centerElem = centerElem?.previousElementSibling

        if (/h\d/gmi.test(centerElem?.tagName))
          break
      }

      const index = Number((centerElem as HTMLElement).dataset.tocIndex)

      highlight(index)
    }
  }

  // register the scroll event
  window.addEventListener("scroll", () => {
    for (const heading of headings as unknown as Array<HTMLElement>) {  // ocurred after typescript@4.7.4 (2022/7/11) 
      if (isSeenCenter(heading, { CENTER_START, CENTER_END })) {
        const index = Number((heading as HTMLElement).dataset.tocIndex)

        highlight(index)
      }
    }
  })
})

function pickElemInTheContent(): Element | void {
  if (!document.getElementById("content")) {
    throw Error("no found `#content` in this page")
  }

  let initialY = window.innerHeight / 2
  while (1) {
    const picked = (document.elementFromPoint(theContentWidthCenter(), initialY) as Element)

    if (!picked.closest("#content")) {
      throw Error("picked element has no `#content` as parent")
    }

    if (picked.id === "content") {
      initialY = initialY - 3
    } else {
      return picked
    }
  }
}

function isSeenCenter(elem: Element, center: Record<string, number>): boolean {
  const { top, bottom } = elem.getBoundingClientRect()
  return center.CENTER_START <= top && bottom <= center.CENTER_END
}

function highlight(index: number): void {
  let progres = 1
  let i = 0
  let j = 0
  let k = 0

  while (progres <= index) {
    if (!_.isArray(tocItems.value[i])) {
      if (progres === index) {
        disableHighlightAll(); tocItems.value[i].isHighlight = true
        // @ts-ignore
        document.querySelector(`[data-index^="${index}"][data-index$="${index}"]`)?.scrollIntoViewIfNeeded()
        return
      }
      progres++; i++
    } else {
      if (!tocItems.value[i][j]) {
        i++; j = 0; continue
      }
      if (!_.isArray(tocItems.value[i][j])) {
        if (progres === index) {
          disableHighlightAll(); tocItems.value[i][j].isHighlight = true
          // @ts-ignore
          document.querySelector(`[data-index^="${index}"][data-index$="${index}"]`)?.scrollIntoViewIfNeeded()
          return
        }
        progres++; j++
      } else {
        if (!tocItems.value[i][j][k]) {
          j++; k = 0; continue
        }
        if (progres === index) {
          disableHighlightAll(); tocItems.value[i][j][k].isHighlight = true
          // @ts-ignore
          document.querySelector(`[data-index^="${index}"][data-index$="${index}"]`)?.scrollIntoViewIfNeeded()
          return
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

function theContentWidthCenter(): number {
  // there was no opinion on position is better among left and right, so put it in the middle (if hit `#content`, there is another workaround after this)
  return ((document.getElementById("content") as HTMLElement).getBoundingClientRect().left + (document.getElementById("content") as HTMLElement).getBoundingClientRect().right) / 2 
}

function searchHasLinkHash(linkHash: string): number {
  linkHash = encodeURI(linkHash).replace("#", "")

  for (const i of tocItems.value) {
    if (!_.isArray(i)) {
      if (i.link === linkHash) return i.index
    } else {
      for (const j of i) {
        if (!_.isArray(j)) {
          if (j.link === linkHash) return j.index
        } else {
          for (const k of j) {
            if (k.link === linkHash) return k.index
          }
        }
      }
    }
  }
  return 0
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
    li {
      margin: 0.2em auto;
      padding: 0.01em 0.37em 0.08em;
    }
    ul.h2 {
      li.h2 {
        line-height: 1.8;
        a {
          display: block;
          width: 100%;
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
              display: block;
              width: 100%;
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
                  display: block;
                  width: 100%;
                  color: #878787;
                  font-size: 0.93em;
                  font-weight: normal;
                }
              }
              @include tablet {
                padding-left: 0.5em;
              }
            }
          }
          @include tablet {
            padding-left: 0.5em;
          }
        }
      }
    }
    li.highlight,
    li:not(:has(ul)):hover {
      background-color: #f1ede7;
      border-radius: 5px;
    }
  }
}
.dark {
  .toc {
    .widget_title {
      color: #d2d2d2;
    }
    .toc_body {
      ul.h2 {
        li.h2 {
          a {
            color: #e7e7e7;
          }
          ul.h3 {
            li.h3 {
              a {
                color: #c6c6c6;
              }
              ul.h4 {
                li.h4 {
                  a {
                    color: #9b9b9b;
                  }
                }
              }
            }
          }
        }
      }
      li.highlight,
      li:not(:has(ul)):hover {
        background-color: #52514f;
      }
    }
  }
}
</style>
