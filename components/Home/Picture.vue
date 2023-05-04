<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  proposal: {
    type: Object,
    required: true
  },
  dimmed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['hover', 'unhover', 'show', 'hide'])

const { locale } = useI18n()

const { $gsap, $emit, $on } = useNuxtApp()
const loaded = ref(false)
const animation = ref()
const picture = ref(null)

const mousePos = useState('mousePos')
const strength = props.proposal.picture.strength
const computedPos = computed(() => {
  if (open.value) return null
  const left = props.proposal.picture.left + '%'
  const top = props.proposal.picture.top + '%'

  let transform = {}
  if (typeof window !== 'undefined') {
    const x = (window.innerWidth - mousePos.value.x * strength) / 100
    const y = (window.innerHeight - mousePos.value.y * strength) / 100
    transform = { transform: `translate(${x}px, ${y}px)`}
  }

  return { left, top, ...transform }
})

onMounted(() => {
  setTimeout(() => {
    loaded.value = true
  }, props.proposal.picture.delay * 1000)

  $on('closeAllExcept', (id) => {
    if (id !== props.id) {
      open.value = false
    }
  })

  $on('closeAll', () => {
    open.value = false
  })
})

onUnmounted(() => {
  animation.value && animation.value.revert()
})

function onEnter (el, done) {
  animation.value = $gsap.fromTo(el, {
    scale: 0,
    duration: 1,
    opacity: 0,
    transformOrigin: props.proposal.picture.origin || 'left bottom'
  }, {
    scale: 1,
    opacity: 1,
    duration: 1,
    onStart: () => textCanBeShown.value = true,
    onComplete: done
  })
}

const showText = ref(false)
const textCanBeShown = ref(false)
const contentCanBeShown = ref(false)
const open = ref(false)
const closeButton = ref(null)

const hover = () => {
  textCanBeShown.value && emit('hover')
  showText.value = true
}
const unhover = () => {
  emit('unhover')
  showText.value = false
}
const show = () => {
  textCanBeShown.value && emit('show')
  open.value = true
  $emit('closeAllExcept', props.id)
  setTimeout(() => {
    contentCanBeShown.value = true
  }, 500)
}
const hide = () => {
  contentCanBeShown.value = false
  emit('hide')
  open.value = false
}
</script>

<template>
  <div
    :class="['proposal', 'image-to-move', `proposal-${id}`, { dimmed, open }]"
    :style="{
      ...computedPos,
      width: proposal.picture.width + 'vw',
      minWidth: proposal.picture.minWidth || '200px',
      '--strength': (proposal.picture.strength * 10) + 's'
    }"
  >
    <a 
      :href="localePath(`/proposta/${id}`)"
      @mouseenter="hover"
      @mouseleave="unhover"
      @click.prevent="show"
      :tabindex="loaded ? '0' : '-1'"
      :aria-label="`${proposal.content[locale].tip}. ${$t('home.click_to_open')}`"
      :aria-controls="`${id}Content`"
    >
      <div class="proposal-float">
        <Transition @enter="onEnter" :css="false">
          <img
            v-if="loaded"
            :src="proposal.picture.src"
            ref="picture"
            :alt="proposal.content[locale].tip"
            class="proposal-picture"
            :style="{
              width: proposal.picture.width + 'vw',
              minWidth: proposal.picture.minWidth || '200px'
            }"
          />
        </Transition>
        <Transition name="fade">
          <div v-if="showText && textCanBeShown && !open" class="proposal-tip" aria-hidden="true">
            {{ proposal.content[locale].tip }}
          </div>
        </Transition>
      </div>
    </a>
    <Transition name="open">
      <article v-if="open && contentCanBeShown" class="proposal-content" :id="`${id}Content`">
        <div class="proposal-content-header">
          <h3>{{ proposal.content[locale].title }}</h3>
          <button @click="hide" class="close" :id="`${id}Tanca`" ref="closeButton">
            <ClientOnly>
              <FontAwesomeIcon :icon="['far', 'xmark']" />
              <span class="visually-hidden">{{ $t('home.close') }}</span>
            </ClientOnly>
          </button>
        </div>
        <div class="proposal-content-text">
          <h4>{{ $t('home.all_thats_been_done') }}</h4>
          <div class="text" v-html="proposal.content[locale].textDone"></div>
          <h4>{{ $t('home.all_that_remains_to_be_done') }}</h4>
          <div class="text" v-html="proposal.content[locale].toBeDone"></div>
        </div>
      </article>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.proposal {
  position: absolute;
  display: flex;
  transition: opacity .25s ease, left 1s ease, top 1s ease, width 1s ease;

  a {
    display: block;

    &:focus {
      box-shadow: none;
    }

    &:focus-visible {
      outline: 10px $yellow solid;
      outline-offset: 20px;
    }
  }

  &-float {
    animation: circle var(--strength, 50s) linear infinite;
  }

  &-picture {
    opacity: 0;
  }

  &-tip {
    position: absolute;
    background: $yellow;
    top: 0;
    right: 0;
    padding: 1rem;
    font-size: 1.25rem;
    z-index: 20;
    transform: translate(25%, -50%);
    line-height: 1;
    font-weight: bold;
    min-width: 200px;
    max-width: 400px;
    color: $white;
  }

  &:hover {
    z-index: 100;
  }

  &.dimmed:not(.open) {
    opacity: .25;
  }


  &.open {
    z-index: 102;
    top: 5rem !important;
    left: calc((100vw - 1000px) / 2) !important;
    width: 1000px !important;

    .proposal-float {
      animation: none;
    }

    img {
      width: 400px !important;
      height: 100% !important;
    }
  }

  img {
    transition: width 1s ease, height 1s ease;
  }

  &-content {
    background: $white;
    color: $black;

    &-header {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: $yellow;
      padding: 1.5rem;
      color: $white;
    }

    &-text {
      overflow: auto;
      max-height: 60vh;
      padding: 1.5rem;
      @include scrollbar($white, $red, $red, 6px);

      &::-webkit-scrollbar {
        width: 20px;
      }

      &::-webkit-scrollbar-thumb {
        border: 6px $white solid;
      }
    }

    h3 {
      font-size: 2.5rem;
      line-height: 1;
      margin: 0;
      max-width: 75%;
    }

    h4 {
      font-size: 1.25rem;

      &:not(:first-child) {
        margin-top: 2rem;
      }
    }

    .text {
      font-size: 1.1rem;

      :deep(p) {
        margin-bottom: 1rem;
      }
    }

    button {
      appearance: none;
      border: 0;
      margin-left: auto;
      background: transparent;
      color: inherit;
      transition: color .25s ease;
      font-size: 1.5rem;

      &:hover {
        color: $red;
      }
    }
  }
}

@include media-breakpoint-down(lg) {
  .proposal-tip {
    display: none;
  }

  .proposal {
    pointer-events: none;
  }
}

@keyframes circle {
  from {
    transform: rotate(360deg) translate(-10%) rotate(-360deg);
  }

  to {
    transform: rotate(0deg) translate(-7%) rotate(0deg);
  }
}

.open-enter-active,
.open-leave-active {
  transition: opacity 0.5s ease;
}

.open-enter-from,
.open-leave-to {
  opacity: 0;
}
</style>