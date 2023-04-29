<script setup>
const { data } = await useFetch('https://compromis.net/common/json_municipis.php')
const municipalities = JSON.parse(data.value)
const filter = ref('')
const filteredMunicipalities = computed(() => {
  return municipalities.filter(municipality => {
    const municipalityName = municipality.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return municipalityName.toLowerCase().includes(filter.value.toLowerCase())
      || municipality.ref.includes(filter.value.toLowerCase())
  })
})
</script>

<template>
  <div class="local-sites">
    <div class="local-container">
      <input v-model="filter" type="search" name="filter" :placeholder="$t('candidatura.filter_placeholder')" />
    </div>

    <div class="local-sites-results">
      <ul aria-label="Webs municipals" class="list-unstyled">
        <li v-for="municipality in filteredMunicipalities" :key="municipality.id">
          <a :href="`${municipality.url}`" target="_blank" rel="noopener">
            {{ municipality.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.local-sites {
  &-results {
    padding-left: calc((100vw - var(--local-container-max-width) - (var(--site-padding) * 2.5)) / 2);
    margin-right: calc(var(--site-padding) * -1);

    ul {
      display: flex;
      gap: 1rem;
      overflow: hidden;
      padding: 1rem 0;

      li {
        flex-shrink: 0;
        white-space: nowrap;
      }

      a {
        background: $white;
        color: $black;
        padding: .25rem .5rem;
        border-radius: .5em;
        @include font-size(1.1rem);
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .local-sites {
    &-results ul {
      overflow: auto;
    }
  }
}
</style>