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
                <p class="text-muted"> Prix payé en total avec caution :</p>
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
                <button v-on:click="myMethod(reservation)" class="btn btn-info" v-if="reservation.state === 'payed'">Produit récupéré</button>
                <button @click="modalFunction(reservation)" class="btn btn-info" v-if="reservation.state === 'retrieved'">Produit rendu</button>
                <h5 v-if="reservation.state === 'restored' && reservation.paymentIntent === 'success'">
                  <p>Le Remboursement de votre caution de {{reservation.product.caution}}€ a été bien envoyé, veuillez vérifier vote boite mail</p>
                </h5>
                  <h5 v-if="reservation.state === 'restored' && reservation.paymentIntent !== 'success'">
                  <p>Votre caution de {{reservation.product.caution}}€ ne va pas être remboursée, car vous avez dépassé la date de limite</p>
                </h5>
              </div>
              <b-modal id="modalRefund" title="Êtes-vous sûr de vouloir rendre le produit ?">
                <div class="modal-body container m-auto">
                  <p  class="my-4">Si le produit n'est pas rendu à l'heure ou avant la date limite, votre caution ne sera pas remboursée</p>
                </div>
                <template #modal-footer="{ }">
                  <div class="mx-auto">
                    <b-button class="rounded-0 mr-1" @click="$bvModal.hide('modalRefund')">Annuler</b-button>
                    <b-button class="rounded-0 ml-1" @click="myMethod(currentReservation)" variant="success">Valider</b-button>
                  </div>
                </template>
              </b-modal>
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
    }
  },
  mounted() {
    const userPermission = this.$store.getters.userPermission
    if(!userPermission){
      this.$router.push('/')
    }
    AuthService.getReservations(localStorage.getItem('token')).then(response => {
          this.$store.dispatch('reservations',response.data['hydra:member'])
        }
    ).catch(e => console.log(e))
  },
  methods: {
    modalFunction(reservation){
      this.currentReservation = reservation
      this.$bvModal.show('modalRefund')
    },
    myMethod: function myMethod(reservation) {
      console.log(reservation.state)
      if (reservation.state === 'retrieved'){
        AuthService.refund({id:reservation.id},localStorage.getItem('token'))
            .then(response => {
              if(response.data.message === "Refund is failed"){
                this.$root.$bvToast.toast('Votre remboursement a échoué, veuillez réessayer', {
                  title: 'Oups !',
                  variant: 'danger',
                  solid: true,
                  toaster: 'b-toaster-top-full',
                  autoHideDelay: 5000
                })
                this.$bvModal.hide('modalRefund')
              }
              if(response.data.message === "Refund not possible"){
                AuthService.updateReservation({id:reservation.id,state:reservation.state === 'payed' ? 'retrieved' : 'restored'},localStorage.getItem('token'))
                    .then(response => {
                      this.$store.dispatch('reservations',this.$store.getters.reservations.map(elem => elem.id === response.data.id ? response.data : elem))
                      this.$root.$bvToast.toast('Votre remboursement a échoué et votre caution ne sera pas remboursée, car vous avez dépassé la date limite de remise', {
                        title: 'Merci !',
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-full',
                        autoHideDelay: 5000
                      })
                      })
                    .catch(e => console.log(e))
                    .finally(() => this.$bvModal.hide('modalRefund'))

              }
              if(response.data.message === "Refund is successfully completed"){
                AuthService.updateReservation({id:reservation.id,state:reservation.state === 'payed' ? 'retrieved' : 'restored',paymentIntent:"success"},localStorage.getItem('token'))
                    .then(response => {
                      this.$store.dispatch('reservations', this.$store.getters.reservations.map(elem => elem.id === response.data.id ? response.data : elem))
                      this.$root.$bvToast.toast('Votre remboursement a été effectué avec succès !', {
                        title: 'Merci !',
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-full',
                        autoHideDelay: 5000
                      })
                    })
                    .catch(e => console.log(e))
                    .finally(() => this.$bvModal.hide('modalRefund'))
              }
            }
        ).catch(e => console.log(e))
        .finally(() => this.$bvModal.hide('modalRefund'))
      }
      else{
        AuthService.updateReservation({id:reservation.id,state:reservation.state === 'payed' ? 'retrieved' : 'restored'},localStorage.getItem('token'))
            .then(response => {
              this.$store.dispatch('reservations',this.$store.getters.reservations.map(elem => elem.id === response.data.id ? response.data : elem))
              this.$root.$bvToast.toast("Veuillez récupérer le produit à l'adresse indiquée sur l'annonce", {
                title: 'Merci !',
                variant: 'success',
                solid: true,
                toaster: 'b-toaster-top-full',
                autoHideDelay: 5000
              })
            })
            .catch(e => console.log(e))
      }
      this.currentReservation = null
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
