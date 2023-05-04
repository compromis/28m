<script setup>
const emit = defineEmits(['select'])

// Menu
const primaryMenu = [
  { id: 'home', to: '/', image: '/images/menu/importa.jpg', offsetX: 50, offsetY: -100 },
  { id: 'programa', to: '/programa', image: '/images/menu/programa.jpg', offsetX: -50, offsetY: -100 },
  { id: 'candidatura', to: '/candidatura', image: '/images/menu/baldo.jpg', offsetX: 50, offsetY: -200 },
  { id: 'collabora', to: '/collabora', image: '/images/menu/collabora.jpg', offsetX: -50, offsetY: -100 },
  { id: 'actes', to: '/actes', image: '/images/menu/actes.jpg', offsetX: -50, offsetY: -100 },
]

const secondaryMenu = [
  { id: 'info', to: 'https://compromis.net/?override=1' },  
  { id: 'news', to: 'https://compromis.net/?override=1' },
  { id: 'transparency', to: 'https://compromis.net/transparencia' },
  { id: 'campaigns', to: 'https://compromis.net/campanyes' },
  { id: 'donations', to: 'https://donacions.compromis.net' },
  { id: 'espai', to: 'https://compromis.net/espai' },
]

// Hover effects
const hovering = ref('none')
const showImage = ref(false)
const offsetImage = reactive({ x: 50, y: -100 })
let animationFrame
let animation

const hover = (section, { x, y }) => {
  hovering.value = section
  showImage.value = true
  offsetImage.x = x
  offsetImage.y = y
  animationFrame = requestAnimationFrame(followMouse)
  animateImage(section)
}

const unhover = () => {
  showImage.value = false
  animation && animation.revert()
  cancelAnimationFrame(animationFrame)
}

// Image
const { $gsap } = useNuxtApp()
const mousePos = reactive({ x: 0, y: 0 })
const imagePos = reactive({ x: 0, y: 0 })
const followMouse = () => {
  
  // 1. find distance X , distance Y
  const distX = mousePos.x - imagePos.x + offsetImage.x
  const distY = mousePos.y - imagePos.y + offsetImage.y

  // Easing motion
  // Progressive reduction of distance
  imagePos.x = imagePos.x + (distX / 10)
  imagePos.y = imagePos.y + (distY / 6)

  animationFrame = requestAnimationFrame(followMouse)
}

const animateImage = (section) => {
  animation && animation.kill()
  animation = $gsap.fromTo(`#image-${section}`, {
    scale: .5,
  }, {
    scale: 1,
    opacity: 1,
    duration: .75,
    ease: 'Power4.easeOut'
  })
}

const setMousePos = ({ clientX, clientY }) => {
  mousePos.x = clientX
  mousePos.y = clientY
}

const select = () => {
  unhover()
  emit('select')
}

onMounted(() => {
  document.addEventListener('mousemove', setMousePos)
})

onUnmounted(() => {
  animation && animation.revert()
  cancelAnimationFrame(animationFrame)
  document.removeEventListener('mousemove', setMousePos)
})
</script>

<template>
  <div :class="['menu', `hover-${hovering}`]">
    <div class="contained">
      <div class="menu-section animate">28M</div>
    </div>
    <ul class="menu-primary list-unstyled" aria-label="Menú principal">
      <li v-for="item in primaryMenu" :key="item.id" :class="item.id" class="contained">
        <nuxt-link
          :to="localePath(item.to)"
          @mouseenter="hover(item.id, { x: item.offsetX, y: item.offsetY })"
          @mouseleave="unhover"
          @click="select"
          class="animate">
          {{ $t('menu.' + item.id) }}
        </nuxt-link>
        <div class="d-none d-md-block">
          <div class="floaty-thumbnail"
            :id="`image-${item.id}`"
            v-show="hovering === item.id && showImage"
            :style="{
              left: imagePos.x + 'px',
              top: imagePos.y + 'px'
            }">
            <img :src="item.image" alt="" />
          </div>
        </div>
      </li>
    </ul>

    <div class="menu-bottom contained">
      <div class="menu-bottom-secondary animate">
        <div class="menu-section">
          <a href="https://compromis.net/?override=1">compromís.net</a>
        </div>
        <ul class="menu-secondary list-unstyled" aria-label="Menú de compromis.net">
          <li v-for="item in secondaryMenu" :key="item.id">
            <a :href="item.to">
              {{ $t('menu.' + item.id) }}
            </a>
          </li>
        </ul>
      </div>
      <div class="menu-bottom-social-networks animate">
        <SiteSocial />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: calc(var(--site-padding) * 1.25);
  padding-top: calc(var(--nav-safe-area) * 2);
  background-color: var(--menu-bg-color, #{$yellow});
  color: $white;
  transition: background-color .2s ease;
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  will-change: background-color;

  a {
    color: $white;

    &:hover {
      color: $white;
      text-decoration-color: rgba($white, .25);
    }

    &:focus {
      box-shadow: none !important;
    }

    &:focus-visible {
      box-shadow: none;
      outline: 4px $white solid;
      outline-offset: 5px;
    }
  }

  &-section {
    font-weight: 900;
    @include font-size(1.5rem);
  }

  &-primary {
    @include padding-bottom(3rem);
    margin-bottom: auto;

    a {
      display: block;
      font-size: clamp(2.75rem, 5.5vw, 8rem);
      font-weight: 900;
      line-height: 1;

      &:hover {
        text-decoration: none;
        color: var(--menu-link-color, #{$white});
        position: relative;
        z-index: 200;
      }
    }

    .floaty-thumbnail {
      position: fixed;
      pointer-events: none;
      z-index: 100;
      will-change: left top;

      img {
        max-width: 350px;
        max-height: 350px;
        object-fit: contain;
      }
    }
  }

  &-secondary {
    display: flex;
    gap: 1em;
    font-size: clamp(1.25rem, 1.35vw, 2rem);
    margin: 0;

    a {
      white-space: nowrap;
      line-height: 1;
    }
  }

  &-bottom {
    display: flex;

    &-social-networks {
      margin-left: auto;
      align-self: flex-end;
      font-size: clamp(1.25rem, 1.35vw, 2rem);
    }
  }
}

.hover {
  &-home {
    --menu-bg-color: #{$red};
    --menu-link-color: #{$lightblue};
  }

  &-programa {
    --menu-bg-color: #{$blue};
    --menu-link-color: #{$yellow};
  }

  &-candidatura {
    --menu-bg-color: #{$yellow};
    --menu-link-color: #{$red};
  }

  &-collabora {
    --menu-bg-color: #{$blue};
    --menu-link-color: #{$lightblue};
  }

  &-actes {
    --menu-bg-color: #{$indigo};
    --menu-link-color: #{$yellow};
  }
}

.contained {
  overflow: hidden;
  padding: .5em 0;
  margin: -.5em 0;
  flex-shrink: 0;
}

@include media-breakpoint-down(md) {
  .menu {
    &-primary {
      a {
        line-height: 1.1;
      }
    }

    &-secondary {
      flex-direction: column;
      gap: 0;
      line-height: 1.25;
    }

    :deep(.social-networks) {
      flex-direction: column;
    }
  }
}
</style>