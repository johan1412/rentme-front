<template>
  <div>
    <NavBar user:"user" />
    <slot></slot>
    <Footer />
  </div>
</template>
<script>
import NavBar from "../layout/NavBar.vue";
import Footer from "../layout/Footer.vue";
export default {
  name: "BaseLayout",
  components: {
    NavBar,
    Footer
  },
};
</script>