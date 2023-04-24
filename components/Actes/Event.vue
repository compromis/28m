<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const title = computed(() => props.event[1])
const venue = computed(() => props.event[3])

const candidates = {
  JB: { name: 'Joan Baldoví', class: 'blando' },
  AM: { name: 'Aitana Mas', class: 'aitana' },
  VM: { name: 'Vicent Marzà', class: 'marza' },
  MJA: { name: 'Mª Josep Amigó', class: 'amigo' },
  JR: { name: 'Joan Ribó', class: 'ribo' },
}
const speakers = computed(() => {
  return props.event[4].split(', ').map(candidate => {
    if (candidate in candidates) {
      return candidates[candidate]
    }
    return { name: candidate, class: 'other' }
  })
})
const day = computed(() => {
  const { monthName, day } = useDate(props.event[0])
  return `${day.value} ${monthName.value}`
})
const time = computed(() => {
  const { time } = useDate(props.event[0])
  return time.value
})
</script>

<template>
  <article>
    <h2>{{ title }}</h2>
    <div>
      <span v-for="speaker in speakers" :key="speaker.name" :class="speaker.class">
        {{ speaker.name }}
      </span>
    </div>
    <div>{{ day }}</div>
    <div>{{ time }}</div>
    <div>{{ venue }}</div>
  </article>
</template>
