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
          <NuxtLink to="/all-entries">
            <PartsSvgIcon :icon="'entries'" :color="'#bbbbba'" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/all-tags">
            <PartsSvgIcon :icon="'tags'" :color="'#bbbbba'" />
          </NuxtLink>
        </li>
        <li>
          <a href="https://github.com/mirumirumi">
            <PartsSvgIcon :icon="'github'" :color="'#bbbbba'" />
          </a>
        </li>
        <li>
          <NuxtLink to="/contact">
            <PartsSvgIcon :icon="'mail'" :color="'#bbbbba'" />
          </NuxtLink>
        </li>
        <li>
          <div class="search_wrap">
            <PartsSvgIcon :icon="'search'" :color="'#bbbbba'" />
          </div>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header_wrap{
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    max-width: 1188px;
    margin-bottom: 30px;
    padding: 13px 29px 0;
    .site_logo {
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
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 100%;
        a, .search_wrap {
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
        .search_wrap {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
