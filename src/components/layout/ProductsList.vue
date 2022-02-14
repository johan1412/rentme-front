<template>
    <div v-if="paginatedProducts.length > 0" class="">
      <b-card-group deck class="card-deck-custom-grid mb-5">
          <router-link v-for="product in paginatedProducts" :key="product.id" :to="'/products/' + product.id" :per-page="perPage" :current-page="currentPage">
              <b-card class="product-card" :img-src="product.files" img-alt="Image" img-top>
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
      <p>Aucune annonce enregistrée</p>
    </div>
</template>
<script>
export default {
  components: {},
  props: {
    productsProps: Array,
  },
  name: "ProductsList",
  data() {
    return {
      products: this.productsProps,
      perPage: 20,
      currentPage: 1,
      paginatedProducts: [],
      nbResults: 0,
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
  },
  mounted() {
    this.nbResults = this.products.length;
    this.paginate(this.perPage, 0);
  }
};
</script>

<style scoped>
.card-deck-custom-grid .card img {
	width: 220px;
	height: 180px;
}
</style>