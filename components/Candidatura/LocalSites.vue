<script setup>
const { data } = await useFetch('https://compromis.net/common/json_municipis.php')
const municipalities = JSON.parse(data.value)
const filter = ref('')
const filteredMunicipalities = computed(() => {
  if (!filter.value) {
    return municipalities.sort(() => Math.random() - .5)
  }

  return municipalities.filter(municipality => {
    const municipalityName = municipality.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return municipalityName.toLowerCase().includes(filter.value.toLowerCase())
      || municipality.ref.includes(filter.value.toLowerCase())
  })
})
const animated = computed(() => !filter.value)
</script>

<template>
  <div class="local-sites">
    <div class="candidatura-container local-sites-filter">
      <label class="visually-hidden" for="filter">{{ $t('candidatura.filter_placeholder') }}</label>
      <div class="filter-input">
        <input
          v-model="filter"
          type="search"
          id="filter"
          name="filter"
          :placeholder="$t('candidatura.filter_placeholder')"
          aria-describedby="filterDesc"
          aria-controls="sites" />
          <ClientOnly>
            <font-awesome-icon :icon="['far', 'magnifying-glass']" />
          </ClientOnly>
        </div>
      <div id="filterDesc" class="visually-hidden">Els pobles es filtraran mentres escrius</div>
    </div>

    <ClientOnly>
      <div :class="['local-sites-results', { animated }]" id="sites">
        <div v-if="filteredMunicipalities.length > 0">
          <TransitionGroup name="list" tag="ul" aria-label="Webs municipals" class="list-results list-unstyled">
            <li v-for="municipality in filteredMunicipalities" :key="municipality.id">
              <a :href="`${municipality.url}`" target="_blank" rel="noopener">
                {{ municipality.name }}
              </a>
            </li>
          </TransitionGroup>
        </div>
        <div v-else class="not-found">
          No hem trobat el teu municipi :(
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.local-sites {
  &-results {
    padding-left: calc((100vw - var(--candidatura-container-max-width) - (var(--site-padding) * 2.5)) / 2);
    margin-right: calc(var(--site-padding) * -1);
    overflow: hidden;
    height: 95px;

    &.animated {
      padding-left: 0;
      margin-left: calc(var(--site-padding) * -1);

      :deep(.list-results) {
        animation: marquee 180s linear infinite;
      }
    }

    :deep(.list-results) {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;

      li {
        flex-shrink: 0;
        white-space: nowrap;
      }

      a {
        display: block;
        background: $white;
        color: $black;
        padding: .35rem .75rem;
        border-radius: .5em;
        @include font-size(1.25rem);
        transition: .25s ease;

        &:hover {
          background: $lightblue;
          text-decoration: none;
          color: rgba($black, .75);
        }
      }
    }
  }
}

.filter-input {
  position: relative;
  width: 600px;
  max-width: 100%;
  font-size: 1.25rem;

  input {
    appearance: none;
    background: $white;
    border: 0;
    padding: .5rem .75rem;
    padding-right: 2.5rem;
    border-radius: .5rem;
    font-size: inherit;
    width: 100%;
    transition: .25s ease;

    &::placeholder {
      color: $gray-700;
    }

    &:focus {
      background: $lightblue;
      outline: 0;
    }
  }

  svg {
    position: absolute;
    color: $gray-700;
    pointer-events: none;
    right: .75rem;
    top: .75rem;
  }
}

.not-found {
  font-size: 1.5rem;
  padding: 1rem 0;
  height: 95px;
}

@include media-breakpoint-down(md) {
  .local-sites {
    &-results {
      overflow: auto;
      margin-left: calc(var(--site-padding) * -1);
      padding-left: var(--site-padding);
      
      &::-webkit-scrollbar {
        display: none;
      }

      &.animated {
        :deep(.list-results) {
          /* animation: none; */
          /* padding-left: var(--site-padding); */
          animation-duration: 100s;
        }
      }
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
  max-width: 200px;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-width: 0;
}

.list-leave-active {
  position: absolute;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-1000%); }
}
</style>