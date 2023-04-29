<script setup>
import { allRows } from '@/composables/useSheet'
const { data: events } = await allRows()
const { upcomingEvents, pastEvents } = useEvents(events.value.values)
</script>

<template>
  <main class="actes">
    <h1>Actes</h1>
    <h2>Propers actes</h2>
    <ul>
      <template v-for="(event, id) in upcomingEvents" :key="id">
        <li>
          <ActesEvent :event="event" />
        </li>
      </template>
    </ul>

    <h2>Actes passats</h2>
    <ul>
      <template v-for="(event, id) in pastEvents" :key="id">
        <li>
          <ActesEvent :event="event" />
        </li>
      </template>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
  .actes {
    background: $indigo;
  }
</style>