<template>
<div class="dqs main-frame">
	<div class="main-content row mx-0 justify-content-between">
		<div class="filters-box col-md-3">
			<h2>Filtres</h2>
			<hr class="main-hr">
			<div class="filters-categories">
				<b-list-group>
					<b-list-group-item @click="filter1Visible = !filter1Visible" v-b-toggle.collapse-1 class="d-flex justify-content-between align-items-center">
						Catégorie de produit
						<b-icon v-if="filter1Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<!-- <b-collapse visible id="collapse-1"> -->
					<b-collapse id="collapse-1">
						<ul>
							<li v-for="(category, index) in categories" :key="category.id">
								<input type="checkbox" :value="category.id" :id="'category' + (index + 1)" @change="selectedAllSubCategories(category)" />
								{{ category.name }}
								<ul class="">
									<li v-for="(subCategory, index) in category.children" :key="subCategory.id">
										<input type="checkbox" :value="subCategory.id" :id="'subCategory' + (index + 1)" v-model="selected.categories" />
										{{ subCategory.name }}
									</li>
								</ul>
							</li>
						</ul>
					</b-collapse>

					<b-list-group-item @click="filter2Visible = !filter2Visible" v-b-toggle.collapse-2 class="d-flex justify-content-between align-items-center">
						Prix
						<b-icon v-if="filter2Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-2">
						<b-row class="my-1">
							<b-col lg="6">
								<label for="input-none">Min:</label>
								<b-form-input v-model="minPrice" type="number"></b-form-input>
							</b-col>
							<b-col lg="6">
								<label for="input-none">Max:</label>
								<b-form-input v-model="maxPrice" type="number"></b-form-input>
							</b-col>
						</b-row>
					</b-collapse>

					<b-list-group-item @click="filter3Visible = !filter3Visible" v-b-toggle.collapse-3 class="d-flex justify-content-between align-items-center">
						Localisation
						<b-icon v-if="filter3Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-3">
						<ul>
							<li v-for="(region, index) in regions" :key="region.id">
								<input type="checkbox" :value="region.id" :id="'region' + (index + 1)" v-model="selected.locations"/>
								{{ region.name }} ({{ region.number }})
							</li>
						</ul>
					</b-collapse>

					<b-list-group-item @click="filter4Visible = !filter4Visible" v-b-toggle.collapse-4 class="d-flex justify-content-between align-items-center">
						Notes
						<b-icon v-if="filter4Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-4">
						<div class="collapse-notes">
							<input type="radio" value="4" id="4plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>4 étoiles ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="3" id="3plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>3 étoiles ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="2" id="2plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>2 étoiles ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="1" id="1plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>1 étoile ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="0" id="0plus" v-model="selected.notes" />
							<span>toutes les notes</span>
						</div>
					</b-collapse>
				</b-list-group>
			</div>
		</div>
		<div class="col-md-1"></div>
		<div class="products-list col-md-8">
			<SearchBar />
			<div class="orderby-box row-fluid">
				<div v-if="paramWords != ''">
					<h4>{{ totalProducts }} résultat{{ totalProducts > 1 ? "s " : "" }} pour "{{ paramWords }}"</h4>
				</div>
				<div v-else-if="paramCategory != ''">
					<h4>Catégorie {{ paramCategory }}</h4>
					<div v-if="totalProducts > 0">
						<span>{{ totalProducts }} résultat{{ totalProducts > 1 ? "s " : "" }}</span>
					</div>
					<div v-else>
						<span>Aucun résultat trouvé</span>
					</div>
				</div>
				<div v-else>
					<h4>{{ totalProducts }} annonce{{ totalProducts > 1 ? "s " : "" }} disponible{{ totalProducts > 1 ? "s " : "" }}</h4>
				</div>
				<div class="orderby-element">
					<p>Trier par : </p>
					<b-form-select v-model="selected.orderBy" :options="options" size="sm"></b-form-select>
					<b-button variant="light" @click="deckGrid = true"><b-icon icon="grid-fill" aria-hidden="true"></b-icon></b-button>
					<b-button variant="light" @click="deckGrid = false"><b-icon icon="list-ul" aria-hidden="true"></b-icon></b-button>
				</div>
			</div>
      <hr>
      <div>résultats {{ 1 + ((currentPage - 1) * perPage) }} - {{ ((currentPage - 1) * perPage) + nbResults }} sur {{ totalProducts }}</div>
			<b-card-group deck v-bind:class="[deckGrid ? 'card-deck-custom-grid' : 'card-deck-custom-list']">
				<router-link v-for="product in products" :key="product.id" :to="'/products/' + product.id" :per-page="perPage" :current-page="currentPage">
					<b-card v-if="deckGrid" class="product-card">
						<template #header>
              <div>
                <img :src="product.path !== 0 ? 'https://localhost:8443/media'+product.path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
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
              <div class="address-bloc">{{ product.city }} &bull; {{ product.regionName }} ({{ product.region }})</div>
            </b-card-text>
					</b-card>
					<b-card v-else no-body class="overflow-hidden">
						<b-row no-gutters class="h-100">
							<b-col xl="4" lg="4" md="12" sm="12">
                <div class="image-bloc">
                  <img :src="product.path !== 0 ? 'https://localhost:8443/media'+product.path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image">
                </div>
              </b-col>
							<b-col xl="8" lg="8" md="12" sm="12" class="d-flex flex-column justify-content-between">
								<b-card-body :title="product.name">
									<b-card-text class="product-card-description">
										{{ product.description }}
									</b-card-text>
                  <b-card-text class="d-flex justify-content-between align-items-center">
                    <div class="price-bloc">{{ product.price }}€ / jour</div>
                    <div class="ratings-bloc">
                      <b-icon :icon="(!product.averageRatings || product.averageRatings < 0.2) ? 'star' : (product.averageRatings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product.averageRatings || product.averageRatings < 1.2) ? 'star' : (product.averageRatings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product.averageRatings || product.averageRatings < 2.2) ? 'star' : (product.averageRatings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product.averageRatings || product.averageRatings < 3.2) ? 'star' : (product.averageRatings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product.averageRatings || product.averageRatings < 4.2) ? 'star' : (product.averageRatings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <span> ({{ product.numbersOfRatings ? product.numbersOfRatings : 0 }} avis)</span>
                    </div>
                  </b-card-text>
								</b-card-body>
								<b-card-footer class="bg-white d-flex justify-content-between align-items-center">
									<div class="address-bloc"><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon>&nbsp;{{ product.city }} &bull; {{ product.regionName }} ({{ product.region }})</div>
									<div><u>Voir l'annonce <b-icon icon="arrow-right" aria-hidden="true"></b-icon></u></div>
								</b-card-footer>
							</b-col>
						</b-row>
					</b-card>
				</router-link>
			</b-card-group>
			<b-pagination
				pills
				v-model="currentPage"
				:total-rows="totalProducts"
				:per-page="perPage"
				first-number
				last-number
				align="center"
				limit="8"
				@change="onPageChanged"
			></b-pagination>
		</div>
	</div>
