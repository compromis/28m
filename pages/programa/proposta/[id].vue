<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const { data: proposal } = await useFetch(config.public.apiBase + 'proposal/' + route.params.id)
</script>

<template>
  <div>
    <h1>Proposal</h1>
    <ProgramaProposal :proposal="proposal" show-category />
  </div>
</template>
