<script setup>
const menu = [
  { id: 'programa', to: '/programa' },
  { id: 'candidatura', to: '/candidatura' },
  { id: 'collabora', to: '/collabora' },
  { id: 'actes', to: '/actes' },
]
</script>

<template>
  <nav class="quick-links">
    <ul aria-label="Menú principal" class="quick-links-items list-unstyled">
      <li v-for="item in menu" :key="item.id">
        <NuxtLink :to="item.to">{{ $t('menu.' + item.id) }}</NuxtLink>
      </li>
    </ul>
    <SiteSocial class="quick-links-social" />
  </nav>
</template>

<style lang="scss">
.quick-links {
  display: flex;
  @include font-size(1.75rem);

  &-items {
    display: flex;
    margin: 0;
    gap: 1.5em;
    margin-right: auto;
  }

  &-social {
    margin-left: auto;
  }

  a {
    color: $white;
    
    &:hover {
      color: $yellow;
      text-decoration: none;
    }

    &:focus {
      box-shadow: none;
    }

    &:focus-visible {
      outline: 3px white solid;
      outline-offset: 7px;
      border-radius: .5rem;
    }
  }
}

@include media-breakpoint-down(md) {
  .quick-links {
    &-items {
      gap: .5em;

      a {
        display: block;
        border: 2px $white solid;
        border-radius: 10rem;
        padding: .25em .75em;
        font-size: 1.25rem;
      }
    }

    &-social {
      align-self: center;
      padding-left: 2rem;
      font-size: 2rem;
    }
  }
}
</style>