<template>
  <div>
    <slot></slot>
    <Footer />
  </div>
</template>
<script>
import NavBar from "../layout/NavBar.vue";
import Footer from "../layout/Footer.vue";
export default {
  name: "BaseLayout",
  props:
    ["user"],
  components: {
    Footer
  },
};
</script>