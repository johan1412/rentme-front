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
  components: {
    Footer
  },
};
</script>