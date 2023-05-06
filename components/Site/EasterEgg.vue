<script setup>
const easteregg = ref(null)
const keys = ref([])
const codes = {
  // shake the magic 8 ball at the despatx de comunicació 
  'asktheball': 'https://compromis.net/sub/misc/ball.html',
  // the veep theme song on every compromís website
  'veep': 'https://youtube.com/embed/g2tk7ethx1Q/?autoplay=1',
  // the dream collab
  'tupac': 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F261131021&show_artwork=true',
  'botifarra': 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F261131021&show_artwork=true'
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

function handleKeyDown (e) {
  keys.value.push(e.key)
  const code = Object.keys(codes).find(code => keys.value.join('').indexOf(code) >= 0)
  if (!code) return
  easteregg.value = codes[code]
  keys.value = []
}
</script>

<template>
  <div v-if="easteregg" class="easteregg">
    <button @click="easteregg = null">Tanca</button>
    <iframe width="100%" height="100%" :src="easteregg" frameborder="0"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.easteregg {
  position: fixed;
  display: flex;
  padding: 4rem 2rem 2rem;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9000;
  background: $yellow;
  flex-direction: column;

  button {
    align-self: end;
    border: 0;
    background: $white;
  }
}
</style>