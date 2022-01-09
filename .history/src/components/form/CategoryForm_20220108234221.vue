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
          <label for="exampleInputPassword1">Catégorie parente :</label>
          <select v-model="parent" class="form-select form-select-lg mb-3">
            <option v-if="parentCategories.length < 1"> pas de parent</option>
            <option v-for=" item in parentCategories" :key="item.id" v-bind:value="{id:item.item}">{{item.name}}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
//import {mapGetters} from 'vuex'
export default {
  name: "CategoryForm",
  data(){
    return {
      name: "",
      parent: {},
      parentCategories: [],
    }
  },
    mounted(){
      const user = this.$store.getters.user
      console.log(user)
      if(user){
        if(!user.roles.includes('ROLE_ADMIN')){
          this.$router.push('/')
        }
      }else {
        this.$router.push('/')
      }
      AuthService.parentCotegories().then(response => {
        this.parentCategories = response.data['hydra:member'].filter(category => category.children.length > 0)
      }).catch(e => console.log(e))
  },
  methods: {
    handleSubmit:  async function () {
      console.log(this.parent)
      const response = await AuthService.postCategory({ name: this.name, parent: "/categories/"+this.parent.id })
          this.$router.push(this.$route.query.redirect || '/category')
          console.log(response.data); 
    },
  },
};
</script>
