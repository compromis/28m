<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div>
    <div>
      Language switcher:
      <NuxtLink v-for="locale in locales" :key="locale.code" :to="switchLocalePath(locale.code)">
        {{ locale.name }}
      </NuxtLink>
    </div>

    Nuxt: <NuxtPage />
  </div>
</template>