<script setup>
/* Meta tags */
const { t } = useI18n()
useServerSeoMeta({
  title: () => t('meta.collabora.title'),
  ogTitle: () => t('meta.collabora.title'),
  description: () => t('meta.collabora.description'),
  ogDescription: () => t('meta.collabora.description'),
  ogImage: () => t('meta.collabora.ogImage'),
  twitterCard: 'summary_large_image',
})
useHead({
  title: t('meta.collabora.title'),
})

/* Social networks */
const socialNetworks = [
  { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@compromis_net' },
  { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com/compromis_net' },
  { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com/compromis' },
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/coaliciocompromis' },
  { name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@coaliciocompromis' },
  { name: 'Telegram', icon: 'telegram', href: 'https://t.me/compromis' },
]

/* Animations */
const { $gsap, $ScrollTrigger } = useNuxtApp()

let timeout
const animations = ref()

onMounted(() => {
  timeout = setTimeout(animateCards, 1100)
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
          <CollaboraCard href="https://voluntaris.compromis.net" sticker="bullhorn">
            <template #title>
              {{ $t('collabora.card1.title') }}
            </template>
            <template #button>
              Apunta't com a voluntari/a
            </template>
          </CollaboraCard>
          <CollaboraCard href="https://apoderats.compromis.net" sticker="id-badge">
            <template #title>
              {{ $t('collabora.card2.title') }}
            </template>
            <template #button>
              Fes-te interventor/a
            </template>
          </CollaboraCard>
          <CollaboraCard sticker="arrows-retweet">
            <template #title>
              <a href="https://instagram.com/compromis" target="_blank" class="failsafe">
                {{ $t('collabora.card3.title') }}
              </a>
            </template>
            <template #buttons>
              <a v-for="(sn, i) in socialNetworks" :href="sn.href" :key="i" target="_blank" rel="noopener noreferer" :title="sn.name">
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fab', sn.icon]" />
                </ClientOnly>
                <span class="visually-hidden">
                  {{ sn.name }}
                </span>
              </a>
            </template>
          </CollaboraCard>
          <CollaboraCard sticker="heart">
            <template #title>
              <a href="https://donacions.compromis.net" target="_blank" class="failsafe">
                {{ $t('collabora.card4.title') }}
              </a>
            </template>
            <template #buttons>
              <a href="https://donacions.compromis.net/donate/5" target="_blank">5€</a>
              <a href="https://donacions.compromis.net/donate/10" target="_blank">10€</a>
              <a href="https://donacions.compromis.net/donate/20" target="_blank">20€</a>
              <a href="https://donacions.compromis.net/donate/50" target="_blank">50€</a>
              <a href="https://donacions.compromis.net" target="_blank">Més</a>
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
  overflow: hidden;

  &-cover {
    grid-area: cover;
    background-image: url(~/assets/images/collabora/cover.jpg);
    background-size: cover;
  }

  &-content {
    grid-area: content;
    padding: var(--site-padding);
    padding-top: calc(var(--nav-safe-area) + 5vh);
    padding-bottom: 4rem;
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

.failsafe {
  color: inherit;
  display: block;
  width: 100%;

  &:hover {
    text-decoration: none;
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

@include media-breakpoint-down(sm) {
  .collabora {
    &-cards {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
}
</style>