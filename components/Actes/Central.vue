<template>
  <article class="poster">
    <h2 class="title">Acte central de campanya</h2>
    <ActesNames class="names" />
    <div class="details">
      <div class="venue">Lloc per determinar</div>
      <div class="date">21 de maig</div>
      <div class="time">--</div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  .title {
    font-weight: 500;
    font-size: 2.5rem;
    max-width: 10ch;
    line-height: 1;
  }

  .names {
    margin: -2.25rem -2.2rem 0;
  }

  .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.25rem;
    gap: .5rem;
  }

  .venue {
    grid-column: span 2;
  }

  .time {
    text-align: right;
  }
</style>