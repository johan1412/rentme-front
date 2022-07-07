<template>
<div class="dqs main-frame">
	<div class="main-content row mx-0 justify-content-between">
		<div class="products-list col-md-8 offset-md-4">
      <div class="searchbar-products">
        <form id="searchInputForm" >
          <b-form inline>
            <label for="inline-form-input">Rechercher : </label>
            <b-form-input id="inline-form-input" v-model="searchInput" name="words" placeholder="Rechercher un produit par mots-clés"></b-form-input>
            <b-button @click="handleSubmit" variant="transparent"><b-icon icon="search" aria-hidden="true"></b-icon></b-button>
          </b-form>
        </form>
      </div>
		</div>
	</div>
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5 mx-0">
			<div class="bloc-product col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="product-details">
          <h2>{{ product.name }}</h2>
					<div class="date-product">Annonce publiée le {{ publishedDate }} par <router-link :to="'/user/' + this.product.user.id" class="user-link">{{ product.user.lastName }} {{ product.user.firstName }}</router-link></div>
          <div v-show="mobile" class="product-price-mobile">{{ product.price }} €<span> / jour</span></div>
          <div class="frame-ratings">
            <div class="ratings averageRatings my-1">
              <span>Note moyenne:</span>
              <div class="averageRatings-details mx-5">
                <h3>{{ product.averageRatings ? Math.round(product.averageRatings * 10) / 10 : '-' }} / 5</h3>
                <small class="ml-3">({{ product.numbersOfRatings ? product.numbersOfRatings : 0 }} avis)</small>
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
              <div v-show="mobile">
                <b-form-select v-model="noteSelected" :options="noteOptions" size="sm" @change="handleSubmitNote"></b-form-select>
              </div>
            </div>
          </div>
          <div class="row product-main-presentation">
						<div class="col-md-6 product-image">
							<img :src="product.files.length !== 0 ? mediaRoot+product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" width="100%"/>
						</div>
						<div class="col-md-6 product-description">
							<h4>Description</h4>
							<hr>
							<p :class="buttonDescriptionToggle ? 'full' : 'partially'">{{ product.description }}</p>
							<div class="toggle-button-line">
								<button class="toggle-button" @click="buttonDescriptionToggle = !buttonDescriptionToggle">{{ buttonDescriptionToggle ? 'Masquer' : 'Voir plus' }}</button>
							</div>
							<div v-show="showNote" class="product-price">{{ product.price }} €<span> / jour</span></div>
						</div>
					</div>
				</div>
				<div class="localisation">
					<h4>Localisation du produit</h4>
					<hr>
					<GoogleMap v-bind:address="product.address.streetName+' '+product.address.city+' '+product.address.region.name+' '+product.address.region.number"/>
				</div>
				<div class="comments">
					<Comments />
				</div>
			</div>
			<div class="bloc-forms col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
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
	</div>
</div>
</template>

