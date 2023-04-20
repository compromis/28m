<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const { data: proposal } = await useFetch(config.public.apiBase + 'proposal/' + route.params.id)
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
