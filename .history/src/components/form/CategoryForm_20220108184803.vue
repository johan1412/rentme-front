<template>
    <div class="container m-auto">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Nom de la catégorie</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter le nom de la catégorie"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Catégorie parente</label>
          <select v-model="selected" class="form-select" size="3" aria-label="size 3 select example">
            <option value="1">One</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  name: "LoginForm",
  data(){
    return {
      name: "",
      parent: "",
      parent: [],
    }
  },
  async mounted(){
    const response = await AuthService.parentCotegories({ email: this.email, password: this.password })
    
  },
  methods: {
    handleSubmit: function async  () {
      const response = await AuthService.login({ email: this.email, password: this.password })
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userId",response.data.data.id)
          this.$store.dispatch('user',response.data.data)
          this.$router.push(this.$route.query.redirect || '/')
          console.log(response.data); 
    },
  },
};
</script>
