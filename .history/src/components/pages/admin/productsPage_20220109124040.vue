<template>
  <div>
    <h1 class="text-center">Annonce en attente de validation({{productsNotValidCount}})</h1>
    <div v-for=" item in productsNotValid" :key="item.id">

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "ProductsPage",
   computed:{
    ...mapGetters(['productsNotValidCount','productsNotValid'])
  },
};
</script>