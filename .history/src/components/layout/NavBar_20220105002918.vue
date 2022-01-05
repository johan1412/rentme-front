<template>
<div class="border-bottom">
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand class="fw-bold"><router-link class="home-link" to="/">RENTME</router-link></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="connected" class="ml-auto">
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="login">Se connecter</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Mon compte</router-link></b-nav-item>
        <b-nav-item v-on:click="logout"><router-link class="btn bg-light text-dark" to="/">se déconnecter</router-link></b-nav-item>
      </b-navbar-nav>
      <b-nav-item v-on:click="logout"><router-link class="btn bg-light text-dark" to="/">{{connected}}</router-link></b-nav-item>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>

export default {
  name: "NavBar",
  data: () => ({
    authentificated: false,
  }),
  computed: {
    connected: function () {
      return localStorage.getItem('token') !== null
    },
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token",'');
      localStorage.removeItem("userRole",'');
    },
  },
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