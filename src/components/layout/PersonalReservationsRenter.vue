<template>
  <div class="container p-5">
    <div class="d-flex flex-column">
        <div class="card p-3 m-5" v-for="reservation in reservations" :key="reservation.id">
          <div class="card-header bg-white">
            <div class="row justify-content-between">
              <div class="col">
                <h5 class="bold">{{ reservation.product.name }}</h5>
                
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="media row align-items-center">
              <div class="media-body">
                <p class="text-muted"> Prix de caution {{reservation.product.caution}}€</p>
                <p class="text-muted"> Prix de produit par unité {{reservation.product.price}}€</p>
                <p v-if="reservation.state === 'restored' && reservation.paymentIntent !== 'success'" class="text-muted"> Etre payé en total avec caution : {{ reservation.price*80/100 + reservation.product.caution }} €</p>
                <p v-if="reservation.state === 'restored' && reservation.paymentIntent === 'success'"  class="text-muted"> Etre payé en total sans caution : {{ reservation.price*80/100 }} €</p>
                <h5 class="mt-3 mb-4">{{ reservation.price }} €</h5>
              </div>
              <img :src="reservation.product.files.length !== 0 ? mediaRoot+reservation.product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" width="100%"/>
            </div>
          </div>
          <div class="localisation">
            <h5>Localisation du produit</h5>
            <hr>
            {{reservation.product.address.streetName+' '+reservation.product.address.city+' '+reservation.product.address.region.name+' '+reservation.product.address.region.number}}
            <div class="bloc-geolocalisation">
              <GoogleMap v-bind:address="reservation.product.address.streetName+' '+reservation.product.address.city+' '+reservation.product.address.region.name+' '+reservation.product.address.region.number"/>
            </div>
          </div>
          <div class="row px-3">
            <div class="col">
              <ul id="progressbar" v-if="reservation.state === 'payed'">
                <li class="step0 active" id="step1">Payer le {{reservation.createdAt}}</li>
                <li class="step0 text-center" id="step2">Récupérer le {{reservation.rentalBeginDate}} </li>
                <li class="step0 text-muted text-right" id="step3">Rendre le {{reservation.rentalEndDate}}</li>
              </ul>
              <ul id="progressbar" v-if="reservation.state === 'retrieved'">
                <li class="step0 active" id="step1">Payer le {{reservation.createdAt}}</li>
                <li class="step0 text-center active" id="step2">Récupérer le {{reservation.rentalBeginDate}} </li>
                <li class="step0 text-muted text-right" id="step3">Rendre le {{reservation.rentalEndDate}}</li>
              </ul>
              <ul id="progressbar" v-if="reservation.state === 'restored'">
                <li class="step0 active" id="step1">Payer le {{reservation.createdAt}}</li>
                <li class="step0 text-center active" id="step2">Récupérer le {{reservation.rentalBeginDate}} </li>
                <li class="step0 text-muted text-right active" id="step3">Rendre le {{reservation.rentalEndDate}}</li>
              </ul>
            </div>
          </div>
          <div class="card-footer bg-white px-sm-3 pt-sm-4 px-0">
            <div class="row text-center">
              <div class="col my-auto">
                <h3  v-if="reservation.state === 'payed'">Produit payé</h3>
                <h3  v-if="reservation.state === 'retrieved'">Produit récupéré</h3>
                <h5 v-if="reservation.state === 'restored' && !reservation.isTransfered">
                  <button @click="transferPayment(reservation)" class="btn btn-info">Recevoir le paiement</button>
                </h5>
                <h5 v-if="reservation.state === 'restored' && reservation.isTransfered">
                  <p>Votre virement de {{reservation.paymentIntent === 'success' ? reservation.price*80/100 : reservation.price*80/100 + reservation.product.caution}}€ a été déjà transféré</p>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="reservations.length == 0">
        <div>Vous n'avez aucune réservation</div>
      </div>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import GoogleMap from './GoogleMap.vue';
import {mapGetters} from "vuex";

