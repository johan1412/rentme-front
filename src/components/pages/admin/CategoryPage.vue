<template>
  <div class="container">
    <h3 class="text-center mt-5">Créé une nouvelle catégorie</h3>
    <hr>
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