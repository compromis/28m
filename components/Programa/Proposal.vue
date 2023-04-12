<script setup>
const { locale } = useI18n()

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  },

  showCategory: {
    type: Boolean,
    default: false
  }
})

/* Flaires */
const flaires = computed(() => {
  if (!props.proposal.flair) return []
  return props.proposal.flair.split(',')
})
</script>

<template>
  <article :class="['proposal', { highlighted: proposal.highlighted }]">
    <p class="proposal-text">
      {{ proposal[`text_${locale}`] }}
    </p>

    <span v-if="showCategory" :class="['proposal-category', `category-${proposal.subcategory.slug}`]">
      {{ proposal.subcategory.category[`name_${locale}`] }}
    </span>

    <ProgramaLike :proposal="proposal" />

    <div class="proposal-flairs">
      <span class="flair flair-joves" v-if="flaires.includes('joves')">Joves</span>
      <span class="flair flair-feminisme" v-if="flaires.includes('feminisme')">Feminisme</span>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.proposal {
  display: grid;
  position: relative;
  background: $white;
  padding: 1.5rem;
  border-radius: $border-radius-sm;
  grid-template-columns: 1fr auto;
  gap: 1rem;

  &-text {
    line-height: 1.2;
    font-size: 1.25rem;
  }

  &-flairs {
    position: absolute;
  }

  &.highlighted {
    .proposal-text {
      @include font-size(1.75rem);
    }
  }
}
</style>