<template>
  <div>
    <h1 class="text-center">Register</h1>
    <CategoryForm />
  </div>
</template>

<script>
import RegisterForm from '../../form/RegisterForm.vue';
export default {
  components: { RegisterForm },
  name: "CategoryPage",
};
</script>