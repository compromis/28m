<script setup>
const { $on, hook, $gsap } = useNuxtApp()

const curtains = ref(null)
const curtainFront = ref(null)
const curtainBack = ref(null)
const animation = ref(null)
const fromPage = ref('index')
const toPage = ref('programa')

const colorCombos = {
  'index': {
    'programa': ['indigo', 'yellow'],
    'candidatura': ['blue', 'yellow'],
    'collabora': ['yellow', 'blue'],
    'actes': ['yellow', 'blue'],
    'proposal': ['yellow', 'blue']
  }
}

const transitionColors = computed(() => colorCombos[fromPage.value][toPage.value])

$on('curtains', ({ from, to }) => {
  fromPage.value = from
  toPage.value = to

  if(animation.value && animation.value.isActive) return

  animation.value = $gsap.timeline({
    paused: true,
    onComplete () {
      animation.value.kill()
      animation.value = null
    }
  })
    .fromTo(curtainBack.value, {
      y: '100%',
    }, {
      y: 0,
      duration: .75,
      ease: 'Power4.easeOut'
    })
    .fromTo(curtainFront.value, {
      y: '100%'
    }, {
      y: 0,
      duration: .75,
      ease: 'Power4.easeOut'
    }, '<.1')
    .addLabel('midway', '>')
    .addPause('midway')
    .to(curtainBack.value, {
      y: '-100%',
      duration: .5,
      ease: 'Power1.easeIn'
    }, '>-.5')
    .to(curtainFront.value, {
      y: '-100%',
      duration: .5,
      ease: 'Power4.easeIn'
    }, '<.5')

    animation.value.play()
})

hook('page:transition:finish', () => {
  if (animation.value && animation.value.isActive()) {
    animation.value.removePause('midway')
  } else if (animation.value) {
    animation.value.resume()
  }
})

onUnmounted(() => {
  animation.value && animation.value.revert()
})
</script>

<template>
  <div class="curtains" ref="curtains">
    <div :class="['curtain', 'curtain-front', `bg-${transitionColors[0]}`]" ref="curtainFront" />
    <div :class="['curtain', 'curtain-back', `bg-${transitionColors[1]}`]" ref="curtainBack" />
  </div>
</template>

<style lang="scss" scoped>
.curtains {
  .curtain {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    transform: translateY(100%);
    pointer-events: none;

    &-front {
      z-index: 9501;
    }

    &-back {
      z-index: 9500;
    }
  }
}
</style>