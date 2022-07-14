<template>
  <div class="_404_view">
    <main class="single_column">
      <header>
        <h1>
          お探しのページを見つけられません (´｡･ڡ･｡`)
        </h1>
      </header>
      <div>
        <img src="/404.png" alt="404 not found">
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
._404_view {
  main {
    header {
      h1 {
        font-family: "Custom Noto Sans";
        text-align: center;
      }
    }
    div {
      margin: 7em auto 3em;
      text-align: center;
      img {
        width: 222px;
      }
    }
  }
}
</style>
