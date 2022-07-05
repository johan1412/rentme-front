<template>
    <div class="container mx-auto mt-5">
      <ValidationObserver v-slot="{ validate }">
        <form @submit.prevent="validate().then(handleSubmit)">
          <div class="row">
            <div class="form-group col-md-5">
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
            <div class="form-group col-md-5">
              <label for="photos">Photo d'illustration</label>
              <ValidationProvider rules="size:2000" v-slot="{ errors,failed }">
                <input
                  type="file"
                  class="form-control"
                  id="photo"
                  ref="file"
                  @change="uploadFile"
                  :class="`is-${failed}`"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group">
            <label>Catégorie parente :</label>
              <b-form-select v-model="parent" :options="parentCategories" value-field="id" text-field="name">
                <template #first>
                  <b-form-select-option :value="null" enabled>Pas de parent</b-form-select-option>
                </template>
              </b-form-select>
          </div>
          <div class="mt-5 d-flex justify-content-center"><button type="submit" class="btn text-light submit-button">Ajouter</button></div>
        </form>
      </ValidationObserver>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import {mapGetters} from "vuex";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, size } from 'vee-validate/dist/rules';

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

extend('size', {
  ...size,
  message: 'Le fichier ne doit pas faire plus de {_size_}Kb',
  params: ['size']
});

export default {
  name: "CategoryForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    parent: null,
    name:"",
    image: null,
    parentCategories: [],
  })

  ,
  computed:{
    ...mapGetters(['categories'])
  },
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
        this.$router.push('/')
    }
    this.parentCategories = this.categories.filter(category => category.parent === null);
  },
  methods: {
    uploadFile() {
      this.image = this.$refs.file.files[0];
    },
    handleSubmit:  async function () {
      let file = null;
      let exist = this.categories.some(category => category.name === this.name);
      if(exist) {
        this.$bvToast.toast('Cette catégorie existe déjà', {
          title: 'Erreur',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        return;
      }
      try {
        if(this.image) {
          const formData = new FormData();
          formData.append('file', this.image);
          let img = await AuthService.postImage(formData,localStorage.getItem('token'));
          file = img.data.contentUrl ? { path : img.data.contentUrl } : null
        }
        let parent = this.parent ? "/categories/" + this.parent : null;
        let name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        const response = await AuthService.postCategory({ name: name, parent: parent, img: file },localStorage.getItem('token'));
        if(parent == null){
          this.$store.dispatch('categories',[...this.categories,response.data])
        } else {
          this.$store.dispatch('categories',[...this.categories.map(
              category => category.id === this.parent ? {...category,children:[...category.children, response.data]} : category
          )])
        }
        this.name = "";
        this.parent = null;
        this.$bvToast.toast('La catégorie a bien été créée', {
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000,
          title: 'Succès'
        });
      } catch(e) {
        console.log(e)
        this.$bvToast.toast('Erreur lors de la création de la catégorie', {
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000,
          title: 'Erreur'
        });
      }
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

@media screen and (max-width: 576px) {

  .form-group label,
  .form-group input,
  .form-group select {
    font-size: 12px;
  }

  .form-group .form-error {
    font-size: 10px;
  }

  .submit-button {
    font-size: 12px !important;
  }

}
</style>
