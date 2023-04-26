<script setup>
import gsap from 'gsap'
// const { $gsap } = useNuxtApp()

/* Animtations */
const main = ref()
const animations = ref()
onMounted(() => {
  console.log('mounted hero')
  setTimeout(animateClaim, 1000)
})

onUnmounted(() => {
  console.log('unmounted hero')
  animations.value.revert()
})

function animateClaim() {
  console.log('animate hero', gsap, document.querySelectorAll('.word-within'))
  animations.value = gsap.context(() => {
    gsap.timeline()
      .fromTo('.word-within', {
        y: '100%',
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: .1,
        duration: .25,
        ease: 'Power4.easeOut'
      })
      .fromTo('.hero-links', {
        y: '100%',
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: .5,
        ease: 'Power4.easeOut'
      })
  }, main.value)
}
</script>

<template>
  <section class="hero">
    <h1 class="hero-claim d-none d-md-block">
      <div v-for="(line, l) in [$t('home.claim_top'), $t('home.claim_bottom')]" :key="l" class="line">
        <span v-for="(word, w) in line.split(' ')" :key="w" class="word">
          <span class="word-within">{{ word }}</span>
        </span>
      </div>
    </h1>
    <h1 class="hero-claim d-md-none">
      <div v-for="(line, l) in [$t('home.claim_mobile_1'), $t('home.claim_mobile_2'), $t('home.claim_mobile_3')]" :key="l" class="line">
        <span v-for="(word, w) in line.split(' ')" :key="w" class="word">
          <span class="word-within">{{ word }}</span>
        </span>
      </div>
    </h1>
    <HomePictures />
    <SiteQuickLinks class="hero-links" />
  </section>
</template>

<style lang="scss">
  .hero {
    display: flex;
    min-height: 100vh;
    min-height: 100svh;
    color: $white;
    padding: calc(var(--site-padding) * 1.25);
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &-claim {
      position: relative;
      font-size: clamp(3.75rem, 10vw, 15rem);
      line-height: .85;
      margin-top: auto;
      z-index: 10;
      pointer-events: none;
    }

    &-links {
      margin-top: auto;
      opacity: 0;
      position: relative;
      z-index: 50;
    }
  }

  .word {
    display: inline-block;
    overflow: hidden;
    padding: .2em .15em .2em 0;
    margin: -.2em 0;

    &-within {
      display: block;
      opacity: 0;
    }
  }

  @include media-breakpoint-down(md) {
    .hero {
      &-claim {
        font-size: 5.5rem;
      }

      &-links {
        overflow-x: auto;
        padding: .5em var(--site-padding);
        margin: auto calc(var(--site-padding) * -1.25) 0;
      }
    }
  }
</style>