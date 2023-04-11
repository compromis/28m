<script setup>
import axios from 'axios'
import { debounce } from 'lodash'

const config = useRuntimeConfig()
const { locale } = useI18n()

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  },

  showCategory: {
    type: Boolean,
    default: false
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

/* Flaires */
const flaires = computed(() => {
  if (!props.proposal.flair) return []
  return props.proposal.flair.split(',')
})
</script>

<template>
  <article :class="['proposal', { highlighted: proposal.highlighted }]">
    <p>
      {{ proposal[`text_${locale}`] }}
    </p>

    <span v-if="showCategory" :class="['proposal-category', `category-${proposal.subcategory.slug}`]">
      {{ proposal.subcategory.category[`name_${locale}`] }}
    </span>

    <button @click="like">{{ proposal.likes }}</button>

    <span class="flair flair-joves" v-if="flaires.includes('joves')">Joves</span>
    <span class="flair flair-feminisme" v-if="flaires.includes('feminisme')">Feminisme</span>
  </article>
</template>
