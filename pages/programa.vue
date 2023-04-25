<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { $gsap } = useNuxtApp()
const { data: sections } = await useFetch(config.public.apiBase + 'categories/')

const inSection = computed(() => {
  return route.name.startsWith('programa-slug')
})

/* Cover animation */
function beforeEnterCover(el) {
  $gsap.set(el, {
    "--cover-height": 0,
    "--cover-min-height": 0
  })
}
function onEnterCover(el, done) {
  $gsap.to(el, {
    "--cover-height": "20vh",
    "--cover-min-height": "300px",
    duration: .5,
    delay: 1,
    onComplete: done
  })
}

function onLeaveCover(el, done) {
  $gsap.to(el, {
    "--cover-height": 0,
    "--cover-min-height": 0,
    duration: .25,
    onComplete: done
  })
}

/* Top mobile */
function beforeEnterTop(el) {
  $gsap.set(el, {
    y: '-100%'
  })
}

function onEnterTop(el, done) {
  $gsap.to(el, {
    y: 0,
    duration: .5,
    delay: 1,
    onComplete: done
  })
}

function onLeaveTop(el, done) {
  $gsap.to(el, {
    y: '-100%',
    duration: 1,
    onComplete: done
  })
}

/* Programa title animations */
function onEnterPrograma(el, done) {
  $gsap.fromTo('.programa-nav-title-inverted', {
    opacity: 0,
  }, {
    opacity: 1,
    duration: .5
  })

  $gsap.fromTo('.programa-nav-title span', {
    y: -20,
    opacity: 0,
  },{
    duration: .5,
    opacity: 1,
    y: 0,
    stagger: 0.2,
    delay: .75,
    onComplete: done
  })
}

function onLeavePrograma(el, done) {
  $gsap.fromTo('.programa-nav-title-inverted', {
    opacity: 1,
  }, {
    opacity: 0,
    duration: .5
  })

  $gsap.to('.programa-nav-title span', {
    duration: .5,
    opacity: 0,
    y: -25,
    stagger: 0.1,
    onComplete: done
  })
}

/* Categories animations */
function beforeEnterCategories(el) {
  $gsap.set(el, {
    opacity: 0,
    y: -50
  })
}
  
function onEnterCategories(el, done) {
  $gsap.to(el, {
    duration: .5,
    opacity: 1,
    delay: 1,
    y: 0,
    onComplete: done
  })

  $gsap.fromTo('.programa-category-card', {
    y: -20,
    opacity: 0,
  },{
    duration: .15,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    delay: 1,
  })
}

function onLeaveCategories(el, done) {
	$gsap.to(el, {
    duration: .5,
    opacity: 0,
    onComplete: done
  })

  $gsap.to('.programa-category-card', {
    duration: .15,
    opacity: 0,
    y: -25,
    stagger: 0.1
  })
}
</script>

<template>
  <div>
    <main :class="['programa', { 'programa-in-section': inSection }]">
      <header class="programa-nav">
        <div class="programa-nav-cover">
          <Transition @before-enter="beforeEnterCover" @enter="onEnterCover" @leave="onLeaveCover">
            <img v-if="!inSection" src="~/assets/images/programa/cover.jpg" alt="Foto de la Generalitat" />
          </Transition>

          <Transition @before-enter="beforeEnterTop" @enter="onEnterTop" @leave="onLeaveTop">
            <a href="#content" v-if="!inSection" class="programa-nav-top d-md-none">
              <h2>
                {{ $t('programa.proposals') }}
                <span class="sticker circle bg-yellow">TOP</span>
              </h2>
            </a>
          </Transition>
        </div>
        
        <div class="programa-nav-container">
          <Transition @enter="onEnterPrograma" @leave="onLeavePrograma" mode="out-in">
            <h1 v-if="!inSection" class="programa-nav-title" key="main-title">
              <nuxt-link :to="localePath('/programa')">
                <span class="text">{{ $t('programa.title') }}</span>
                <span class="sticker rounded bg-blue">2023</span>
              </nuxt-link>
            </h1>
            <h1 v-else class="programa-nav-title-inverted" key="nav-title">
              <nuxt-link :to="localePath('/programa')">
                <span class="text">{{ $t('programa.title') }}</span>
                <span class="sticker rounded bg-blue">2023</span>
              </nuxt-link>
            </h1>
          </Transition>

          <Transition :css="false" @before-enter="beforeEnterCategories" @enter="onEnterCategories" @leave="onLeaveCategories">
            <ProgramaCategories v-if="!inSection" :sections="sections" />
          </Transition>
        </div>
      </header>

      <section class="programa-content" id="content">
        <NuxtPage />
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.programa {
  --cover-height: 20vh;
  --cover-min-height: 300px;
  --transition-duration: .5s;

  display: grid;
  grid-template-columns: minmax(120px, 2.5fr) 1fr;
  transition: all ease-in-out var(--transition-duration);
  transition-delay: var(--transition-duration);
  min-height: 100vh;
  will-change: grid-template-columns;

  &-nav {
    background: $yellow;

    &-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
      padding: var(--site-padding);
    }

    &-cover {
      position: relative;
      height: var(--cover-height);
      min-height: var(--cover-min-height);

      img {
        display: block;
        width: 100%;
        height: var(--cover-height);
        object-fit: cover;
        min-height: var(--cover-min-height);
      }
    }

    &-title {
      color: $white;
      @include font-size(6.5rem);
      position: relative;  

      a {
        color: inherit;

        &:hover {
          text-decoration-color: rgba($white, .25);
        }
      }

      .sticker {
        position: absolute;
        font-size: .35em;
        transform: translate(-.7em, var(--translateY, .25em));
      }

      span {
        display: inline-block;
      }
    }

    &-title-inverted {
      color: $white;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
      @include font-size(3rem);
      line-height: 1;
      position: fixed;
      bottom: 0;
      left: 0;
      background: $yellow;
      width: 100px;
      padding: 1rem;
      margin: 0;
      display: flex;
      align-items: center;

      a {
        color: inherit;
        transform: translateX(10%);

        &:hover {
          text-decoration-color: rgba($white, .25);
        }
      }

      .sticker {
        position: absolute;
        font-size: .35em;
        transform: translate(.25em, -.75em);
        padding: .5em .25em;
      }
    }
  }

  &-content {
    background: $red;
    display: flex;
    overflow: hidden;

    & :deep(> *) {
      height: 100%;
      flex-grow: 1;
    }
  }
}

/* When in a section */
.programa-in-section {
  grid-template-columns: minmax(100px, .25fr) 12fr;
}

/* Mobile */
@include media-breakpoint-down(md) {
  .programa {
    grid-template-columns: 1fr;

    &-nav {
      &-container {
        transition: .5s ease;
      }

      &-title-inverted {
        writing-mode: unset;
        text-orientation: unset;
        transform: unset;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: unset;
        background: $yellow;
        width: 100%;
        z-index: 1000;

        a {
          margin-left: -1rem;

          .sticker {
            transform: translate(-0.5em, 0);
          }
        }
      }

      &-top {
        position: absolute;
        background: $red;
        right: 0;
        top: 0;
        bottom: 0;
        color: $white;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        padding: 1rem;
        overflow: hidden;
        height: var(--cover-height);
        min-height: var(--cover-min-height);

        h2 {
          padding: 0;
          margin: 0;
        }
      }
    }

    &-in-section {
      .programa-nav-container {
        padding: 0;
      }

      .programa-nav-cover {
        --cover-height: 0;
        --cover-min-height: 0;
      }
    }
  }
}
</style>