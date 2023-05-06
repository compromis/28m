<script setup>
const { locale } = useI18n()
const expanded = ref(false)
</script>

<template>
  <article class="poster baldo">
    <div class="poster-picture animated-poster">
      <img src="/images/candidates/baldovi.jpg" alt="Foto de Joan Baldoví" />
    </div>
    <div class="poster-name">
      <span class="poster-name-top">Baldoví</span>
      <span class="poster-name-left">Baldoví</span>
    </div>
    <div class="poster-details">
      <h4 class="animated-item">Joan Baldoví</h4>
      <p class="poster-description animated-item">{{ $t('candidatura.president.description') }}</p>
      <div :class="['poster-text animated-item', { expanded }]">
        <template v-if="locale === 'val'">
          <p>Durant els últims anys al Congrés he treballat per defensar els interessos valencians: un finançament just per a la nostra terra i unes inversions dignes, especialment en rodalies o transport públic. Però abans d’això, he sigut mestre d’escola pública i alcalde de Sueca, la meua ciutat.</p>
          <p class="extra">Ara, com a candidat a la Presidència de la Generalitat, vull seguir treballant per a millorar la vida dels valencians i valencianes.</p>
          <p class="extra">Amb el govern de coalició del Botànic hem avançat molt lluitant contra corrupció, garantint els drets de la ciutadania i enfortint els serveis públics. Però soc conscient que encara queda molt per fer. Et demane el teu suport per a poder liderar un nou impuls al govern del Botànic. Em compromet a treballar, dia a dia, per tot el que veritablement importa.</p>
        </template>
        <template v-else>
          <p>Durante los últimos años en el Congreso he trabajado para defender los intereses valencianos: una financiación justa para nuestra tierra y unas inversiones dignas, especialmente en cercanías o transporte público. Pero antes de eso, he sido maestro de escuela pública y alcalde de Sueca, mi ciudad.</P>
          <p class="extra">Ahora, como candidato a la Presidencia de la Generalitat, quiero seguir trabajando para mejorar la vida de los valencianos y valencianas.</p>
          <p class="extra">Con el gobierno de coalición del Botànic hemos avanzado mucho luchando contra corrupción, garantizando los derechos de la ciudadanía y fortaleciendo los servicios públicos. Pero soy consciente de que todavía queda mucho por hacer. Te pido tu apoyo para poder liderar un nuevo impulso en el gobierno del Botánico. Me comprometo a trabajar, día a día, por todo lo que verdaderamente importa.</P>
        </template>
      </div>
      <div class="d-md-none animated-item">
        <button class="more" @click="expanded = true" v-if="!expanded">Continua...</button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.poster {
  display: grid;
  position: relative;
  grid-template-columns: 4rem 1fr 1.5fr;
  grid-template-areas: "name picture details";
  gap: .5rem;
  @include margin-bottom(5rem);

  &-name {
    grid-area: name;

    span {
      display: block;
      position: absolute;
      font-weight: 900;
      font-size: 7rem;
      line-height: 1;
      opacity: 0;
    }

    &-top {
      top: 0;
      left: .75rem;
      transform: translateY(-60%);
    }

    &-left {
      left: 0;
      top: 4rem;
      transform: rotate(180deg);
      writing-mode: vertical-rl;
      text-orientation: mixed;
      text-align: right;
    }
  }

  &-picture {
    grid-area: picture;

    img {
      width: 100%;
    }
  }

  &-details {
    grid-area: details;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    padding-right: var(--site-padding);

    h4 {
      font-size: 3.25rem;
    }
  }

  &-description {
    font-size: 1.5rem;
    max-width: 20ch;
    line-height: 1;
  }

  &-text {
    margin-top: auto;
  }
}

@include media-breakpoint-down(md) {
  .poster {
    grid-template-columns: 4rem 1fr;
    grid-template-areas:
      "name picture"
      "name details";

    &-details {
      margin-left: 0;

      h4 {
        font-size: 2.5rem;
      }
    }
  }

  .extra {
    display: none;
  }

  .expanded {
    .extra {
      display: block;
    }
  }

  .more {
    appearance: none;
    background: transparent;
    padding: 2rem;
    margin: -2rem;
    text-decoration: underline;
    color: $red;
    border: 0;
  }
}
</style>