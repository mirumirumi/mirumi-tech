<template>
  <div class="post_id_view">
    <main>
      <article>
        <header>
          <h1>
            {{ post.title }}
          </h1>
          <div class="meta">
            <div class="created_at">
              <PartsSvgIcon :icon="'edit'" :color="'#9e9e9e'" />
              <time :datetime="datetime(post.created_at)">{{ post.created_at }}</time>
            </div>
            <div class="updated_at">
              <PartsSvgIcon :icon="'update'" :color="'#9e9e9e'" />
              <time :datetime="datetime(post.updated_at)">{{ post.updated_at }}</time>
            </div>
          </div>
          <div class="tags">
            <NuxtLink :to="`/tags/${tag}`" v-for="tag in post.tags" :key="tag">
              {{ tag }}
            </NuxtLink>
          </div>
        </header>
        <div id="content" v-html="post.body">
        </div>
        <footer>
          <!-- (｡･ڡ･｡) -->
        </footer>
      </article>
    </main>
    <ModulesTheSidebar :html="post.body" />
    <Body>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/plugins/autoloader/prism-autoloader.min.js"></Script>
    </Body>
  </div>
</template>

<script setup lang="ts">
import { SITE_FULL_PATH, PostData } from "@/lib/defines"
import { zeroPadding } from "@/lib/utils"
import Prism from "prismjs"

const router = useRouter()
const config = useRuntimeConfig()
const slag = router.currentRoute.value.params.slag



