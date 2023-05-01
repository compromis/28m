<template>
  <section class="candidatura-local">
    <div class="candidatura-local-padding">
      <div class="candidatura-container">
        <h2>{{ $t('candidatura.local') }}</h2>
      </div>

      <h3 class="visually-hidden" id="MunicipalityFilter">{{ $t('candidatura.filter_placeholder') }}</h3>
      <CandidaturaLocalSites />
    </div>

    <div class="candidatura-container">
      <h3 class="visually-hidden" id="TopCities">{{ $t('candidatura.top3cities') }}</h3>
      <ul class="candidates candidate-posters list-unstyled" aria-labelledby="TopCities">
        <li>
          <CandidaturaPoster
            full-name="Rafa Mas"
            name="Mas"
            :description="$t('candidatura.local_candidates.alacant')"
            picture="https://images.unsplash.com/photo-1682852580591-02062ab94543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          />
        </li>
        <li class="ribo">
          <CandidaturaPoster
            full-name="Joan Ribó"
            name="Ribó"
            :description="$t('candidatura.local_candidates.valencia')"
            picture="https://images.unsplash.com/photo-1682852580591-02062ab94543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          />
        </li>
        <li>
          <CandidaturaPoster
            full-name="Ignasi Garcia"
            name="Ignasi"
            :description="$t('candidatura.local_candidates.castello')"
            picture="https://images.unsplash.com/photo-1682852580591-02062ab94543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.candidatura-local {
  background: $blue;
  color: $white;
  --poster-names: #{$lightblue};
  padding-bottom: 3rem;

  &-padding {
    padding: 3rem var(--site-padding);
  }

  h2 {
    @include font-size(5rem);
    max-width: 10ch;
    color: $lightblue;
    line-height: .9;
    @include margin-bottom(2rem);
  }
}

.candidate-posters {
  @include scrollbar(transparent, $lightblue, $white);
}

@include media-breakpoint-down(md) {
  .candidatura-local {
    h2 {
      @include font-size(6rem);
    }
  }

  .candidate-posters {
    margin-top: -12rem;

    li {
      order: 1;
    }

    .ribo {
      order: 0;
    }
  }
}
</style>