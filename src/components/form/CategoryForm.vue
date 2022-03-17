<template>
    <div class="container m-auto">
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
            <ValidationProvider rules="minmax:1,50" v-slot="{ errors,failed }">
              <select v-model="parent" :class="`is-${failed}`" class="form-select form-select-lg mb-3">
                <option v-if="parentCategories.length < 1"> pas de parent</option>
                <option v-for=" item in parentCategories" :key="item.id" v-bind:value="{id:item.id}">{{item.name}}</option>
              </select>
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
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
          this.name =""
    },
  },
};
</script>
