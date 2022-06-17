<template>
<div class="dqs main-frame">
	<div class="main-content row mx-0 justify-content-between">
		<div class="products-list col-md-8 offset-md-4">
			<SearchBar />
		</div>
	</div>
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5">
			<div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="product-details">
          <h2>{{ product.name }}</h2>
					<div>Annonce publiée le {{ publishedDate }} par <router-link :to="'/user/' + this.product.user.id" class="user-link">{{ product.user.lastName }} {{ product.user.firstName }}</router-link></div>
          <div class="ratings averageRatings my-1">
            <span>Note moyenne:</span>
            <div class="averageRatings-details mx-5">
              <h3>{{ product.averageRatings ? product.averageRatings : '-' }} / 5</h3>
              <small class="ml-3">({{ product.numbersOfRatings ? product.numbersOfRatings : 0 }} évaluations)</small>
            </div>
          </div>
          <div class="ratings my-1">
            <span>Noter le produit:</span>
            <div v-show="showNote" class="rating-stars" @click="handleSubmitNote">
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
          </div>
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
			<div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="report">
          <div class="report-link" v-b-modal.modalReporting><b-icon icon="flag-fill" aria-hidden="true"></b-icon><span class="ml-1">Signaler cette annonce</span></div>
        </div>
        <b-modal id="modalReporting" size="lg">
          <div class="modal-body container m-auto">
            <ValidationObserver v-slot="{ validate }">
              <form @submit.prevent="validate().then(handleClickReport)">
                <h5 class="text-center">Signalement de l'annonce</h5><br>
                <div class="form-group">
                  <label>Pour quelle(s) raison(s) signalez vous cette annonce ?:</label>
                  <ValidationProvider rules="required|minmax:1,500" v-slot="{ errors, failed }">
                    <textarea
                      type="text"
                      v-model="reason"
                      id="reason"
                      :class="`is-${failed}`"
                      class="form-control"
                      placeholder="Ecrivez ici la ou les raisons du signalement"
                    ></textarea>
                    <span class="form-error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <template #modal-footer="{ ok, cancel }">
            <div class="mx-auto">
              <b-button class="rounded-0 mr-1" @click="cancel()">Annuler</b-button>
              <b-button class="rounded-0 ml-1" @click="handleClickReport(ok())" variant="success">Valider</b-button>
            </div>
          </template>
        </b-modal>
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
import MessagesService from '../../../services/MessagesService';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  message: 'Ce champs doit contenir entre {min} et {max} caractères',
  params: ['min', 'max']
});

extend('required', {
    ...required,
    message: 'Ce champs est obligatoire',
});

export default {
  components: {
    SearchBar,
    Comments,
    SimilarAds,
    FormContact,
    CalendarAvailabilities,
    GoogleMap,
    ValidationProvider,
    ValidationObserver,
  },
  name: "Product",
  data() {
    return {
      buttonDescriptionToggle: false,
      currentNote: 0,
      showNote: false,
      publishedDate: null,
      reason: null,
    }
  },
  created() {
    if(this.$store.getters.user) {
      this.showNote = true;
    }
    AuthService.getProduct(this.$route.params.productId).then(response => {
      this.$store.dispatch('product',response.data)
      let dateFormated = new Date(response.data.publishedAt);
      let day = dateFormated.getDate() < 10 ? '0' + dateFormated.getDate() : dateFormated.getDate();
      let month = dateFormated.getMonth() < 10 ? '0' + dateFormated.getMonth() : dateFormated.getMonth();
      switch(month) {
        case '00':
          month = 'Janvier';
          break;
        case '01':
          month = 'Février';
          break;
        case '02':
          month = 'Mars';
          break;
        case '03':
          month = 'Avril';
          break;
        case '04':
          month = 'Mai';
          break;
        case '05':
          month = 'Juin';
          break;
        case '06':
          month = 'Juillet';
          break;
        case '07':
          month = 'Août';
          break;
        case '08':
          month = 'Septembre';
          break;
        case '09':
          month = 'Octobre';
          break;
        case '10':
          month = 'Novembre';
          break;
        case '11':
          month = 'Décembre';
          break;
        default:
          month = '';
      }
      let year = dateFormated.getFullYear();
      this.publishedDate = day + ' ' + month + ' ' + year;
    }).catch(e => console.log(e))
  },
  computed:{
    ...mapGetters(['product','user'])
  },
  methods: {
    handleSubmitNote() {
      if (this.$store.getters.user) {
        let commentExist = this.product.comments.filter(c => c.user == this.$store.getters.user);
        if (commentExist.length > 0) {
          let oldRatings = commentExist[0].ratings;
          CommentService.updateComment({
            rating : this.currentNote,
          }, commentExist.id,)
          let newAverageRatings = this.product.averageRatings;
          let newNumberOfRatings = this.product.numberOfRatings;
          if(oldRatings) {
            newAverageRatings = ((this.product.averageRatings * this.product.numbersOfRatings) - oldRatings + this.currentNote) / (this.product.numbersOfRatings);
            newNumberOfRatings = this.product.numberOfRatings;
          } else {
            newAverageRatings = ((this.product.averageRatings * this.product.numbersOfRatings) + this.currentNote) / (this.product.numbersOfRatings + 1);
            newNumberOfRatings = this.product.numberOfRatings + 1;
          }
          AuthService.updateProduct(
            this.product.id,
            {
            averageRatings: newAverageRatings,
            numbersOfRatings: newNumberOfRatings,
            }
          ).then(response => {
            this.$store.dispatch('product',response.data)
            this.product.averageRatings = newAverageRatings;
            this.numbersOfRatings = newNumberOfRatings;
          }).catch(e => console.log(e))
        } else {
          CommentService.postComment({
            text: '',
            rating: this.currentNote,
            user: this.$store.getters.user,
            product: this.product,
          })
        }
      }
    },
    handleClickReport() {
      if (this.$store.getters.user) {
        MessagesService.postReport({
          sender: 'users/' + this.$store.getters.user.id,
          product: 'products/' + this.product.id,
          reason: this.reason,
        }).then(() => {
          this.$bvToast.toast('Votre signalement a été enregistré avec succès', {
            title: 'Merci !',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-top-full',
            noAutoHide: true,
          })
        }).catch(e => {
          console.log(e)
          this.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
            title: 'Oups !',
            variant: 'danger',
            solid: true,
            toaster: 'b-toaster-top-full',
            noAutoHide: true,
          })
        })
      }
    },
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

.report {
  text-align: right;
}

.report .report-link {
  text-decoration: underline;
}

#modalReporting textarea {
  width: 100%;
  height: 200px;
}

.product-first-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-details h2,
.product-details-note {
	display: inline;
	margin: 20px 20px 20px 0px;
}

.product-details .product-details-note {
  color: #34AC9E;
}

.ratings {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #999999;
  border-radius: 5px;
  width: fit-content;
  background-color: #ffffff;
}

.ratings.averageRatings .averageRatings-details {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ratings.averageRatings h3 {
  color: #34AC9E;
}

.rating-stars {
  margin: 0px 20px;
  width: fit-content;
}

.rating-stars .b-icon.bi {
	width: 20px !important;
	height: 20px !important;
  color: #34AC9E;
}

.rating-stars span,
.rating-stars .b-icon {
  cursor: pointer;
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