<script>
import Comments from '../../layout/Comments.vue';
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
    //SearchBar,
    Comments,
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
      noteSelected: null,
      noteOptions: [
        { value: null, text: '- selectionner -', disabled: true },
        { value: 0, text: '0 sur 5' },
        { value: 0.5, text: '0.5 sur 5' },
        { value: 1, text: '1 sur 5' },
        { value: 1.5, text: '1.5 sur 5' },
        { value: 2, text: '2 sur 5' },
        { value: 2.5, text: '2.5 sur 5' },
        { value: 3, text: '3 sur 5' },
        { value: 3.5, text: '3.5 sur 5' },
        { value: 4, text: '4 sur 5' },
        { value: 4.5, text: '4.5 sur 5' },
        { value: 5, text: '5 sur 5' },
      ],
      publishedDate: null,
      reason: null,
      searchInput: null,
      mobile: false,
    }
  },
  mounted() {
    if(this.$store.getters.user) {
      let width = window.innerWidth;
      if(width < 576) {
        this.showNote = false;
        this.mobile = true;
      } else {
        this.showNote = true;
        this.mobile = false;
      }
    }
    AuthService.getProductValid(this.$route.params.productId).then(response => {
      this.$store.dispatch('product',response.data)
      this.currentNote = 0
      if (this.user.comments.length !== 0){
        if(this.user.comments.filter(comment => comment.product.id === response.data.id).length !== 0){
          this.currentNote = this.user.comments.filter(comment => comment.product.id === response.data.id)[0].rating
        }
      }

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
    }).catch((e) => {
      console.log(e)
      if(e.response.data['hydra:description'] == 'Not Found') {
        this.$router.push('/error-404')
      }
      if(e.response.data['message'] == 'Access denied') {
        this.$router.push('/error-403')
      }
    })

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed:{
    ...mapGetters(['product','user']),
    mediaRoot(){
      return process.env.VUE_APP_URL+'/media'
    }
  },
  methods: {
    handleSubmit() {
      this.$router.push('/search?words=' + (this.searchInput !== null ? this.searchInput : ''));
    },
    handleSubmitNote() {
      const allPermission = this.$store.getters.allPermission
      if(!allPermission){
        this.$router.push('/login')
      }
      if (this.$store.getters.user) {
        let commentExist = this.user.comments.filter(comment => comment.product.id === this.product.id);
        if (commentExist.length > 0) {
          CommentService.updateComment({
            rating : this.currentNote,
          }, commentExist[0].id,localStorage.getItem('token'))
          .then(response => {
            this.$store.dispatch('user',{...this.user,comments:this.user.comments.map(comment => comment.id === commentExist[0].id ? {...comment,rating:response.data.rating} : comment)})
            AuthService.getProductValid(this.$route.params.productId).then(response => {
              this.$store.dispatch('product',response.data)})
            this.$root.$bvToast.toast('Votre note a été enregistré avec succès', {
              title: 'Merci !',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 5000
            })
          }).catch(e => {
                console.log(e)
                this.$root.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
                  title: 'Oups !',
                  variant: 'danger',
                  solid: true,
                  toaster: 'b-toaster-top-full',
                  autoHideDelay: 5000
                })
              })
        } else {
          CommentService.postComment({
            text: '',
            rating: this.currentNote,
            user: '/users/'+this.user.id,
            product: 'products/'+this.product.id,
          },localStorage.getItem('token'))
          .then(response => {
            this.$store.dispatch('user',{...this.user,comments:[...this.user.comments,response.data]})
            AuthService.getProductValid(this.$route.params.productId).then(response => {
              this.$store.dispatch('product',response.data)})
            this.$root.$bvToast.toast('Votre note a été enregistré avec succès', {
              title: 'Merci !',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 5000
            })
            }).catch(e => {
            console.log(e)
            this.$root.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
              title: 'Oups !',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 5000
            })
          })
        }
        }
    },
    handleClickReport() {
      const allPermission = this.$store.getters.allPermission
      if(!allPermission){
        this.$router.push('/login')
      }
      if (this.$store.getters.user) {
        MessagesService.postReport({
          sender: 'users/' + this.user.id,
          product: 'products/' + this.product.id,
          reason: this.reason,
        },localStorage.getItem('token')).then(() => {
          this.$root.$bvToast.toast('Votre signalement a été enregistré avec succès', {
            title: 'Merci !',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-top-full',
            autoHideDelay: 5000
          })
        }).catch(e => {
          console.log(e)
          this.$root.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
            title: 'Oups !',
            variant: 'danger',
            solid: true,
            toaster: 'b-toaster-top-full',
            autoHideDelay: 5000
          })
        })
      }
    },
    handleResize() {
      let width = window.innerWidth;
      if(width < 576) {
        this.showNote = false;
        this.mobile = true;
      } else {
        this.showNote = true;
        this.mobile = false;
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

.searchbar-products .form-inline input::placeholder {
  color: #ffffff;
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
  padding: 10px 0px;
}

.report .report-link {
  text-decoration: underline;
  width: fit-content;
  margin-left: auto;
  margin-right: 0px;
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

@media screen and (max-width: 992px) {

  .product-details h2 {
    font-size: 22px !important;
  }

  .searchbar-products label,
  .searchbar-products input {
    font-size: 16px !important;
  }

  .product-details .date-product,
  .product-details .ratings {
    font-size: 14px !important;
  }

  .product-details .ratings {
    padding: 5px 10px;
  }

  .product-details .ratings h3 {
    font-size: 20px;
  }

  .product-description h4 {
    font-size: 20px;
  }

  .product-description p,
  .product-description button {
    font-size: 14px;
  }

  .product-description .product-price {
    font-size: 18px;
    padding: 10px;
  }

  .localisation h4 {
    font-size: 20px;
  }

  .comments {
    margin-bottom: 50px;
  }

}

@media screen and (max-width: 768px) {

  .product-description {
    margin-top: 40px;
  }
  
}

@media screen and (max-width: 576px) {

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

  .bloc-product,
  .bloc-forms {
    margin: 0px !important;
    padding: 0px !important;
  }

  .product-details h2 {
    font-size: 16px !important;
  }
  
  .product-details .date-product,
  .product-details .ratings {
    font-size: 12px !important;
  }

  .frame-ratings {
    width: 100%;
    display: flex;
    margin-top: 20px;
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
  }
  
  .product-details .ratings {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    flex: 0 0 50%;
    max-width: 50%;
    background-color: transparent;
  }

  .product-details .ratings h3 {
    font-size: 18px;
  }

  .product-details .averageRatings-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .product-details .averageRatings-details h3,
  .product-details .averageRatings-details small {
    margin: 0px !important;
  }

  .product-details .ratings .rating-stars .b-icon.bi {
    height: 18px !important;
    width: 18px !important;
  }

  .product-price-mobile {
    margin-top: 10px;
    color: #34AC9E;
    font-weight: bold;
  }
  
  .product-description h4 {
    font-size: 18px;
  }
  
  .product-description p,
  .product-description button {
    font-size: 12px;
  }
  
  .product-description .product-price {
    font-size: 16px;
    padding: 10px;
  }
  
  .localisation h4 {
    font-size: 18px;
  }
  
  .comments {
    margin-bottom: 40px;
  }

}

</style>
