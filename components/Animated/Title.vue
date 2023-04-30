<script setup>
const props = defineProps({
  delay: {
    type: Number,
    default: 1
  }
})

const { $gsap } = useNuxtApp()
let timeout
const animations = ref(null)
const title = ref(null)

onMounted(() => {
  timeout = setTimeout(animateTitle, 500)
})

onUnmounted(() => {
  clearTimeout(timeout)
})

function animateTitle () {
  animations.value = $gsap.to(title.value, {
    y: 0,
    opacity: 1,
    duration: .25,
    delay: props.delay,
    ease: 'Power4.easeOut'
  })
}
</script>

<template>
  <div class="animated-title">
    <div class="animated-title-content" ref="title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.animated-title {
  overflow: hidden;

  &-content {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>