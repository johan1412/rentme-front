<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand href="#" class="m">RENTME</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <router-link to="register"><b-nav-item>S'inscrire</b-nav-item></router-link>
        <router-link to="login"><b-nav-item>Se connecter</b-nav-item></router-link>
        <b-nav-item to="/login">Se connecter</b-nav-item>

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