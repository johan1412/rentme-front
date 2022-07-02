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
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
      this.$router.push('/')
    }
  }
};
</script>

<style>
@media screen and (max-width: 576px) {

  .container h3 {
    font-size: 16px;
    margin-top: 0px !important;
  }

}
</style>
