<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const { data: proposal } = await useFetch(config.public.apiBase + 'proposal/' + route.params.id)

/* Meta tags */
const { locale, t } = useI18n()
useServerSeoMeta({
  title: () => `${proposal.value[`text_${locale.value}`]} - Programa 2023 - Compromís`,
  ogTitle: () => `${proposal.value[`text_${locale.value}`]} - Programa 2023 - Compromís`,
  description: "Consulta el programa de Compromís per a les Eleccions a Corts Valencianes 2023",
  ogDescription: "Consulta el programa de Compromís per a les Eleccions a Corts Valencianes 2023",
  ogImage: "https://28m.compromis.net/images/social/programa.png",
  twitterCard: 'summary_large_image',
})
useHead({
  title: `${proposal.value[`text_${locale.value}`]} - Programa 2023 - Compromís`,
})
</script>

<template>
  <div class="proposal-single">
    <ProgramaProposal :proposal="proposal" highlighted />

    <h3>{{ $t('programa.more') }}</h3>
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
