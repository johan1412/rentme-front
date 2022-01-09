<template>
    <div class="container m-auto">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
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
  mounted(){
    if(localStorage.getItem("token") !== null){
      this.$router.push('/')
    }
  },
  methods: {
    handleSubmit: async function () {
      const response =  await AuthService.login({ email: this.email, password: this.password })
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userId",response.data.data.id)
          this.$store.dispatch('user',response.data.data)
          this.$router.push(this.$route.query.redirect || '/')
      const products = AuthService.getProducts()
          this.$store.dispatch('products',response.data['hydra:member']) 
            
    },
  },
};
</script>
