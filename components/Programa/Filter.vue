<script setup>
const props = defineProps({
  keyword: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const localePath = useLocalePath()
const filterKeyword = ref(props.keyword)
const search = () => {
  router.push({
    path: localePath('/programa/filtre'),
    query: { q: filterKeyword.value }
  })
}
</script>

<template>
  <div class="filter">
    <form method="post" @submit.prevent="search">
      <label for="filterKeyword" class="visually-hidden">{{  $t('programa.filter.label') }}</label>
      <input
        v-model="filterKeyword"
        name="keyword"
        id="filterKeyword"
        type="search"
        :placeholder="$t('programa.filter.placeholder')"
        class="filter-input" />
      <button type="submit">
        <ClientOnly>
          <FontAwesomeIcon :icon="['far', 'magnifying-glass']" />
          <span class="visually-hidden">Buscar</span>
        </ClientOnly>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
/* Filters */
.filter {
  margin-top: 1rem;

  form {
    display: flex;
    background: $white;
    border-radius: .5rem;

    &:focus-within {
      outline: 3px $red solid;
    }
  }

  &-input {
    border: 0;
    border-radius: .5rem;
    padding: .5rem 1rem;
    font-size: 1.25rem;
    flex-grow: 1;

    &:focus {
      outline: 0;
    }
  }

  button {
    appearance: none;
    background: transparent;
    border: 0;
    padding: .5rem 1rem;
    color: $black;

    &:hover,
    &:focus {
      background: $gray-100;
      border-radius: 0 .5rem .5rem 0;
    }

    &:focus {
      background: $red;
      color: $white;
      outline: 0;
    }
  }
}
</style>