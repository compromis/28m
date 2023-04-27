<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const { data: proposal } = await useFetch(config.public.apiBase + 'proposal/' + route.params.id)

/* Meta tags */
const { locale } = useI18n()
const { t } = useI18n()
useServerSeoMeta({
  title: () => `${proposal.value[`text_${locale.value}`]} - ${t('meta.programa.title')}`,
  ogTitle: () => `${proposal.value[`text_${locale.value}`]} - ${t('meta.programa.title')}`,
  description: () => t('meta.programa.description'),
  ogDescription: () => t('meta.programa.description'),
  ogImage: () => t('meta.programa.ogImage'),
  twitterCard: 'summary_large_image',
})
useHead({
  title: `${proposal.value[`text_${locale.value}`]} - ${t('meta.programa.title')}`,
})
</script>

<template>
  <div class="proposal-single">
    <ProgramaProposal :proposal="proposal" highlighted />

    <h3>Més propostes</h3>
  </div>
</template>

<style lang="scss">
  .proposal-single {
    h3 {
      color: $white;
      margin: 4rem 0 2rem;
    }
  }
</style>
