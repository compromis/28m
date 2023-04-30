<script setup>
const { locale } = useI18n()

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  },

  category: {
    type: Object,
    default: () => null
  },

  showCategory: {
    type: Boolean,
    default: false
  },

  highlighted: {
    type: Boolean,
    default: false
  }
})

const flairs = ref(null)
const { $gsap } = useNuxtApp()
onMounted(() => {
  setTimeout(() => {
    $gsap.fromTo(flairs.value, {
      scale: 2,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'Elastic.easeOut',
      scrollTrigger: {
        trigger: flairs.value,
        start: 'top 80%',
        toggleActions: "restart none none reverse"
      }
    })
  }, 1000)
})

/* Flaires */
const flaires = computed(() => {
  if (!props.proposal.flair) return []
  return props.proposal.flair.split(',')
})

/* Propsoal id */
const proposalNum = computed(() => {
  let num = props.proposal.num
  while (num.length < 3) num = "0" + num
  return num
})

const proposalCategory = computed(() => {
  return props.proposal.subcategory?.category || props.category
})
</script>

<template>
  <article :class="['proposal', { highlighted: proposal.highlighted || highlighted, 'with-category': showCategory }]">
    <div class="proposal-content">
      <NuxtLink :to="localePath(`/programa/${proposalCategory.slug}/${proposal.id}`)" class="proposal-id">
        #{{ proposalNum }}
      </NuxtLink>
      <p class="proposal-text">
        {{ proposal[`text_${locale}`] }}
      </p>
      <span v-if="showCategory" :class="['proposal-category', `category-${proposal.subcategory.category.slug}`, `color-${proposal.subcategory.category.color}`]">
        {{ proposal.subcategory.category[`name_${locale}`] }}
      </span>
    </div>

    <div class="proposal-actions">
      <ProgramaLike :proposal="proposal" />
      <ProgramaShare :proposal="proposal" :category="proposalCategory" />
    </div>

    <div class="proposal-flairs" ref="flairs">
      <span class="flair flair-joves sticker circle bg-yellow" v-if="flaires.includes('youth')">Joves</span>
      <span class="flair flair-feminisme sticker circle bg-purple" v-if="flaires.includes('feminist')">
        <ClientOnly><FontAwesomeIcon :icon="['far', 'venus']" class="icon" /></ClientOnly>
        <span class="visually-hidden">Feminisme</span>
      </span>
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

  &-id {
    background: $black;
    color: $white;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 900;
    border-radius: .5rem;
    padding: .25rem .5rem;
    transform: translate(1.5rem, -50%);
  }

  &-flairs {
    position: absolute;
    right: 0;
    bottom: 30px;
    transform: translateX(40%);
    pointer-events: none;

    .flair {
      color: $white;
      font-weight: 900;
      font-size: 1.25rem;
      width: 3.25em;
      height: 3.25em;
      transform: rotate(15deg);
    }

    .flair-feminisme .icon {
      font-size: 2rem;
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

@include media-breakpoint-down(lg) {
  .proposal {
    gap: 0;
  }
}
</style>

<style lang="scss">
.programa .bg-purple .flair.bg-purple {
  background: $red;
}
</style>