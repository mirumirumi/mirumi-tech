<template>
  <div class="footer_wrap">
    <footer>
      <ul class="links">
        <li>
          <NuxtLink to="/privacy/">プライバシーポリシー</NuxtLink>
        </li>
        <li class="contact" @click="isOpenContactModal = true">お問い合わせ</li>
        <li>
          <NuxtLink to="/this/">このサイトのつくり</NuxtLink>
        </li>
      </ul>
      <div class="copyright"> © {{ new Date().getFullYear() }}mirumi.tech</div>
    </footer>
    <Transition name="fadedown">
      <ModulesModalBase :className="'contact'" v-if="isOpenContactModal" @closeModal="closeContactModal">
        <div class="title">お問い合わせ</div>
        <div class="form">
          <input
            type="text"
            class="input"
            :class="{ center: isShown }"
            placeholder="Press the button below to show our email address..."
            v-model="address"
            disabled
          />
        </div>
        <div class="button">
          <PartsBaseButton type="fill" @click="showAddressOrCopy" v-html="buttonText" />
          <Transition name="fade">
            <div v-if="isCopied" class="copied">
              <PartsSvgIcon :icon="'check'" :color="'#76ae65'" />
              <span>Copied!</span>
            </div>
          </Transition>
        </div>
        <div class="desc">
          <span>
            ・お問い合わせをご希望される方は、上のボタンを押して表示されるメールアドレス宛てにご連絡ください。頂いた内容は基本的にはすべて確認していますが、必ず返信をお約束するものではありません。
          </span>
          <span>
            ・なんでこんな仕組みにしているの：メールアドレスは初期レンダリング時に一切描画されないため、「スパムを回避しつつ最低限の実装コストでお問い合わせシステムが実現できる…！」と思ってこうしています。「ユーザビリティ悪くない？」という考えに対しては「サイトのユーザー層がある程度限定されているなら実用的な運用である」と思うことにしています（一般ブログではお問い合わせ専用ページをちゃんと作る）。
          </span>
        </div>
      </ModulesModalBase>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { MAIL_ADDRESS } from "@/utils/defines"

const isOpenContactModal = ref(false)

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
</script>

<style lang="scss" scoped>
.footer_wrap {
  margin-top: 0;
  padding: 4em 1em 9.15px;
  footer {
    color: #a1a1a1;
    .links {
      text-align: center;
      font-size: 0.87em;
      li {
        display: inline-block;
        margin: auto 1.3em;
        a {
          color: #a1a1a1;
          text-decoration: none;
        }
        @include mobile {
          display: block;
          margin: 0.1em 1.3em;
          &:first-child {
            padding-left: 5px;
          }
          &:nth-child(2) {
            padding-right: 2px;
          }
        }
      }
      .contact {
        cursor: pointer;
      }
    }
    .copyright {
      margin-top: 1.5em;
      font-size: 0.83em;
      text-align: center;
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
          @include mobile {
            top: 2.5px;
          }
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
}
</style>
