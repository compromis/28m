<template>
  <article class="collabora-card">
    <h2 class="title"><slot name="title" /></h2>
  </article>
</template>

<style lang="scss" scoped>
.collabora-card {
  border: 2px solid $white;
  border-radius: 1.25rem;
  padding: 1.25rem;
  color: $white;
  min-height: 300px;
}

.title {
  @include font-size(2.25rem);
  font-weight: 500;
  max-width: 15ch;
}
</style>