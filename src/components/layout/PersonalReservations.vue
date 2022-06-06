<template>
  <div class="container p-5">
    <div class="container-fluid my-5 d-sm-flex justify-content-center">
      <div class="d-flex flex-column">
        <div class="p-2" v-for="reservation in reservations" :key="reservation.id">
          <div class="card px-2">
            <div class="card-header bg-white">
              <div class="row justify-content-between">
                <div class="col">
                  <h4 class="text-muted"> ID de produit : <span class="font-weight-bold text-dark">{{ reservation.product.id }}</span></h4>
                  <div class="localisation">
                    <h4>Localisation du produit</h4>
                    <hr>
                    <GoogleMap v-bind:address="reservation.product.address"/>
                    {{reservation.product.address}}
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="media flex-column flex-sm-row">
                <div class="media-body ">
                  <h5 class="bold">{{ reservation.product.name }}</h5>
                  <p class="text-muted"> Prix de caution {{reservation.product.caution}}€</p>
                  <p class="text-muted"> Prix de produit par unité {{reservation.product.price}}€</p>
                  <p class="text-muted"> Prix payé en total avec caution :</p>
                  <h4 class="mt-3 mb-4 bold"> <span class="mt-5">&#x20B9;</span> {{ reservation.price }} €</h4>
                </div><img class="align-self-center img-fluid" src='https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png' width="180 " height="180">
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
              <div class="row text-center ">
                <div class="col my-auto">
                  <button v-on:click="myMethod(reservation)" class="btn btn-info" v-if="reservation.state === 'payed'">Récupérer le produit</button>
                  <button v-on:click="myMethod(reservation)" class="btn btn-info" v-if="reservation.state === 'retrieved'">Rendre le produit</button>
                  <h5 v-on:click="myMethod(reservation)" v-if="reservation.state === 'restored'">
                    <p>Remboursement de votre caution de {{reservation.product.caution}}€ a été bien envoyé</p>
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
    </div>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import {mapGetters} from "vuex";
import GoogleMap from './GoogleMap.vue';

export default {
  components: {
    GoogleMap
  },
  name: "PersonalReservations",
  data: () => ({
    informationsTabActive: true,
    reservationsTabActive: false,
  }),
  created() {
    AuthService.getReservations().then(response => {
          this.$store.dispatch('reservations',response.data['hydra:member'])
        }
    ).catch(e => console.log(e))
  },
  computed:{
    ...mapGetters(['reservations'])
  },
  mounted() {
    const userPermission = this.$store.getters.userPermission
    if(!userPermission){
      this.$router.push('/')
    }
  },
  methods: {
    myMethod: function myMethod(reservation) {
      this.$store.dispatch('reservations',this.$store.getters.reservations.map(elem => elem.id === reservation.id ? {...elem,state:reservation.state === 'payed' ? 'retrieved' : 'restored'} : elem))
      AuthService.updateReservation({id:reservation.id,state:reservation.state === 'payed' ? 'retrieved' : 'restored'}).then(response => {
            console.log(response)
      }
      ).catch(e => console.log(e))
      if (reservation.state === 'retrieved'){
        AuthService.refund({caution:reservation.product.caution,paymentIntent:reservation.paymentIntent})
            .then(response => {
              console.log(response)
            }
        ).catch(e => console.log(e))
      }
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

.container-fluid {
  margin-top: 80px !important;
  margin-bottom: 80px !important
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

</style>