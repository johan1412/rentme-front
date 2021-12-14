<template>
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand href="#" class="m">RENTME</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">S'inscrire</b-nav-item>
        <b-nav-item href="#">Se connecter</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>

export default {
  name: "NavBar"
};
</script>