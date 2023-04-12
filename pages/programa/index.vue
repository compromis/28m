<script setup>
const config = useRuntimeConfig()
const { data: top } = await useFetch(config.public.apiBase + 'top')
</script>

<template>
  <div class="top-proposals">
    <div class="top-proposals-container">
      <h2>
        {{ $t('programa.proposals') }}
        <span class="sticker circle bg-yellow">TOP</span>
      </h2>
      <ol class="top-proposals-list list-unstyled">
        <li v-for="proposal in top" :key="proposal.id">
          <ProgramaProposal :proposal="proposal" />
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-proposals {
  background: $red;
  padding: 2rem;

  h2 {
    display: flex;
    color: $white;
    margin-bottom: 2rem;
    @include font-size(3rem);

    .sticker {
      margin-left: auto;
      transform: rotate(-25deg);
      margin-top: -.25em;
    }
  }

  &-list {
    li:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &-container {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>