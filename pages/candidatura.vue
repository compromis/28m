<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

let timeout
const animations = ref()

onMounted(() => {
  timeout = setTimeout(animateItems, 500)
})

onUnmounted(() => {
  clearTimeout(timeout)
})

function animateItems () {
  animations.value = $ScrollTrigger.batch(".animated-item", {
    onEnter: elements => {
      $gsap.fromTo(elements, {
        opacity: 0,
        y: 50,
      },{
        opacity: 1,
        y: 0,
        duration: 1.25,
        stagger: 0.15,
        ease: 'Power4.easeOut'
      });
    },
    start: "top 80%",
    once: true
  })
}
</script>

<template>
  <main class="candidatura">
    <CandidaturaAutonomica />
    <CandidaturaLocal />
  </main>
</template>

<style lang="scss" scoped>
.candidatura {
  background-color: $yellow;
  color: $red;
  --candidatura-container-max-width: #{map-get($container-max-widths, 'xxl')};
  padding-top: calc(var(--nav-safe-area) + 2rem + 5vh);
}
</style>

<style lang="scss">
.candidatura {
  .animated-item {
    opacity: 0;
  }
}

.candidatura-container {
  max-width: var(--candidatura-container-max-width);
  margin: 0 auto;
}

.candidate-posters {
  display: flex;
  gap: 2rem;
  overflow: auto;
  @include scrollbar(transparent, $red, $red);
  padding: 10rem 0;
  margin: -10rem 0;
}

@include media-breakpoint-down(md) {
  .candidate-posters {
    padding-right: 4rem;
  }
}
</style>