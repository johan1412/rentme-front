<template>
  <div class="container">
    <h1 class="text-center">Annonce en attente de validation({{productsNotValidCount}})</h1>
      <div class="d-flex flex-column" v-for=" item in productsNotValid" :key="item.id">
        <div class="p-2">
          <div class="row justify-content-md-center">

            
          </div>
          <p>{{item.name}}</p>
          <p>{{item.price}}</p>
          <p>{{item.description}}</p>
        </div>
    </div>
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