<template>
<div class="border-bottom">
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand class="fw-bold"><router-link class="home-link" to="/">RENTME</router-link></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!user" class="ml-auto">
        <b-nav-item><router-link class="btn bg-dark text-light" to="#">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link class="btn text-dark" to="/login">Se connecter</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn bg-secondary text-light" to="/admin/products">Annonce en attente de validation({{productsNotValidCount}})</router-link></b-nav-item>
        <b-nav-item v-if="user.roles.includes('ROLE_ADMIN')"><router-link class="btn bg-secondary text-light" to="/admin/categories">Ajouter une nouvelle catégorie</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-secondary text-light" to="#">Mon compte</router-link></b-nav-item>
        <b-nav-item v-on:click="logout"><router-link class="btn bg-light text-dark" to="/">se déconnecter</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "NavBar",
  data() {
    return {
      modalShow: false,
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$store.dispatch('user',null)
      this.$router.push('/')
    }
  },
  computed:{
    ...mapGetters(['user','productsNotValidCount','productsNotValid'])
  },
};
</script>

<style scoped>
.btn {
  padding: 10px 30px;
  border-radius: 0%;
}

.btn.text-dark {
  background-color: #f0f0f0;
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
</style>