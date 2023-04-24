<script setup>
const hover = ref('none')

const hoverOver = (section) => {
  hover.value = section
}
</script>

<template>
  <div :class="['menu', `hover-${hover}`]">
    <div class="menu-section">28M</div>
    <ul class="menu-primary list-unstyled" aria-label="Menú principal">
      <li>
        <nuxt-link :to="localePath('/')" @mouseenter="hoverOver('home')">
          {{ $t('menu.home') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('/programa')" @mouseenter="hoverOver('programa')">
          {{ $t('menu.programa') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('/candidatura')" @mouseenter="hoverOver('candidatura')">
          {{ $t('menu.candidatura') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('/collabora')" @mouseenter="hoverOver('collabora')">
          {{ $t('menu.collabora') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('/actes')"  @mouseenter="hoverOver('actes')">
          {{ $t('menu.actes') }}
        </nuxt-link>
      </li>
    </ul>

    <div class="menu-bottom">
      <div class="menu-bottom-secondary">
        <div class="menu-section">
          <a href="https://compromis.net/?override=1">compromís.net</a>
        </div>
        <ul class="menu-secondary list-unstyled" aria-label="Menú de compromis.net">
          <li>
            <a href="https://compromis.net/info">
              {{ $t('menu.info') }}
            </a>
          </li>
          <li>
            <a href="https://compromis.net/?override=1">
              {{ $t('menu.news') }}
            </a>
          </li>
          <li>
            <a href="https://compromis.net/transparencia">
              {{ $t('menu.transparency') }}
            </a>
          </li>
          <li>
            <a href="https://compromis.net/campanyes">
              {{ $t('menu.campaigns') }}
            </a>
          </li>
          <li>
            <a href="https://donacions.compromis.net/?override=1">
              {{ $t('menu.donations') }}
            </a>
          </li>
          <li>
            <a href="https://compromis.net/espai">
              {{ $t('menu.espai') }}
            </a>
          </li>
        </ul>
      </div>
      <div class="menu-bottom-social-networks">
        <SiteSocial />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: var(--site-padding);
  padding-top: calc(var(--nav-safe-area) * 2);
  background-color: var(--menu-bg-color, #{$yellow});
  color: $white;
  transition: background-color .2s ease;
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  a {
    color: $white;

    &:hover {
      color: $white;
      text-decoration-color: rgba($white, .25);
    }

    &:focus {
      box-shadow: none !important;
    }

    &:focus-visible {
      box-shadow: none;
      outline: 4px $white solid;
      outline-offset: 5px;
    }
  }

  &-section {
    font-weight: 900;
    @include font-size(1.5rem);
  }

  &-primary {
    @include padding-bottom(3rem);
    margin-bottom: auto;

    a {
      display: block;
      font-size: clamp(2.75rem, 5.5vw, 8rem);
      font-weight: 900;
      line-height: 1;

      &:hover {
        text-decoration: none;
        color: var(--menu-link-color, #{$white});
      }
    }
  }

  &-secondary {
    display: flex;
    gap: 1em;
    font-size: clamp(1.25rem, 1.35vw, 2rem);
    margin: 0;

    a {
      white-space: nowrap;
      line-height: 1;
    }
  }

  &-bottom {
    display: flex;

    &-social-networks {
      margin-left: auto;
      align-self: flex-end;
      font-size: clamp(1.25rem, 1.35vw, 2rem);
    }
  }
}

.hover {
  &-home {
    --menu-bg-color: #{$red};
    --menu-link-color: #{$lightblue};
  }

  &-programa {
    --menu-bg-color: #{$blue};
    --menu-link-color: #{$yellow};
  }

  &-candidatura {
    --menu-bg-color: #{$yellow};
    --menu-link-color: #{$red};
  }

  &-collabora {
    --menu-bg-color: #{$blue};
    --menu-link-color: #{$lightblue};
  }

  &-actes {
    --menu-bg-color: #{$indigo};
    --menu-link-color: #{$yellow};
  }
}

@include media-breakpoint-down(md) {
  .menu {
    &-primary {
      a {
        line-height: 1.1;
      }
    }

    &-secondary {
      flex-direction: column;
      gap: 0;
      line-height: 1.25;
    }

    :deep(.social-networks) {
      flex-direction: column;
    }
  }
}
</style>