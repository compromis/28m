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

const holder = ref(null)
const mousePos = useState('mousePos')
const movementStrength = props.proposal.picture.strength
const computedPos = computed(() => {
  if (!holder.value) {
    return { left: props.proposal.picture.left + '%', top: props.proposal.picture.top + '%' }
  }

  const left = (holder.value.offsetLeft) - (mousePos.value.x / movementStrength)  + 'px'
  const top = (holder.value.offsetTop) - (mousePos.value.y / movementStrength) + 'px'

  return { left, top }
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
  <div
    ref="holder"
    :class="['proposal', 'image-to-move', `proposal-${id}`, { dimmed }]"
    :style="{
      ...computedPos,
      width: proposal.picture.width + 'vw'
    }"
    @mouseenter="hover"
    @mouseleave="unhover"
  >
    <Transition @enter="onEnter" :css="false">
      <img v-if="loaded" :src="proposal.picture.src" ref="picture" :alt="proposal.tip" class="proposal-picture" :style="{ width: proposal.picture.width + 'vw' }" />
    </Transition>
    <Transition name="fade">
      <div v-if="showText && textCanBeShown" class="proposal-tip" aria-hidden="true">
        {{ proposal.tip }}
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.proposal {
  position: absolute;
  transition: opacity .2s ease;
  background: purple;
  animation: circle 50s linear infinite;

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
  }

  &:hover {
    z-index: 100;
  }

  &.dimmed {
    opacity: .25;
  }
}

@keyframes circle {
  from {
    transform: rotate(360deg) translate(-50px) rotate(-360deg);
  }

  to {
    transform: rotate(0deg) translate(-30px) rotate(0deg);
  }
}
</style>