const html = `
<p>この記事は公式チュートリアルの内容、開発中に実際に困ったポイント、その解決方法などを中心にしつつ自分へのメモを主目的としてまとめていくものです。随時追記していきます。</p>
<p>あたりです。</p>

<div class="box-common box-info"><p>あなたは本当にアタナシオスですか？</p><p>に段落目です。</p></div>

<div class="box-common box-alert"><p>これは注意喚起です。</p><p>真ん中の段落です。</p>
<p>に段落目です。</p></div>

<div class="box-common box-rewrite 2022/7/26"><p><span class="rewrite-date">追記 (2022/7/26) ：</span>これは追記です。</p><p>真ん中の段落です。</p>

<p>さらに真ん中の段落です。</p>
<p>に段落目です。</p></div>

<p>ちなみにもう僕は Pinia 最高派です 🍍</p>
    <a href="https://github.com/mirumirumi/your-cat-vue" class="blogcard" rel="noopener" target="_top" title="GitHub - mirumirumi/your-cat-vue: Repo for Front-end of YourCat 🐾">
            <div class="blogcard">
                <div class="thumbnail">
                    <img src="https://opengraph.githubassets.com/f2c9e4ef44876d496e1ef9ace8dfee92cee912832f3ccaa4df30613605bc4030/mirumirumi/your-cat-vue" alt="GitHub - mirumirumi/your-cat-vue: Repo for Front-end of YourCat 🐾" />
                </div>
                <div class="content">
                    <div class="title">
                        GitHub - mirumirumi/your-cat-vue: Repo for Front-end of YourCat 🐾
                    </div>
                    <div class="snippet">
                        Repo for Front-end of YourCat 🐾. Contribute to mirumirumi/your-cat-vue development by creating an account on GitHub.
                    </div>
                    <div class="footer">
                        <div class="favicon">
                            <img src="https://www.google.com/s2/favicons?domain=github.com" alt="external-site-favicon" />
                        </div>
                        <div class="domain">
                            github.com
                        </div>
                    </div>
                </div>
            </div>
        </a>
<h2 class="toc_item" id="Vuex+%E3%81%A8+Pinia" data-toc-index="1">Vuex と Pinia</h2>
<p style="margin-bottom: 2.3em;">2021 年終盤、これまで Vue 公式で推奨されていた状態管理ライブラリが <a href="https://vuex.vuejs.org/ja/">Vuex</a> から <a href="https://pinia.vuejs.org/">Pinia</a> に変わりました。</p>
<blockquote class="twitter-tweet">
<p dir="ltr" lang="en">🔥 Beware!<br /><br />The new <a href="https://twitter.com/vuejs?ref_src=twsrc%5Etfw">@vuejs</a> default recommendations!<br /><br />Vue CLI ➡️ create-vue (npm init vue@next)<br />Vetur ➡️ Volar<br />Vuex ➡️ Pinia <a href="https://t.co/dYcQpMvZ0R">pic.twitter.com/dYcQpMvZ0R</a></p>
— VueDose (@VueDose) <a href="https://twitter.com/VueDose/status/1463169464451706897?ref_src=twsrc%5Etfw">November 23, 2021</a></blockquote>
<p>< async src="https://platform.twitter.com/widgets.js" charset="utf-8"></></p>
<p>例えば Vetur -&gt; Volar は当時でも言われて久しい感じでしたけれど、Vuex に対する Pinia という名前はだいぶぽっと出だったので混乱した人も多いと思われます。</p>
<p>これまで Vue 3 に対して公式にサポートされていた状態管理ライブラリは Vuex 4 というものですが、これの次世代バージョン、つまり Vuex 5 の検討内容が Pinia の根底にあるものです。</p>
<p>…というのは実はやや語弊があり、実際には「新しい状態管理の形を模索していたときに作っていたものがほとんど Vuex 5 の内容を含んでいた」ということらしく（これが Pinia のこと）、そのシンプルな API が評価され Vue 公式のツールチェインに取り込まれ RFC も通過した、という経緯のようです。</p>
<p>Vuex 4 の主な課題は</p>
<ul>
<li>TypeScript の恩恵を受けるのが難しい</li>
<li>ストアのモジュール分割の手間の多さ</li>
<li>Vue 3 で完全にデフォルトになったと思われる Composition API とイマイチ相性がよくない</li>
<li>全体的に冗長な記述が多い</li>
</ul>
<p>などでした。Pinia の特徴のほとんどはこれらの改善そのものであると思って差し支えありません。それと、この他の重要な変更点として<code class="inline">mutations</code>が廃止されたことが挙げられます（後述）。</p>
<p>Composition API の利用が前提になっているため、Vue 2 でも Pinia の利用は可能なものの<code class="inline">@vue/composition-api</code>か<code class="inline">Vue ^3.2.0-0</code>が備わっている場合のみに限定されています。</p>
<h2 class="toc_item" id="%E5%80%8B%E4%BA%BA%E7%9A%84%E3%81%AB+Pinia+%E3%81%8C%E7%B4%A0%E6%99%B4%E3%82%89%E3%81%97%E3%81%84%E3%81%A8%E6%84%9F%E3%81%98%E3%81%A6%E3%81%84%E3%82%8B%E3%81%A8%E3%81%93%E3%82%8D" data-toc-index="2">個人的に Pinia が素晴らしいと感じているところ</h2>
<p>細かい話に入る前に感想ベースの要約を書いておきます：</p>
<ul>
<li>記述が少ない
<ul>
<li>全てにおいて見た目がスッキリした、ストアを使う心理的ハードルがかなり減った</li>
<li>特に今までの<code class="inline">store.commit("untarakantara", value)</code>がしんどかったのでこれがなくなったのが本当に素晴らしい（これは mutation がなくなったということ自体の話ではなくコードの 見てくれ としての話）</li>
</ul>
</li>
<li>型が効く
<ul>
<li>安心感が違います</li>
</ul>
</li>
<li>分割ラク
<ul>
<li>そもそも「分割」という考え方ですらない、「状態管理の状態管理」に悩まされるという現象が格段に減りました</li>
</ul>
</li>
<li>mutation じゃなくても編集できる
<ul>
<li>最も多くの議論があった場所ですが、少なくとも僕はこの変更に賛成している側です</li>
</ul>
</li>
</ul>
<h2 class="toc_item" id="%E7%9B%AE%E7%9A%84%E3%81%94%E3%81%A8%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9%E3%81%BE%E3%81%A8%E3%82%81" data-toc-index="3">目的ごとの使い方まとめ</h2>
<p><a href="https://pinia.vuejs.org/introduction.html">公式チュートリアル</a>（この記事執筆時点で日本語ページはなし）の内容をベースに自分の解釈がいくらか混ざっている感じでまとめています。</p>
<p>頑張って読み込めばだいたいのことは書いてあるのだけど、「こういうときどうする？」といういわゆるクックブック的なドキュメントはまだ整備が浅いように思えます。今後に期待しましょう。</p>

<pre><code class="python language-python">@patch("cake.has_strawberry")
def test_make_cake(mock_func):
  mock_func.return_value = True
  result = make_cake()
  assert result == ["berry"]</code></pre>

<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%81%AE%E5%AE%9A%E7%BE%A9" data-toc-index="4">ストアの定義</h3>
<pre><code class="lang-js">// store/counter.ts

import { defineStore } from "pinia"

export const useStore = defineStore("counter", {
  state: () =&gt; ({
    count: a.replace("^(.*?)\/\d{4}adf$", "$1"),
    count: /^(.*?)\/\d{4}adf$/gmi,
  }),
  getters: {
    tenfold() {
      return this.count * 10
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
</code></pre>
<p>これが「ストア」の 1 つの単位です。</p>
<p>pinia モジュールからは<code class="inline">defineStore</code>だけをインポートし、エクスポートするのは<code class="inline">useStore</code>のみです。これは後でコンポーネント側で使います。</p>
<p><code class="inline">defineStore</code>の第一引数にある counter というのが気になると思いますが、これはストアを複数使うユースケース（今まで分割と呼んでいたもの）以外では特に必要ありません。main とか store とかでもいいと思います。</p>
<p>それ以外の部分は Vuex 時代に慣れ親しんだものと全くといっていいほど変わっていないのがわかるでしょう。mutations だけはなくなっていますけど。</p>
<p>タイプセーフに関しても基本的にはこれだけで型推論が機能するゆえに必要十分なケースが多いですが、細かく指定をしたい場合には以前のように interface を使うことができます：</p>
<pre class="lang-ts"><code>interface State {
  counter: number | string,
}

export const useStore = defineStore("counter", {
  state: (): State =&gt; ({
    counter: "0",
  }),
})</code></pre>
<p>この場合は「useStore では初期値のセットをしている」と考えるとわかりやすいと思います。</p>
<h3 class="toc_item" id="%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%8B%E3%82%89%E3%82%B9%E3%83%88%E3%82%A2%E3%82%92%E5%8F%82%E7%85%A7%E3%81%99%E3%82%8B" data-toc-index="5">コンポーネントからストアを参照する</h3>
<p>コンポーネント側です。</p>
<pre><code class="lang-js">&lt;script setup lang="ts"&gt;
import { useStore } from "@/store/store"

const store = useStore()

// state の参照
console.log(store.counter)  // 0

// state の変更
store.counter = 10
console.log(store.counter)  // 10

// getters の使用
console.log(store.tenfold)  // 100
&lt;/script&gt;</code></pre>
<p>store.ts 内でエクスポートした <code class="inline">useStore</code> 関数をインポートし、適当な変数にそれを格納します。このコンポーネントファイル内ではこの変数が全てのストアとしての役割を担います（もちろん別のストアを定義している場合はそれぞれまた定義します）。</p>
<p>実際にエディタ上で書いてみるとわかるのですが、この時点で既に型の安全確保がなされています。変なものを入れようとするとちゃんと怒ってもらえるということ。</p>
<p>型以外で特に注目すべきは、state の書き換えをまるで普通のオブジェクトプロパティかのように扱えているところです。</p>
<pre><code class="lang-js"> // state の変更
store.counter = 10
console.log(store.counter) // 10</pre>
<p>しかも getters の簡潔さも素晴らしいです。</p>
<pre class="js">// getters の使用
console.log(store.tenfold) // 100</code></pre>
<p>たぶんシンプルすぎて Vuex 時代に store.<strong>getters</strong>.tenfold とかやっていたことなんてもうみなさんも忘れていたのではないでしょうか。間に挟まる種別指定がなくなり 1 ブロックの記述が少し減るだけでソースコード全体も格段に読みやすくなると感じます（もちろんこの手の話は常に明示するメリットとの天秤ではあります）。</p>
<p>actions は後ろで別に書いています。</p>
<div class="box-common box-rewrite">
<p>ストアによる状態管理というのは、ちょっとやそっとのことでは容易にデータを書き換えられない「変更のハードルの高さ」によってある程度の管理強度が担保されているといえます。</p>
<p>mutation がなくなることについて記述のクリアさだけで言えば議論の余地はないものの、この「定められた方法以外で自由に状態を書き換えられてしまっていいのか」という部分はやはり大きな争点になっていたようです。</p>
<p>Pinia の issues でも同様の問い合わせを見つけることが可能で、例えば下記のスレッドはこの議論の概要を知るのにかなりよい例と思われます：</p>
<p>[https://github.com/vuejs/pinia/issues/58]</p>
<p>冒頭で「少なくとも僕は賛成派です」と書いたのは、「mutation がほとんど形骸化した儀式のような状態になっていたことを鑑みると実質的な対応としてこれはよい判断だと思った」という感じです。</p>
</div>
<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%81%AE%E4%B8%AD%E3%81%A7%E5%90%84%E5%A4%89%E6%95%B0%E3%82%92%E5%8F%82%E7%85%A7%E3%81%99%E3%82%8B" data-toc-index="6">ストアの中で各変数を参照する</h3>
<p>getters の中で state を参照する：</p>
<pre><code class="lang-js">export const useStore = defineStore("counter", {
  state: () =&gt; ({
    count: 0,
  }),
  getters: {
    tenfold() {
      return this.count * 10
    },
  },
})
</code></pre>
<p>getters の第一引数には state が入ってくるのでそれを使うこともできます。</p>
<pre><code class="lang-js">export const useStore = defineStore("counter", {
  state: () =&gt; ({
    count: 0,
  }),
  getters: {
    tenfold(state) {
      return state.count * 10
    },
  },
})
</code></pre>
<p>getter から他の getter を参照する：</p>
<pre><code class="lang-js">export const useStore = defineStore("counter", {
  state: () =&gt; ({
    count: 0,
  }),
  getters: {
    tenfold() {
      return this.count * 10
    },
    tenfoldToString() {
      return this.tenfold.toString()
    },
  },
})
</code></pre>
<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%82%92%E5%88%86%E5%89%B2%E3%81%99%E3%82%8B%EF%BC%88%E7%9B%AE%E7%9A%84%E3%81%94%E3%81%A8%E3%81%AB%E3%82%B9%E3%83%88%E3%82%A2%E3%82%92%E4%BD%9C%E3%82%8B%EF%BC%89" data-toc-index="7">ストアを分割する（目的ごとにストアを作る）</h3>
<p>Pinia ではストアを定義する段階でそもそも「かたまり」を分けられるので、これを呼び出す useStore もわけてエクスポートしておくだけで簡単にストアの分割が実現できます。</p>
<pre><code class="lang-js">// カウンター用のストア
export const useCounterStore = defineStore("counter", {
  state: () =&gt; ({
    count: 0,
  }),
  getters: {
    tenfold() {
      return this.count * 10
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

// ユーザーのセッション情報用のストア
export const useSessionStore = defineStore("session", {
  state: () =&gt; ({
    userId: "abcd-efgh",
    token : "xxxxxxxxxxxxx",
  }),
  getters: {
    isLoggedIn() {
      return this.token !== undefined
    },
  },
})</code></pre>
<p>id（defineStore の第一引数）もそれぞれのストアで変更するのを忘れないようにします。あとはそれぞれの useStore（今回の例では「useCounterStore」と「useSessionStore」）をただインポートすればコンポーネント側で普通に使えます。</p>
<pre><code class="lang-js">import { useCounterStore, useSessionStore } from "@/store/store"

const storeCounter = useCounterStore()
const storeSession = useSessionStore()

console.log(storeCounter.counter)  // 0
console.log(storeSession.userId)   // "abcd-efgh"
</code></pre>
<p>一般的には <code class="inline">src</code>ディレクトリ内に<code class="inline">store</code>などの名前でさらにディレクトリを切っているケースがほとんどでしょうから、ここでファイル名 1 つに対し 1 つのストアを定義して管理するのもよさそうです。数個程度ならファイル 1 つでもいいのかな。</p>
<div class="box-common box-info">
<p>わざわざファイルを分けて複数のストアを定義する必要がない「Nested stores」という機能もあるのですが、メリット含め詳細をよく理解できていないため末尾の「よくわかっていないところ」で紹介するに留めています。</p>
</div>
<p>ちなみに id は下記のように書くこともできます。こちらの方が目に入りやすいので id の変更忘れなどが減りそうな気がしますね。</p>
<pre><code class="lang-js">// store/counter.js

import { defineStore } from "pinia"

export const useStore = defineStore({
  id: "counter",
  state: () =&gt; ({
    count: 0,
  }),
  getters: {
    tenfold() {
      return this.count * 10
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
</code></pre>
<h3 class="toc_item" id="%E8%A4%87%E6%95%B0%E3%81%AE+state+%E3%82%92%E4%B8%80%E6%8C%99%E3%81%AB%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B" data-toc-index="8">複数の state を一挙に変更する</h3>
<p>ある一定のまとまりを持った state 群を同時に書き換えたいとき、Vuex では mutations（commit）を使って処理を定義できましたが、Pinia では次のように書きます：</p>
<pre><code class="lang-js">store.$patch({
  usesrId: undefined,
  token  : undefined,
})</pre>
<p>配列への要素の追加など、上記の書き方では現実的に難しいシーンに対応するタイプもあります：</p>
<pre class="js">store.$patch((state) =&gt; {
  state.items.push({ name: "book", quantity: 1 })
})</code></pre>
<p>これらユースケースの存在を思い出したとき初めて commit のちゃんとした(？)有用性に気づいた気がしましたが、安心してください。これは actions が適任なのです。後述します。</p>
<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%82%92%E3%83%AA%E3%82%BB%E3%83%83%E3%83%88%E3%81%99%E3%82%8B" data-toc-index="9">ストアをリセットする</h3>
<p>ストアのすべての state を初期値に戻します：</p>
<pre class="js">store.$reset()</pre>
<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%81%94%E3%81%A8%E3%81%BE%E3%82%8B%E3%81%BE%E3%82%8B%E7%BD%AE%E3%81%8D%E6%8F%9B%E3%81%88%E3%82%8B" data-toc-index="10">ストアごとまるまる置き換える</h3>
<p>リセットにプラスして次なる値セットの初期化まで行いたいときなどにまるごと置き換えが可能です：</p>
<pre><code class="lang-js">store.$state = {
  name : "みるみ",
  site : "https://mirumi.me/tech",
}</code></pre>
<h3 class="toc_item" id="actions%EF%BC%88%E3%82%B9%E3%83%88%E3%82%A2%E5%86%85%E3%81%A7%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%82%92%E8%A1%8C%E3%81%86%EF%BC%89" data-toc-index="11">actions（ストア内で非同期処理を行う）</h3>
<p>actions は「非同期処理専用のもの」と思ってしまいがちですが、位置づけ的にはコンポーネント内の methods に近く、つまりビジネスロジックを書くための場所であるということになっています。</p>
<p>例えば先ほどの<code class="inline">$patch</code>による一括更新なども、毎回同じ形で使うものならば actions で定義しておくと安心感があります：</p>
<pre><code class="lang-js">export const useStore = defineStore("session", {
  state: () =&gt; ({
    userId: "",
    token1: "",
    token2: "",
    token3: "",
  }),
  actions: {
    initSession() {
      this.userId = ""
      this.token1 = ""
      this.token2 = ""
      this.token3 = ""
    },
  },
})
</code></pre>
<p style="margin-top: 0.5em;"><span style="font-size: 0.8em;">（この例だと他に対象の state がないので<code class="inline">store.$reset()</code>とかやったほうがいいということになっちゃいますけどね）</span></p>
<p>そしてこの考え方の上に「ここには非同期処理も書けるよ」というのが乗っていると思っておくとよさそうです。</p>
<pre><code class="lang-js">actions: {
  async signin(id, password) {
    try {
      this.auth = await api.post({ id, password })  // API リクエストなど
    } catch (error) {
      showTooltip(error)
      return
    }
  },
},</code></pre>
<p>なお、Promise が返却されるなら記法として async/await などに限定されることはありません。</p>
<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%81%AE%E7%8A%B6%E6%85%8B%E3%82%92%E7%9B%A3%E8%A6%96%E3%81%99%E3%82%8B" data-toc-index="12">ストアの状態を監視する</h3>
<p>ストアの状態監視です。</p>
<pre><code class="lang-js">store.$subscribe(() =&gt; {
  // you want to do after the store is updated
})</code></pre>
<p>公式ドキュメントに記載がされてからもまだ日が浅く正直よくわかっていないところが多いのですが、とりあえずこれでストアの変更を検知することはできます。</p>
<p>第二引数に state が入ってくるのでそれを使うことも可能です（第一引数は mutation という独自オブジェクトなのですが中身を見る限り特に用事がなく実用性が不明です…）。</p>
<pre class="js">store.$subscribe((mutation, state) =&gt; {
  console.log(state)  // 変更後の state オブジェクト全体
})</pre>
<p>もうひとつ<code class="inline">watch</code>を使うものもあります。</p>
<pre><code class="lang-js">watch(
  pinia.state,
  (state) =&gt; {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
</code></pre>
<p>「<code class="inline">watch</code> よりも <code class="inline">$subscribe</code> を使う利点は、サブスクリプションがパッチの後に一度だけ起動することです」ということで、おそらくパフォーマンス上の理由から後者に優位性があるのではという浅い理解をしています。</p>
<p>Vue コンポーネントのように変更前後の値をそれぞれ取得できたらとても嬉しいなと思うのですが、今のところそのような機能は両者ともないようです。</p>
<h3 class="toc_item" id="%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%A4%96%EF%BC%88main.ts%E3%81%AA%E3%81%A9%EF%BC%89%E3%81%A7%E3%82%B9%E3%83%88%E3%82%A2%E3%82%92%E4%BD%BF%E3%81%86" data-toc-index="13">コンポーネントの外（main.tsなど）でストアを使う</h3>
<p>ストアを使いたいシーンがすべて Vue コンポーネントの内側であるとは限りません。最もよくあるケースとしては<code class="inline">main.ts</code>や Vue Router で使う<code class="inline">router.ts</code>（<code class="inline">index.ts</code>）などでしょう。</p>
<p>しかし何か面倒な手順が必要なわけではなく、基本的には今までと同じ通り useStore をインポートしてくるだけです。</p>
<pre><code class="lang-js">import { useUserStore } from '@/stores/user'
import { createApp } from 'vue'
import App from './App.vue'

// ❌  fails because it's called before the pinia is created
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ works because the pinia instance is now active
const userStore = useUserStore()
</code></pre>
<p>ただし見てわかるように、<code class="inline">createPinia()</code> した App がアプリケーションにバインドされないとそもそもストア自体が機能しないために useStore の定義は<code class="inline">app.use()</code>よりもあとにする必要はあります。</p>
<p>Vue Router を使う場合も同様の注意が必要です。何も考えずファイル冒頭で import 文を書いてしまうと問題が起きる可能性があるので、それぞれ必要なアクションの中で都度定義するのが望ましいです。</p>
<pre><code class="lang-js">// ❌ Depending on the order of imports this will fail
const store = useStore()

router.beforeEach((to) =&gt; {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore()

  if (to.meta.requiresAuth &amp;&amp; !store.isLoggedIn) return '/login'
})
</code></pre>
<p>ルーターの中でロジックを書くというシーンの多くは「ページ遷移時にログイン状態を確認する」など beforeEach() が使われるときのはずなので、この関数内で定義するのが一番手っ取り早いと思います。</p>
<p>サーバーサイドレンダリングを行う場合は諸々事情が変わります。詳しくは<a href="https://pinia.vuejs.org/ssr/">このページ</a>。</p>
<h3 class="toc_item" id="Vue.js+devtools+%E3%81%A7%E3%81%AE%E4%BD%BF%E7%94%A8" data-toc-index="14">Vue.js devtools での使用</h3>
<p>具体的に書けることがあまりなく申し訳ないのですが、とりあえず今までの Vuex と同じ使用感で使えることは確認できています。</p>
<p>目玉機能としてタイムトラベル（たぶん値の変更をあとから追跡できるみたいな機能だと思ってます）というのがあるのですが、まだサポートされていない部分が多かったりなど未知数です。</p>
<p>分かり次第追記します。</p>
<h2 class="toc_item" id="%E3%82%88%E3%81%8F%E3%82%8F%E3%81%8B%E3%81%A3%E3%81%A6%E3%81%84%E3%81%AA%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D" data-toc-index="15">よくわかっていないところ</h2>
<h3 class="toc_item" id="%E7%8A%B6%E6%85%8B%E7%9B%A3%E8%A6%96%E3%81%99%E3%82%8B%E3%81%A8%E3%81%8D%E3%81%AE+2+%E3%81%A4%E3%81%AE%E8%A8%98%E6%B3%95" data-toc-index="16">状態監視するときの 2 つの記法</h3>
<p>上でも書いたように、<code class="inline">$subscribe</code>と<code class="inline">watch</code>の使い分け、および前者の詳しい挙動がよくわかっていません。</p>
<p>ガイドを見る限り<code class="inline">watch</code>のほうはオプショナル的な位置づけに見えるのですが、そうなると deep オプションは…？とか色々疑問がわきます（ディープコピーまわりは危険度が高いのでそもそも使わないようにしていたゆえに必要性はあまり感じていないですが）。</p>
<h3 class="toc_item" id="%E7%89%B9%E5%AE%9A%E3%81%AE+state+%E3%81%AE%E3%81%BF%E3%82%92%E7%9B%A3%E8%A6%96%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95" data-toc-index="17">特定の state のみを監視する方法</h3>
<p>普通に考えたら「監視対象と全然関係ないときにも<code class="inline">$subscribe</code>メソッドが毎度動いてしまう」というのは危険極まりないです。</p>
<pre class="js">store.$subscribe(() =&gt; {
  // ここに書く処理の副作用をとても気にしないといけない
})</pre>
<p>しかし、監視しているのは上記のようにストア全体ということになっています。</p>
<p>あまりストアを多用した実装を行ったことがなかったのでつい最近気がついたのですが、「こんなはずなくない…？？」となっていてまだ自分が何かを知らないだけの可能性がかなりあります。そういえば Vuex 時代でも watch は雰囲気で使っていたなと…。</p>
<h4 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%81%AE%E3%83%8D%E3%82%B9%E3%83%88" data-toc-index="18">ストアのネスト</h4>
<p>上でちらっと触れましたが、ストアをネストできる機能があります。</p>
<pre><code class="lang-js">import { useUserStore } from './user'

export const cartStore = defineStore('cart', {
  getters: {
    // ... other getters
    summary(state) {
      const user = useUserStore()

      return Hi  items.
    },
  },

  actions: {
    purchase() {
      const user = useUserStore()

      return apiPurchase(user.id, this.list)
    },
  },
})
</code></pre>
<p>概念としても記法としてもわかりづらい上に、どうやら呼び出すたびに毎度<code class="inline">buildStoreToUse</code>がキックされるなどパフォーマンス的にもどうなのか、と言っておられる方もいました。</p>
<p>僕は今のところ使うつもりはありません。</p>
<h3 class="toc_item" id="%E3%82%B9%E3%83%88%E3%82%A2%E3%81%AE%E5%85%B1%E6%9C%89" data-toc-index="19">ストアの共有</h3>
<p>ストアのネストと似た要領で、他のストアの getters や actions を使えたりする機能のようです。</p>
<p>「そんなことするくらいならストアを分けるのがやめたほうがいいのでは…？」と僕がすぐ思ってしまうくらいレベルが低いものであるはずがないので、おそらくこれもメリットを理解できていないだけと思われます。</p>
<h3 class="toc_item" id="Composition+API+%E3%81%AE%E5%A4%96%E3%81%A7%E4%BD%BF%E3%81%86+mapXXX+%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA" data-toc-index="20">Composition API の外で使う mapXXX シリーズ</h3>
<p>今後これを使う可能性は一切ないと思っているので、よくわかっていないけど別に放置でいいかなーというもの。</p>
<pre><code class="lang-js">export default {
  computed: {
    ...mapStores(useCartStore, useUserStore)
  },
}
</code></pre>
<p>おそらく Vuex 時代でコンポーネントにバインドするために使っていたヘルパー関数シリーズと同種の API と思われます。</p>
<h2 class="toc_item" id="%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB" data-toc-index="21">おわりに</h2>
<p>あえて最後にこれを書くのですが、<strong>ストアは使わないに越したことはない</strong>です。ストアの使用リスクはグローバル変数を使うことの危険性と本質的に同じだからです。</p>
<p>なぜ純正のフロントエンドフレームワーク単体では状態管理がサポートされていないのかをよく考える必要があるでしょう。これはあくまでも「プラスの付加価値」であり、「本当に困ったときにだけ手を伸ばすべきもの」と僕は思っています。</p>
<p>とはいえ便利なライブラリを知っておくに越したことはないのも事実。もし Vue で状態管理をしたいなら、次からは Pinia はいかがでしょうか🍍</p>


`

