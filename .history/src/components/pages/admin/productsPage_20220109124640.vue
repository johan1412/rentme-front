<template>
  <div>
    <h1 class="text-center">Annonce en attente de validation({{productsNotValidCount}})</h1>
    <div class="d-flex flex-column"v-for=" item in productsNotValid" :key="item.id">
      <p>{{item.name}}</p>
      <p>{{item.price}}</p>
      <p>{{item.description}}</p>
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