<template>
<div class="border-bottom">
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand class="fw-bold"><router-link class="home-link" to="/">RENTME</router-link></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item><router-link class="btn bg-secondary text-light" to="login">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="login">Se connecter</router-link></b-nav-item>
        <b-nav-item><router-link class="btn bg-light text-dark" to="logout">se déconnecter</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>

export default {
  name: "NavBar",
  methods: {
    logout: function () {
      AuthService.login({ email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userRole",response.data.data.roles)
          this.$router.push(this.$route.query.redirect || '/')
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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