<template>
<div class="dqs main-frame">
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5">
			<div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="user-details">
					<h2>{{ user.firstName }} {{ user.lastName }}</h2><h2 class="title-separator"> | </h2><h4 class="user-details-note">{{ user.note ? user.note : '-' }} / 5 <small> (0 note)</small></h4>
					<div class="user-address">Habite à <strong>{{ addressCity }} ({{ addressRegion }})</strong></div>
					<div class="row user-products">
						<div class="col-md-12">
							<h4>Annonces de ce loueur <small> ({{ products.length }})</small></h4>
							<hr>
							<div v-if="paginatedProducts.length > 0" class="">
                <b-card-group deck class="card-deck-custom-grid">
                  <router-link v-for="product in paginatedProducts" :key="product.id" :to="'/products/' + product.id" :per-page="perPage" :current-page="currentPage">
                    <b-card class="product-card">
                      <template #header>
                        <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                          <img :src="product.files.length !== 0 ? 'https://localhost:8443/media'+product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
                        </div>
                      </template>
                      <b-card-text class="d-flex flex-column justify-content-between">
                        <div class="product-card-text">{{ product.name }}</div>
                        <div class="text-muted">
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
                        </div>
                      </b-card-text>
                    </b-card>
                  </router-link>
                </b-card-group>
                <b-pagination
                    pills
                    v-model="currentPage"
                    :total-rows="nbResults"
                    :per-page="perPage"
                    first-number
                    last-number
                    align="center"
                    limit="8"
                    @change="onPageChanged"
                ></b-pagination>
							</div>
              <div v-else>
                <p>Aucune annonce trouvée</p>
              </div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="contact-form">
					<FormContact v-bind:user="user"/>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import FormContact from '../../layout/FormContact.vue';
import authService from "@/services/AuthService";

export default {
  components: {
    FormContact,
  },
  name: "Product",
  data() {
    return {
      user: {},
      perPage: 12,
      currentPage: 1,
      paginatedProducts: [],
      nbResults: 0,
      products: [],
      addressCity: '',
      addressRegion: '',
      url: process.env.VUE_APP_URL
    }
  },
  async mounted() {
    let userId = this.$route.params.userId;
    if (userId) {
      let user = await authService.getUser(userId,localStorage.getItem('token'))
      user = user.data
      this.addressCity = user.address.city
      this.addressRegion = user.address.region.name
      this.user = user;
      this.products = user.products.filter(product => product.isValid === true);
      this.nbResults = this.user.products.length;
      this.paginate(this.perPage, 0);
    }
  },
  methods: {
    paginate(page_size, page_number) {
      let productsToParse = this.products;
      this.paginatedProducts = productsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
      window.scrollTo(0, 0);
    },
  }
};
</script>

<style scoped>
.main-frame {
	width: 95%;
	max-width: 1800px;
	margin: 0px auto;
}

.main-content {
	padding: 0px;
}

.user-main-presentation {
	margin-top: 30px;
}

.user-products {
    margin-top: 60px;
}

.user-link {
	color: #000000;
}

.user-details h2,
.user-details-note {
	display: inline;
	margin: 20px 20px 20px 0px;
}

.card-deck-custom-grid {
  display: flex;
  flex-wrap: wrap;
}

.card-deck-custom-grid a {
  flex: 0 0 33%;
  max-width: 33%;
  padding: 10px 2px !important;
}

.card-deck-custom-grid .card {
    margin-bottom: 10px;
    width: auto !important;
}

.card-deck-custom-grid .card-header {
  width: 100%;
  height: 200px;
}

.card-deck-custom-grid .card img {
	width: auto;
	height: auto;
  max-height: 100%;
  max-width: 100%;
}

.contact-form {
  position: sticky !important;
  top: 100px;
}

@media screen and (max-width: 1200px) {

  .contact-form {
    position: static !important;
  }
  
}

@media screen and (max-width: 992px) {

  .card-deck-custom-grid a {
    flex: 0 0 50%;
    max-width: 50%;
    margin: 0px;
  }
  
}

@media screen and (max-width: 768px) {

  .contact-form {
    margin-bottom: 60px;
  }

  .user-details h2 {
    font-size: 24px;
  }

  .user-details .user-details-note {
    font-size: 20px;
  }

  .user-details .user-address {
    font-size: 16px;
  }
  
}

@media screen and (max-width: 576px) {

  .user-details h2 {
    font-size: 20px;
  }

  .user-details .user-details-note {
    font-size: 16px;
  }

  .user-details .user-address {
    font-size: 14px;
  }

  .user-products h4 {
    font-size: 16px;
  }

  .container .row.mt-5 {
    margin-top: 0px !important;
  }

  .card-deck-custom-grid .card-text {
    font-size: 12px;
  }

  .card-deck-custom-grid .card-text .address-bloc {
    font-size: 10px;
  }
  
}

</style>
