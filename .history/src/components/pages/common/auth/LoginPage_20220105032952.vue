<template>
  <div>
    <NavBar/>
    <h1 class="text-center">Login</h1>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "../../../form/LoginForm.vue";
import NavBar from "../../../layout/NavBar.vue";

export default {
  components: { LoginForm,NavBar },
  name: "LoginPage",
};
</script>