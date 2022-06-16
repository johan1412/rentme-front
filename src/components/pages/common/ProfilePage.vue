<template>
<div class="dqs main-frame">
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5">
			<div class="col-md-8">
				<div class="user-details">
					<h2>{{ user.firstName }} {{ user.lastName }}</h2><h2 class="title-separator"> | </h2><h4 class="user-details-note">{{ user.note }}/5 <small> (0 note)</small></h4>
					<div>Habite à <strong>{{ addressCity }} ({{ addressRegion }})</strong></div>
					<div class="row user-products">
						<div class="col-md-12">
							<h4>Annonces de ce loueur <small> ({{ products.length }})</small></h4>
							<hr>
							<div v-if="paginatedProducts.length > 0" class="">
                <b-card-group deck class="card-deck-custom-grid">
                    <router-link v-for="product in paginatedProducts" :key="product.id" :to="'/products/' + product.id" :per-page="perPage" :current-page="currentPage">
                        <b-card class="product-card" :img-src="url+'/media/'+product.files[0].path" img-alt="Image" img-top>
                            <b-card-text class="product-card-text">{{ product.name }}</b-card-text>
                            <template #footer>
                                <small class="text-muted">{{ product.price }}€ / jour</small>
                            </template>
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
			<div class="col-md-4">
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
      perPage: 8,
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
      let user = await authService.getUser(userId)
      user = user.data
      this.addressCity = user.address.city
      this.addressRegion = user.address.region.name
      this.user = user;
      this.products = user.products;
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

.card-deck .card {
    margin-top: 10px;
    margin-bottom: 30px;
}

.card-deck-custom-grid .card img {
	width: 250px;
	height: 200px;
}

</style>