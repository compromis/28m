<script setup>
defineProps({
  fullName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <article>
    <div aria-hidden="true">{{ name }}</div>
    <img :src="picture" :alt="`Foto de ${fullName}`" />
    <div>
      <h4>{{ fullName }}</h4>
      <p>{{ description }}</p>
    </div>
  </article>
</template>