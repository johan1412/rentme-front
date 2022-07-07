<template>
  <div class="container">
    <h1 class="h3 mt-5">Mon compte</h1>
    <hr>
    <div class="sub-menu-account">
      <div class="row mx-0">
        <div :class="myReservationsTabActive ? 'bg-light' : ''" class="sub-menu-item w-50" @click="subMenuHandler(' ')">Mes réservations</div>
        <div :class="informationsTabActive ? 'bg-light' : ''" class="sub-menu-item w-50" @click="subMenuHandler('info')">Mes informations</div>
      </div>
    </div>
    <div class="sub-menu-content">
      <div v-if="informationsSelected">
        <PersonalInformations />
      </div>
      <div v-else>
        <div class="sub-menu-account">
          <div class="row mx-0">
              <div :class="reservationsTabActive ? 'bg-light' : ''" class="sub-menu-item w-50" @click="reservationHandler('client')">Réservations effectuées</div>
              <div v-show="user.roles.includes('ROLE_RENTER')" :class="reservationsProduitTabActive ? 'bg-light' : ''" class="sub-menu-item w-50" @click="reservationHandler('renter')">Réservations de mes annonces</div>
            </div>
          </div>
          <div v-if="reservationsProduitSelected">
          <PersonalReservationsRenter v-if="user.roles.includes('ROLE_RENTER')"/>
        </div>
        <div v-else>
          <PersonalReservations />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalReservations from '../../layout/PersonalReservations.vue';
import PersonalReservationsRenter from '../../layout/PersonalReservationsRenter.vue';
import PersonalInformations from '../../layout/PersonalInformations.vue';
import {mapGetters} from "vuex";

export default {
  name: "Account",
  components: {
    PersonalReservations,
    PersonalInformations,
    PersonalReservationsRenter
  },
  data: () => ({
    informationsTabActive: false,
    reservationsTabActive: false,
    myReservationsTabActive: true,
    menuReseravtionSelected: false,
    reservationsProduitTabActive: true,
    informationsSelected: false,
    reservationsSelected: false,
    reservationsProduitSelected: false,
  }),
  mounted() {
    const allPermission = this.$store.getters.allPermission
    if(!allPermission){
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    subMenuHandler(clicked) {
      if(clicked == 'info') {
        this.informationsTabActive = true;
        this.informationsSelected = true;
        this.reservationsSelected = false;
        this.myReservationsTabActive = false;
      } else {
        this.myReservationsTabActive = true;
        this.informationsTabActive = false;
        this.informationsSelected = false;
        this.reservationsSelected = true;
        this.reservationsProduitTabActive = true;
        this.reservationsTabActive = false;
      }
    },
    reservationHandler(clicked) {
      if(clicked == 'client') {
        this.reservationsTabActive = false
        this.reservationsProduitTabActive = true;
        this.reservationsProduitSelected = false;
      } else {
        this.reservationsTabActive = true
        this.reservationsProduitTabActive = false;
        this.reservationsProduitSelected = true;
      }
    },
  }
}
</script>

<style scoped>

.sub-menu-account {
  max-width: 800px;
  margin: 20px auto 0px auto;
  border-bottom: 1px solid rgba(200, 200, 200, 0.8);
  text-align: center;
}

.sub-menu-content {
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
}

.sub-menu-account .sub-menu-item {
  padding: 15px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {

  .sub-menu-account .sub-menu-item {
    font-size: 14px;
  }

  .sub-menu-content {
    font-size: 12px;
  }

}

@media screen and (max-width: 576px) {

  .sub-menu-account .sub-menu-item {
    font-size: 13px;
  }

  .sub-menu-content {
    font-size: 12px;
  }

}

</style>
