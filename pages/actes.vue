<script setup>
const { data: events } = await useAsyncData('events', async ({ $contentful }) => {
  return await $contentful.getEntries({
    content_type: 'event',
  })
})
</script>

<template>
  <div>
    <ul>
      <li v-for="event in events.items" :key="event.sys.id">
        <ActesEvent :event="event.fields" />
      </li>
    </ul>
  </div>
</template>