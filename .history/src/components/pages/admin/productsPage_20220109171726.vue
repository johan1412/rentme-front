<template>
  <div class="container bg-secondary">
    <h1 class="text-center">Annonce en attente de validation({{productsNotValidCount}})</h1>
      <div class="d-flex flex-column" v-for=" item in productsNotValid" :key="item.id">
        <div class="p-2">
          <div class="row justify-content-md-center">
            <div class="col col-lg-8 bg-light">
              <div class="row justify-content-md-center">
                <div class="col col-lg-6">
                   <img class="card-img-top" src="https://www.mercedes-benz.fr/passengercars/the-brand/jumper-page/design-concept-car/_jcr_content/contentgallerycontainer/par/contentgallery/par/contentgallerytile/image.MQ4.0.2x.20201130140157.jpeg" alt="Card image cap">
                 </div>
                 <div class="col col-lg-6">
                   <p>{{item.name}}</p>
                   <p>{{item.price}} €/jour</p>
                   <p>{{item.description}}</p>
                 </div>
              </div>
            </div>
            <div class="d-flex flex-column col col-lg-4">
              <div class="p-2">
                <button type="button" class="btn btn-success"  @click="toValid(item)">Valider</button>
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
import AuthService from "../../../services/AuthService";
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
export default {
  name: "ProductsPage",
   computed:{
    ...mapGetters(['productsNotValidCount','productsNotValid'])
  },
  mounted(){
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
      }).catch(e => console.log(e))
      console.log(product)
    }
  },
};
</script>