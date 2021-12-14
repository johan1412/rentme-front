<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand href="#" class="m">RENTME</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="btn btn-default"><router-link to="register">Publier une annonce</router-link></b-nav-item>
        <b-nav-item><router-link to="register">S'inscrire</router-link></b-nav-item>
        <b-nav-item><router-link to="login">Se connecter</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>

export default {
  name: "NavBar"
};
</script>