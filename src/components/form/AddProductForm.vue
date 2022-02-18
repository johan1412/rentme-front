<template>
  <div class="container m-auto">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Titre de l'annonce</label>
          <ValidationProvider rules="required|minmax:5,50" v-slot="{ errors }">
            <input type="text" class="form-control" v-model="name" id="title" />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <ValidationProvider rules="required|minmax:10,500" v-slot="{ errors }">
            <input
              type="textarea"
              class="form-control"
              v-model="description"
              id="description"
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="price">Prix / Jour (€)</label>
          <ValidationProvider rules="required|integer|minmax:1,10" v-slot="{ errors }">
            <input type="number" class="form-control" v-model="price" id="price" />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="address">Adresse de retrait du produit</label>
          <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors }">
            <input
              type="text"
              class="form-control"
              v-model="address"
              id="address"
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="category">Catégorie</label>
          <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors }">
            <select class="form-control" v-model="category" id="category">
                <option v-if="parentCategories.length < 1"> pas de parent</option>
                <option v-for=" item in parentCategories" :key="item.id" v-bind:value="{id:item.id}">{{item.name}}</option>
            </select>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="photos">Photos</label>
          <ValidationProvider rules="size:2000" v-slot="{ errors }">
            <input
              type="file"
              class="form-control"
              id="photos"
              ref="file"
              @change="uploadFile"
            />
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
import { required, integer, size } from 'vee-validate/dist/rules';

extend('size', {
  ...size,
  message: 'Le fichier ne doit pas faire plus de {_size_}Kb',
  params: ['size']
});

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

extend('integer', {
    ...integer,
    message: 'La valeur doit être un nombre entier',
});

export default {
  name: "AddProductForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    description: "",
    address: "",
    price: "",
    images: null
  }),
  methods: {
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    handleSubmit: async function () {
      console.log(this.$store.getters.user)
      const formData = new FormData();
      formData.append('file', this.Images);
      let image = await AuthService.postImage(formData);
      if(image.data.contentUrl){
      const response = await AuthService.postProduct({
        name: this.name,
        description: this.description,
        address: this.address,
        price: parseInt(this.price),
        category: "/categories/"+this.category.id,
        user: "/users/"+this.$store.getters.user["id"],
        files: [
          {path : image.data.contentUrl}
        ]
      });
      this.$store.dispatch('user',{...this.$store.getters.user, products:[...this.$store.getters.user.products, response.data]})


      this.$router.push("/");}
    },
  },
   computed:{
    ...mapGetters(['parentCategories'])
  },
  created() {
    AuthService.parentCategories().then(response => {
      this.$store.dispatch('parentCategories',response.data['hydra:member'].filter(category => category?.parent))
    }).catch(e => console.log(e))
    }
};
</script>
