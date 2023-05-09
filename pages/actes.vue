<script setup>
/* Fetch events */
import { allRows } from '@/composables/useSheet'
const { data: events } = await allRows()
const { upcomingEvents, pastEvents } = useEvents(events.value.values)

/* Meta */
const { t } = useI18n()
useServerSeoMeta({
  title: () => t('meta.actes.title'),
  ogTitle: () => t('meta.actes.title'),
  description: () => t('meta.actes.description'),
  ogDescription: () => t('meta.actes.description'),
  ogImage: () => t('meta.actes.ogImage'),
  twitterCard: 'summary_large_image',
})
useHead({
  title: t('meta.actes.title'),
})

/* Toggle past events */
const showPastEvents = ref(false)
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

            <button @click="showPastEvents = !showPastEvents" :aria-pressed="showPastEvents ? 'true' : 'false'" class="actes-subtitle">
              <h2>
                {{ $t('actes.past') }}
              </h2>
              <FontAwesomeIcon :icon="['far', 'arrow-right']" />
            </button>
            <Transition name="slide">
              <ul v-show="showPastEvents" class="actes-cards actes-past list-unstyled">
                <template v-for="(event, id) in pastEvents" :key="id">
                  <li>
                    <AnimatedCard>
                      <ActesEvent :event="event" compact />
                    </AnimatedCard>
                  </li>
                </template>
              </ul>
            </Transition>
          </AnimatedCards>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .actes {
    background: $indigo;
    padding: .5rem;
    padding-top: calc(var(--nav-safe-area) + 5vh);
    overflow: hidden;

    &-title {
      color: $white;
      @include font-size(5rem);
      @include margin-bottom(2rem);
    }

    &-subtitle {
      display: flex;
      appearance: none;
      color: $white;
      margin: 0;
      border: 0;
      background: transparent;
      @include margin(5rem 0 1.5rem);
      align-items: center;
      gap: 1rem;

      h2 {
        @include font-size(2.5rem);
      }

      svg {
        font-size: 1.5rem;
        transition: .25s ease;
      }

      &:hover {
        text-decoration: underline;
        text-decoration-color: rgba($white, .5);
      }

      &[aria-pressed='true'] {
        svg {
          transform: rotate(90deg);
        }
      }
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
      opacity: .6;
      display: grid;
      grid-template-columns: 1fr 1fr;

      li {
        display: flex;
        
        :deep(.animated-card) {
          flex-grow: 1;
        }
      }
    }
  }

  @include media-breakpoint-down(lg) {
    .actes {
      &-content {
        grid-template-columns: 1fr;
      }

      &-past {
        grid-template-columns: 1fr;
      }
    }

    .actes-central-sticky {
      max-width: 450px;
      margin: 0 auto;
    }
  }
</style>