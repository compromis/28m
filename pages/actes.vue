<script setup>
import { allRows } from '@/composables/useSheet'
const { data: events } = await allRows()
</script>

<template>
  <div>
    <ul>
      <template v-for="(event, id) in events.values" :key="id">
        <li v-if="id > 0">
          <ActesEvent :event="event" />
        </li>
      </template>
    </ul>
  </div>
</template>
