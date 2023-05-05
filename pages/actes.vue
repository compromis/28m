<script setup>
/* Fetch events */
import { allRows } from '@/composables/useSheet'
const { data: events } = await allRows()
const { upcomingEvents, pastEvents } = useEvents(events.value.values)

/* Meta */
const { t } = useI18n()
useServerSeoMeta({
  title: 'Actes - Compromís',
  ogTitle: 'Actes - Compromís',
  description: 'Vine als actes de campanya de Compromís. Com a partit de proximitat, sempre tenim un acte prop de tu.',
  ogDescription: 'Vine als actes de campanya de Compromís. Com a partit de proximitat, sempre tenim un acte prop de tu.',
  ogImage: 'https://28m.compromis.net/images/social/actes.png',
  twitterCard: 'summary_large_image',
})
useHead({
  title: t('meta.actes.title'),
})
</script>

<template>
  <main class="actes" ref="scope">
    <div class="container-fluid container-xxl">
      <AnimatedTitle>
        <h1 class="actes-title">
          {{ $t('actes.title') }}
        </h1>
      </AnimatedTitle>

      <div class="actes-content">
        <div class="actes-central">
          <div class="actes-central-sticky">
            <AnimatedCard>
              <ActesCentral />
            </AnimatedCard>
          </div>
        </div>
        <div class="actes-all">
          <AnimatedCards>
            <h2 class="visually-hidden">
              {{ $t('actes.upcoming') }}
            </h2>
            <ul class="actes-cards list-unstyled">
              <template v-for="(event, id) in upcomingEvents" :key="id">
                <li>
                  <AnimatedCard>
                    <ActesEvent :event="event" />
                  </AnimatedCard>
                </li>
              </template>
            </ul>

            <h2 class="actes-subtitle">
              {{ $t('actes.past') }}
            </h2>
            <ul class="actes-cards actes-past list-unstyled">
              <template v-for="(event, id) in pastEvents" :key="id">
                <li>
                  <AnimatedCard>
                    <ActesEvent :event="event" />
                  </AnimatedCard>
                </li>
              </template>
            </ul>
          </AnimatedCards>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .actes {
    background: $indigo;
    padding: var(--site-padding);
    padding-top: calc(var(--nav-safe-area) + 5vh);

    &-title {
      color: $white;
      @include font-size(5rem);
      @include margin-bottom(2rem);
    }

    &-subtitle {
      color: $white;
      @include font-size(2.5rem);
      @include margin(5rem 0 1.5rem);
    }

    &-content {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 2rem;
    }

    &-cards {
      display: grid;
      gap: 2rem;
    }

    &-central {
      &-sticky {
        position: sticky;
        top: 5rem;
      }
    }

    &-past {
      opacity: .5;
    }
  }

  @include media-breakpoint-down(lg) {
    .actes {
      &-content {
        grid-template-columns: 1fr;
      }
    }

    .actes-central-sticky {
      max-width: 450px;
      margin: 0 auto;
    }
  }
</style>