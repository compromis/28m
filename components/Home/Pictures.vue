<script setup>
import Moveable from 'vue3-moveable'
import proposals from '~/content/proposals'
const pictures = Object.entries(proposals)
const hoveredPicture = ref(null)
const openPicture = ref(null)
const { $emit } = useNuxtApp()

const mousePos = useState('mousePos', () => ({ x: 0, y: 0 }))
const setMousePos = ({ pageX, pageY }) => {
  mousePos.value = { x: pageX, y: pageY }
}

const startMoving = ref(false)
onMounted(() => {
  document.addEventListener('mousemove', setMousePos)
  setTimeout(() => {
    startMoving.value = true
  }, 500)
})

const closeAll = () => {
  openPicture.value = null
  $emit('closeAll')
}

const zIndex = ref(100)
const onDrag = ({ target, transform }) => {
  target.style.transform = transform
  target.style.transition = 'none'
  zIndex.value++
  target.style.zIndex = zIndex.value
}
const onDragEnd = ({ target }) => {
  target.style.transition = 'opacity .25s ease, left 1s ease, top 1s ease, width 1s ease, transform 1s ease'
}
</script>

<template>
  <div class="d-none d-lg-block">
    <template v-for="[id, proposal] in pictures" :key="id">
      <HomePicture
        :id="id"
        :proposal="proposal"
        @hover="hoveredPicture = id"
        @unhover="hoveredPicture = null"
        @show="openPicture = id"
        @hide="openPicture = null"
        :dimmed="(hoveredPicture !== id && !!hoveredPicture && openPicture !== id) || (openPicture !== id && !!openPicture)"
      />
      <Moveable
        v-if="startMoving"
        className="moveable"
        :target="[`#dproposal-${id}`]"
        :draggable="true"
        @drag="onDrag"
        @dragEnd="onDragEnd"
      />
    </template>
    <Transition name="fade">
      <div class="backdrop" v-if="openPicture" @click="closeAll" />
    </Transition>
  </div>
</template>

<style lang="scss">
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
