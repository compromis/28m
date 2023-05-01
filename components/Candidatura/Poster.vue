<script setup>
defineProps({
  fullName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <article class="poster">
    <div aria-hidden="true" class="poster-name animated-item">{{ name }}</div>
    <img class="poster-picture animated-poster" :src="picture" :alt="`Foto de ${fullName}`" />
    <div class="poster-details animated-item">
      <h4>{{ fullName }}</h4>
      <p>{{ description }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.poster {
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-areas:
    "name picture"
    "name details";
  gap: .5rem;
  min-width: 250px;

  &-picture {
    grid-area: picture;
    width: 100%;
  }

  &-name {
    grid-area: name;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    text-align: right;
    transform: rotate(180deg);
    font-weight: 900;
    font-size: 4rem;
    line-height: 1;
    color: var(--poster-names);
  }

  &-details {
    grid-area: details;
  }

  &-details {
    h4 {
      @include font-size(1.75rem);
      line-height: 1;
      margin-bottom: .25em;
    }

    p {
      @include font-size(1.25rem);
      line-height: 1;
    }
  }
}
</style>