<template>
  <div>
    <NavBar/>
    <h1 class="text-center">Login</h1>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "../../../form/LoginForm.vue";
import LogiNavBarnForm from "../../../form/NavBar.vue";

export default {
  components: { LoginForm,NavBar },
  name: "LoginPage",
};
</script>