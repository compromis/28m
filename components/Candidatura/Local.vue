<script setup>
</script>

<template>
  <section class="candidatura-local">
    <div class="local-container">
      <h2>{{ $t('candidatura.local') }}</h2>
    </div>

    <h3 class="visually-hidden" id="MunicipalityFilter">{{ $t('candidatura.filter_placeholder') }}</h3>
    <CandidaturaLocalSites />

    <div class="local-container">
      <h3 class="visually-hidden" id="TopCities">{{ $t('candidatura.top3cities') }}</h3>
      <ul class="candidates" aria-labelledby="TopCities">
        <li>
          <CandidaturaPoster
            full-name="Rafa Mas"
            name="Mas"
            :description="$t('candidatura.local_candidates.mas')"
            picture="null"
          />
        </li>
        <li>
          <CandidaturaPoster
            full-name="Joan Ribó"
            name="Ribó"
            :description="$t('candidatura.local_candidates.ribo')"
            picture="null"
          />
        </li>
        <li>
          <CandidaturaPoster
            full-name="Ignasi Garcia"
            name="Ignasi"
            :description="$t('candidatura.local_candidates.ignasi')"
            picture="null"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.candidatura-local {
  background: $blue;
  color: $white;
  --local-container-max-width: #{map-get($container-max-widths, 'xxl')};
  padding: 3rem var(--site-padding);

  .local-container {
    max-width: var(--local-container-max-width);
    margin: 0 auto;
  }
}
</style>