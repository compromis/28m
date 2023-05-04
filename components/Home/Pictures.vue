<script setup>
import proposals from '~/content/proposals'
const pictures = Object.entries(proposals)
const hoveredPicture = ref(null)
const openPicture = ref(null)
const { $emit } = useNuxtApp()

const mousePos = useState('mousePos', () => ({ x: 0, y: 0 }))
const setMousePos = ({ pageX, pageY }) => {
  mousePos.value = { x: pageX, y: pageY }
}

onMounted(() => {
  document.addEventListener('mousemove', setMousePos)
})

const closeAll = () => {
  openPicture.value = null
  $emit('closeAll')
}
</script>

<template>
  <HomePicture
    v-for="[id, proposal] in pictures"
    :id="id"
    :proposal="proposal"
    :key="id"
    @hover="hoveredPicture = id"
    @unhover="hoveredPicture = null"
    @show="openPicture = id"
    @hide="openPicture = null"
    :dimmed="(hoveredPicture !== id && !!hoveredPicture && openPicture !== id) || (openPicture !== id && !!openPicture)"
  />
  <Transition name="fade">
    <div class="backdrop" v-if="openPicture" @click="closeAll" />
  </Transition>
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

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $red;
  opacity: .75;
  z-index: 101;
}
</style>
