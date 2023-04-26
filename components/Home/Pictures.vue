<script setup>
import proposals from '~/content/proposals'
const pictures = Object.entries(proposals)
const hoveredPicture = ref(null)

const mousePos = useState('mousePos', () => ({ x: 0, y: 0 }))
const prevMousePos = useState('prevMousePos', () => ({ x: 0, y: 0 }))
const setMousePos = ({ pageX, pageY }) => {
  mousePos.value = { x: pageX - prevMousePos.value.x, y: pageY - prevMousePos.value.y }
  prevMousePos.value = { x: pageX, y: pageY }
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
