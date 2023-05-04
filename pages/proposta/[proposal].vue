<script setup>
import Proposals from '~/content/proposals.js'
const { locale } = useI18n()
const route = useRoute()
const proposal = Proposals[route.params.proposal]
</script>

<template>
  <main class="proposal">
    <div class="proposal-cover">
      <img :src="`${proposal.picture.src}`" :alt="proposal.picture.alt" />
    </div>
    <div class="proposal-content">
      <div class="proposal-header">
        <h1 class="proposal-title">{{ proposal.content[locale].title }}</h1>
        <NuxtLink :to="localePath('/')">
          <ClientOnly>
            <IconArrow />
          </ClientOnly>
          <span class="visually-hidden">{{ $t('home.back') }}</span>
        </NuxtLink>
      </div>

      <h2>{{ $t('home.all_thats_been_done') }}</h2>
      <div class="text" v-html="proposal.content[locale].textDone" />

      <h2>{{ $t('home.all_that_remains_to_be_done') }}</h2>
      <div class="text" v-html="proposal.content[locale].toBeDone" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.proposal {
  display: grid;
  padding: calc(var(--nav-safe-area) + 1rem) var(--site-padding);
  grid-template-columns: 400px 1fr;

  &-content {
    background: $white;
    padding: var(--site-padding);
  }

  &-header {
    display: flex;
    background: $yellow;
    color: $white;
    margin: calc(var(--site-padding) * -1);
    padding: var(--site-padding);
    margin-bottom: var(--site-padding);
    gap: 1rem;
    align-items: center;
    justify-content: space-between;

    svg {
      height: 2em;
      width: 2em;
    }
  }

  &-title {
    margin: 0;
  }

  h2 {
    font-size: 1.75rem;

    &:not(:first-child) {
      margin-top: 2rem;
    }
  }

  .text {
    font-size: 1.25rem;
  }
}

@include media-breakpoint-down(md) {
  .proposal {
    grid-template-columns: 1fr;

    &-cover {
      img {
        width: 100%;
      }
    }
  }
}
</style>