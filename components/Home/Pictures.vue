<script setup>
import proposals from '~/content/proposals'
const pictures = Object.entries(proposals)
const hoveredPicture = ref(null)

const mousePos = useState('mousePos', () => ({ x: 0, y: 0 }))
const setMousePos = ({ pageX, pageY }) => {
  mousePos.value = { x: pageX, y: pageY }
}

onMounted(() => {
  document.addEventListener('mousemove', setMousePos)
})
</script>

<template>
  <HomePicture
    v-for="[id, proposal] in pictures"
    :id="id"
    :proposal="proposal"
    :key="id"
    @hover="hoveredPicture = id"
    @unhover="hoveredPicture = null"
    :dimmed="hoveredPicture !== id && !!hoveredPicture"
  />
</template>

<style lang="scss">
@include media-breakpoint-down(md) {
  .proposal-prop4 {
    left: 0 !important;
  }

  .proposal-prop5 {
    top: 70% !important;
    left: 3% !important;
  }

  .proposal-prop6 {
    left: 50% !important;
  }

  .proposal-prop10 {
    left: 65% !important;
  }
}
</style>
