<template>
  <div class="header_wrap">
    <header>
      <div class="site_logo">
        <NuxtLink to="/">
          <img src="/site-icon.png" alt="site-icon">
        </NuxtLink>
      </div>
      <ul class="menu">
        <li>
          <NuxtLink to="/all-entries" data-tooltip="all_entries" @mouseenter="hover" @mouseleave="hoverInterrupt">
            <PartsSvgIcon :icon="'entries'" :color="'#bbbbba'" />
          </NuxtLink>
          <Transition name="tooltip">
            <PartsTooltip :position="'below'" :shift="'47px'" v-if="isShownTtAe">
              すべての記事
            </PartsTooltip>
          </Transition>
        </li>
        <li>
          <NuxtLink to="/all-tags" data-tooltip="all_tags" @mouseenter="hover" @mouseleave="hoverInterrupt">
            <PartsSvgIcon :icon="'tags'" :color="'#bbbbba'" />
          </NuxtLink>
          <Transition name="tooltip">
            <PartsTooltip :position="'below'" :shift="'47px'" v-if="isShownTtAt">
              すべてのタグ
            </PartsTooltip>
          </Transition>
        </li>
        <li>
          <a :href="githubUrl" data-tooltip="github" @mouseenter="hover" @mouseleave="hoverInterrupt">
            <PartsSvgIcon :icon="'github'" :color="'#bbbbba'" />
          </a>
          <Transition name="tooltip">
            <PartsTooltip :position="'below'" :shift="'47px'" v-if="isShownTtGh">
              <template v-if="isPost()">
                GitHubで修正をリクエストする
              </template>
              <template v-else>
                GitHubプロフィール
              </template>
            </PartsTooltip>
          </Transition>
        </li>
        <li>
          <div class="contact_wrap" data-tooltip="contact_wrap" @click="isOpenContactModal = true" @mouseenter="hover" @mouseleave="hoverInterrupt">
            <PartsSvgIcon :icon="'mail'" :color="'#bbbbba'" />
          </div>
          <Transition name="tooltip">
            <PartsTooltip :position="'below'" :shift="'47px'" v-if="isShownTtCt">
              お問い合わせ
            </PartsTooltip>
          </Transition>
        </li>
        <li>
          <div class="search_wrap" data-tooltip="search_wrap" @click="isOpenSearchModal = true" @mouseenter="hover" @mouseleave="hoverInterrupt">
            <PartsSvgIcon :icon="'search'" :color="'#bbbbba'" />
          </div>
          <Transition name="tooltip">
            <PartsTooltip :position="'below'" :shift="'47px'" v-if="isShownTtSr">
              記事を検索
            </PartsTooltip>
          </Transition>
        </li>
      </ul>
    </header>
    <Teleport to="body">
      <Transition name="fadedown">
        <ModulesModalBase :className="'contact'" v-if="isOpenContactModal" @closeModal="closeContactModal">
          <div class="title">
            お問い合わせ
          </div>
          <div class="form">
            <input type="text" class="input" :class="{ center: isShown }" placeholder="Press the button below to show our email address..." v-model="address" disabled>
          </div>
          <div class="button">
            <PartsBaseButton type="fill" @click="showAddressOrCopy" v-html="buttonText" />
            <Transition name="howan">
              <div v-if="isCopied" class="copied">
                <PartsSvgIcon :icon="'check'" :color="'#76ae65'" />
                <span>Copied!</span>
              </div>
            </Transition>
          </div>
          <div class="desc">
            <span>・お問い合わせをご希望される方は、上のボタンを押して表示されるメールアドレス宛てにご連絡ください。頂いた内容は基本的にはすべて確認していますが、必ず返信をお約束するものではありません。</span>
            <span>・なんでこんな仕組みにしているの：メールアドレスは初期レンダリング時に一切描画されないため、「スパムを回避しつつ最低限の実装コストでお問い合わせシステムが実現できる…！」と思ってこうしています。「ユーザビリティ悪くない？」という考えに対しては「サイトのユーザー層がある程度限定されているなら実用的な運用である」と思うことにしています（一般ブログではお問い合わせ専用ページをちゃんと作る）。</span>
          </div>
        </ModulesModalBase>
      </Transition>
      <Transition name="fadedown">
        <ModulesModalBase :className="'search'" v-if="isOpenSearchModal" @closeModal="isOpenSearchModal = false">
          <div class="form">
            <ModulesSearchBox @closeSearchBox="isOpenSearchModal = false" />
          </div>
        </ModulesModalBase>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { delay } from "@/lib/utils"
