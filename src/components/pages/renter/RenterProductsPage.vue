<template>
  <div class="container">
    <h1 class="h3 mt-5">Mes annonces</h1>
    <hr>
    <b-card-group deck class="card-deck-custom-grid">
				<router-link v-for="product in user.products" :key="product.id" :to="'/products/' + product.id">
					<b-card class="product-card">
						<template #header>
              <div>
                <img :src="product.files.length !== 0 ? 'https://localhost:8443/media'+product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
              </div>
            </template>
            <b-card-text class="product-card-text">{{ product.name }}</b-card-text>
            <b-card-text class="text-muted">
              <div class="price-bloc">{{ product.price }}€ / jour</div>
              <div class="ratings-bloc">
                <b-icon :icon="(!product.averageRatings || product.averageRatings < 0.2) ? 'star' : (product.averageRatings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product.averageRatings || product.averageRatings < 1.2) ? 'star' : (product.averageRatings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product.averageRatings || product.averageRatings < 2.2) ? 'star' : (product.averageRatings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product.averageRatings || product.averageRatings < 3.2) ? 'star' : (product.averageRatings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product.averageRatings || product.averageRatings < 4.2) ? 'star' : (product.averageRatings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <span> ({{ product.numbersOfRatings ? product.numbersOfRatings : 0 }} avis)</span>
              </div>
              <div class="address-bloc">{{ product.address.city }} &bull; {{ product.address.region.name }} ({{ product.address.region.number }})</div>
            </b-card-text>
					</b-card>
				</router-link>
			</b-card-group>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "RenterProductsPage",
  computed:{
    ...mapGetters(['user'])
  },
  mounted() {
    const renterPermission = this.$store.getters.renterPermission
    if(!renterPermission){
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 1200px) {

  .container {
    padding-bottom: 20px;
  }

  .product-card {
    font-size: 14px;
    width: 250px !important;
  }

  .product-card .card-header {
    height: 180px;
    width: 250px;
  }

  .product-card img {
    max-height: 180px;
    max-width: 250px;
  }

}

@media screen and (max-width: 768px) {

  .product-card {
    font-size: 12px;
    width: 200px !important;
  }

  .product-card .card-header {
    height: 150px;
    width: 200px;
  }

  .product-card img {
    max-height: 150px;
    max-width: 200px;
  }

}

@media screen and (max-width: 576px) {

  .card-deck-custom-grid {
    display: flex;
    flex-wrap: wrap;
  }

  .card-deck-custom-grid a {
    width: 50%;
  }

  .product-card {
    font-size: 10px;
    width: 100% !important;
  }

  .product-card .card-header {
    height: 100px;
    width: 100%;
  }

  .product-card img {
    max-height: 100px;
    max-width: 100%;
  }

}
</style>

