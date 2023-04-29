<script setup>
const { locale } = useI18n()

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  },
  category: {
    type: Object,
    required: true
  }
})


const dialogOpen = ref(false)

const text = props.proposal[`text_${locale.value}`]
const url = `https://28m.compromis.net/programa/${props.category.slug}/${props.proposal.id}`
const share = async () => {
  const shareData = {
    title: 'Proposta #' + props.proposal.id + ' - ' + props.category[`title_${locale.value}`] + ' - Programa 2023 - Compromís',
    text,
    url,
  }

  if (!!navigator.share) {
    await navigator.share(shareData);
  } else { 
    dialogOpen.value = !dialogOpen.value
  }
}

const facebookUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${url}`)
const twitterUrl = computed(() => `https://twitter.com/intent/tweet/?text=${text}&url=${url}&hashtags=PerTotElQueImporta`)
const whatsappUrl = computed(() => `whatsapp://send?text=${text} ${url}`)
const telegramUrl = computed(() => `https://t.me/share/url?url=${url}&text=${text}`)
</script>

<template>
  <div class="proposal-share">
    <button class="proposal-share-button" @click="share">
      <ClientOnly><FontAwesomeIcon :icon="['far', 'share']" class="share-icon icon" /></ClientOnly>
      <span class="label">{{ dialogOpen ? '' : 'Compartir' }}</span>
    </button>
    <Transition name="fade">
      <div v-if="dialogOpen" class="proposal-share-dialog">
        <button @click="dialogOpen = false" class="close-icon icon" title="Tanca">
          <ClientOnly><FontAwesomeIcon :icon="['far', 'xmark']" class="icon" /></ClientOnly>
          <span class="visually-hidden">Tanca</span>
        </button>
        <a :href="facebookUrl" target="_blank" rel="noopener noreferer" title="Facebook">
          <ClientOnly><FontAwesomeIcon :icon="['fab', 'facebook']" class="icon" /></ClientOnly>
          <span class="visually-hidden">Facebook</span>
        </a>
        <a :href="twitterUrl" target="_blank" rel="noopener noreferer" title="Twitter">
          <ClientOnly><FontAwesomeIcon :icon="['fab', 'twitter']" class="icon" /></ClientOnly>
          <span class="visually-hidden">Twitter</span>
        </a>
        <a :href="whatsappUrl" target="_blank" rel="noopener noreferer" title="WhatsApp">
          <ClientOnly><FontAwesomeIcon :icon="['fab', 'whatsapp']" class="icon" /></ClientOnly>
          <span class="visually-hidden">WhatsApp</span>
        </a>
        <a :href="telegramUrl" target="_blank" rel="noopener noreferer" title="Telegram">
          <ClientOnly><FontAwesomeIcon :icon="['fab', 'telegram']" class="icon" /></ClientOnly>
          <span class="visually-hidden">Telegram</span>
        </a>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.proposal-share {
  text-align: center;

  &-button {
    appearance: none;
    border: 0;
    background: transparent;
    color: $gray-600;
    margin-top: .5rem;
    line-height: 1;
    position: relative;
  }

  .icon {
    font-size: 1.5rem;
    transition: .25s ease;
    margin-bottom: .25rem;
  }

  .label {
    border-radius: .5rem;
    position: absolute;
    top: 1.75rem;
    right: 0;
    opacity: 0;
    transition: .25s ease;
  }

  &:hover {
    color: $red;
  
    .share-icon {
      transform: scale(1.25) rotate(4deg);
    }

    .label {
      opacity: 1;
    } 
  }

  &:active {
    .share-icon {
      transform: scale(1) rotate(4deg);
    }
  }

  &-dialog {
    position: absolute;
    background: $white;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    border-radius: 0 $border-radius-sm $border-radius-sm 0;
    padding: 1.5rem;
    z-index: 20;

    a {
      color: $gray-600;

      &:hover {
        color: $black;
      }
    }
  }
}

.close-icon {
  appearance: none;
  border: 0;
  color: $gray-600;
  background: transparent;
  margin-bottom: 3rem;

  &:hover {
    color: $red;
  }
}
</style>