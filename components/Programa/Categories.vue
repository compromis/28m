<script setup>
const { locale } = useI18n()

defineProps({
  sections: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <nav class="programa-index">
    <div v-for="section in sections" :key="section.id">
      <h2>{{ section[`name_${locale}`] }}</h2>

      <ul class="list-unstyled programa-categories">
        <li v-for="category in section.categories" :key="category.id" :class="['programa-category-card', { 'category-highlighted': category.highlighted }]">
          <nuxt-link :to="localePath(`/programa/${category.slug}`)">
            <span class="proposals bg-black">
              {{ category.proposal_count }}
              <span class="reveal-text">{{ $t('programa.proposals') }}</span>
            </span>

            {{ category[`name_${locale}`] }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.programa-index {
  h2 {
    color: $white;
    margin: 3.5rem 0 1.5rem;
    @include font-size(2.25rem);
  }
}

.programa-categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  grid-auto-flow: dense;

  .category-highlighted {
    grid-column: span 2;
  }

  a {
    display: flex;
    flex-direction: column;
    background: $white;
    color: $black;
    border-radius: $border-radius-sm;
    padding: 1rem;
    font-weight: 600;
    @include font-size(2rem);
    line-height: 1;
    letter-spacing: -.03em;
    min-height: 6em;
    transition: .25s ease;

    &:hover {
      text-decoration: none;
      transform: scale(1.05);

      .proposals {
        padding: .25em .65em;

        .reveal-text {
          max-width: 100px;
          padding-left: .25em;
        }
      }
    }

    &:active {
      transform: scale(.95) rotate(-1deg);
    }

    .proposals {
      display: flex;
      font-size: .6em;
      font-weight: 900;
      padding: .25em .5em;
      border-radius: 1em;
      margin-bottom: auto;
      align-self: flex-end;

      .reveal-text {
        display: inline-block;
        text-transform: lowercase;
        max-width: 0;
        overflow: hidden;
        transition: .25s ease;
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .programa-categories {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
</style>