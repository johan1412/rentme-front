<template>
  <div>
    <NavBar/>
    <h1 class="text-center">Register</h1>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../../../form/RegisterForm.vue';
import NavBar from "../../../layout/NavBar.vue";

export default {
  components: { RegisterForm },
  name: "RegisterPage",
};
</script>