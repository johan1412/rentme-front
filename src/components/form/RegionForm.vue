<template>
    <div class="container mx-auto mt-5">
      <ValidationObserver v-slot="{ validate }">
        <form @submit.prevent="validate().then(handleSubmit)">
          <div class="row">
            <div class="form-group col-md-5">
              <label>Nom du département</label>
              <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors,failed }">
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  placeholder="Entrez le nom du département"
                  required
                  :class="`is-${failed}`"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group col-md-5">
              <label>Numéro du département</label>
              <ValidationProvider rules="required" v-slot="{ errors,failed }">
                <input
                  type="number"
                  v-model="number"
                  class="form-control"
                  placeholder="Entrez le numéro du département"
                  required
                  :class="`is-${failed}`"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="mt-5 d-flex justify-content-center"><button type="submit" class="btn text-light submit-button">Ajouter</button></div>
        </form>
      </ValidationObserver>
    </div>
</template>

<script>
import RegionService from "../../services/RegionService";
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
  name: "RegionForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    number: null,
  }),
  computed:{
    ...mapGetters(['regions'])
  },
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
        this.$router.push('/')
    }
  },
  methods: {
    handleSubmit:  async function () {
      try {
        let exist = this.regions.some(region => (region.name === this.name || region.number === this.number));
        if(exist) {
          this.$root.$bvToast.toast('Ce département existe déjà', {
            title: 'Erreur',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
          });
          return;
        }
        const response = await RegionService.postRegion({ name: this.name, number: parseInt(this.number) }, localStorage.getItem('token'));
        this.$store.dispatch('regions',[...this.regions,response.data])
        this.name = "";
        this.number = null;
        this.$root.$bvToast.toast('Le département a bien été créé', {
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 5000,
          title: 'Succès'
        });
      } catch(e) {
        console.log(e)
        this.$root.$bvToast.toast('Erreur lors de la création du département', {
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 5000,
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
