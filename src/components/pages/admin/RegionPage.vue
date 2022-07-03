<template>
  <div class="container">
    <h3 class="text-left mt-5">Création d'un nouveau département</h3>
    <hr>
    <RegionForm />
  </div>
</template>

<script>
import RegionForm from '../../form/RegionForm.vue';
export default {
  components: { RegionForm },
  name: "RegionPage",
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