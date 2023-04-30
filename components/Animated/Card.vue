<template>
  <article class="animated-card">
    <slot />
  </article>
</template>

<style lang="scss">
.animated-card {
  background: $white;
  opacity: 0;
  border-radius: 1rem;
  padding: 1rem;
}
</style>