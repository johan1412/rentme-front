<template>
  <div>
    <h1 class="text-center">Annonce en attente de validation()</h1>
    
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