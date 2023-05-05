<script setup>
/* Meta tags */
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
  title: "Programa 2023 - Compromís",
})

/* Fetch top proposals */
const config = useRuntimeConfig()
const { refresh, data: top } = await useFetch(config.public.apiBase + 'top')
onMounted(() => {
  refresh()
})

/* Page transition */
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
          duration: .5,
          onComplete: done
        })
      }, 1000)
    },

    onLeave(el, done) {
      const { $gsap } = useNuxtApp()

      $gsap.fromTo(el, {
        opacity: 1,
      }, {
        opacity: 0,
        duration: .25,
        onComplete: done
      })
    }
  }
})
</script>

<template>
  <div class="top-proposals">
    <div class="top-proposals-cover"></div>
    <div class="top-proposals-container">
      <h2>
        {{ $t('programa.proposals') }}
        <span class="sticker circle bg-yellow">TOP</span>
      </h2>
      <ol class="top-proposals-list list-unstyled">
        <li v-for="proposal in top" :key="proposal.id" class="top-proposals-item">
          <ProgramaProposal :proposal="proposal" show-category no-highlights />
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-proposals {
  background: $red;
  padding: 2rem;
  overflow: hidden;

  h2 {
    display: flex;
    color: $white;
    margin-bottom: 2rem;
    @include font-size(3rem);

    .sticker {
      margin-left: auto;
      transform: rotate(-25deg);
      margin-top: -.25em;
      flex-shrink: 0;
    }
  }

  &-list {
    li:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &-cover {
    height: var(--cover-height);
    min-height: var(--cover-min-height);
  }

  &-container {
    max-width: 500px;
    margin: 0 auto;
  }
}

@include media-breakpoint-down(lg) {
  .top-proposals {
    &-cover {
      height: 0;
      min-height: 0;
    }
  }
}
</style>