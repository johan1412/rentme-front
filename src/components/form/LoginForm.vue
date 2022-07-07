<template>
   <div class="container m-auto">
     <div class="spinner-middle">
      <div v-show="isLoading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
     <ValidationObserver v-slot="{ validate }">
       <form @submit.prevent="validate().then(handleSubmit)">
          <b-card class="form-frame mx-auto">
            <b-card-text class="form-top text-center">
              <b-icon icon="person-circle" aria-hidden="true"></b-icon>
              <p>CONNECTEZ-VOUS</p>
            </b-card-text>
            <b-card-text class="form-data">
              <div class="form-group">
                <ValidationProvider rules="required|email|minmax:1,50" v-slot="{ errors,failed }">
                  <input
                    type="email"
                    v-model="email"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    :class="`is-${failed}`"
                    placeholder="Email"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group mt-4">
                <ValidationProvider rules="required|minmax:5,15" v-slot="{ errors,failed }">
                  <div class="d-flex align-items-center password-group">
                    <input
                      :type="passwordVisible ? 'text' : 'password'"
                      v-model="password"
                      id="inputPassword"
                      placeholder="Mot de passe"
                      :class="`is-${failed}`"
                    />
                    <b-icon :icon="passwordVisible ? 'eye' : 'eye-slash'" aria-hidden="true" class="eye-icon" @click="passwordVisible = !passwordVisible"></b-icon>
                  </div>
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </b-card-text>
            <button type="submit" class="btn btn-submit mb-3">Se connecter</button>
            <a :href="resetPassword" class="btn"><u>Mot de passe oublié ?</u></a>
            <router-link class="btn text-dark" to="/register"><u>Créer un compte ?</u></router-link>
          </b-card>
        </form>
     </ValidationObserver>
   </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import authService from "@/services/AuthService";

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
    isLoading : false,
    passwordVisible: false,
  }),
  mounted(){
    if(this.$store.getters.user){
      this.$router.push('/')
    }
    if(this.$route.query.message && this.$route.query.message =="success" ){
      this.$root.$bvToast.toast("Le nouveau mot de passe a bien été enregistré ", {
        title: 'Merci !',
        variant: 'success',
        solid: true,
        toaster: 'b-toaster-top-full',
        autoHideDelay: 5000,
      });
    }
  },
  computed: {
    resetPassword(){
      return process.env.VUE_APP_URL+'/reset-password'
    }
  },
  methods: {
    handleSubmit: async function () {
      this.isLoading = true
      AuthService.login({ email: this.email, password: this.password })
      .then(response =>{
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userId",response.data.data.id)
          authService.getUser(response.data.data.id,localStorage.getItem('token'))
            .then(response => this.$store.dispatch('user',response.data))
          if (response.data.data.roles.includes("ROLE_ADMIN")){
            this.$store.dispatch('numberOfProductsNotValid',response.data.data.numberOfProductsNotValid)
            this.$store.dispatch('numberOfProductsReported',response.data.data.numberOfProductsReported)
          }
        this.isLoading = false
        this.$router.push('/')
      })
      .catch((e) => {
          let message = e.response.data.message;
          if(message === "Invalid credentials."){
            this.$root.$bvToast.toast("Email ou mot de passe invalide", {
              title: 'Attention !',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 5000,
            });
          }
      })
    }
  },
};
</script>

<style scoped>
.spinner-middle {
  position: absolute;
  top: 50vh;
  left: 50vw;
}

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

.eye-icon {
  margin-left: -30px;
  cursor: pointer;
}

@media screen and (max-width: 576px) {

  .form-frame {
    width: 100%;
    margin: 0px;
    border: none;
    box-shadow: none;
    background-color: #f0f0f0;
    padding-bottom: 40px;
  }

  .form-top .b-icon {
    display: none;
  }

  .container {
    padding: 0px;
  }

  .form-data .form-group input {
    font-size: 14px;
  }

  .form-data .form-group .form-error {
    font-size: 10px;
  }

}



</style>
