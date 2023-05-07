<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  proposal: {
    type: Object,
    required: true
  }
})

const { locale } = useI18n()
const { $gsap, $emit } = useNuxtApp()
const loaded = ref(false)
const animation = ref()
const delay = props.proposal.picture.delayMobile || props.proposal.picture.delay

let timeout
let hideTipTimeout
const hideTip = ref(false)
onMounted(() => {
  timeout = setTimeout(() => {
    loaded.value = true
  }, delay * 1000)

  if (props.id === 'educacio') {
    hideTipTimeout = setTimeout(() => {
      hideTip.value = true
    }, 8000)
  }
})

onUnmounted(() => {
  animation.value && animation.value.revert()
  clearTimeout(timeout)
  if (props.id === 'educacio') {
    clearTimeout(hideTipTimeout)
  }
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
    onComplete: done
  })
}

const router = useRouter()
const navigateTo = (to) => {
  $emit('curtains', { from: 'index', to: 'proposal' })
  router.push(to)
}
</script>

<template>
  <div
    :id="`mproposal-${id}`"
    :class="['proposal', `proposal-${id}`, { loaded, hideTip }]"
    :style="{
      left: proposal.picture.left + '%',
      top: proposal.picture.top + '%',
      width: proposal.picture.width + 'vw',
      minWidth: proposal.picture.minWidth || '200px',
      '--strength': (proposal.picture.strength * 10) + 's'
    }"
  >
    <a
      @click.prevent="navigateTo(localePath(`/proposta/${id}`))"
      :href="localePath(`/proposta/${id}`)"
      :tabindex="loaded ? '0' : '-1'"
      :aria-label="`${proposal.content[locale].tip}. ${$t('home.click_to_open')}`"
    >
      <div class="proposal-float">
        <Transition @enter="onEnter" :css="false">
          <img
            v-if="loaded"
            :src="proposal.picture.src"
            :alt="proposal.content[locale].tip"
            class="proposal-picture"
            :style="{
              width: proposal.picture.width + 'vw',
              minWidth: proposal.picture.minWidth || '200px'
            }"
          />
        </Transition>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.proposal {
  position: absolute;
  display: flex;
  transition: opacity .25s ease;

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


  &:hover {
    z-index: 100;
  }
}

@include media-breakpoint-down(lg) {
  .proposal-educacio {
    .proposal-float {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -1em;
        right: 1em;
        width: 2em;
        height: 2em;
        background: $white;
        border-radius: 100%;
        animation: pulse 2s infinite;
        transform: scale(var(--scale, 0));
        transition: 1s ease;
      }
    }

    &.loaded:not(.hideTip) {
      .proposal-float {
        &::after {
          --scale: 1;
        }
      }
    }
  }
}

@keyframes circle {
  from {
    transform: rotate(360deg) translate(-10%) rotate(-360deg);
  }

  to {
    transform: rotate(0deg) translate(-10%) rotate(0deg);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($white, 0.7);
  }
  
  70% {
    box-shadow: 0 0 0 10px rgba($white, 0);
  }
  
  100% {
    box-shadow: 0 0 0 0 rgba($white, 0);
  }
}
</style>