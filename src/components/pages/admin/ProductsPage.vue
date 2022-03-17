<template>
  <div class="container">
    <h3 class="mt-5 text-center">Annonce en attente de validation ({{ numberOfProductsNotValid }})</h3>
    <hr>
    <div v-if="numberOfProductsNotValid > 0">
      <b-card-group deck class="card-deck-custom-list">
        <div v-for="product in products" :key="product.id" class="d-flex align-items-center">
          <router-link :to="'/products/' + product.id" class="mt-3">
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters class="h-100">
                <b-col md="4">
                  <b-card-img :src="product.files.length !== 0 ? 'https://localhost:8443/media'+product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="8" class="d-flex flex-column justify-content-between">
                  <b-card-body :title="product.name">
                    <b-card-text>
                      {{ product.description }}
                    </b-card-text>
                  </b-card-body>
                  <b-card-footer class="bg-white d-flex justify-content-between align-items-center">
                    <small><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon>&nbsp;Paris</small>
                    <div>{{ product.price }}€ / jour</div>
                    <b-button squared variant="outline-transparent">Voir l'annonce</b-button>
                  </b-card-footer>
                </b-col>
              </b-row>
            </b-card>
          </router-link>
          <div class="d-flex flex-column">
            <div class="p-2">
              <button type="button" class="btn btn-success"  @click="toValid(product)">VALIDER</button>
            </div>
            <div class="p-2">
              <button type="button" class="btn btn-danger" @click="toDelete(product)">REFUSER</button>
            </div>
          </div>
        </div>
      </b-card-group>
    </div>
    <div v-else>
      <p class="text-center">Aucune annonce en attente de validation pour le moment</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AuthService from "../../../services/AuthService";

export default {
  name: "ProductsPage",
  created() {
    AuthService.getProductsNotValid().then(response => {
          this.$store.dispatch('products',response.data['hydra:member'])
    }
    ).catch(e => console.log(e))
  },
  computed:{
    ...mapGetters(['numberOfProductsNotValid','products'])
  },
  mounted() {
      const adminPermission = this.$store.getters.adminPermission
      if(!adminPermission){
          this.$router.push('/')
      }
  },
   methods:{
    toValid(product){
      AuthService.updateProduct(product.id,{isValid:true}).then(response => {
        console.log(response.data)
        this.$store.commit('products',this.$store.getters.products.filter(product => !(product.id === response.data.id)))
        this.$store.dispatch('numberOfProductsNotValid',this.$store.getters.numberOfProductsNotValid-1)
      }).catch(e => console.log(e))
      console.log(product)
    },
    toDelete(product){
      AuthService.deleteProduct(product.id).then(() => {
        this.$store.commit('products',this.$store.getters.products.filter(prod => !(prod.id === product.id)))
        this.$store.dispatch('numberOfProductsNotValid',this.$store.getters.numberOfProductsNotValid-1)
      }).catch(e => console.log(e))
      console.log(product)
    }
  },
};
</script>
