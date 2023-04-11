<script setup>
const config = useRuntimeConfig()
const { data: top } = await useFetch(config.public.apiBase + 'top')
</script>

<template>
  <div>
    <h1>Top propostes</h1>
    <ol>
      <li v-for="proposal in top" :key="proposal.id">
        <ProgramaProposal :proposal="proposal" />
      </li>
    </ol>
  </div>
</template>