export default {
  components: {
    GoogleMap
  },
  name: "PersonalReservations",
  data: () => ({
    informationsTabActive: true,
    reservationsTabActive: false,
    currentReservation: null,
  }),
  computed:{
    ...mapGetters(['reservations']),
    mediaRoot(){
      return process.env.VUE_APP_URL+'/media'
    },
    stripeRoot(){
      return process.env.VUE_APP_STRIPE
    }
  },
  mounted() {
    const userPermission = this.$store.getters.userPermission
    if(!userPermission){
      this.$router.push('/')
    }
    AuthService.getReservationsRenter(localStorage.getItem('token')).then(response => {
          this.$store.dispatch('reservations',response.data['hydra:member'])
        }
    ).catch(e => console.log(e))
  },
  methods: {
    transferPayment(reservation){
      AuthService.transferPayment({id:reservation.id},localStorage.getItem('token'))
          .then(response => {
                if(response.data.message === "You have already get transfered"){
                  this.$root.$bvToast.toast('Votre virement a déjà été effectué auparavent', {
                    title: 'Oups !',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    autoHideDelay: 5000
                  })
                }
                if(response.data.message === "Deadline is not finished yet"){
                  this.$root.$bvToast.toast("Désolé, vous devez attendre la date de fin de votre réservation pour effectuer cette action", {
                    title: 'Oups !',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    autoHideDelay: 5000
                  })
                }
                if(response.data.message === "You have not right for transfer"){
                  this.$root.$bvToast.toast("Vous ne pouvez pas recevoir de virement pour le moment, vous devez d'abord vous inscrire sur la plateforme Stripe comme indiqué", {
                    title: 'Oups !',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    autoHideDelay: 5000
                  })
                }
                if(response.data.message === "Transfer is successfully completed"){
                  this.$store.dispatch('reservations', this.$store.getters.reservations.map(elem => elem.id === reservation.id ? {...reservation,isTransfered:true} : elem))
                  this.$root.$bvToast.toast("Votre virement a été effectué avec succès", {
                    title: 'Merci !',
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    autoHideDelay: 5000
                  })
                }
              }
          ).catch(() =>
            this.$root.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
              title: 'Oups !',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              noAutoHide: true,
              autoHideDelay: 5000
            })
          )
    }
  },
}
</script>

<style scoped>

body {
  letter-spacing: 0.8px;
  background: linear-gradient(0deg, #fff, 50%, #74a0ff);
  background-repeat: no-repeat
}

p {
  font-size: 14px;
  margin-bottom: 7px
}

.cursor-pointer {
  cursor: pointer
}

a {
  text-decoration: none !important;
  color: #651FFF !important
}

.bold {
  font-weight: 600
}

.small {
  font-size: 12px !important;
  letter-spacing: 0.5px !important
}

.Today {
  color: rgb(83, 83, 83)
}

.btn-outline-primary {
  background-color: #fff !important;
  color: #4bb8a9 !important;
  border: 1.3px solid #4bb8a9;
  font-size: 12px;
  border-radius: 0.4em !important
}

.btn-outline-primary:hover {
  background-color: #4bb8a9 !important;
  color: #fff !important;
  border: 1.3px solid #4bb8a9
}

.btn-outline-primary:focus,
.btn-outline-primary:active {
  outline: none !important;
  box-shadow: none !important;
  border-color: #42A5F5 !important
}

#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  color: #455A64;
  padding-left: 0px;
  margin-top: 30px
}

#progressbar li {
  list-style-type: none;
  font-size: 13px;
  width: 33.33%;
  float: left;
  position: relative;
  font-weight: 400;
  color: #455A64 !important
}

#progressbar #step1:before {
  content: "1";
  color: #fff;
  width: 29px;
  margin-left: 15px !important;
  padding-left: 11px !important
}

#progressbar #step2:before {
  content: "2";
  color: #fff;
  width: 29px
}

#progressbar #step3:before {
  content: "3";
  color: #fff;
  width: 29px;
  margin-right: 15px !important;
  padding-right: 11px !important
}

#progressbar li:before {
  line-height: 29px;
  display: block;
  font-size: 12px;
  background: #455A64;
  border-radius: 50%;
  margin: auto
}

#progressbar li:after {
  content: '';
  width: 121%;
  height: 2px;
  background: #455A64;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 15px;
  z-index: -1
}

#progressbar li:nth-child(2):after {
  left: 50%
}

#progressbar li:nth-child(1):after {
  left: 25%;
  width: 121%
}

#progressbar li:nth-child(3):after {
  left: 25% !important;
  width: 50% !important
}

#progressbar li.active:before,
#progressbar li.active:after {
  background: #4bb8a9
}

.card {
  background-color: #fff;
  box-shadow: 2px 4px 15px 0px rgb(0, 108, 170);
  z-index: 0
}

small {
  font-size: 12px !important
}

.a {
  justify-content: space-between !important
}

.border-line {
  border-right: 1px solid rgb(226, 206, 226)
}

.card-body .media img {
  max-height: 200px;
  max-width: 100%;
  height: auto;
  width: auto;
}

.card-footer img {
  opacity: 0.3
}

.card-footer h5 {
  font-size: 1.1em;
  color: #8C9EFF;
  cursor: pointer
}

.localisation {
  margin-top: 20px;
}

.bloc-geolocalisation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

@media screen and (max-width: 768px) {

  .container {
    padding: 10px !important;
    background-color: #f0f0f0;
  }

  .card {
    box-shadow: none;
    border-radius: 0px;
    border: none;
    margin: 10px !important;
  }

  .card h5 {
    font-size: 16px;
  }

  .card .card-body p {
    font-size: 12px;
  }

  .bloc-geolocalisation {
    display: block;
    width: 100%;
  }
  
}

@media screen and (max-width: 500px) {

  .sub-menu-content .container {
    padding: 10px 0px !important;
  }

  .sub-menu-content .card {
    margin: 10px 0px 20px 0px !important;
    padding: 0px !important;
  }

  .sub-menu-content .card .media {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sub-menu-content .localisation {
    padding: 10px;
  }

  .card h5 {
    font-size: 14px;
  }

}

</style>
