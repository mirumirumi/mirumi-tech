<template>
  <div class="sidebar_wrap">
    <!-- <aside class="ad">
      
    </aside> -->
    <aside class="toc">
      <ModulesToc :html="html" />
    </aside>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  html: string,
}>()
</script>

<style lang="scss" scoped>
.sidebar_wrap {
  position: sticky;
  top: 6px;
  width: $sidebar_width;
  height: calc(100vh - 13px * 2);
  padding: 13px 13px;
  .ad {
    height: 250px !important;
  }
  @include mobile {
    display: none;
  }
  @include tablet {
    width: $sidebar_width_tablet;
    padding: 13px 0 13px 26px;
  }
}
</style>
