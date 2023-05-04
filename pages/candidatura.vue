<script setup>
/* Meta tags */
const { t } = useI18n()
useServerSeoMeta({
  title: () => t('meta.candidatura.title'),
  ogTitle: () => t('meta.candidatura.title'),
  description: () => t('meta.candidatura.description'),
  ogDescription: () => t('meta.candidatura.description'),
  ogImage: () => t('meta.candidatura.ogImage'),
  twitterCard: 'summary_large_image',
})
useHead({
  title: t('meta.candidatura.title'),
})

/* Animations */
const { $gsap, $ScrollTrigger } = useNuxtApp()

let timeout
const scope = ref(null)
const animations = ref()

onMounted(() => {
  timeout = setTimeout(animateItems, 500)
})

onUnmounted(() => {
  clearTimeout(timeout)
})

function animateItems () {
  animations.value = $gsap.context(() => {
    $ScrollTrigger.batch(".animated-item", {
      onEnter: elements => {
        $gsap.fromTo(elements, {
          opacity: 0,
          y: 50,
        },{
          opacity: 1,
          y: 0,
          duration: 1.25,
          delay: .25,
          stagger: 0.2,
          ease: 'Power4.easeOut'
        });
      },
      start: "top 80%",
      once: true
    })

    $ScrollTrigger.batch(".animated-poster", {
      onEnter: elements => {
        $gsap.fromTo(elements, {
          opacity: 0,
          scale: 0
        },{
          opacity: 1,
          scale: 1,
          transformOrigin: "top left",
          duration: 1.25,
          stagger: 0.15,
          ease: 'Power4.easeOut'
        });
      },
      start: "top 80%",
      once: true
    })

    $gsap.fromTo('.poster-name-top', {
      opacity: 0,
      x: -20
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      delay: .5,
      ease: 'Power4.easeOut'
    })

    $gsap.fromTo('.poster-name-left', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: .75,
      ease: 'Power4.easeOut'
    })
  }, scope.value)
}
</script>

<template>
  <main class="candidatura" ref="scope">
    <CandidaturaAutonomica />
    <CandidaturaLocal />
  </main>
</template>

<style lang="scss" scoped>
.candidatura {
  background-color: $yellow;
  color: $red;
  --candidatura-container-max-width: #{map-get($container-max-widths, 'xxl')};
  padding-top: calc(var(--nav-safe-area) + 2rem + 5vh);
}
</style>

<style lang="scss">
.candidatura {
  .animated-item,
  .animated-poster {
    opacity: 0;
  }
}

.candidatura-container {
  max-width: var(--candidatura-container-max-width);
  margin: 0 auto;
}

.candidate-posters {
  display: flex;
  gap: 2rem;
  overflow: auto;
  @include scrollbar(transparent, $red, $red);
  padding: 10rem 0;
  margin: -10rem 0;
  scroll-snap-type: x mandatory;

  li {
    scroll-snap-align: start;
  }
}

@include media-breakpoint-down(md) {
  .candidate-posters {
    padding-right: 4rem;
  }
}
</style>