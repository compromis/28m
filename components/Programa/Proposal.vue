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
  <article :class="['proposal', { highlighted: proposal.highlighted, 'with-category': showCategory }]">
    <div class="proposal-content">
      <p class="proposal-text">
        {{ proposal[`text_${locale}`] }}
      </p>
      <span v-if="showCategory" :class="['proposal-category', `category-${proposal.subcategory.category.slug}`, `color-${proposal.subcategory.category.color}`]">
        {{ proposal.subcategory.category[`name_${locale}`] }}
      </span>
    </div>

    <div class="proposal-actions">
      <ProgramaLike :proposal="proposal" />
      <ProgramaShare :proposal="proposal" />
    </div>

    <div class="proposal-flairs">
      <span class="flair flair-joves sticker circle bg-yellow" v-if="flaires.includes('joves')">Joves</span>
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
  grid-template-columns: 1fr 80px;
  gap: 1rem;
  min-height: 225px;

  &-content {
    display: flex;
    flex-direction: column;
  }

  &-text {
    line-height: 1.2;
    font-size: 1.25rem;
  }

  &-flairs {
    position: absolute;
    right: 0;
    top: 130px;
    transform: translateX(40%);

    .flair {
      color: $white;
      font-weight: 900;
      font-size: 1.25rem;
      width: 3.25em;
      height: 3.25em;
      transform: rotate(15deg);
    }
  }

  &-actions {
    display: flex;
    flex-direction: column;
    justify-self: end;
  }

  &-category {
    display: flex;
    margin-top: auto;
    font-weight: 900;
    align-items: center;
    gap: .5rem;
    line-height: 1;

    &::before {
      content: '';
      display: inline-block;
      width: 1.25em;
      height: 1.25em;
      border-radius: 100%;
      background: currentColor;
      flex-shrink: 0;
    }
  }

  &.highlighted {
    .proposal-text {
      @include font-size(1.75rem);
    }
  }

  &.with-category {
    .proposal-text {
      font-size: 1.35rem !important;
    }
  }
}
</style>