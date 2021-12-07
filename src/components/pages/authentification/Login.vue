<template>
  <div>
    <router-link to="/">HOME</router-link><br />

    <h1>Login</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../../forms/LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>
