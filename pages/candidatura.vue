<script setup>
/* Transition 
definePageMeta({
  pageTransition: {
    onEnter(el, done) {
      console.log('entering candidates')
      setTimeout(() => done(), 500)
    },
    onLeave(el, done) {
      console.log('leaving candidates')
      setTimeout(() => done(), 500)
    }
  }
})*/
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
}
</style>