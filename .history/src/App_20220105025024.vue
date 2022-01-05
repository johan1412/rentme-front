<template>
    <router-view :user="user" />
</template>
<script>
import AuthService from "./services/AuthService";

export default {
  name: "App"
};
</script>


