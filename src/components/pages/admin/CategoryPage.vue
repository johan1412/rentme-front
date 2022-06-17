<template>
  <div class="container">
    <h3 class="text-left mt-5">Création d'une nouvelle catégorie</h3>
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