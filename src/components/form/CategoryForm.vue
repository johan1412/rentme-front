<template>
    <div class="container mx-auto mt-5">
      <ValidationObserver v-slot="{ validate }">
        <form @submit.prevent="validate().then(handleSubmit)">
          <div class="form-group">
            <label>Nom de la catégorie</label>
            <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors,failed }">
              <input
                type="text"
                v-model="name"
                class="form-control"
                placeholder="Entrez le nom de la catégorie"
                required
                :class="`is-${failed}`"
              />
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label>Catégorie parente :</label>
              <select v-model="parent" class="form-select form-select-lg mb-3">
                <option v-if="parentCategories.length < 1" v-bind:value="null"> pas de parent</option>
                <option v-for=" item in parentCategories" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
              </select>
          </div>
          <button type="submit" class="btn text-light submit-button">Ajouter</button>
        </form>
      </ValidationObserver>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import {mapGetters} from "vuex";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  message: 'Ce champs doit contenir entre {min} et {max} caractères',
  params: ['min', 'max']
});

extend('required', {
    ...required,
    message: 'Ce champs est obligatoire',
});

export default {
  name: "CategoryForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    parent: null,
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
      if(this.parent){
        await AuthService.postCategory({ name: this.name, parent: "/categories/"+this.parent })
      }else{
        const response = await AuthService.postCategory({ name: this.name,parent:null})
        this.$store.dispatch('parentCategories',[...this.$store.getters.parentCategories,response.data])
      }
      //this.$router.push('/admin/categories')
      this.$router.go();
      this.name =""
      this.parent = null
    },
  },
};
</script>

<style>
.submit-button {
  background-color: #333333 !important;
  border: 1px solid #333333 !important;
  border-radius: 0px !important;
}

.submit-button:hover {
  background-color: #ffffff !important;
  color: black !important;
  border: 1px solid #333333 !important;
}
</style>