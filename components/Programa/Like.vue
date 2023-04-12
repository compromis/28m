<script setup>
import axios from 'axios'
import { debounce } from 'lodash'
const config = useRuntimeConfig()

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  }
})

/* Like functionality */
const newLikes = ref(0)
const errored = ref(false)
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
  newLikes.value++
  props.proposal.likes++
  save()
}
</script>

<template>
  <button @click="like">{{ proposal.likes }}</button>
</template>
