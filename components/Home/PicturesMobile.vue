<script setup>
import Moveable from 'vue3-moveable'
import proposals from '~/content/proposals'
const pictures = Object.entries(proposals)
const zIndex = ref(100)
const onDrag = ({ target, transform }) => {
  target.style.transform = transform
  zIndex.value++
  target.style.zIndex = zIndex.value
}
</script>

<template>
  <div class="d-lg-none">
    <template v-for="[id, proposal] in pictures" :key="id">
      <HomePictureMobile
        :id="id"
        :proposal="proposal"
      />
      <Moveable
        className="moveable"
        :target="[`#mproposal-${id}`]"
        :draggable="true"
        @drag="onDrag"
      />
    </template>
  </div>
</template>

<style lang="scss">
@include media-breakpoint-down(md) {
  .proposal-residencies {
    left: 0 !important;
  }

  .proposal-transport-public {
    top: 70% !important;
    left: 3% !important;
  }

  .proposal-habitatge {
    left: 50% !important;
  }

  .proposal-administracio-propera {
    left: 65% !important;
  }
}

.moveable {
  display: none !important;
}
</style>
