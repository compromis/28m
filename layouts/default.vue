<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div>
    <nav class="campaign-nav">
      Language switcher:
      <NuxtLink v-for="locale in locales" :key="locale.code" :to="switchLocalePath(locale.code)">
        {{ locale.name }}
      </NuxtLink>
    </nav>

    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
.campaign-nav {
  position: fixed;
}
</style>