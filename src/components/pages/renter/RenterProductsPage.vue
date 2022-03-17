<template>
  <div class="container">
    <h1 class="title mt-5">Mes annonces</h1>
    <hr>
    <Products-list />
  </div>
</template>
<script>
import ProductsList from "../../layout/ProductsList.vue";
import {mapGetters} from "vuex";


export default {
  components: {
    ProductsList,
  },
  name: "RenterProductsPage",

  computed:{
  ...mapGetters(['user'])
},
created() {
  console.log(this.user)
}

};
</script>

