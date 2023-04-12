<script setup>
import GlugSound from '~/assets/sounds/glug-b.mp3'
import PopSound from '~/assets/sounds/pop.mp3'
import axios from 'axios'
import { debounce } from 'lodash'
import confetti from 'canvas-confetti'
const config = useRuntimeConfig()

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  }
})

/* Like functionality */
const timesLiked = ref(0)
const newLikes = ref(0)
const maxLikes = 15
const errored = ref(false)

onMounted(() => {
  const hasLiked = window.localStorage.getItem('liked_' + props.proposal.id)
  timesLiked.value = hasLiked || 0
})

const save = debounce(async () => {
  try {
    await axios.post(`${config.public.apiBase}proposal/${props.proposal.id}/like/?add=${newLikes.value}`)
  } catch(error) {
    errored.value = true
  } finally {
    newLikes.value = 0
  }
}, 500)

const like = () => {
  timesLiked.value++
  newLikes.value++
  props.proposal.likes++
  window.localStorage.setItem('liked_' + props.proposal.id, timesLiked.value)
  save()
  const glug = new Audio(GlugSound)
  const pop = new Audio(PopSound)
  if (timesLiked.value === maxLikes) {
    pop.play()
    throwConfetti()
  } else if (timesLiked.value < maxLikes) {
    glug.play()
  }
}

const button = ref(null)
const throwConfetti = () => {
  const { top, left } = button.value.getBoundingClientRect()
  const maxWidth = window.innerWidth
  const maxHeight = window.innerHeight
  const posX = left / maxWidth
  const posY = top / maxHeight
  console.log(top, left, maxWidth, maxHeight, posX, posY)
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: posX, y: posY }
  })
}

const formattedLikes = computed(() => new Intl.NumberFormat("es-ES").format(props.proposal.likes))
</script>

<template>
  <button ref="button" @click="like" :class="['proposal-like', { liked: timesLiked > 0 }]">
    <div><ProgramaHeart :progress="timesLiked" :max="maxLikes" class="icon" /></div>
    <span>{{ formattedLikes }}</span>
  </button>
</template>

<style lang="scss" scoped>
.proposal-like {
  appearance: none;
  border: 0;
  background: transparent;
  color: $gray-600;

  .icon {
    width: 2em;
    transition: .25s ease;
    margin-bottom: .15rem;
  }

  &:hover {
    color: $red;

    .icon {
      transform: scale(1.25) rotate(4deg);
    }
  }

  &:active {
    .icon {
      transform: scale(1) rotate(4deg);
    }
  }
}
</style>