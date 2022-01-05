<template>
  <div>
    <slot></slot>
    <Footer />
  </div>
</template>
<script>
import Footer from "../layout/Footer.vue";
export default {
  name: "BaseLayout",
  props:
    ["user"],
  components: {
    NavBar,
    Footer
  },
};
</script>