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
  props:{
    ["user"]
  },
  components: {
    NavBar,
    Footer
  },
};
</script>