<template>
<div class="dqs main-frame">
  <div class="spinner-loading">
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
	<div class="main-content row mx-0 justify-content-between">
    <!-- IF DESKTOP -->
		<div v-if="showFilters && !mobile" class="filters-box col-xl-3 col-lg-4">
			<h2>Filtres</h2>
			<hr class="main-hr">
			<div class="filters-categories">
				<b-list-group>
					<b-list-group-item @click="filter1Visible = !filter1Visible" v-b-toggle.collapse-1 class="d-flex justify-content-between align-items-center">
						Catégorie de produit
						<b-icon v-if="filter1Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-1">
						<ul>
							<li v-for="(category, index) in categories" :key="category.id">
								<input type="checkbox" class="category-check" :value="category.id" :id="'category' + (index + 1)" @change="selectedAllSubCategories(category)" />
								{{ category.name }}
								<ul class="">
									<li v-for="(subCategory, index) in category.children" :key="subCategory.id">
										<input type="checkbox" :value="subCategory.name.toLowerCase()" :id="'subCategory' + (index + 1)" v-model="selected.categories" />
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
								<input type="checkbox" :value="region.name.toLowerCase()" :id="'region' + (index + 1)" v-model="selected.locations"/>
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
    <!-- END DESKTOP FILTERS -->
    <!-- MOBILE FILTERS -->
    <b-sidebar v-else id="sidebar-filters" backdrop-variant="dark" backdrop shadow class="filters-box col-xl-3 col-lg-4">
			<h2>Filtres</h2>
			<hr class="main-hr">
			<div class="filters-categories">
				<b-list-group>
					<b-list-group-item @click="filter1MobileVisible = !filter1MobileVisible" v-b-toggle.collapse-mobile-1 class="d-flex justify-content-between align-items-center">
						Catégorie de produit
						<b-icon v-if="filter1MobileVisible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-mobile-1">
						<ul>
							<li v-for="(category, index) in categories" :key="category.id">
								<input type="checkbox" :value="category.id" :id="'category' + (index + 1)" @change="selectedAllSubCategories(category)" />
								{{ category.name }}
								<ul class="">
									<li v-for="(subCategory, index) in category.children" :key="subCategory.id">
										<input type="checkbox" :value="subCategory.name.toLowerCase()" :id="'subCategory' + (index + 1)" v-model="selected.categories" />
										{{ subCategory.name }}
									</li>
								</ul>
							</li>
						</ul>
					</b-collapse>

					<b-list-group-item @click="filter2MobileVisible = !filter2MobileVisible" v-b-toggle.collapse-mobile-2 class="d-flex justify-content-between align-items-center">
						Prix
						<b-icon v-if="filter2MobileVisible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-mobile-2">
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

					<b-list-group-item @click="filter3MobileVisible = !filter3MobileVisible" v-b-toggle.collapse-mobile-3 class="d-flex justify-content-between align-items-center">
						Localisation
						<b-icon v-if="filter3MobileVisible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-mobile-3">
						<ul>
							<li v-for="(region, index) in regions" :key="region.id">
								<input type="checkbox" :value="region.name.toLowerCase()" :id="'region' + (index + 1)" v-model="selected.locations"/>
								{{ region.name }} ({{ region.number }})
							</li>
						</ul>
					</b-collapse>

					<b-list-group-item @click="filter4MobileVisible = !filter4MobileVisible" v-b-toggle.collapse-mobile-4 class="d-flex justify-content-between align-items-center">
						Notes
						<b-icon v-if="filter4MobileVisible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-mobile-4">
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
    </b-sidebar>
    <!-- END FILTERS MOBILE -->
		<div class="bloc-space col-xl-1"></div>
		<div class="products-list col-xl-8 col-lg-8">
      <div class="searchbar-products">
        <form id="searchInputForm" >
          <b-form inline>
            <label for="inline-form-input">Rechercher : </label>
            <b-form-input id="inline-form-input" v-model="searchInput" name="words" placeholder="Rechercher un produit par mots-clés"></b-form-input>
            <b-button @click="getProductsByKeWord" variant="transparent"><b-icon icon="search" aria-hidden="true"></b-icon></b-button>
          </b-form>
        </form>
      </div>
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
					<b-form-select v-model="selected.orderBy" :options="options" size="sm"></b-form-select>
					<b-button variant="light" @click="deckGrid = true"><b-icon icon="grid-fill" aria-hidden="true"></b-icon></b-button>
					<b-button variant="light" @click="deckGrid = false"><b-icon icon="list-ul" aria-hidden="true"></b-icon></b-button>
				</div>
			</div>
      <hr>
      <!--<div v-b-toggle.sidebar-filters class="filters-button" @click="showFilters = true">-->
      <div v-b-toggle.sidebar-filters class="filters-button">
        <b-button variant="light"><b-icon icon="filter-left" aria-hidden="true"></b-icon>Filtres</b-button>
      </div>
      <div class="results-details-number">résultats {{ 1 + ((currentPage - 1) * perPage) }} - {{ ((currentPage - 1) * perPage) + nbResults }} sur {{ totalProducts }}</div>
			<b-card-group deck v-bind:class="[deckGrid ? 'card-deck-custom-grid' : 'card-deck-custom-list']">
				<router-link v-for="product in products" :key="product._source.id" :to="'/products/' + product._source.id" :per-page="perPage" :current-page="currentPage">
					<b-card v-if="deckGrid" class="product-card">
						<template #header>
              <div class="height:200px;width:100%;justify-content:center;align-items:center;">
                <img :src="product._source.image_path ? mediaRoot+product._source.image_path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
              </div>
            </template>
            <b-card-text class="product-card-text">{{ product._source.name }}</b-card-text>
            <b-card-text class="text-muted">
              <div class="price-bloc">{{ product._source.price }}€ / jour</div>
              <div class="ratings-bloc">
                <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 0.2) ? 'star' : (product._source.average_ratings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 1.2) ? 'star' : (product._source.average_ratings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 2.2) ? 'star' : (product._source.average_ratings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 3.2) ? 'star' : (product._source.average_ratings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 4.2) ? 'star' : (product._source.average_ratings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                <span> ({{ product._source.numbers_of_ratings ? product._source.numbers_of_ratings : 0 }} avis)</span>
              </div>
              <div class="address-bloc">{{ product._source.ville }} &bull; {{ product._source.region }} ({{ product._source.region_number }})</div>
            </b-card-text>
					</b-card>
					<b-card v-else no-body class="overflow-hidden">
						<b-row no-gutters class="h-100">
							<b-col xl="4" lg="4" md="12" sm="12">
                <div class="image-bloc">
                  <img :src="product._source.image_path ? 'https://localhost:8443/media'+product._source.image_path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image">
                </div>
              </b-col>
							<b-col xl="8" lg="8" md="12" sm="12" class="d-flex flex-column justify-content-between">
								<b-card-body :title="product._source.name">
									<b-card-text class="product-card-description">
										{{ product._source.description }}
									</b-card-text>
                  <b-card-text class="d-flex justify-content-between align-items-center">
                    <div class="price-bloc">{{ product._source.price }}€ / jour</div>
                    <div class="ratings-bloc">
                      <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 0.2) ? 'star' : (product._source.average_ratings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 1.2) ? 'star' : (product._source.average_ratings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 2.2) ? 'star' : (product._source.average_ratings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 3.2) ? 'star' : (product._source.average_ratings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 4.2) ? 'star' : (product._source.average_ratings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                      <span> ({{ product._source.numbers_of_ratings ? product._source.numbers_of_ratings : 0 }} avis)</span>
                    </div>
                  </b-card-text>
								</b-card-body>
								<b-card-footer class="bg-white d-flex justify-content-between align-items-center">
									<div class="address-bloc"><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon>&nbsp;{{ product._source.vile }} &bull; {{ product._source.region }} ({{ product._source.region_number }})</div>
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
import AuthService from "@/services/AuthService";
import RegionService from "@/services/RegionService";
import {mapGetters} from "vuex";

export default {
  components: {
	//SearchBar,
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
      filter1MobileVisible: false,
      filter2MobileVisible: false,
      filter3MobileVisible: false,
      filter4MobileVisible: false,
      deckGrid: true,
      selected: {
        categories: [],
        locations: [],
        orderBy: null,
        notes: "0",
      },
      options: [
        { value: null, text: '- Trier par -' },
        { value: ['average_ratings','asc'], text: 'note croissante' },
        { value: ['average_ratings','desc'], text: 'note décroissante' },
        { value: ['price','asc'], text: 'prix croissant' },
        { value: ['price','desc'], text: 'prix décroissant' },
      ],
      regions: [],
      perPage: 15,
      currentPage: 1,
      minPrice: 0,
      maxPrice: 0,
      totalProducts: 0,
      showFilters: false,
      mobile: false,
      subCategories: [],
    }
  },
  created() {
    AuthService.getCategories().then(response => {
      this.$store.dispatch('categories',response.data['hydra:member'].filter(category => !category?.parent))
      this.subCategories = response.data['hydra:member'].filter(category => category?.parent)
      let category = this.$route.query.category;
      if(category && this.categories.some(c => c.name.toLowerCase() == category.toLowerCase())) {
        this.paramCategory = category.toLowerCase();
        this.initializaFilterCategories();
      } else if(category && this.subCategories.some(c => c.name.toLowerCase() == category.toLowerCase())) {
        this.paramCategory = category.toLowerCase();
        this.selected.categories.push(category.toLowerCase());
      } else {
        this.paramCategory = '';
      }
    }).catch(e => console.log(e))
    RegionService.getRegions().then(response => {
      this.regions = response.data['hydra:member']
    }).catch(e => console.log(e))
  },
  mounted() {
    let width = window.innerWidth;
    if(width < 992) {
      this.showFilters = false;
      this.mobile = true;
    } else {
      this.showFilters = true;
      this.mobile = false;
    }
    this.minPrice = this.getMinPrice();
    this.maxPrice = this.getMaxPrice();
    let words = this.$route.query.words;
    if(words) {
      this.paramWords = words;
      this.searchInput = words;
    }
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
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
    'searchInput': {
      handler(newVal) {
        this.searchInput = newVal;
        this.getProductsByKeWord();
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
    '$route.query.category': {
      handler(newVal) {
        if(newVal && this.categories.some(c => c.name.toLowerCase() == newVal.toLowerCase())) {
          this.paramCategory = newVal.toLowerCase();
          this.initializaFilterCategories();
          this.updateProducts();
        } else if(newVal && this.subCategories.some(c => c.name.toLowerCase() == newVal.toLowerCase())) {
          this.paramCategory = newVal.toLowerCase();
          this.selected.categories.push(newVal.toLowerCase());
          this.updateProducts();
        } else {
          this.paramCategory = '';
          this.selected.categories = [];
          this.updateProducts();
        }
      }
    },
  },
  methods: {
    getProductsByKeWord() {
      AuthService.getProductsByKeyWord({
        page: this.currentPage,
        word:this.searchInput
      }).then(response => {
        this.products = response.data.hits.hits;
        this.nbResults = this.products.length;
        this.totalProducts = response.data.totalProducts;
      }).catch(e => console.log(e))
    },
    updateProducts() {
      document.getElementsByClassName('spinner-loading')[0].style.display = 'flex';
      AuthService.getProductsByKeyWord({
        page: this.currentPage,
        sort: this.selected.orderBy,
        category: this.selected.categories,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        region: this.selected.locations,
        averageRatings: this.selected.notes,
      }).then(response => {
        this.products = response.data.hits.hits;
        this.nbResults = this.products.length;
        this.totalProducts = response.data.hits.total.value;
      }).catch(e => console.log(e))
      .finally(() => {
        document.getElementsByClassName('spinner-loading')[0].style.display = 'none';
      })
    },
    onPageChanged(page) {
      this.currentPage = page;
      this.updateProducts();
      window.scrollTo(0, 0);
    },
    getMaxPrice() {
      return 1000000000;
    },
    getMinPrice() {
      return 0;
    },
    selectedAllSubCategories(category) {
      let index = this.categories.map(function(elt) {return elt.name.toLowerCase()}).indexOf(typeof category === 'string' ? category.toLowerCase() : category.name.toLowerCase()) + 1;
      if (index > 0) {
        let categoryObject = typeof category === 'string' ? this.categories[index - 1] : category;
        if (document.getElementById('category' + index).checked) {
            categoryObject.children.forEach(element => {
            this.selected.categories.push(element.name.toLowerCase());
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
      this.selected.categories = [];
      document.getElementsByClassName('category-checkbox').forEach((elt) => { elt.checked = false });
      document.getElementById('category' + index).checked = true;
      this.selectedAllSubCategories(category);
    },
    handleResize() {
      let width = window.innerWidth;
      if(width < 992) {
        this.showFilters = false;
        this.mobile = true;
      } else {
        this.showFilters = true;
        this.mobile = false;
      }
    }
  },
  computed: {
    ...mapGetters(['categories']),
    mediaRoot(){
      return process.env.VUE_APP_URL+'/media'
    }
  }
};
</script>

<style>
.spinner-loading {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9000;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
}

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

.searchbar-products .form-inline input::placeholder {
  color: #ffffff;
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

.filters-button {
  display: none;
  width: fit-content;
}

.card-deck-custom-list {
	display: block !important;
}

/*********************** */
/* card deck custom grid */
/*********************** */

.card-deck-custom-grid {
  display: flex;
  flex-wrap: wrap;
}

.card-deck-custom-grid a {
  flex: 0 0 33%;
  max-width: 33%;
  padding: 10px 2px !important;
  margin-top: 40px;
}

.card-deck-custom-grid .card {
  margin-bottom: 10px;
  width: auto !important;
  flex: none;
	transition: all .2s ease-in-out;
}

.card-deck-custom-grid .card:hover {
	transform: scale(1.05);
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.card-deck-custom-grid .card-header {
  width: 100%;
  height: 200px;
  background-color: rgba(50, 50, 50, 0.2);
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-deck-custom-grid .card img {
	width: auto;
	height: auto;
  max-height: 100%;
  max-width: 100%;
}


/*********************** */
/* card deck custom list */
/*********************** */

.card-deck-custom-list > a {
	margin-top: 40px;
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

.card-deck-custom-list .card-header {
  background-color: rgba(50, 50, 50, 0.2);
  width: 300px;
  height: 200px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-deck .card .image-bloc {
  background-color: rgba(50, 50, 50, 0.2);
  width: 100%;
  height: 300px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
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

.card-deck-custom-list .product-card {
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

@media screen and (max-width: 1400px) {

  .filters-box h2 {
    font-size: 24px;
    border-bottom: 1px solid #bbbbbb;
    margin: 0px auto;
    padding: 20px 20px 10px 20px;
    width: fit-content;
  }

  .filters-box .main-hr {
    width: 0%;
  }

  .filters-box .list-group-item {
    font-size: 14px;
  }

  .filters-box .collapse {
    font-size: 14px;
  }

  .bloc-space {
    display: flex;
    flex: 0 0 0%;
    padding: 0px !important;
    margin: 0px !important;
    width: 0px !important;
  }

  .card-deck-custom-grid a {
    flex: 0 0 50%;
    max-width: 50%;
    margin: 0px;
  }

  .orderby-box {
    margin-bottom: 20px;
  }

  .orderby-box h4 {
    font-size: 20px;
    margin: 0px !important;
  }

  .results-details-number {
    display: none;
  }

  .card-deck {
    margin-top: 40px;
  }
  
}

@media screen and (max-width: 992px) {

  .main-content {
    position: relative;
  }

  #sidebar-filters {
    width: 75%;
    z-index: 9999;
  }

  #sidebar-filters .close .bi-x {
    height: 50px;
    width: 50px;
  }

  #sidebar-filters h2 {
    font-size: 32px;
  }

  .filters-box .list-group-item {
    font-size: 18px;
  }

  .filters-box .collapse {
    font-size: 18px;
  }

  #sidebar-filters #collapse-mobile-2 .row {
    margin: 0px !important;
    padding: 0px 30px !important;
  }

  #sidebar-filters #collapse-mobile-2 .row input {
    margin-bottom: 20px;
  }

  .searchbar-products label,
  .searchbar-products input {
    font-size: 16px !important;
  }

  .filters-button {
    display: flex;
    margin: 20px 0px;
  }

  .filters-button button {
    border-radius: 25px;
    font-size: 18px;
    border: 1px solid #999999 !important;
  }

  .filters-button .b-icon.bi {
    height: 24px !important;
    width: 24px !important;
  }

  .card-deck {
    margin-top: 0px;
  }

  .card-deck-custom-grid a {
    flex: 0 0 33%;
    max-width: 33%;
    margin: 0px;
  }
  
}

@media screen and (max-width: 768px) {

  .card-deck-custom-grid a {
    flex: 0 0 50%;
    max-width: 50%;
    margin: 0px;
  }
  
}

@media screen and (max-width: 576px) {

  #sidebar-filters {
    width: 100%;
  }

  .searchbar-products {
    padding: 5px 20px;
  }

  .searchbar-products .form-inline {
    display: flex;
    flex-wrap: nowrap;
  }

  .searchbar-products .form-inline label {
    display: none;
  }

  .searchbar-products .form-inline input {
    margin: 0px 10px;
    border-bottom: 1px solid #999999;
  }

  .searchbar-products .form-inline input::placeholder {
    font-size: 12px;
    color: #999999;
  }

  .searchbar-products .form-inline button {
    font-size: 14px;
  }

  .orderby-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px 0px 10px 0px;
  }

  .orderby-box h4 {
    font-size: 16px;
    margin: 0px !important;
  }

  .orderby-box .orderby-element {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0px 0px 0px;
    width: 100%;
  }

  .orderby-box .orderby-element select {
    font-size: 16px;
    width: 100%;
  }

  .orderby-box .orderby-element button {
    display: none !important;
  }

  .orderby-box .b-icon.bi {
    height: 15px !important;
    width: 15px !important;
  }
  
}

</style>
