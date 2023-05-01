<template>
  <article class="poster">
    <div class="poster-picture animated-item">
      <img src="https://images.unsplash.com/photo-1682832919425-6cddd681a283?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" alt="Foto de Joan Baldoví" />
    </div>
    <div class="poster-name">
      <span class="poster-name-top">Baldoví</span>
      <span class="poster-name-left">Baldoví</span>
    </div>
    <div class="poster-details animated-item">
      <h4>Joan Baldoví</h4>
      <p class="poster-description">{{ $t('candidatura.president.description') }}</p>
      <div class="poster-text">
        Text
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

    h4 {
      font-size: 3.25rem;
    }
  }

  &-description {
    font-size: 1.5rem;
    max-width: 20ch;
    line-height: 1;
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
}
</style>