<script setup>
const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const { data: sections } = await useFetch(config.public.apiBase + 'categories')
const inSection = computed(() => {
  return !['/programa/', '/programa', '/cas/programa', '/cas/programa/'].includes(route.path)
})
</script>

<template>
  <main :class="['programa', { 'programa-section': inSection }]">
    <header class="programa-header">
      <h1>
        <nuxt-link :to="localePath('/programa')">
          {{ $t('programa.title') }} 2023
        </nuxt-link>
      </h1>
    </header>

    <section class="programa-index" v-if="!inSection">
      <div v-for="section in sections" :key="section.id">
        <h2>{{ section[`name_${locale}`] }}</h2>

        <ul>
          <li v-for="category in section.categories" :key="category.id">
            <nuxt-link :to="localePath(`/programa/${category.slug}`)">
              {{ category[`name_${locale}`] }}
              <span>{{ category.proposal_count }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>

    <section class="programa programa-content">
      <NuxtPage />
    </section>
  </main>
</template>
