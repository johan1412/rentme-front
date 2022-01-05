<template>
  <div>
    <h1>Login</h1>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "../../../form/LoginForm.vue";

export default {
  components: { LoginForm },
  name: "LoginPage",
};
</script>