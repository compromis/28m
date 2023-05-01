<script setup>
const props = defineProps({
  href: {
    type: String,
    default: null
  }
})

const tag = computed(() => props.href ? 'a' : 'div')
</script>

<template>
  <Component :is="tag" :href="href" class="collabora-card">
    <h2 class="title"><slot name="title" /></h2>

    <div class="bottom cta" v-if="href">
      <slot name="button" />
      <ClientOnly>
        <font-awesome-icon :icon="['far', 'arrow-right']" class="icon" />
      </ClientOnly>
    </div>
    <div v-else class="bottom buttons">
      <slot name="buttons" />
    </div>
  </Component>
</template>

<style lang="scss" scoped>
.collabora-card {
  border: 2px solid $white;
  border-radius: 1.25rem;
  color: $white;
  min-height: 300px;
  transition: .25s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    background: $white;
    color: $black;
    text-decoration: none;

    .icon {
      opacity: 1;
      transform: translateX(0);
    }

    :deep(a) {
      color: $black;
    }
  }

  &:focus,
  &:focus-within {
    outline: 5px white solid;
  }
}

.title {
  font-size: 2.25rem;
  font-weight: 500;
  max-width: 15ch;
  pointer-events: none;
  padding: 1.25rem;
}

.bottom {
  border-top: 2px solid $white;
  padding: 1.25rem;
  margin-top: auto;
  font-size: 1.5rem;
  line-height: 1;
}

.buttons {
  display: flex;
  padding-left: .5rem;
  padding-right: .5rem;

  :deep(a) {
    color: $white;
    padding: .75rem 1.5rem;
    margin: -.75rem 0;
    text-align: center;
    border-radius: .5rem;
    transition: .25s ease;
    flex-grow: 1;

    &:first-child {
      border-bottom-left-radius: 1rem;
    }

    &:last-child {
      border-bottom-right-radius: 1rem;
    }

    &:hover {
      background: $lightblue;
      text-decoration: none;
    }
  }
}

.cta {
  display: flex;
  justify-content: space-between;

  .icon {
    opacity: 0;
    transform: translateX(-1rem);
    transition: .25s ease;
    color: $black;
  }
}
</style>