<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

let timeout
const animations = ref()

onMounted(() => {
  timeout = setTimeout(animateCards, 500)
})

onUnmounted(() => {
  clearTimeout(timeout)
})

function animateCards () {
  animations.value = $ScrollTrigger.batch(".collabora-card", {
    onEnter: elements => {
      $gsap.fromTo(elements, {
        opacity: 0,
        y: 50,
        scale: 0.85,
      },{
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.25,
        stagger: 0.15,
        ease: 'Elastic.easeOut'
      });
    },
    once: true
  })
}
</script>

<template>
  <main class="collabora">
    <aside class="collabora-cover" />
    <section class="collabora-content">
      <div class="container-fluid container-xxl">
        <AnimatedTitle>
          <h1 class="collabora-title">
            {{ $t('collabora.title') }}
          </h1>
        </AnimatedTitle>
        <div class="collabora-cards">
          <CollaboraCard href="https://voluntaris.compromis.net">
            <template #title>
              {{ $t('collabora.card1.title') }}
            </template>
            <template #button>
              Apunta't com a voluntari/a
            </template>
          </CollaboraCard>
          <CollaboraCard href="https://apoderats.compromis.net">
            <template #title>
              {{ $t('collabora.card2.title') }}
            </template>
            <template #button>
              Fes-te interventor/a
            </template>
          </CollaboraCard>
          <CollaboraCard>
            <template #title>
              {{ $t('collabora.card3.title') }}
            </template>
            <template #buttons>
              <a href="a">FB</a>
              <a href="a">FB</a>
              <a href="a">FB</a>
              <a href="a">FB</a>
            </template>
          </CollaboraCard>
          <CollaboraCard>
            <template #title>
              {{ $t('collabora.card4.title') }}
            </template>
            <template #buttons>
              <a href="a">5€</a>
              <a href="a">10€</a>
              <a href="a">20€</a>
              <a href="a">50€</a>
              <a href="a">Més</a>
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
  padding-bottom: 2rem;

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
    gap: 3rem;
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