import { MAIL_ADDRESS, DEBOUNCE_MS } from "@/lib/defines"

const router = useRouter()

// force push from `?page=x` to `/`
watch(router.currentRoute, (new_, old_) => {
  if (old_.query.page && !new_.query.page) {
    router.go(0)
  }
})

const githubUrl = computed(() => {
  if (isPost()) {
    const slag = router.currentRoute.value.path
    return "https://github.com/mirumirumi/mirumi-tech-content/blob/main/posts" + slag
  } else {
    return "https://github.com/mirumirumi"
  }
})

const isOpenContactModal = ref(false)
const isOpenSearchModal = ref(false)

const address = ref("")
const isShown = ref(false)
const isCopied = ref(false)
const buttonText = ref("メールアドレスを表示する")

const showAddressOrCopy = async () => {
  if (!address.value) {
    address.value = MAIL_ADDRESS
    isShown.value = true
    buttonText.value = "コピーする"
  } else {
    navigator.clipboard.writeText(address.value)
    isCopied.value = true
    await delay(1999)
    isCopied.value = false
  }
}

const closeContactModal = () => {
  address.value = ""
  isOpenContactModal.value = false
  isShown.value = false
  buttonText.value = "メールアドレスを表示する"
}

const isPost = (): boolean => {
  return router.currentRoute.value.name === "slag"
}

const isShownTtAe = ref(false)
const isShownTtAt = ref(false)
const isShownTtGh = ref(false)
const isShownTtCt = ref(false)
const isShownTtSr = ref(false)

let timer: number

const hover = (e: Event): void => {
  timer = window.setTimeout(() => {
    // @ts-ignore
    switch ((e.target as HTMLElement).dataset.tooltip) {
      case "all_entries":
        isShownTtAe.value = true
        break
      case "all_tags":
        isShownTtAt.value = true
        break
      case "github":
        isShownTtGh.value = true
        break
      case "contact_wrap":
        isShownTtCt.value = true
        break
      case "search_wrap":
        isShownTtSr.value = true
        break
    }
  }, DEBOUNCE_MS);
}

const hoverInterrupt = () => {
  clearTimeout(timer)

  isShownTtAe.value = false
  isShownTtAt.value = false
  isShownTtGh.value = false
  isShownTtCt.value = false
  isShownTtSr.value = false
}
</script>

<style lang="scss" scoped>
.header_wrap{
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    max-width: 1188px;
    margin: auto;
    padding: 23px 29px 30px;
    .site_logo {
      margin-left: 0.5em;
      img {
        width: 47px;
        height: 47px;
      }
    }
    .menu {
      display: flex;
      align-items: center;
      width: 300px;
      height: 100%;
      li {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 100%;
        a, .contact_wrap, .search_wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          svg {
            left: 0;
            right: 0;
          }
        }
        .contact_wrap, .search_wrap {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.modal_base {
  .contact {
    .form {
      .center {
        text-align: center;
        cursor: text;
      }
    }
    .button {
      position: relative;
      margin-bottom: 2.1em;
      text-align: center;
      .copied {
        position: absolute;
        bottom: -1.6em;
        left: 0;
        right: 0;
        color: #76ae65;
        font-size: 0.777em;
        svg {
          top: 1px;
          width: 0.95em;
        }
        span {
          display: inline-block;
          margin-left: 1.3em;
        }
      }
    }
    .desc {
      margin-top: 2.3em;
      color: #b1b1b1;
      font-size: 0.78em;
      line-height: 1.2;
      span {
        display: block;
        margin: 0.7em auto;
      }
    }
  }
  .search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 222.222px;
    .form {
      width: 100%;
      max-width: 444.444px;
    }
  }
}
</style>
