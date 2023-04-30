<script setup>
/* Meta tags */
const { t } = useI18n()
useServerSeoMeta({
  title: () => t('meta.home.title'),
  ogTitle: () => t('meta.home.title'),
  description: () => t('meta.home.description'),
  ogDescription: () => t('meta.home.description'),
  ogImage: () => t('meta.home.ogImage'),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main class="home">
    <HomeHero />
    <HomeProposals />
    <HomeModal />
  </main>
</template>

<style lang="scss" scoped>
.home {
  background: $red;
}
</style>