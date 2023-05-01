<template>
  <section class="candidatura-container">
    <h3 class="visually-hidden" id="President">{{ $t('candidatura.president') }}</h3>
    <CandidaturaBaldo />

    <h3 class="visually-hidden" id="RegionalCandidates">{{ $t('candidatura.regional') }}</h3>
    <ul class="candidates candidate-posters list-unstyled" aria-labelledby="RegionalCandidates">
      <li>
        <CandidaturaPoster
          full-name="Aitana Mas"
          name="Aitana"
          :description="$t('candidatura.regional_candidates.alacant')"
          picture="https://images.unsplash.com/photo-1682852580591-02062ab94543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        />
      </li>
      <li>
        <CandidaturaPoster
          full-name="Mª Josep Amigó"
          name="Amigó"
          :description="$t('candidatura.regional_candidates.valencia')"
          picture="https://images.unsplash.com/photo-1682852580591-02062ab94543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        />
      </li>
      <li>
        <CandidaturaPoster
          full-name="Vicent Marzà"
          name="Marzà"
          :description="$t('candidatura.regional_candidates.castello')"
          picture="https://images.unsplash.com/photo-1682852580591-02062ab94543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
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