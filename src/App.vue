<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>

<script>
import BaseLayout from "./components/layout/BaseLayout.vue";

export default {
  components: { BaseLayout },
  name: "App"
};
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
   url(./fonts/Roboto/Roboto-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Roboto-bold";
  src: local("Roboto"),
   url(./fonts/Roboto/Roboto-Bold.ttf) format("truetype");
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
