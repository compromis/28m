<script setup>
defineProps({
  slug: {
    type: String,
    default: false
  },
  proposal: {
    type: Object,
    required: true
  }
})

const { locale } = useI18n()
</script>

<template>
  <NuxtLink :to="localePath(`/proposta/${slug}`)" class="proposal">
    <img :src="proposal.picture.src" :alt="proposal.picture.alt" class="proposal-picture" />
    <h3 class="proposal-title">{{ proposal.content[locale].tip }}</h3>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .proposal {
    display: block;
    position: relative;

    &-picture {
      width: 20vw;
      height: 18vw;
      min-width: 250px;
      min-height: 250px;
      object-fit: cover;
    }

    &-title {
      position: absolute;
      background: $blue;
      color: $white;
      padding: .5rem;
      @include font-size(2rem);
      bottom: 1rem;
      left: calc(var(--site-padding) * -.5);
      max-width: 75%;
    }
  }
</style>