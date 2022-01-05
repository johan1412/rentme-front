<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
<script>
import BaseLayout from "./components/layout/BaseLayout.vue";
export default {
  components: { BaseLayout },
  name: "App",
  data: () => ({
    user: null,
  }),
};
</script>


