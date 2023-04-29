<script setup>
import proposals from '~/content/proposals'
const entries = Object.entries(proposals)

const whatsBeenDone = computed(() => entries.filter(entry => entry[1].category === 'done'))
const whatRemainsToBeDone = computed(() => entries.filter(entry => entry[1].category === 'to_be_done'))
</script>

<template>
  <section class="home-proposals">
    <h2 class="home-proposals-title">Per tot el que s'ha aconseguit</h2>
    <ul class="home-proposals-list list-unstyled">
      <li v-for="[slug, proposal] in whatsBeenDone" :key="slug">
        <HomeProposal :proposal="proposal" :slug="slug" />
      </li>
    </ul>

    <h2 class="home-proposals-title">Per tot el que queda per fer</h2>
    <ul class="home-proposals-list list-unstyled">
      <li v-for="[slug, proposal] in whatRemainsToBeDone" :key="slug">
        <HomeProposal :proposal="proposal" :slug="slug" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.home-proposals {
  padding: calc(var(--site-padding) * 1.25);

  &-title {
    color: $white;
    @include font-size(2.25rem);
    margin-top: 5rem;
    margin-bottom: 1.5rem;
  }

  &-list {
    display: flex;
    overflow-x: auto;
    gap: 2rem;
    margin: 1rem calc(var(--site-padding) * -1.25);
    padding: 0 calc(var(--site-padding) * 1.25);
  }
}
</style>