</div>
</template>

<script>
import SearchBar from '../../layout/CommonSearchBar.vue';
import AuthService from "@/services/AuthService";
import RegionService from "@/services/RegionService";
import {mapGetters} from "vuex";

export default {
  components: {
	SearchBar,
  },
  name: "Home",
  data() {
    return {
      products: [],
      paramCategory: '',
      paramWords: '',
      searchInput: null,
      nbResults: 0,
      filter1Visible: false,
      filter2Visible: false,
      filter3Visible: false,
      filter4Visible: false,
      deckGrid: true,
      selected: {
        categories: [],
        locations: [],
        orderBy: null,
        notes: "0",
      },
      options: [
        { value: null, text: '' },
        { value: 'ratingAsc', text: 'note croissante' },
        { value: 'ratingDesc', text: 'note décroissante' },
        { value: 'priceAsc', text: 'prix croissant' },
        { value: 'priceDesc', text: 'prix décroissant' },
      ],
      regions: [],
      perPage: 15,
      currentPage: 1,
      minPrice: 0,
      maxPrice: 0,
      totalProducts: 0,
    }
  },
  created() {
    AuthService.getCategories().then(response => {
      this.$store.dispatch('categories',response.data['hydra:member'].filter(category => !category?.parent))
    }).catch(e => console.log(e))
    RegionService.getRegions().then(response => {
      this.regions = response.data['hydra:member']
    }).catch(e => console.log(e))
  },
  mounted() {
    let category = this.$route.query.category;
    let words = this.$route.query.words;
    if (words) {
      this.paramWords = words;
    } else if (category && this.categories.some(c => c.name.toLowerCase() == category.toLowerCase())) {
      this.paramCategory = category.toLowerCase();
      this.initializaFilterCategories();
    }
    this.minPrice = this.getMinPrice();
    this.maxPrice = this.getMaxPrice();
  },
  watch: {
    'minPrice': {
      handler(newVal) {
        this.minPrice = newVal;
        this.updateProducts();
      }
    },
    'maxPrice': {
      handler(newVal) {
        this.maxPrice = newVal;
        this.updateProducts();
      }
    },
    'selected.locations': {
      handler() {
        this.updateProducts();
      }
    },
    'selected.categories': {
      handler() {
        this.updateProducts();
      }
    },
    'selected.orderBy': {
      handler() {
        this.updateProducts();
      }
    },
    'selected.notes': {
      handler() {
        this.updateProducts();
      }
    },
  },
  methods: {
    updateProducts() {
      AuthService.getProductsSearch({
        page: this.currentPage,
        sort: this.selected.orderBy,
        category: this.selected.categories,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        region: this.selected.locations,
        averageRatings: this.selected.notes,
      }).then(response => {
        this.products = response.data.products;
        this.nbResults = this.products.length;
        this.totalProducts = response.data.totalProducts;
      }).catch(e => console.log(e))
    },
    onPageChanged(page) {
      this.currentPage = page;
      this.updateProducts();
      window.scrollTo(0, 0);
    },
    getMaxPrice() {
      let max =  Math.max(...this.products.map((p) => { return p.price }));
      return max;
    },
    getMinPrice() {
      let min = Math.min(...this.products.map((p) => { return p.price }));
      return min;
    },
    selectedAllSubCategories(category) {
      let index = this.categories.map(function(elt) {return elt.name.toLowerCase()}).indexOf(typeof category === 'string' ? category.toLowerCase() : category.name.toLowerCase()) + 1;
      if (index > 0) {
        let categoryObject = typeof category === 'string' ? this.categories[index - 1] : category;
        if (document.getElementById('category' + index).checked) {
            categoryObject.children.forEach(element => {
            this.selected.categories.push(element.id);
          });
        } else {
          categoryObject.children.forEach(element => {
            let subIndex = this.selected.categories.map(function(elt) {return elt}).indexOf(element.name.toLowerCase());
            this.selected.categories.splice(subIndex, 1);
          });
        }
      }
    },
    initializaFilterCategories() {
      let category = this.paramCategory;
      let index = this.categories.map(function(elt) { return elt.name.toLowerCase() }).indexOf(category) + 1;
      document.getElementById('category' + index).checked = true;
      this.selectedAllSubCategories(category);
    }
  },
  computed: {
    ...mapGetters(['categories'])
  }
};
</script>

