<template>
  <div class="container bg-secondary">
    <h1 class="text-center">Annonce en attente de validation({{productsNotValidCount}})</h1>
      <div class="d-flex flex-column" v-for=" item in productsNotValid" :key="item.id">
        <div class="p-2">
          <div class="row justify-content-md-center">
            <div class="col col-lg-8 bg-light">
              <p>{{item.name}}</p>
              <p>{{item.price}} €/jour</p>
              <p>{{item.description}}</p>
            </div>
            <div class="d-flex flex-column col col-lg-4">
              <div class="p-2">
                <button type="button" class="btn btn-success">Valider</button>
              </div>
              <div class="p-2">
                <button type="button" class="btn btn-danger">Supprimer</button>
              </div>
            </div>
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