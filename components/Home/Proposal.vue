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

const setHash = (slug) => {
  window.location.hash = slug
}
</script>

<template>
  <a :href="`#${slug}`" class="proposal" @click.prevent="setHash(slug)">
    <img :src="proposal.picture.src" :alt="proposal.picture.alt" class="proposal-picture" />
    <h3 class="proposal-title">{{ proposal.title }}</h3>
  </a>
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
      background: $yellow;
      color: $white;
      padding: .5rem;
      @include font-size(2rem);
      bottom: 1rem;
      left: calc(var(--site-padding) * -.5);
    }
  }
</style>