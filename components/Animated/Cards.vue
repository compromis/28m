<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

let timeout
const animations = ref()

onMounted(() => {
  timeout = setTimeout(animateCard, 1000)  
})

onUnmounted(() => {
  clearTimeout(timeout)
})

function animateCard () {
  animations.value = $ScrollTrigger.batch(".animated-card", {
    onEnter: elements => {
      $gsap.fromTo(elements, {
        opacity: 0,
        y: 50,
        scale: 0.85,
      },{
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.25,
        stagger: 0.15,
        ease: 'Elastic.easeOut'
      });
    },
    once: true
  })
}
</script>

<template>
  <div class="animated-cards">
    <slot />
  </div>
</template>