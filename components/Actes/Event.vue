<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const day = computed(() => {
  const { monthName, day } = useDate(props.event.date)
  return `${day.value} ${monthName.value}`
})
const time = computed(() => {
  const { time } = useDate(props.event.date)
  return time.value
})
</script>

<template>
  <article>
    <h2>{{ event.title }}</h2>
    <div>
      <span v-for="speaker in event.speakers" :key="speaker.name" :class="speaker.class">
        {{ speaker.name }}
      </span>
    </div>
    <div>{{ day }}</div>
    <div>{{ time }}</div>
    <div>{{ event.municipality }}</div>
    <div>{{ event.venue }}</div>
    <div>{{ event.info }}</div>
    <div>{{ event.baldoneta }}</div>
  </article>
</template>
