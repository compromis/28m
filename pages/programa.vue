<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { $gsap } = useNuxtApp()
const { data: sections } = await useFetch(config.public.apiBase + 'categories')

const inSection = computed(() => {
  return !['/programa/', '/programa', '/cas/programa', '/cas/programa/'].includes(route.path)
})

/*
  $gsap.fromTo('.programa-nav-cover img', {
    "--cover-height": 0,
    "--cover-min-height": 0,
  },{
    "--cover-height": "20vh",
    "--cover-min-height": "300px",
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
    delay: .25,
  })

  $gsap.fromTo('.programa-index', {
    opacity: 0
  }, {
    duration: .25,
    opacity: 1,
    y: 0
  })

  $gsap.fromTo('.programa-category-card', {
    y: -20,
    opacity: 0,
  },{
    duration: .15,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    delay: .5,
  })
})
*/

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
function beforeEnter(el) {
  $gsap.set(el, {
    opacity: 0,
    y: -50
  })
}
  
function onEnter(el, done) {
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

function onLeave(el, done) {
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
  <main :class="['programa', { 'programa-in-section': inSection }]">
    <header class="programa-nav">
      <div class="programa-nav-cover">
        <Transition @before-enter="beforeEnterCover" @enter="onEnterCover" @leave="onLeaveCover" appear>
          <img v-if="!inSection" src="~/assets/images/programa/cover.jpg" alt="Foto de la Generalitat" />
        </Transition>
      </div>
      
      <div class="programa-nav-container">
        <Transition @enter="onEnterPrograma" @leave="onLeavePrograma" mode="out-in" appear>
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

        <Transition :css="false" @before-enter="beforeEnter" @enter="onEnter" @leave="onLeave" appear>
          <ProgramaCategories v-if="!inSection" :sections="sections" />
        </Transition>
      </div>
    </header>

    <section class="programa-content">
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.programa {
  --cover-height: 20vh;
  --cover-min-height: 300px;
  --transition-duration: .5s;

  display: grid;
  grid-template-columns: minmax(100px, 3fr) 1fr;
  transition: all ease-in-out var(--transition-duration);
  transition-delay: var(--transition-duration);
  min-height: 100vh;
  will-change: grid-template-columns;

  &-nav {
    background: $yellow;

    &-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    &-cover {
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
        transform: translate(-.7em, var(--translateY, .2em));
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
      position: fixed;
      bottom: .25em;
      left: -.25em;
      @include font-size(5rem);
      line-height: 1;

      a {
        color: inherit;

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

    & :deep(> *) {
      height: 100%;
      flex-grow: 1;
    }
  }
}

/* When in a section */
.programa-in-section {
  grid-template-columns: minmax(150px, .25fr) 12fr;
}
</style>