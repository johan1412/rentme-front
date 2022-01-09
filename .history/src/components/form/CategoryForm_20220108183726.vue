<template>
    <div class="container m-auto">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Nom de la catégorie</label>
          <input
            type="text"
            v-model="nom"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter le nom de la catégorie"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Catégorie parente</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  name: "LoginForm",
  data: () => ({
    email: "",
    password: "",
  }),
  mounted: () => {
    if(localStorage.getItem("token") !== null){
      this.$router.push('/')
    }
  },
  methods: {
    handleSubmit: function () {
      AuthService.login({ email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userId",response.data.data.id)
          this.$store.dispatch('user',response.data.data)
          this.$router.push(this.$route.query.redirect || '/')
          console.log(response.data); 
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
