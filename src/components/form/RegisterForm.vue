<template>
  <div class="container m-auto">
    <ValidationObserver v-slot="{ validate }">
      <form @submit.prevent="validate().then(handleSubmit)">
        <b-card class="form-frame mx-auto">
          <b-card-text class="form-top text-center">
            <b-icon icon="person-circle" aria-hidden="true"></b-icon>
            <p>INSCRIVEZ-VOUS</p>
          </b-card-text>
          <b-card-text class="form-data">
            <div class="form-group">
              <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
                <input
                  type="text"
                  v-model="firstName"
                  id="firstName"
                  :class="`is-${failed}`"
                  placeholder="Saisissez votre nom"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
                <input
                  type="text"
                  v-model="lastName"
                  id="lastName"
                  :class="`is-${failed}`"
                  placeholder="Saisissez votre prénom"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group address-form mt-4">
              <label class="address-label">Votre adresse</label>
              <div class="frame-address-form-input">
                <ValidationProvider rules="required|minmax:1,100" v-slot="{ errors, failed }">
                  <input
                    type="text"
                    v-model="addressStreet"
                    id="addressStreet"
                    :class="`is-${failed}`"
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
                    placeholder="Nom de la ville"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider rules="required|integer|minmax:1,99" v-slot="{ errors }">
                  <b-form-select v-model="addressRegion" :options="optionsRegion" value-field="number" text-field="name" class="mt-3">
                    <template #first>
                      <b-form-select-option :value="null" disabled>-- Selectionnez votre département --</b-form-select-option>
                    </template>
                  </b-form-select>
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|email|minmax:1,50" v-slot="{ errors, failed }">
                <input
                  type="email"
                  v-model="email"
                  id="exampleInputEmail1"
                  :class="`is-${failed}`"
                  placeholder="Email"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|minmax:5,15" v-slot="{ errors, failed }">
                <input
                  type="password"
                  v-model="password"
                  id="exampleInputPassword1"
                  :class="`is-${failed}`"
                  placeholder="Nouveau mot de passe"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group mt-5">
              <ValidationProvider rules="oneOf:accepted,not_accepted" v-slot="{ errors }">
                <b-form-checkbox
                  id="roleChoice"
                  v-model="role"
                  name="roleChoice"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Je souhaite pouvoir mettre en location mes produits sur le site
                  <div><small>(vous pourrez toujours selectionner cette option plus tard, depuis votre espace personnel)</small></div>
                </b-form-checkbox>
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group mt-5">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-checkbox
                  id="cgu"
                  v-model="cgu"
                  name="cgu"
                  value="accepted"
                  unchecked-value="not_accepted"
                  @change="updateCgu"
                >
                  Je reconnais avoir lu et compris les <router-link to="/conditions-generales-utilisation" class="text-dark" target="_blank"><u>Conditions générales d'utilisation</u></router-link> et je les accepte
                </b-form-checkbox>
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </b-card-text>
          <button type="submit" id="registerButton" class="btn btn-submit mb-3">S'inscrire</button>
        </b-card>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import RegionService from "../../services/RegionService";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, oneOf } from 'vee-validate/dist/rules';

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

extend('email', {
    ...email,
    message: 'Le format ne correspond pas à un email'
});

extend('oneOf', {
    ...oneOf,
    message: 'Ne correspond à aucune valeur possible'
});

export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    firstName: "",
    lastName: "",
    addressStreet: '',
    addressCity: '',
    addressRegion: null,
    address: {},
    email: "",
    password: "",
    role: "",
    cgu: false,
    optionsRegion: [],
  }),
  methods: {
    handleSubmit: function () {
      if(this.cgu == 'accepted') {
        this.address = { streetName: this.addressStreet, city: this.addressCity, region: 'regions/' + this.addressRegion.id };
        AuthService.register({ firstName: this.firstName, lastName: this.lastName, address: this.address, email: this.email, password: this.password, roles: this.role === "accepted" ? ["ROLE_RENTER"] : ["ROLE_USER"]})
          .then(() => {
            this.$router.push('/login')
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    updateCgu() {
      this.cgu == 'accepted' ? document.getElementById('registerButton').removeAttribute('disabled') : document.getElementById('registerButton').setAttribute('disabled', true);
    },
    updateRegion(region) {
      this.addressRegion = region; //this.addressStreet + '///&///&///&///&, ' + this.addressCity + '///&///&///&///&, ' + this.addressRegion;
    },
  },
  mounted() {
    document.getElementById('registerButton').setAttribute('disabled', true);
  },
  created() {
    RegionService.getRegions().then(response => {
      this.optionsRegion = response.data['hydra:member'];
      this.$store.dispatch('regions',response.data['hydra:member'])
    }).catch(e => console.log(e))
  },
};
</script>

<style scoped>
.form-frame {
  width: 450px;
  background-color: rgba(255, 255, 255, 1);
  border-top: 4px solid rgba(61,153,112, 1);
  margin: 100px 0px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.form-top .b-icon {
  width: 60px;
  height: 60px;
}

.form-top p {
  margin-top: 20px;
  letter-spacing: 2px;
}

.form-frame .form-data {
  margin: 40px 0px;
}

.form-frame input {
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #cccccc;
  outline: 0px !important;
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  width: 100%;
}

.form-frame input.is-true {
  border: 1px solid red;
  border-radius: 3px;
}

.form-frame .btn-submit,
.form-frame .btn-submit:hover,
.form-frame .btn-submit:active,
.form-frame .btn-submit:focus {
  width: 100%;
  margin-top: 20px;
  padding: 10px 0px;
  background-color: rgb(61,153,112);
  border: none;
  -webkit-appearance: none;
  outline: none;
  color: whitesmoke;
}

.address-form {
  padding-left: 10px !important;
}

.frame-address-form-input {
  border-left: 1px solid #cccccc;
  padding: 10px;
}

.frame-address-form-input .custom-select {
  color: rgb(120, 120, 121);
}

</style>
