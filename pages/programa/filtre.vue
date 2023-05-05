<script setup>
import axios from 'axios'

const { t } = useI18n()
useServerSeoMeta({
  title: "Programa 2023 - Compromís",
  ogTitle: "Programa 2023 - Compromís",
  description: "Consulta el programa de Compromís per a les Eleccions a Corts Valencianes 2023",
  ogDescription: "Consulta el programa de Compromís per a les Eleccions a Corts Valencianes 2023",
  ogImage: "https://28m.compromis.net/images/social/programa.png",
  twitterCard: 'summary_large_image',
})
useHead({
  title: t('meta.programa.title'),
})

const config = useRuntimeConfig()
const route = useRoute()
const { locale } = useI18n()

const keyword = ref(route.query.q)
const flair = ref(route.query.flair || '')
const results = ref([])
const loading = ref(false)

const fetchProposals = async () => {
  loading.value = true
  const url = (flair.value)
    ? `${config.public.apiBase}filter/?flair=${flair.value}&locale=${locale}`
    : `${config.public.apiBase}filter/?q=${keyword.value}&locale=${locale}`
  
  const response = await axios.get(url)
  results.value = response.data.results
  loading.value = false
}

onMounted(() => {
  fetchProposals()
})

watch(() => route.query.q, (newKeyword) => {
  keyword.value = newKeyword
  fetchProposals()
})

watch(() => route.query.flair, (newFlair) => {
  flair.value = newFlair
  fetchProposals()
})

/* Transition */
definePageMeta({
  pageTransition: {
    css: false,
    onEnter(el, done) {
      const { $gsap } = useNuxtApp()

      // Prevent new page from loading on still-narrow right column, making it overflow
      el.style.display = 'none'

      setTimeout(() => {
        el.style.display = 'block'
        $gsap.fromTo(el, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: .5
        })
      }, 250)

      $gsap.fromTo('.programa-filter-container', {
        opacity: 0,
      }, {
        opacity: 1,
        duration: .5,
        delay: .5,
        onComplete: done
      })
    },

    onLeave(el, done) {
      const { $gsap } = useNuxtApp()

      $gsap.fromTo(el, {
        opacity: 1,
      }, {
        opacity: 0,
        duration: .5,
        onComplete: done
      })
    }
  }
})
</script>

<template>
  <div class="programa-filter">
    <div class="programa-filter-container">
      <h1 v-if="keyword">{{ $t('programa.filter.headline') }} “{{ keyword }}”</h1>
      <h1 v-else-if="flair === 'youth'">{{ $t('programa.youth') }}</h1>
      <h1 v-else-if="flair === 'feminist'">{{ $t('programa.feminist') }}</h1>
      <h1 v-else>{{ $t('programa.results') }}</h1>

      <ProgramaFilter :keyword="keyword" class="form" />

      <div v-if="loading" class="loading">
        {{ $t('programa.loading') }}
      </div>
      <div v-else>
        <ul class="programa-filter-proposals list-unstyled" v-if="results.length > 0">
          <li v-for="proposal in results" :key="proposal.id" :class="{ highlighted: proposal.highlighted }">
            <ProgramaProposal :proposal="proposal" show-category />
          </li>
        </ul>
        <div v-else class="no-results">
          {{ $t('programa.no_results') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.programa-filter {
  padding-top: 8vh;

  h1 {
    color: $white;
    @include font-size(3.5rem);
  }

  &-container {
    padding: var(--site-padding);
    max-width: 1200px;
    margin: 0 auto;
  }

  &-proposals {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--site-padding);

    li {
      display: flex;

      &.highlighted {
        grid-row: span 2;
      }

      .proposal {
        height: 100%;
      }
    }
  }
}

.form {
  margin-bottom: 5rem;

  :deep(form:focus-within) {
    outline-color: $black !important;
  }
}

.no-results,
.loading {
  color: $white;
  font-size: 2rem;
  max-width: 25ch;
  line-height: 1;
}

@include media-breakpoint-down(md) {
  .programa-filter {
    &-proposals {
      grid-template-columns: 1fr;
    }
  }
}
</style>