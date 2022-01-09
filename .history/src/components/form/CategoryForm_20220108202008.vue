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
          <label for="exampleInputPassword1">Catégorie parente </label>
          <select v-model="parentSelected" class="form-select" size="3" aria-label="size 3 select example" v-for=" parent in parentCategories" :key="parent.id">
            <option v-if="parentCategories.length < 1">{{parent.name}}</option>
            <option value="">{{parent.name}}</option>
          </select>
          <select class="form-select" size="1" aria-label="size 3 select example" v-if="parentCategories.length < 1">
            <option>pas de parent</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  name: "CategoryForm",
  data(){
    return {
      name: "",
      parent: "",
      parentCategories: [],
    }
  },
   async mounted(){
    const response = await AuthService.parentCotegories()
    this.parentCategories = response.data.filter(category => category.getParent === null)
  },
  methods: {
    handleSubmit:  async function () {
      const response = await AuthService.postCategory({ name: this.name, parent: "/categories/"+this.parent.id })
          this.$router.push(this.$route.query.redirect || '/category')
          console.log(response.data); 
    },
  },
};
</script>
