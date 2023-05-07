<script setup>
import proposals from '~/content/proposals'
const entries = Object.entries(proposals)
</script>

<template>
  <section class="home-proposals d-lg-none" id="Proposals">
    <h2 class="home-proposals-title">Per tot el que s'ha aconseguit i per tot el que queda</h2>
    <ul class="home-proposals-list list-unstyled">
      <li v-for="[slug, proposal] in entries" :key="slug">
        <HomeProposal :proposal="proposal" :slug="slug" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.home-proposals {
  padding: calc(var(--site-padding) * 1.25);
  background: $yellow;

  &-title {
    color: $white;
    @include font-size(2.75rem);
    margin-bottom: 1.25rem;
  }

  &-list {
    display: flex;
    flex-flow: row nowrap;
    overflow-x: auto;
    gap: 2rem;
    margin: 0 calc(var(--site-padding) * -1.25);
    padding: 1rem calc(var(--site-padding) * 1.25);
    @include scrollbar($yellow, $red, $red, 3px);
    scroll-snap-type: x mandatory;

    li {
      scroll-snap-align: start;
      padding-left: 2rem;
      margin-left: -2rem;
    }
  }
}
</style>