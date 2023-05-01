<script setup>
import { allRows } from '@/composables/useSheet'
const { data: events } = await allRows()
const { upcomingEvents, pastEvents } = useEvents(events.value.values)
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
              Acte central
            </AnimatedCard>
          </div>
        </div>
        <div class="actes-all">
          <AnimatedCards>
            <h2 class="visually-hidden">
              {{ $t('actes.upcoming') }}</h2>
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
    padding-top: calc(var(--nav-safe-area) + 5vh);
    padding-bottom: var(--site-padding);

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

  @include media-breakpoint-down(md) {
    .actes {
      &-content {
        grid-template-columns: 1fr;
      }
    }
  }
</style>