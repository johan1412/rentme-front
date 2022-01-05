<template>
  <div>
    <NavBar/>
    <h1 class="text-center">Login</h1>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "../../../form/LoginForm.vue";
import LoginForm from "../../../form/LoginForm.vue";

export default {
  components: { LoginForm,NavBar },
  name: "LoginPage",
};
</script>