<style>
.main-frame {
	width: 95%;
	max-width: 1800px;
	margin: 0px auto;
}

.main-content {
	padding: 0px;
}

.filters-box {
	max-height: min-content; /*1000px;*/
	background-color: #ffffff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}

.filters-box h2 {
	text-align: center;
	margin-top: 20px;
}

.filters-box .main-hr {
	width: 50%;
}

.filters-box ul {
	list-style: none;
	margin-bottom: 3px;
}

.filters-box input[type="checkbox"] {
	height: 15px;
	width: 15px;
}

.filters-categories {
	margin-top: 40px;
}

.filters-categories .list-group-item {
	border: none;
	border-bottom: 1px solid #bbbbbb;
	font-size: 120%;
	margin: 20px 0px;
}

.filters-categories .collapse {
	padding-left: 20px;
}

.collapse-notes {
	padding: 5px 0px;
	display: flex;
	align-items: center;
}

.collapse-notes input {
	margin-right: 10px;
	height: 15px;
	width: 15px;
	border-radius: 0px !important;
}

.collapse-notes span {
	margin-left: 10px;
}

.products-list {
	padding: 0px;
}

.searchbar-products {
	background-color: #ffffff;
	border-radius: 10px;
	padding: 10px 0px;
}

.searchbar-products form label {
	font-size: 120%;
	margin: 0px 30px;
}

.searchbar-products form input,
.searchbar-products form input:focus,
.searchbar-products form input:active {
	border: none;
	border-bottom: 1px solid #000000;
	border-radius: 0px;
	outline: none;
	box-shadow: none;
	padding: 0px;
	height: auto;
	font-size: 120%;
}

.searchbar-products form .btn {
	border: none;
	outline: none;
	box-shadow: none;
}

.orderby-box {
	margin: 30px 0px 0px 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.orderby-box .orderby-element select,
.orderby-box .orderby-element p,
.orderby-box .orderby-element .btn {
	display: inline;
	margin-left: 10px;
}

.orderby-box .orderby-element select {
	width: auto;
	border: none;
	outline: none;
	box-shadow: none;
}

.orderby-box .orderby-element .btn {
	padding: 5px;
}

.card-deck-custom-list {
	display: block !important;
}

.card-deck-custom-grid {
	display: flex;
}

.card-deck-custom-grid > a,
.card-deck-custom-list > a {
	margin-top: 40px;
}

.card-deck-custom-grid .card {
	flex: none;
	transition: all .2s ease-in-out;
}

.card-deck-custom-list .card {
	flex: none;
	display: block;
	height: 300px;
  margin-bottom: 20px !important;
}

.card-deck-custom-list .card h4 {
  color: #4499AD;
}

.card-deck a {
	text-decoration: none !important;
}

.card-deck-custom-grid .card:hover {
	transform: scale(1.05);
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.card-deck .card-header {
  background-color: rgba(0, 0, 0, 0.9);
  width: 300px;
  height: 200px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-deck .card .image-bloc {
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 300px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-deck-custom-grid .card img {
	max-width: 300px;
	max-height: 200px;
  width: auto;
  height: auto;
}

.card-deck-custom-list .card img {
	max-width: 100%;
	max-height: 300px;
  width: auto;
  height: auto;
}

.card-deck-custom-list .card-title,
.card-deck-custom-list .card-footer {
	color: #000000;
}

.card-deck-custom-list .card-footer .btn {
	color: #ffffff;
	border: 1px solid #000000;
	outline: none;
	box-shadow: none;
	background-color: rgba(0, 0, 0, 0.8);
}

.card-deck-custom-list .card-footer .btn:hover {
	color: #000000;
	border: 1px solid #000000;
	background-color: #ffffff;
}

.card-deck .product-card {
  width: 300px !important;
}

.card-deck .card .card-body .product-card-text {
  display: -webkit-box;
  overflow : hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5rem;
  height: 4.5rem;
}

.card-deck .card .card-body .product-card-description {
  display: -webkit-box;
  overflow : hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  line-height: 1.2rem;
  height: 7.2rem;
}

.card-deck-custom-list .card-body {
  padding: 10px 20px 0px 20px;
}

.card-deck-custom-grid .card-body .price-bloc {
  background-color: #4499AD;
  color: #ffffff;
  padding: 5px 10px;
  margin: 10px 0px;
  width: fit-content;
}

.card-deck-custom-list .card-body .price-bloc {
  background-color: #4499AD;
  color: #ffffff;
  padding: 5px 10px;
  margin: 0px 0px 0px 0px;
  width: fit-content;
}

.card-deck-custom-grid .card-body .ratings-bloc,
.card-deck-custom-list .card-body .ratings-bloc {
  color: #4499AD;
}

.card-deck-custom-grid .card-body .address-bloc {
  font-size: 90%;
}

.card-deck .card .card-body .card-text {
	color: #000000;
}

.card-deck .card .card-footer {
	text-align: center;
}

.products-list .pagination {
	margin: 70px 0px;
}

</style>
