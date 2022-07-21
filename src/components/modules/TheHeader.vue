<template>
  <div class="header_wrap">
    <header>
      <div class="site_logo">
        <NuxtLink :to="{ path: '/', force: true, replace: true }">
          <img src="/assets/site-icon.png" alt="site-icon">
        </NuxtLink>
      </div>
      <nav aria-label="global-menu">
        <ul class="menu">
          <li>
            <NuxtLink to="/all-entries" data-tooltip="all_entries" @mouseenter="hover" @mouseleave="hoverInterrupt">
              <PartsSvgIcon :icon="'entries'" :color="'#bbbbba'" />
            </NuxtLink>
            <Transition name="tooltip">
              <PartsTooltip :position="'below'" :shift="'34px'" v-if="isShownTtAe">
                すべての記事
              </PartsTooltip>
            </Transition>
          </li>
          <li>
            <NuxtLink to="/all-tags" data-tooltip="all_tags" @mouseenter="hover" @mouseleave="hoverInterrupt">
              <PartsSvgIcon :icon="'tags'" :color="'#bbbbba'" />
            </NuxtLink>
            <Transition name="tooltip">
              <PartsTooltip :position="'below'" :shift="'34px'" v-if="isShownTtAt">
                すべてのタグ
              </PartsTooltip>
            </Transition>
          </li>
          <li>
            <a :href="githubUrl" data-tooltip="github" @mouseenter="hover" @mouseleave="hoverInterrupt">
              <PartsSvgIcon :icon="'github'" :color="'#bbbbba'" />
            </a>
            <Transition name="tooltip">
              <PartsTooltip :position="'below'" :shift="'34px'" v-if="isShownTtGh">
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
            <div class="search_wrap" data-tooltip="search_wrap" @click="isOpenSearchModal = true" @mouseenter="hover" @mouseleave="hoverInterrupt">
              <PartsSvgIcon :icon="'search'" :color="'#bbbbba'" />
            </div>
            <Transition name="tooltip">
              <PartsTooltip :position="'below'" :shift="'34px'" v-if="isShownTtSr">
                記事を検索
              </PartsTooltip>
            </Transition>
          </li>
          <li class="theme">
            <ModulesThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
    <Teleport to="body">
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
import { DEBOUNCE_MS } from "@/lib/defines"

const router = useRouter()

const githubUrl = computed(() => {
  if (isPost()) {
    const slag = router.currentRoute.value.path
    return "https://github.com/mirumirumi/mirumi-tech-content/blob/main/posts" + slag + ".md"
  } else {
    return "https://github.com/mirumirumi"
  }
})

const isOpenSearchModal = ref(false)

const isPost = (): boolean => {
  return router.currentRoute.value.name === "slag"
}

const isShownTtAe = ref(false)
const isShownTtAt = ref(false)
const isShownTtGh = ref(false)
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
    max-width: var(--width-max-screen);
    margin: auto;
    padding: 23px 29px 30px;
    .site_logo {
      margin-left: 0.5em;
      img {
        width: 47px;
        height: 47px;
        @include mobile {
          --mobile-logo-size: 43px;
          width: var(--mobile-logo-size);
          height: var(--mobile-logo-size);
        }
      }
    }
    .menu {
      display: flex;
      align-items: center;
      width: 270px;
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
        @include mobile {
          width: 40px;
        }
      }
      .theme {
        width: 90px;
        @include mobile {
          width: 60px;
        }
      }
      @include mobile {
        width: 220px;
      }
    }
    @include mobile {
      --padding-top: 17px;
      height: calc(var(--mobile-logo-size) + var(--padding-top));
      padding: var(--padding-top) 13px 0;
    }
  }
}
</style>
<style lang="scss">
.modal_base {
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
