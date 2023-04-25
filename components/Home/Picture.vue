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
const main = ref()
const animation = ref()
const picture = ref(null)

onMounted(() => {
  animation.value = $gsap.context(() => {
    $gsap.fromTo(picture.value, {
      scale: 0,
      duration: 1,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay: props.proposal.picture.delay,
      onComplete: () => textCanBeShown.value = true
    })
  }, main.value)
})

onUnmounted(() => {
  animation.value.revert()
})

const showText = ref(false)
const textCanBeShown = ref(false)

const hover = () => {
  emit('hover')
  showText.value = true
}
const unhover = () => {
  emit('unhover')
  showText.value = false
}
</script>

<template>
  <div
    :class="['proposal', `proposal-${id}`, { dimmed }]"
    :style="{ top: proposal.picture.top + '%', left: proposal.picture.left + '%', width: proposal.picture.width + 'vw' }"
    @mouseenter="hover"
    @mouseleave="unhover">
    <img :src="proposal.picture.src" ref="picture" :alt="proposal.tip" class="proposal-picture" :style="{ width: proposal.picture.width + 'vw' }" />
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

  &.dimmed {
    opacity: .25;
  }
}
</style>