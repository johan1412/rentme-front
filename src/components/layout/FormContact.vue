<template>
  <div class="frame-form-contact-user">
    <ValidationObserver v-slot="{ validate }">
      <form class="form-contact-user" @submit.prevent="validate().then(handleSubmit)">
        <h4 class="title-form">Demande d'informations</h4>
        <div class="mb-3">
          Message pour <strong>{{ user.firstName }} {{ user.lastName }}</strong>
        </div>
        <ValidationProvider rules="required|minmax:1,1000" v-slot="{ errors,failed }">
          <span class="form-error">{{ errors[0] }}</span>
          <textarea
            class="input-message"
            type="text"
            placeholder="Bonjour,"
            v-model="text"
            :class="`is-${failed}`"
          ></textarea>
        </ValidationProvider>
        <button class="submit-button">ENVOYER</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import MessagesService from "../../services/MessagesService";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  message: 'Le message doit contenir au maximum {max} caractères',
  params: ['min', 'max']
});

extend('required', {
    ...required,
    message: 'Ce champs est obligatoire',
});

export default {
  name: "FormContact",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    product: Object,
    user: Object,
  },
  data: () => ({
    text: "",
  }),
  methods: {
    handleSubmit: function () {
      const allPermission = this.$store.getters.allPermission
      if(!allPermission){
        this.$router.push('/login')
      }
      MessagesService.postMessage({
        sender: "users/" + this.$store.getters.user["@id"].split("/")[2],
        reciever: "users/" + this.user.id,
        text : this.text,
        productId : null
      },localStorage.getItem('token'))
      this.$root.$bvToast.toast('Votre demande a été enregistré avec succès', {
        title: 'Merci !',
        variant: 'success',
        solid: true,
        toaster: 'b-toaster-top-full',
        autoHideDelay: 5000
      })
      this.text = "Bonjour"
    },
  },
};
</script>

<style scoped>
.frame-form-contact-user {
  margin: 20px 0px;
  padding: 40px 50px;
  background-color: #ffffff;
  border-radius: 25px;
}

.form-contact-user {
  display: flex;
  flex-direction: column;
}

.title-form {
  text-align: center;
  margin-bottom: 40px;
}

.input-message {
  margin-bottom: 40px;
  height: 300px;
  width: 100%;
  border: 1px solid #cccccc;
}

.submit-button {
  background-color: #0072b5;
  color: #ffffff;
  width: fit-content;
  padding: 5px 30px;
  margin: auto;
  font-weight: bold;
  font-size: 90%;
  border: 1px solid #dddddd;
}

@media screen and (max-width: 992px) {

  .frame-form-contact-user h4 {
    font-size: 20px;
  }
  
}

@media screen and (max-width: 576px) {

  .frame-form-contact-user {
    margin: 20px 0px;
    padding: 30px 30px;
    border-radius: 0px;
  }
  
  .frame-form-contact-user .submit-button {
    width: 100%;
    text-align: center;
    border-radius: 25px !important;
    padding: 8px;
    margin: 40px 0px 0px 0px;
  }
  
}
</style>
