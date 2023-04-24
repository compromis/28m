<script setup>
import BFooter from '@compromis/blobby/components/footer/BFooter.vue'
</script>

<template>
  <div>
    <SiteNav />
    <div class="page">
      <NuxtPage />
    </div>
    <div class="container">
      <BFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: $red;
}
</style>