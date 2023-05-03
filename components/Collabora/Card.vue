<script setup>
const props = defineProps({
  sticker: {
    type: String,
    default: 'bullhorn'
  },
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
    <div :class="['sticker', `sticker-${sticker}`]">
      <ClientOnly>
        <FontAwesomeIcon :icon="['far', sticker]" />
      </ClientOnly>
    </div>
  </Component>
</template>

<style lang="scss" scoped>
.collabora-card {
  border: 2px solid $white;
  border-radius: 1.25rem;
  color: $white;
  min-height: 300px;
  transition: background .25s ease;
  display: flex;
  flex-direction: column;
  z-index: 5;
  position: relative;

  &:hover {
    background: $white;
    color: $black;
    text-decoration: none;
    z-index: 10;

    .icon {
      opacity: 1;
      transform: translateX(0);
    }

    .sticker {
      opacity: 1;
      --scale: 1;
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

.sticker {
  background: $yellow;
  position: absolute;
  font-size: 4rem;
  border-radius: 100%;
  height: 1.75em;
  width: 1.75em;
  display: grid;
  place-items: center;
  z-index: 10;
  opacity: 0;
  transition: .25s cubic-bezier(0.64, 0.57, 0.67, 1.53);
  color: $white;
  transform: rotate(var(--rotate)) scale(var(--scale, 0));

  
  &-bullhorn {
    top: 20%;
    right: -12%;
   --rotate: -25deg;
  }

  &-id-badge {
    background: $red;
    top: -7%;
    right: 10%;
    --rotate: 15deg;
    border-radius: 1rem 100% 100% 1rem;
  }

  &-arrows-retweet {
    background: $indigo;
    top: 20%;
    right: 10%;
    --rotate: 5deg;
    border-radius: 2rem;
  }

  &-heart {
    background: $pink;
    top: 20%;
    right: -10%;
    --rotate: 15deg;
  }
}

@include media-breakpoint-down(md) {
  .collabora-card {
    background: $white;
    color: $black;
  }

  .buttons :deep(a) {
    color: $black;
    padding: 0;
    margin: 0;
  }

  .sticker {
    opacity: 1;
    --scale: 1;

    &-bullhorn {
      top: 35%;
      right: -1.5rem;
    }

    &-id-badge {
      top: 40%;
      left: -1rem;
      --rotate: -10deg;
    }

    &-arrows-retweet {
      top: 30%;
    }

    &-heart {
      left: 3rem;
      top: 30%;
      --rotate: -20deg;
    }
  }
}
</style>