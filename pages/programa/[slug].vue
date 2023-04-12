<script setup>
const { locale } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const { data: category } = await useFetch(config.public.apiBase + 'category/' + route.params.slug)
</script>

<template>
  <div :class="['programa-category', `bg-${category.color}`]">
    <div class="programa-category-cover">
      <img :src="category.cover" alt="" />
    </div>
    <div class="programa-category-container">
      <h2>{{ category[`name_${locale}`] }}</h2>
      
      <div v-for="subcategory in category.subcategories" :key="subcategory.id">
        <h3 v-if="!subcategory.hidden">{{ subcategory[`name_${locale}`] }}</h3>
    
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
    @include font-size(4rem);
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
    img {
      height: 0;
      max-height: 0;
      object-fit: cover;
      width: 100%;
      transition: all ease-in-out var(--transition-duration);
      transition-delay: var(--transition-duration);
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

<style lang="scss">
.programa-in-section {
  .programa-category {
    &-cover {
      img {
        height: var(--cover-height);
        max-height: var(--cover-max-height);
      }
    }
  }
}
</style>