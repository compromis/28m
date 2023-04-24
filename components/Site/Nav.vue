<script setup>
import CompromisLogo from '@compromis/blobby/components/logos/CompromisLogo.vue'
const { $gsap } = useNuxtApp()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

/* Menu toggler */
const menuShown = ref(false)
const menuScrolled = ref(false)
const showMenu = () => {
  menuShown.value = true
  document.body.classList.add('menu-shown')
}
const hideMenu = () => {
  console.log('hook page:Start')
  menuShown.value = false
  document.body.classList.remove('menu-shown')
}
const toggleMenu = () => {
  if (menuShown.value) {
    hideMenu()
  } else {
    showMenu()
  }
}

/* Close menu on page navigation */
const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', hideMenu)

/* Set white background when page has scrolled */
const onScroll = (e) => {
  menuScrolled.value = window.scrollY > 0
}
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

/* Nav animation */
const onEnterNav = (el, done) => {
  $gsap.fromTo(el, {
    y: '-100%'
  }, {
    y: 0,
    duration: .5,
    ease: 'Power4.easeOut'
  })

  $gsap.fromTo('#SiteMenu .animate', {
    opacity: 0,
    y: '100%'
  }, {
    opacity: 1,
    y: 0,
    duration: .5,
    delay: .25,
    stagger: .1,
    onComplete: done,
    ease: 'Power4.easeOut'
  })
}

const onLeaveNav = (el, done) => {
  $gsap.fromTo(el, {
    y: 0
  }, {
    y: '-100%',
    delay: .75,
    duration: .5,
    onComplete: done,
    ease: 'Power4.easeOut'
  })

  $gsap.fromTo('#SiteMenu .animate', {
    opacity: 1,
    y: 0
  }, {
    opacity: 0,
    y: '100%',
    duration: .5,
    ease: 'Power4.easeOut',
    stagger: {
      from: 'end',
      each: .1
    }
  })
}
</script>

<template>
  <nav :class="['site-nav', { 'menu-shown': menuShown, 'menu-scrolled': menuScrolled && !menuShown }]">
    <SiteNavTransition :scrolled="menuScrolled && !menuShown">
      <div class="site-nav-bar">
        <NuxtLink :to="localePath('/')" aria-label="Compromís (pàgina principal de campanya)">
          <Transition name="fade" mode="out-in">
            <CompromisLogo v-if="menuScrolled && !menuShown" />
            <CompromisLogo mono v-else />
          </Transition>
        </NuxtLink>
        <ul class="site-nav-language">
          <template v-for="lang in locales" :key="lang.code" >
            <Transition name="language">
              <li v-if="menuShown || locale !== lang.code">
                <NuxtLink :to="switchLocalePath(lang.code)">
                  {{ lang.name }}
                </NuxtLink>
              </li>
            </Transition>
          </template>
        </ul>
        <div class="site-nav-burger">
          <button @click="toggleMenu" aria-controls="SiteMenu" :aria-pressed="menuShown ? 'true' : 'false'">
            <ClientOnly>
              <FontAwesomeIcon :icon="['far', 'bars']" fixed-width v-if="!menuShown" />
              <FontAwesomeIcon :icon="['far', 'xmark']" fixed-width v-else />
            </ClientOnly>
            <span class="visually-hidden">{{ menuShown ? 'Amaga el menú' : 'Mostra el menú' }}</span>
          </button>
        </div>
      </div>
    </SiteNavTransition>
    <Transition @enter="onEnterNav" @leave="onLeaveNav">
      <div id="SiteMenu" class="site-nav-menu" v-if="menuShown">
        <SiteMenu />
      </div>
    </Transition>
  </nav>
</template>

<style lang="scss" scoped>
.site-nav {
  &-bar {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.1rem;
  }

  &-language {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: auto;
    gap: 1rem;

    li {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .router-link-active {
      font-weight: 900;
    }
  }

  &-burger {
    button {
      appearance: none;
      background: transparent;
      color: inherit;
      padding: 0;
      margin: 0;
      border: 0;
      font-size: 1.5rem;

      &:focus-visible {
        outline: 3px solid white;
        outline-offset: 3px;
      }
    }
  }

  &-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $yellow;
    z-index: 10000;
    display: flex;
  }

  a {
    color: inherit;

    &:focus {
      box-shadow: none !important;
    }

    &:focus-visible {
      box-shadow: none;
      outline: 3px $white solid;
    }
  }

  :deep(.compromis-logo) {
    height: 1.75rem;
  }
}

/* Language transition */
.language-enter-active,
.language-leave-active {
  transition: max-width 0.5s ease;
  max-width: 300px;
}

.language-enter-from,
.language-leave-to {
  display: inline-block;
  max-width: 0;
  overflow: hidden;
}
</style>