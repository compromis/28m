<script setup>
import BFooter from '@compromis/blobby/components/footer/BFooter.vue'

/* Programa exception */
const route = useRoute()
const onPrograma = computed(() => {
  return route.name.startsWith('programa-slug') || route.name.startsWith('programa-filtre')
})

const routeName = computed(() => {
  const name = route.name.split('___')
  return name[0]
})
</script>

<template>
  <div :class="[`page-${routeName}`, { 'on-programa': onPrograma }]">
    <SiteNav />
    <div class="page">
      <NuxtPage />
    </div>
    <div class="container">
      <BFooter />
    </div>
    <SiteCurtains />
    <SiteEasterEgg />
  </div>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: $red;
  transition: background .5s ease;
  transition-delay: .75s;
}

.on-programa .page,
.page-candidatura .page {
  background: $yellow;
}

.page-collabora .page {
  background: $blue;
}

.page-actes .page {
  background: $indigo;
}
</style>