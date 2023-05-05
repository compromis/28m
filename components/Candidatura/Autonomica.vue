<template>
  <section class="candidatura-container">
    <h3 class="visually-hidden" id="President">{{ $t('candidatura.president.description') }}</h3>
    <CandidaturaBaldo />

    <h3 class="visually-hidden" id="RegionalCandidates">{{ $t('candidatura.regional') }}</h3>
    <ul class="candidates candidate-posters list-unstyled" aria-labelledby="RegionalCandidates">
      <li>
        <CandidaturaPoster
          full-name="Aitana Mas"
          name="Aitana"
          :description="$t('candidatura.regional_candidates.alacant')"
          picture="/images/candidates/aitana.jpg"
        />
      </li>
      <li>
        <CandidaturaPoster
          full-name="Mª Josep Amigó"
          name="Amigó"
          :description="$t('candidatura.regional_candidates.valencia')"
          picture="/images/candidates/amigo.jpg"
        />
      </li>
      <li>
        <CandidaturaPoster
          full-name="Vicent Marzà"
          name="Marzà"
          :description="$t('candidatura.regional_candidates.castello')"
          picture="/images/candidates/marza.jpg"
        />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.candidatura-container {
  padding-bottom: 2rem;
}
</style>