<template>
   <div class="container m-auto">
     <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit">
          <b-card class="form-frame mx-auto">
            <b-card-text class="form-top text-center">
              <b-icon icon="person-circle" aria-hidden="true"></b-icon>
              <p>CONNECTEZ-VOUS</p>
            </b-card-text>
            <b-card-text class="form-data">
              <div class="form-group">
                <ValidationProvider rules="required|email|minmax:1,50" v-slot="{ errors }">
                  <input
                    type="email"
                    v-model="email"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group mt-4">
                <ValidationProvider rules="required|minmax:5,15" v-slot="{ errors }">
                  <input
                    type="password"
                    v-model="password"
                    id="inputPassword"
                    placeholder="Mot de passe"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </b-card-text>
            <button type="submit" class="btn btn-submit mb-3">Se connecter</button>
          </b-card>
        </form>
     </ValidationObserver>
   </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

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

export default {
  name: "LoginForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  mounted(){
    if(this.$store.getters.user){
      this.$router.push('/')
    }
  },
  methods: {
    handleSubmit: async function () {
      const response =  await AuthService.login({ email: this.email, password: this.password })
      if(response){
        localStorage.setItem("token",response.data.token)
          localStorage.setItem("userId",response.data.data.id)
          this.$store.dispatch('user',response.data.data)
          if (response.data.data.roles.includes("ROLE_ADMIN")){
            this.$store.dispatch('numberOfProductsNotValid',response.data.data.numberOfProductsNotValid)
          }
          this.$router.push(this.$route.query.redirect || '/')
      }

    },
  },
};
</script>

<style scoped>
.form-frame {
  width: 350px;
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
</style>
