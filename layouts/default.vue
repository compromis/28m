<script setup>
import BFooter from '@compromis/blobby/components/footer/BFooter.vue'

/* Programa exception */
const route = useRoute()
const onPrograma = computed(() => {
  return route.path.startsWith('/programa') || route.path.startsWith('/cas/programa')
})
</script>

<template>
  <div :class="[`page-${route.name}`, { 'on-programa': onPrograma }]">
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