<template>
  <div>
    <h1 class="text-center">Register</h1>
    <CategoryForm />
  </div>
</template>

<script>
import CategoryForm from '../../form/CategoryForm.vue';
export default {
  components: { CategoryForm },
  name: "CategoryPage",
};
</script>