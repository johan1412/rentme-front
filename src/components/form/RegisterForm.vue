<template>
  <div class="container m-auto">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit">
        <b-card class="form-frame mx-auto">
          <b-card-text class="form-top text-center">
            <b-icon icon="person-circle" aria-hidden="true"></b-icon>
            <p>INSCRIVEZ-VOUS</p>
          </b-card-text>
          <b-card-text class="form-data">
            <div class="form-group">
              <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors }">
                <input
                  type="text"
                  v-model="firstName"
                  id="firstName"
                  placeholder="Saisissez votre nom"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors }">
                <input
                  type="text"
                  v-model="lastName"
                  id="lastName"
                  placeholder="Saisissez votre prénom"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group address-form mt-4">
              <label class="address-label">Votre adresse</label>
              <div class="frame-address-form-input">
                <ValidationProvider rules="required|minmax:1,100" v-slot="{ errors }">
                  <input
                    type="text"
                    v-model="addressStreet"
                    id="addressStreet"
                    placeholder="Nom de la rue"
                    @change="handleChangeAddress"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors }">
                  <input
                    type="text"
                    v-model="addressCity"
                    id="addressCity"
                    placeholder="Nom de la ville"
                    @change="handleChangeAddress"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors }">
                  <input
                    type="text"
                    v-model="addressRegion"
                    id="addressRegion"
                    placeholder="Numéro de département"
                    @change="handleChangeAddress"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|email|minmax:1,50" v-slot="{ errors }">
                <input
                  type="email"
                  v-model="email"
                  id="exampleInputEmail1"
                  placeholder="Email"
                />
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|minmax:5,15" v-slot="{ errors }">
                <input
                  type="password"
                  v-model="password"
                  id="exampleInputPassword1"
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
          </b-card-text>
          <button type="submit" class="btn btn-submit mb-3">S'inscrire</button>
        </b-card>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
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
    addressRegion: '',
    address: '',
    email: "",
    password: "",
    role: "",
  }),
  methods: {
    handleSubmit: function () {
      AuthService.register({ firstName: this.firstName, lastName: this.lastName, address: this.address, email: this.email, password: this.password, roles: this.role === "accepted" ? ["ROLE_RENTER"] : ["ROLE_USER"]})
        .then(() => {
          this.$router.push('/login')
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleChangeAddress() {
      this.address = this.addressStreet + '///&///&///&///&, ' + this.addressCity + '///&///&///&///&, ' + this.addressRegion;
    }
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

</style>
