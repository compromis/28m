<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const candidates = {
  'Joan Baldoví': { class: 'blando' },
  'Aitana Mas': { class: 'aitana' },
  'Vicent Marzà': { class: 'marza' },
  'Mª Josep Amigó': { class: 'amigo' },
  'Joan Ribó': { class: 'ribo' },
}

const combinedSpeakers = computed(() => {
  const speakers = [...props.event.speakers, ...props.event.other_speakers]
  return speakers.map(speaker => {
    if (speaker in candidates) {
      return { ...candidates[speaker], name: speaker }
    }

    return { name: speaker, class: 'other' }
  })
})

function time(date) {
  const { time } = useDate(date)
}

function day(date) {
  const { monthName, day } = useDate(date)
  return `${day.value} ${monthName.value}`
}
</script>

<template>
  <article>
    <h2>{{ event.title }}</h2>
    <div>
      <span v-for="speaker in combinedSpeakers" :key="speaker.name" :class="speaker.class">
        {{ speaker.name }}
      </span>
    </div>
    <div>{{ day(event.date) }}</div>
    <div>{{ time(event.date) }}</div>
    <div>{{ event.venue }}</div>
  </article>
</template>