<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data: sections } = await useFetch(config.public.apiBase + 'categories')
const inSection = computed(() => {
  return !['/programa/', '/programa', '/cas/programa', '/cas/programa/'].includes(route.path)
})
</script>

<template>
  <main :class="['programa', { 'programa-in-section': inSection }]">
    <header class="programa-nav">
      <div class="programa-nav-cover">
        <img src="~/assets/images/programa/cover.jpg" alt="Foto de la Generalitat" />
      </div>
      
      <div class="programa-nav-container">
        
        <Transition name="fade" mode="out-in">
          <h1 v-if="!inSection" class="programa-nav-title" key="main-title">
            <nuxt-link :to="localePath('/programa')">
              {{ $t('programa.title') }}
              <span class="sticker rounded bg-blue">2023</span>
            </nuxt-link>
          </h1>
          <h1 v-else class="programa-nav-title-inverted" key="nav-title">
            <nuxt-link :to="localePath('/programa')">
              {{ $t('programa.title') }}
              <span class="sticker rounded bg-blue">2023</span>
            </nuxt-link>
          </h1>
        </Transition>

        <Transition name="fade">
          <ProgramaCategories v-if="!inSection" :sections="sections" />
        </Transition>
      </div>
    </header>

    <section class="programa-content">
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.programa {
  --cover-height: 20vh;
  --cover-max-height: 300px;
  --transition-duration: .5s;

  display: grid;
  grid-template-columns: 3fr 1fr;
  transition: all ease-in-out var(--transition-duration);
  transition-delay: var(--transition-duration);

  &-nav {
    background: $yellow;

    &-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    &-cover {
      img {
        width: 100%;
        height: var(--cover-height);
        object-fit: cover;
        min-height: var(--cover-max-height);
        transition: all ease-in-out var(--transition-duration);
        /* transition-delay: var(--transition-duration); */
      }
    }

    &-title {
      color: $white;
      @include font-size(6.5rem);
      position: relative;  

      a {
        color: inherit;

        &:hover {
          text-decoration-color: rgba($white, .25);
        }
      }

      .sticker {
        position: absolute;
        font-size: .35em;
        transform: translate(-.7em, .2em);
      }
    }

    &-title-inverted {
      color: $white;
      writing-mode: vertical-rl;
      text-orientation: mixed;

      a {
        color: inherit;

        &:hover {
          text-decoration-color: rgba($white, .25);
        }
      }
    }
  }

  &-content {
    background: $red;
  }
}

/* When in a section */
.programa-in-section {
  grid-template-columns: 1fr 12fr;

  .programa {
    &-nav {
      &-cover img {
        height: 0;
        min-height: 0;
      }
    }
  }
}
</style>