<template>
<div class="border-bottom">
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand class="fw-bold brand-menu"><router-link class="home-link" to="/">RENTME</router-link></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!user" class="ml-auto">
        <b-nav-item><router-link class="btn bg-dark text-light" to="/publish">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/login">Se connecter</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item v-if="!user.roles.includes('ROLE_ADMIN')">
          <router-link class="btn text-dark" to="/messages">
            <span v-if="nbMsgsUnread > 0" class="unread-messages">
              {{ nbMsgsUnread }}
            </span>
            Mes messages</router-link>
        </b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn text-dark" to="/admin/reportings">Signalements ({{numberOfProductsReported}})</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn text-dark" to="/admin/products">Annonces en attente ({{numberOfProductsNotValid}})</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')" @click="showActionsMenu = !showActionsMenu" class="bloc-dropdown"><div class="btn text-dark">Actions<b-icon class="dropdown-icon" icon="triangle-fill"></b-icon></div>
          <div v-show="showActionsMenu" class="dropdown-actions-list">
            <ul>
              <li><router-link class="dropdown-link" to="/admin/categories">Ajouter une catégorie</router-link></li>
              <li><router-link to="/admin/categories-list">Liste des catégories</router-link></li>
              <li><router-link to="/admin/regions">Ajouter un département</router-link></li>
              <li><router-link to="/admin/regions-list">Liste des départements</router-link></li>
            </ul>
          </div>
        </b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_RENTER')"><router-link class="btn text-dark" to="/publish">Publier une annonce</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_RENTER')"><router-link class="btn text-dark" to="/products">Mes annonces</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/account">Mon compte</router-link></b-nav-item>
        <b-nav-item @click="$bvModal.show('modalLogout')"><router-link class="btn bg-dark text-light logout-button" to="/login">Se déconnecter</router-link></b-nav-item>
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
import MessagesService from "@/services/MessagesService";

export default {
  name: "NavBar",
  data() {
    return {
      modalShow: false,
      isLoading : false,
      showActionsMenu: false,
      nbMsgsUnread: 0
    }
  },
   created() {
     if(this.user !== null){
       this.getUnreadNb()
       setInterval(this.getUnreadNb, 2000)
     }
  },
  methods: {
    getUnreadNb(){
      MessagesService.getUnread(
          this.$store.getters.user.id,localStorage.getItem('token')
      )
          .then((response) => {
            this.nbMsgsUnread = response.data.nb;
          })
          .catch((e) => console.log(e));
    },
    logout(){
      localStorage.clear();
      this.$store.dispatch('user',null)
      this.$store.dispatch('products',[])
      this.$store.dispatch('numberOfProductsNotValid',0)
      this.$store.dispatch('numberOfProductsReported',0)
      this.$store.dispatch('parentCategories',[])
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

.unread-messages{
  background-color: red;
  color: white;
  border: black 1px solid;
  margin-right: 5px;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  text-align: center;
  font-weight: bold;
  font-size: 0.80em;
  line-height: 22px;
  display: block;
  float: left;
  animation-duration: 1.2s;
  animation-name: clignoter;
  animation-iteration-count: infinite;
  transition: none;
}

@keyframes clignoter {
  0%   { opacity:1; }
  40%   {opacity:0; }
  100% { opacity:1; }
}

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

.bloc-dropdown {
  position: relative;
}

.dropdown-actions-list {
  z-index: 9999;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  width: 200px;
}

.dropdown-actions-list ul {
  list-style: none;
  padding: 0px;
}

.dropdown-actions-list ul li {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.dropdown-actions-list ul li:hover {
  background-color: #f5f5f5;
}

.dropdown-actions-list ul li a {
  color: #000000;
  text-decoration: none;
}

.dropdown-icon {
  width: 8px;
  margin-left: 5px;
  transform: rotate(180deg);
  color: rgba(0, 0, 0, 0.5);
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

@media screen and (max-width: 768px) {

  .nav-item .nav-link a {
    font-size: 14px;
  }

}

@media screen and (max-width: 576px) {

  .navbar-collapse ul {
    text-align: center;
  }

}
</style>
