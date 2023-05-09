<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
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
  <article :class="['event', { compact, 'has-baldoneta': event.baldoneta }]">
    <h2 class="title">{{ event.title }}</h2>
    <div class="speakers">
      <span v-for="speaker in event.speakers" :key="speaker.name" :class="speaker.class">
        <img src="~/assets/images/actes/baldo.svg" v-if="speaker.class === 'baldo'" alt="" />
        <img src="~/assets/images/actes/ribo.svg" v-if="speaker.class === 'ribo'" alt="" />
        <img src="~/assets/images/actes/aitana.svg" v-if="speaker.class === 'aitana'" alt="" />
        <img src="~/assets/images/actes/amigo.svg" v-if="speaker.class === 'amigo'" alt="" />
        <img src="~/assets/images/actes/marza.svg" v-if="speaker.class === 'marza'" alt="" />
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
      <br>
      <strong>{{ event.municipality }}</strong>
    </div>
    <div class="baldoneta" v-if="event.baldoneta">
      <img src="~/assets/images/actes/baldoneta.png" alt="Baldoneta" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.event {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 2fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "title title title speakers"
    "info info info baldoneta"
    "date time venue venue";
  font-size: 1.25rem;
  gap: 1rem;
  position: relative;
  min-height: 150px;
  line-height: 1;
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
  column-gap: .75rem;
  row-gap: .25rem;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;
  align-self: start;

  & > span {
    display: flex;
    align-items: center;
    gap: .4rem;
    font-weight: 900;
    flex-shrink: 0;
    line-height: 1;
    color: $blue;

    img {
      height: 1em;
    }
  }

  .other::before {
    content: '';
    display: inline-block;
    background-color: currentColor;
    height: .75em;
    width: .75em;
    border-radius: 100%;
  }

  .baldo {
    color: $red;
  }

  .ribo {
    color: $yellow;
  }

  .aitana {
    color: $blue;
  }

  .amigo {
    color: $indigo;
  }

  .marza {
    color: $green;
  }
}

.info {
  grid-area: info;
}

.date {
  grid-area: date;
  align-self: end;
}

.time {
  grid-area: time;
  align-self: end;
}

.venue {
  grid-area: venue;
  text-align: right;
  align-self: end;
  line-height: 1.1;
}

.baldoneta {
  grid-area: baldoneta;
  background: red;
  padding: 0;
  overflow: hidden;
  border-radius: .5rem;
  transform: rotate(10deg) translateX(35%);
  width: 75px;
  margin-left: auto;

  img {
    width: 75px;
  }
}

@include media-breakpoint-down(md) {
  .event {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title title"
      "speakers speakers"
      "baldoneta baldoneta"
      "info info"
      "venue venue"
      "date time";
  }

  .venue {
    text-align: left;
  }

  .speakers {
    justify-content: start;
    padding-bottom: 2rem;
  }

  .time {
    text-align: right;
  }
}

.event.compact {
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "speakers speakers"
    "info info"
    "baldoneta baldoneta"
    "venue venue"
    "date time";
  height: 100%;

  .venue {
    text-align: left;
  }

  .speakers {
    justify-content: start;
    padding-bottom: 2rem;
  }

  .time {
    text-align: right;
  }
}
</style>
