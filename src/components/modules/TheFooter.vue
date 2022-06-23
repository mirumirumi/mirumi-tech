<template>
  <div class="footer_wrap">
    <footer>
      <ul class="links">
        <li>
          <NuxtLink to="/privacy">プライバシーポリシー</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/this">このサイトのつくり</NuxtLink>
        </li>
      </ul>
      <div class="copyright">
        © {{ new Date().getFullYear() }} mirumi.tech
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
