<template>
<div class="dqs main-frame">
	<div class="main-content row mx-0 justify-content-between">
		<div class="products-list col-md-8 offset-md-4">
			<SearchBar />
		</div>
	</div>
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5">
			<div class="col-md-8">
				<div class="product-details">
					<h2>{{ product.name }}</h2><h2 class="title-separator"> | </h2><h4 class="product-details-note">{{ product.note }}/5 <small>(0 note)</small></h4>
					<div class="block-notation-stars">
						<button @click="showNote = !showNote" class="button-new-note">Noter le produit</button>
						<div v-show="showNote" class="sub-block-notation-stars">
							<div>
							<span class="star-selection" @mouseover="currentNote = 0">&nbsp;</span>
							<span class="star-selection" @mouseover="currentNote = 0">&nbsp;</span>
							<span class="star-selection" @mouseover="currentNote = 0">&nbsp;</span>
							<b-icon :icon="currentNote < 0.5 ? 'star' : (currentNote > 0.5 ? 'star-fill' : 'star-half')" @mouseover="currentNote = 0.5" aria-hidden="true"></b-icon>
							<span class="star-selection" @mouseover="currentNote = 1">&nbsp;</span>
							<b-icon :icon="currentNote < 1.5 ? 'star' : (currentNote > 1.5 ? 'star-fill' : 'star-half')" @mouseover="currentNote = 1.5" aria-hidden="true"></b-icon>
							<span class="star-selection" @mouseover="currentNote = 2">&nbsp;</span>
							<b-icon :icon="currentNote < 2.5 ? 'star' : (currentNote > 2.5 ? 'star-fill' : 'star-half')" @mouseover="currentNote = 2.5" aria-hidden="true"></b-icon>
							<span class="star-selection" @mouseover="currentNote = 3">&nbsp;</span>
							<b-icon :icon="currentNote < 3.5 ? 'star' : (currentNote > 3.5 ? 'star-fill' : 'star-half')" @mouseover="currentNote = 3.5" aria-hidden="true"></b-icon>
							<span class="star-selection" @mouseover="currentNote = 4">&nbsp;</span>
							<b-icon :icon="currentNote < 4.5 ? 'star' : (currentNote > 4.5 ? 'star-fill' : 'star-half')" @mouseover="currentNote = 4.5" aria-hidden="true"></b-icon>
							<span class="star-selection" @mouseover="currentNote = 5">&nbsp;</span>
							<span class="star-selection" @mouseover="currentNote = 5">&nbsp;</span>
							<span class="star-selection" @mouseover="currentNote = 5">&nbsp;</span>
							</div>
							<div class="note-number">{{ currentNote }} / 5</div>
							<button @click="handleSubmitNote" class="button-submit-note mt-3">NOTER</button>
						</div>
					</div>
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
import SearchBar from '../../layout/CommonSearchBar.vue';
import Comments from '../../layout/Comments.vue';
import SimilarAds from '../../layout/SimilarAds.vue';
import FormContact from '../../layout/FormContact.vue';
import CalendarAvailabilities from '../../layout/CalendarAvailabilities.vue';
import GoogleMap from '../../layout/GoogleMap.vue';
import CommentService from "../../../services/CommentService";
import AuthService from "@/services/AuthService";
import {mapGetters} from "vuex";

export default {
  components: {
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
		currentNote: 0,
		showNote: false,
	}
  },
  created() {
    AuthService.getProduct(this.$route.params.productId).then(response => {
      this.$store.dispatch('product',response.data)
      console.log(response.data)
    }).catch(e => console.log(e))
  },
  computed:{
    ...mapGetters(['product','user'])
  },
  methods: {
    handleSubmitNote() {
      if (this.$store.getters.user) {
        let commentExist = this.product.comments.filter(c => c.user == this.$store.getters.user);
		if (commentExist) {
          CommentService.updateComment({
            rating : this.currentNote,
          }, commentExist.id,)
		} else {
			CommentService.postComment({
				text: null,
				rating: this.currentNote,
				user: this.$store.getters.user,
				product: this.product,
			})
		}
      }
    }
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

.sub-block-notation-stars {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	top: 40px;
	left: 50%;
	background-color: rgba(250, 250, 250, 1);
	padding: 50px;
	border-radius: 25px;
	width: max-content;
	transform: translateX(-50%);
	z-index: 1;
}

.sub-block-notation-stars .b-icon,
.sub-block-notation-stars span {
	cursor: pointer;
}

.block-notation-stars .b-icon.bi {
	width: 30px !important;
	height: 30px !important;
}

.sub-block-notation-stars .star-selection {
	padding-left: 5px;
	padding-right: 5px;
}

.button-submit-note {
	background-color: #0072b5;
	color: #ffffff;
	border: none;
	padding: 10px 20px;
	font-weight: bold;
}

.note-number {
	margin-top: 10px;
	text-align: center;
	font-size: 2rem;
}

.button-new-note {
    background-color: rgb(250, 250, 250);
    padding: 10px;
    border: 1px solid #dddddd;
    cursor: pointer;
}

.button-new-note:hover {
    border: 1px solid #999999;
}

.product-image img {
	max-width: 100%;
	max-height: 500px;
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