const post: PostData = {
  title: "Vue.js の状態管理ライブラリ Pinia の使い方まとめ",
  createdAt: "2022/4/15",
  updatedAt: "2022/12/9",
  tags: ["Vue.js", "TypeScript"],
  html: html,
}

// console.log(process.env.NUXT_API_ENDPOINT_BASE_URL)

// onMounted(async () => {

// const { data: post } = await useFetch("get-post", {
//   baseURL: process.env.NUXT_API_ENDPOINT_BASE_URL,
//   params: {
//     slag: slag,
//   },
// }
// // ).catch((e) => {
// //   console.error(e)
// // }
// )
// console.log(post.value)
// })





onMounted(() => {
  Prism.manual = true
  Prism.highlightAll()
})

useSetMeta({
  title: post.value.title,
  description: generateMetaDescription(post.value.body),
  keywords: post.value.tags.join(","),
  url: SITE_FULL_PATH + "/" + slag,
  createdAt: post.value.created_at,
  updatedAt: post.value.updated_at,
})

const datetime = (datetime: string) => {
  return `${datetime.slice(0, 4)}-${zeroPadding(Number(datetime.replace(/\d{4}\/(\d\d*)\/.*?$/gmi, "$1")), 2)}-${zeroPadding((Number(datetime.replace(/\d{4}\/\d\d*\/(.*?)$/gmi, "$1"))), 2)}`
}

