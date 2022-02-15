<template>
    <div class="container m-auto">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Nom de la catégorie</label>
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
          <label>Catégorie parente :</label>
          <select v-model="parent" class="form-select form-select-lg mb-3">
            <option v-if="parentCategories.length < 1"> pas de parent</option>
            <option v-for=" item in parentCategories" :key="item.id" v-bind:value="{id:item.id}">{{item.name}}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import {mapGetters} from "vuex";
//import {mapGetters} from 'vuex'
export default {
  name: "CategoryForm",
  data: () => ({
    parent: {},
    name:""
  }),
  created() {
    AuthService.parentCategories().then(response => {
      this.$store.dispatch('parentCategories',response.data['hydra:member'].filter(category => !category?.parent))
    }).catch(e => console.log(e))
    }
  ,
  computed:{
    ...mapGetters(['parentCategories'])
  },
    mounted(){
      const adminPermission = this.$store.getters.adminPermission
      if(!adminPermission){
          this.$router.push('/')
      }
  },
  methods: {
    handleSubmit:  async function () {
      if(typeof this.parent.id !== 'undefined'){
        await AuthService.postCategory({ name: this.name, parent: "/categories/"+this.parent.id })
      }else{
        await AuthService.postCategory({ name: this.name,parent:null})
        this.$store.dispatch('parentCategories',[...this.$store.getters.parentCategories,{ name: this.name, parent: null }])
      }
      this.$router.push('/admin/categories')
      this.parent = {},
          this.name =""
    },
  },
};
</script>
