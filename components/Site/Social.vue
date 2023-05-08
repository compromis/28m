<script setup>
const links = [
  { icon: 'tiktok', text: 'TikTok', href: 'https://www.tiktok.com/@compromis_net' },
  { icon: 'instagram', text: 'Instagram', href: 'https://instagram.com/compromis' },
  { icon: 'twitter', text: 'Twitter', href: 'https://twitter.com/compromis' },
  { icon: 'facebook', text: 'Facebook', href: 'https://www.facebook.com/coaliciocompromis' }
]
</script>

<template>
  <ul aria-label="Xarxes socials" class="social-networks list-unstyled">
    <li v-for="link in links">
      <a :href="link.href" target="_blank" rel="noopener">
        <ClientOnly>
          <font-awesome-icon :icon="['fab', link.icon]" />
        </ClientOnly>
        <span class="visually-hidden">
          {{ link.text }}
        </span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.social-networks {
  margin: 0;
  display: flex;
  gap: .5em;

  a {
    color: inherit;
  }
}
</style>