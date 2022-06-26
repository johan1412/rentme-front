<template>
<div class="border-bottom">
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand class="fw-bold brand-menu"><router-link class="home-link" to="/">RENTME</router-link></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!user" class="ml-auto">
        <b-nav-item><router-link class="btn bg-dark text-light" to="#">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/login">Se connecter</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item v-if="!user.roles.includes('ROLE_ADMIN')"><router-link class="btn text-dark" to="/messages">Mes messages</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn text-dark" to="/admin/reportings">Signalements ({{numberOfProductsReported}})</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn text-dark" to="/admin/products">Annonces en attente ({{numberOfProductsNotValid}})</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn text-dark" to="/admin/categories">Nouvelle catégorie</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_RENTER')"><router-link class="btn text-dark" to="/publish">Publier une annonce</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_RENTER')"><router-link class="btn text-dark" to="/products">Mes annonces</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/account">Mon compte</router-link></b-nav-item>
        <b-nav-item @click="$bvModal.show('modalLogout')"><router-link class="btn bg-dark text-light logout-button" to="/">Se déconnecter</router-link></b-nav-item>
      </b-navbar-nav>
      <div>
        <circle-spin v-bind:loading="isLoading"></circle-spin>
      </div>
    </b-collapse>
  </b-navbar>
  <b-modal id="modalLogout" title="Déconnexion">
    <div class="modal-body container m-auto">
      <p class="my-4">Êtes-vous sûr de vouloir vous déconnecter ?</p>
    </div>
    <template #modal-footer="{ cancel }">
      <div class="mx-auto">
        <b-button class="rounded-0 mr-1" @click="cancel()">Annuler</b-button>
        <b-button class="rounded-0 ml-1" @click="logout($bvModal.hide('modalLogout'))" variant="success">Confirmer</b-button>
      </div>
    </template>
  </b-modal>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "NavBar",
  data() {
    return {
      modalShow: false,
      isLoading : false
    }
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$store.dispatch('user',null)
      this.$store.dispatch('products',[])
      this.$store.dispatch('numberOfProductsNotValid',0)
      this.$store.dispatch('numberOfProductsReported',0)
      this.$store.dispatch('parentCategories',[])
      this.$store.dispatch('categories',[])
      this.$store.dispatch('reservations',[])
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapGetters(['user','numberOfProductsNotValid','productsNotValid','numberOfProductsReported'])
  },
};
</script>

<style scoped>

.btn {
  padding: 10px 30px;
  border-radius: 0%;
}

.btn.text-dark:hover {
  background-color: #d8d8d8;
}

.home-link{
  color :black;
  font-size: 200%;
  font-weight: bolder;
  margin-left: 70px;
  font-family: 'Roboto-bold';
}

.home-link:hover{
  text-decoration: none;
}

.logout-button:hover {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #000000 !important;
}

@media screen and (max-width: 1400px) {

  .home-link {
    margin: 0px;
    font-size: 20px;
  }

  .nav-item {
    padding: 0px;
  }

  .btn {
    padding: 10px;
  }

}
</style>
