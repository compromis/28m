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
  <article class="event">
    <h2 class="title">{{ event.title }}</h2>
    <div class="speakers">
      <span v-for="speaker in event.speakers" :key="speaker.name" :class="speaker.class">
        {{ speaker.name }}
      </span>
    </div>
    <div class="info">
      {{ event.info }}
    </div>
    <div class="date">
      {{ day }}
    </div>
    <div class="time">
      {{ time }}
    </div>
    <div class="venue">
      {{ event.venue === '?' ? 'Per determinar' : event.venue }}
    </div>
    <div class="baldoneta" v-if="event.baldoneta" />
  </article>
</template>

<style lang="scss" scoped>
.event {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 2fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "title title title speakers"
    "info info info info"
    "date time venue venue";
  font-size: 1.25rem;
  gap: 1rem;
  position: relative;
  min-height: 150px;
}

.title {
  grid-area: title;
  font-weight: 500;
  font-size: 2rem;
  margin: 0;
}

.speakers {
  grid-area: speakers;
  display: flex;
  gap: .75rem;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;

  & > span {
    display: flex;
    align-items: center;
    gap: .4rem;
    font-weight: 900;
    flex-shrink: 0;
    line-height: 1;
    color: $blue;

    &::before {
      content: '';
      display: inline-block;
      background-color: currentColor;
      height: .75em;
      width: .75em;
      border-radius: 100%;
    }
  }

  .baldo {
    color: $red;
  }

  .amigo {
    color: $yellow;
  }
}

.info {
  grid-area: info;
}

.date {
  grid-area: date;
}

.time {
  grid-area: time;
}

.venue {
  grid-area: venue;
  text-align: right;
}

.baldoneta {
  position: absolute;
}
</style>
