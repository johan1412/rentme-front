<template>
    <div id="app">
        <Header />
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/layouts/Navbar.vue';
import Header from './components/layouts/Header.vue';

export default {
  name: "App",
  components: {
    Navbar,
    Header,
  },
};
</script>

<style>
    body {
        margin: 0px;
    }
    #app {
        background-color: #F0F0F0;
        height: 100vh;
        margin: 0px;
    }
</style>
