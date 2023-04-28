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
  <ul v-if="subcategories.length > 1" class="subcategory-quick-links list-unstyled">
    <li v-for="subcategory in subcategories" :key="subcategory.id">
      <a :href="`#subcat-${subcategory.id}`">
        {{ subcategory[`name_${locale}`] }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.subcategory-quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;

  li {
    white-space: nowrap;
  }

  a {
    display: block;
    background: $white;
    padding: .25rem .75rem;
    border-radius: 3rem;
    color: $black;

    &:hover {
      background-color: $black;
      color: $white;
      text-decoration: none;
    }
  }
}

@include media-breakpoint-down(md) {
  .subcategory-quick-links {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 calc(var(--site-padding) * -1);
    padding: 0 var(--site-padding);
  }
}
</style>