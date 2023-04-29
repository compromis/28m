<script setup>
/* Meta tags */
const { t } = useI18n()
useServerSeoMeta({
  title: () => t('meta.home.title'),
  ogTitle: () => t('meta.home.title'),
  description: () => t('meta.home.description'),
  ogDescription: () => t('meta.home.description'),
  ogImage: () => t('meta.home.ogImage'),
  twitterCard: 'summary_large_image',
})

/* Transition 
definePageMeta({
  pageTransition: {
    onEnter(el, done) {
      console.log('entering')
      setTimeout(() => done(), 500)
    },
    onLeave(el, done) {
      console.log('leaving')
      const { $gsap } = useNuxtApp()
      $gsap.to(`.hero-claim .word-within`, {
        yPercent: 100,
        opacity: 0,
        stagger: {
          from: 'end',
          each: .1
        },
        duration: .5,
        ease: 'Power4.easeOut',
      })

      $gsap.to(`.quick-links`, {
        yPercent: 100,
        opacity: 0,
        duration: .5,
        ease: 'Power4.easeOut',
        onComplete: done,
        delay: 2
      })
    }
  }
})*/
</script>

<template>
  <main>
    <HomeHero />
    <HomeProposals />
    <HomeModal />
  </main>
</template>
