<script setup>
/* Meta tags */
const { t } = useI18n()
useServerSeoMeta({
  title: "Compromís - Per tot el que importa - Eleccions 28M",
  ogTitle: "Compromís - Per tot el que importa - Eleccions 28M",
  description: "Web de campamya de Compromís per a les Eleccions a Corts Valencianes de 2023",
  ogDescription: "Web de campamya de Compromís per a les Eleccions a Corts Valencianes de 2023",
  ogImage: "https://28m.compromis.net/images/social/home.png",
  twitterCard: 'summary_large_image',
})
useHead({
  title: t('meta.home.title'),
})
</script>

<template>
  <main class="home">
    <HomeHero />
    <HomeProposals />
  </main>
</template>

<style lang="scss" scoped>
.home {
  background: $red;
}
</style>