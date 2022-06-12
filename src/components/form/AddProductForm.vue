<template>
  <div class="container m-auto bg-light p-5">
    <ValidationObserver v-slot="{ validate }">
      <form @submit.prevent="validate().then(handleSubmit)">
        <div class="form-group">
          <label for="title">Titre de l'annonce</label>
          <ValidationProvider rules="required|minmax:5,50" v-slot="{ errors }">
            <input type="text" class="form-control" v-model="name" id="title" />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-between align-items-center"><label for="description">Description</label><small>{{ description.length }}/500 caractères</small></div>
          <ValidationProvider rules="required|minmax:10,500" v-slot="{ errors,failed }">
            <textarea
              class="form-control"
              v-model="description"
              id="description"
              :class="`is-${failed}`"
            ></textarea>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="price">Prix / Jour (€)</label>
          <ValidationProvider rules="required|integer|minmax:1,10" v-slot="{ errors,failed }">
            <input
                type="number"
                class="form-control"
                v-model="price" id="price"
                :class="`is-${failed}`"
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group address-form mt-4">
          <label for="address">Adresse de retrait du produit</label>
          <div class="frame-address-form-input">
            <ValidationProvider rules="required|minmax:1,100" v-slot="{ errors, failed }">
              <input
                type="text"
                v-model="addressStreet"
                id="addressStreet"
                :class="`is-${failed}`"
                class="form-control"
                placeholder="Nom de la rue"
              />
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
              <input
                type="text"
                v-model="addressCity"
                id="addressCity"
                :class="`is-${failed}`"
                class="form-control"
                placeholder="Nom de la ville"
              />
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required|integer|between:1,99" v-slot="{ errors }">
              <b-form-select v-model="addressRegion" :options="optionsRegion" value-field="id" text-field="name">
                <template #first>
                  <b-form-select-option :value="null" enabled>-- Selectionnez votre département --</b-form-select-option>
                </template>
              </b-form-select>
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="category">Catégorie principale</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-select v-model="category" :options="parentCategories" @change="getSubCategories" value-field="id" text-field="name" class="w-100">
                <template #first>
                  <b-form-select-option :value="null" enabled>-- Selectionnez une catégorie --</b-form-select-option>
                </template>
              </b-form-select>
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <label for="subCategory">Sous-catégorie</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-select v-model="subCategory" :options="subCategories" value-field="id" text-field="name" id="subCategory" class="w-100" :disabled="category === null">
                <template #first>
                  <b-form-select-option :value="null" enabled>-- Selectionnez une sous-catégorie --</b-form-select-option>
                </template>
              </b-form-select>
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-group mt-3">
          <label for="photos">Photos</label>
          <ValidationProvider rules="size:2000" v-slot="{ errors,failed }">
            <input
              type="file"
              class="form-control"
              id="photos"
              ref="file"
              @change="uploadFile"
              :class="`is-${failed}`"
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button type="submit" class="btn btn-success submit-button-create-product mt-5">Valider</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import RegionService from "../../services/RegionService";
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
    category: null,
    subCategory: null,
    subCategories: [],
    addressStreet: '',
    addressCity: '',
    addressRegion: null,
    address: {},
    optionsRegion: [],
    price: "",
    images: null,
    allCategories: [],
  }),
  methods: {
    uploadFile() {
      this.images = this.$refs.file.files[0];
    },
    getSubCategories: function() {
      let choosenCategory = this.category;
      this.subCategories = choosenCategory == null ? null : this.allCategories.filter(function(category) {
        if(category.parent != null && category.parent.id != undefined) {
          return choosenCategory == category.parent.id;
        }
      });
    },
    handleSubmit: async function () {
      if(this.images == null) {
        this.$bvToast.toast('Vous devez ajouter des photos avant de valider le formulaire', {
          title: 'Attention !',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-full',
          noAutoHide: true,
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', this.images);
      let image = await AuthService.postImage(formData);
      if(image.data.contentUrl){
        this.address = { streetName: this.addressStreet, city: this.addressCity, region: 'regions/' + this.addressRegion };
        const response = await AuthService.postProduct({
          name: this.name,
          description: this.description,
          address: this.address,
          price: parseInt(this.price),
          category: "/categories/"+this.subCategory.id,
          user: "/users/"+this.$store.getters.user["id"],
          files: [
            {path : image.data.contentUrl}
          ]
        });
        this.$store.dispatch('user',{...this.$store.getters.user, products:[...this.$store.getters.user.products, response.data]})
        this.$router.push("/");
      }
    },
  },
  computed:{
    ...mapGetters(['parentCategories']),
  },
  created() {
    AuthService.parentCategories().then(response => {
      this.allCategories = response.data['hydra:member'];
      this.$store.dispatch('parentCategories', response.data['hydra:member'].filter(category => category.parent == null))
    }).catch(e => console.log(e))
    RegionService.getRegions().then(response => {
      this.optionsRegion = response.data['hydra:member'];
      this.$store.dispatch('regions',response.data['hydra:member'])
    }).catch(e => console.log(e))
  },
};
</script>

<style scoped>
.frame-address-form-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-select {
  width: auto;
}
.submit-button-create-product {
  border-radius: 0px;
}
</style>