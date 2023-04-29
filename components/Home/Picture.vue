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

const emit = defineEmits(['hover', 'unhover'])

const { $gsap } = useNuxtApp()
const loaded = ref(false)
const main = ref()
const animation = ref()
const picture = ref(null)

const mousePos = useState('mousePos')
const strength = props.proposal.picture.strength
const computedPos = computed(() => {
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
})

onUnmounted(() => {
  animation.value && animation.value.revert()
})

function onEnter (el, done) {
  animation.value = $gsap.context(() => {
    $gsap.fromTo(el, {
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
  }, main.value)
}

const showText = ref(false)
const textCanBeShown = ref(false)
const hover = () => {
  textCanBeShown.value && emit('hover')
  showText.value = true
}
const unhover = () => {
  emit('unhover')
  showText.value = false
}
</script>

<template>
  <a
    :href="`#${id}`"
    :class="['proposal', 'image-to-move', `proposal-${id}`, { dimmed }]"
    :style="{
      ...computedPos,
      width: proposal.picture.width + 'vw',
      minWidth: proposal.picture.minWidth || '200px',
      '--strength': (proposal.picture.strength * 10) + 's'
    }"
    @mouseenter="hover"
    @mouseleave="unhover"
    :tabindex="loaded ? '0' : '-1'"
  >
    <div class="proposal-float">
      <Transition @enter="onEnter" :css="false">
        <img
          v-if="loaded"
          :src="proposal.picture.src"
          ref="picture"
          :alt="proposal.tip"
          class="proposal-picture"
          :style="{
            width: proposal.picture.width + 'vw',
            minWidth: proposal.picture.minWidth || '200px'
          }"
        />
      </Transition>
      <Transition name="fade">
        <div v-if="showText && textCanBeShown" class="proposal-tip" aria-hidden="true">
          {{ proposal.tip }}
        </div>
      </Transition>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.proposal {
  position: absolute;
  display: block;
  transition: opacity .25s ease;

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
    color: $white;
  }

  &:hover {
    z-index: 100;
  }

  &:focus {
    box-shadow: none;
  }

  &:focus-visible {
    outline: 10px $yellow solid;
    outline-offset: 20px;
  }

  &.dimmed {
    opacity: .25;
  }
}

@include media-breakpoint-down(md) {
  .proposal-tip {
    display: none;
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
</style>