function generateMetaDescription(html: string): string {
  return html.replace(/(<.*?>|\n|^\n)/gmi, "").replace(/<h[234].*?>.*?<\/h[234]>/gmi, "").slice(0, 100)  // https://regex101.com/r/ke1Ymn/1
}
</script>

<style lang="scss" scoped>
.post_id_view {
  display: flex;
  main {
    width: calc(100% - 331px);
    padding: 0px 47.5px;
    article {
      header {
        .meta {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.23em;
          margin-bottom: 0.111em;
          color: #9e9e9e;
          font-size: 0.7em;
          font-weight: bold;
          .created_at, .updated_at {
            position: relative;
            svg {
              top: 1.7px;
              transform: scale(0.95);
            }
            time {
              display: inline-block;
              margin-left: 1.3em;
            }
          }
        }
        .tags {
          a {
            display: inline-block;
            margin-right: 0.7em;
            color: #9e9e9e;
            font-size: 0.777em;
            text-decoration: none;
            word-break: break-all;
            transition: all 0.23s ease-in-out;
            &:hover {
              color: #c27c3e;
              text-decoration: underline;
              &::after {
                color: #9e9e9e;
                text-decoration: none;
              }
            }
            &::after {
              content: ",";
              display: inline-block;
              margin: auto 0em auto 0.1em;
              font-family: "Open Sans";
            }
            &:last-child::after {
              content: none;
            }
          }
        }
      }
    }
  }
}
</style>
