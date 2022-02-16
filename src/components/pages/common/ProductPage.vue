<template>
<div class="dqs main-frame">
	<Menu />
	<div class="main-content row mx-0 justify-content-between">
		<div class="products-list col-md-8 offset-md-4">
			<SearchBar />
		</div>
	</div>
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5">
			<div class="col-md-8">
				<div class="product-details">
					<h2>{{ product.name }}</h2>
					<div>Loué par <strong><router-link :to="'/user/' + this.product.user.id" class="user-link">{{ product.user.lastName }} {{ product.user.firstName }}</router-link></strong></div>
					<div>Annonce publiée le {{ product.publishedAt }}</div>
					<div class="row product-main-presentation">
						<div class="col-md-6 product-image">
							<img :src="product.files.length !== 0 ? 'https://localhost:8443/media'+product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" width="100%"/>
						</div>
						<div class="col-md-6 product-description">
							<h4>Description</h4>
							<hr>
							<p :class="buttonDescriptionToggle ? 'full' : 'partially'">{{ product.description }}</p>
							<div class="toggle-button-line">
								<button class="toggle-button" @click="buttonDescriptionToggle = !buttonDescriptionToggle">{{ buttonDescriptionToggle ? 'Masquer' : 'Voir plus' }}</button>
							</div>
							<div class="product-price">{{ product.price }} €<span> / jour</span></div>
						</div>
					</div>
				</div>
				<div class="localisation">
					<h4>Localisation du produit</h4>
					<hr>
					<GoogleMap v-bind:address="product.address"/>
				</div>
				<div class="comments">
					<Comments v-bind:comments="product.comments"/>
				</div>
			</div>
			<div class="col-md-4">
				<div class="calendar">
					<CalendarAvailabilities v-bind:product="product"/>
				</div>
				<div class="contact-form">
					<FormContact v-bind:product="product" v-bind:user="product.user"/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="similar-ads">
				<h4>Annonces similaires</h4>
				<hr>
				<SimilarAds v-bind:subCategory="product.category"/>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Menu from '../../layout/CommonMenu.vue';
import SearchBar from '../../layout/CommonSearchBar.vue';
import Comments from '../../layout/Comments.vue';
import SimilarAds from '../../layout/SimilarAds.vue';
import FormContact from '../../layout/FormContact.vue';
import CalendarAvailabilities from '../../layout/CalendarAvailabilities.vue';
import GoogleMap from '../../layout/GoogleMap.vue';
import AuthService from "@/services/AuthService";
import {mapGetters} from "vuex";

export default {
  components: {
    Menu,
	SearchBar,
	Comments,
	SimilarAds,
	FormContact,
	CalendarAvailabilities,
	GoogleMap,
  },
  name: "Product",
  data() {
	return {
		buttonDescriptionToggle: false,
	}
  },
  created() {
    AuthService.getProduct(this.$route.params.productId).then(response => {
      this.$store.dispatch('product',response.data)
      console.log(response.data)
    }).catch(e => console.log(e))
  },
  computed:{
    ...mapGetters(['product'])
  },
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

.product-main-presentation {
	margin-top: 30px;
}

.user-link {
	color: #000000;
	text-decoration: underline;
}

.product-details h2,
.product-details-note {
	display: inline;
	margin: 20px 20px 20px 0px;
}

.product-image {
	height: min-content;
}

.product-description {
	overflow: hidden;
}

.product-description p {
	margin-bottom: 15px;
	overflow: hidden;
}

.product-description p.partially {
	max-height: 200px;
	transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
}

.product-description p.full {
	max-height: 5000px;
	transition: max-height 0.5s ease-in-out;
}

.product-description .toggle-button-line {
	width: 100%;
	display: flex;
	justify-content: center;
}

.product-price {
	background-color: #ffffff;
	font-size: 130%;
	font-weight: 900;
	padding: 20px;
	width: fit-content;
}

.product-price span {
	font-size: 80%;
}

.localisation {
	margin-top: 60px;
}

.similar-ads {
	margin-top: 60px;
	margin-left: auto;
	margin-right: auto;
}

</style>
