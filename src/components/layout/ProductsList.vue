<template>
  <div>
    <div v-for="product in products" :key="product.id">
      <p>{{ product.name }} {{ product.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    products: Array,
  },
  name: "ProductsList",
};
</script>
