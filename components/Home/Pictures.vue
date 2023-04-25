<script setup>
import proposals from '~/content/proposals'

/* Pictures */
const pictures = Object.entries(proposals)
const hoveredPicture = ref(null)
</script>

<template>
  <HomePicture
    v-for="[id, proposal] in pictures"
    :id="id"
    :proposal="proposal"
    :key="id"
    @hover="hoveredPicture = id"
    @unhover="hoveredPicture = null"
    :dimmed="hoveredPicture !== id && hoveredPicture" />
</template>