<script setup>
const { locale } = useI18n()

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const subcategories = computed(() => {
 return props.category.subcategories.filter((subcategory) => !subcategory.hidden)
})
</script>

<template>
  <div class="subcategory-quick-links">
    <ul v-if="subcategories.length > 1" class="list-unstyled">
      <li v-for="subcategory in subcategories" :key="subcategory.id">
        <a :href="`#subcat-${subcategory.id}`">
          {{ subcategory[`name_${locale}`] }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.subcategory-quick-links {
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: .75rem;
  }

  li {
    white-space: nowrap;
  }

  a {
    display: block;
    background: $white;
    padding: .25rem .75rem;
    border-radius: .5rem;
    color: $black;
    font-size: 1.1rem;

    &:hover {
      background-color: $black;
      color: $white;
      text-decoration: none;
    }
  }
}

@include media-breakpoint-down(md) {
  .subcategory-quick-links {
    overflow: auto;
    width: 100vw;
    margin: 0 calc(var(--site-padding) * -1);
    padding: 0 var(--site-padding);

    ul {
      flex-wrap: nowrap;
    }
  }
}
</style>