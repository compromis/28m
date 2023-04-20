<script setup>
const { locale } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const { data: category } = await useFetch(config.public.apiBase + 'category/' + route.params.slug)
const { t } = useI18n()
useServerSeoMeta({
  title: () => `${category.value[`name_${locale.value}`]} - ${t('meta.programa.title')}`,
  ogTitle: () => t('meta.programa.title'),
  description: () => t('meta.programa.description'),
  ogDescription: () => t('meta.programa.description'),
  ogImage: () => t('meta.programa.ogImage'),
  twitterCard: 'summary_large_image',
})

/* Cover animation */
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

      $gsap.fromTo('.programa-category-cover img', {
        "--cover-height": 0,
        "--cover-min-height": 0,
      },{
        "--cover-height": "20vh",
        "--cover-min-height": "300px",
        duration: .5,
        delay: .5
      })

      $gsap.fromTo('.programa-category-container', {
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

      $gsap.fromTo('.programa-category-cover img', {
        "--cover-height": "20vh",
        "--cover-min-height": "300px",
      },{
        "--cover-height": 0,
        "--cover-min-height": 0,
        duration: .25,
        onComplete: done
      })
    }
  }
})
</script>

<template>
  <div :class="['programa-category', `bg-${category.color}`]">
    <div class="programa-category-cover">
      <img :src="category.cover" alt="" ref="cover" />
    </div>
    <div class="programa-category-container">
      <h2>{{ category[`name_${locale}`] }}</h2>
      
      <div v-for="subcategory in category.subcategories" :key="subcategory.id">
        <h3 v-if="!subcategory.hidden">{{ subcategory[`name_${locale}`] }}</h3>

        <NuxtPage />
    
        <ol class="programa-category-proposals list-unstyled">
          <li v-for="proposal in subcategory.proposals" :key="proposal.id" :class="{ highlighted: proposal.highlighted }">
            <ProgramaProposal :proposal="proposal" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.programa-category {
  h2 {
    color: $white;
    @include font-size(5rem);
    line-height: 1;
    margin-bottom: 2rem;
  }

  h3 {
    color: $white;
    @include font-size(1.75rem);
    margin: 2rem 0 1rem;
  }

  &-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  &-cover {
    height: var(--cover-height);
    min-height: var(--cover-min-height);

    img {
      height: var(--cover-height);
      min-height: var(--cover-min-height);
      object-fit: cover;
      width: 100%;
    }
  }

  &-proposals {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

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
</style>
