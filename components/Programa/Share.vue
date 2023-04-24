<script setup>
const dialogOpen = ref(false)
</script>

<template>
  <div>
    <button class="proposal-share" @click="dialogOpen = !dialogOpen">
      <ClientOnly><FontAwesomeIcon :icon="['far', 'share']" class="icon" /></ClientOnly>
      <span class="label">Compartir</span>
    </button>
    <Transition name="fade-up">
      <div v-if="dialogOpen" class="proposal-share-dialog">
        Share dialog
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.proposal-share {
  appearance: none;
  border: 0;
  background: transparent;
  color: $gray-600;
  margin-top: .5rem;
  line-height: 1;
  position: relative;

  .icon {
    font-size: 1.5rem;
    transition: .25s ease;
    margin-bottom: .25rem;
  }

  .label {
    border-radius: .5rem;
    position: absolute;
    right: 0;
    opacity: 0;
    transition: .25s ease;
  }

  &:hover {
    color: $red;
  
    .icon {
      transform: scale(1.25) rotate(4deg);
    }

    .label {
      opacity: 1;
    } 
  }

  &:active {
    .icon {
      transform: scale(1) rotate(4deg);
    }
  }

  &-dialog {
    position: absolute;
    background: $white;
  }
}
</style>