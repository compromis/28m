<script setup>
import proposals from '~/content/proposals'
const entries = Object.entries(proposals)
const route = useRoute()

const showModal = ref(null)

onMounted(() => {
  showModal.value = route.hash.replaceAll('#', '')
})

watch(() => route.hash, (hash) => {
  showModal.value = hash.replaceAll('#', '')
})

watch(showModal, (modal) => {
  if (modal) {
    document.body.classList.add('menu-shown')
  } else {
    document.body.classList.remove('menu-shown')
  }
})
</script>

<template>
  <div class="home-modals">
    <template v-for="[slug, proposal] in entries" :key="slug">
      <Transition name="fade">
        <article class="home-modal" v-show="showModal === slug" :id="slug">
          <button @click="showModal = null">Tanca</button>
          <h2>{{ proposal.title }}</h2>
          <div v-html="proposal.text"></div>
        </article>
      </Transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home-modal {
  --modal-padding: 2rem;
  position: fixed;
  background: $red;
  top: var(--nav-safe-area);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9000;
}
</style>