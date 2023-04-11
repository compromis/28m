<script setup>
const { locale } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const { data: category } = await useFetch(config.public.apiBase + 'category/' + route.params.slug)
</script>

<template>
  <div>
    <h2>{{ category[`name_${locale}`] }}</h2>
    
    <div v-for="subcategory in category.subcategories" :key="subcategory.id">
      <h3 v-if="!subcategory.hidden">{{ subcategory[`name_${locale}`] }}</h3>
  
      <ul>
        <li v-for="proposal in subcategory.proposals" :key="proposal.id">
          <ProgramaProposal :proposal="proposal" />
        </li>
      </ul>
    </div>
  </div>
</template>
