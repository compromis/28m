<script setup>
defineProps({
  scrolled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <Transition name="nav">
    <div class="nav-bar scrolled" v-if="scrolled">
      <slot />
    </div>
  </Transition>
  <Transition name="fade">
    <div class="nav-bar" v-if="!scrolled">
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10001;
  color: $white;
  padding: .75rem 1rem;
  --outline-color: #{$white};

  &.scrolled {
    background: $white;
    color: $black;
    z-index: 10002;
    --outline-color: #{$red};
  }
}
</style>