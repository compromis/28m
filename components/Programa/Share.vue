<template>
  <button class="proposal-share">
    <div><font-awesome-icon :icon="['far', 'share']" class="icon" /></div>
    <span class="label">Compartir</span>
  </button>
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
}
</style>