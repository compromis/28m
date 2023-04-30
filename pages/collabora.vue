<script setup>
const { $gsap } = useNuxtApp()

let timeout
const animations = ref(null)
const scope = ref(null)

onMounted(() => {
  timeout = setTimeout(animateCards, 500)
})

onUnmounted(() => {
  clearTimeout(timeout)
})

function animateCards () {
  animations.value = $gsap.context(() => {
    $gsap.set('.collabora-card', {
      y: 50,
      opacity: 0
    })

    $gsap.to('.collabora-card', {
      y: 0,
      opacity: 1,
      duration: .5,
      stagger: .1,
      delay: 1.1,
      ease: 'Power4.easeOut'
    })
  }, scope.value)
}
</script>

<template>
  <main class="collabora" ref="scope">
    <aside class="collabora-cover" />
    <section class="collabora-content">
      <div class="container-fluid container-xxl">
        <AnimatedTitle>
          <h1 class="collabora-title">
            {{ $t('collabora.title') }}
          </h1>
        </AnimatedTitle>
        <div class="collabora-cards">
          <CollaboraCard>
            <template #title>
              {{ $t('collabora.card1.title') }}
            </template>
          </CollaboraCard>
          <CollaboraCard>
            <template #title>
              {{ $t('collabora.card2.title') }}
            </template>
          </CollaboraCard>
          <CollaboraCard>
            <template #title>
              {{ $t('collabora.card3.title') }}
            </template>
          </CollaboraCard>
          <CollaboraCard>
            <template #title>
              {{ $t('collabora.card4.title') }}
            </template>
          </CollaboraCard>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.collabora {
  min-height: 100vh;
  background: $blue;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "content cover";

  &-cover {
    grid-area: cover;
    background-image: url(~/assets/images/collabora/cover.jpg);
    background-size: cover;
  }

  &-content {
    grid-area: content;
    padding: var(--site-padding);
    padding-top: calc(var(--nav-safe-area) + 5vh);
  }

  &-title {
    @include font-size(5rem);
    color: $lightblue;
    overflow: hidden;

    span {
      display: inline-block;
      transform: translateY(100%);
      opacity: 0;
    }
  }

  &-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    @include margin-top(2rem);

    :deep(.collabora-card) {
      opacity: 0;
    }
  }
}

@include media-breakpoint-down(xl) {
  .collabora {
    grid-template-columns: 3fr 1fr;
  }
}

@include media-breakpoint-down(lg) {
  .collabora {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "cover"
      "content";

    &-cover {
      height: 20vh;
      min-height: 200px;
      background-position: 90%;
    }

    &-content {
      padding-top: var(--site-padding);
    }

    &-cards {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }
}
</style>