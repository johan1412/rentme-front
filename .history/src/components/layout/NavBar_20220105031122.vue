<template>
<div class="border-bottom">
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand class="fw-bold"><router-link class="home-link" to="/">RENTME</router-link></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!user" class="ml-auto">
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="login">Se connecter</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Mon compte</router-link></b-nav-item>
        <b-nav-item v-on:click="logout"><router-link class="btn bg-light text-dark" to="/">se déconnecter</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "NavBar",
  methods:{
    logout(){
      locastorage.removeItem('token')
      this.$router.push('/')
    }
  },
  computed
};
</script>
<style scoped>
.home-link:hover{
  text-decoration: none;
}
.home-link{
  color :black;
}
</style>