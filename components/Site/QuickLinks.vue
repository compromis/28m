<script setup>
const menu = [
  { id: 'programa', to: '/programa' },
  { id: 'candidatura', to: '/candidatura' },
  { id: 'collabora', to: '/collabora' },
  { id: 'actes', to: '/actes' },
]

const { $emit } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()
const navigateTo = ({ id, to }) => {
  $emit('curtains', { from: route.name.split('___')[0], to: id })
  router.push(localePath(to))
}
</script>

<template>
  <nav class="quick-links">
    <ul aria-label="Menú principal" class="quick-links-items list-unstyled">
      <li v-for="item in menu" :key="item.id">
        <a
          :href="localePath(item.to)"
          @click.prevent="navigateTo(item)"
        >
          {{ $t('menu.' + item.id) }}
        </a>
      </li>
      <li><a href="https://compromis.net/?override=1">Notícies</a></li>
      <li><a href="https://compromis.net/transparencia">Transparència</a></li>
    </ul>
    <SiteSocial class="quick-links-social" />
  </nav>
</template>

<style lang="scss">
.quick-links {
  position: relative;
  display: flex;
  @include font-size(1.75rem);
  z-index: 900;

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
      text-decoration-color: rgba($white, .25);
    }

    &:focus {
      box-shadow: none;
    }

    &:focus-visible {
      outline: 3px $white solid;
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