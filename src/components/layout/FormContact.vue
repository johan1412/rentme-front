<template>
  <div class="frame-form-contact-user">
    <ValidationObserver v-slot="{ validate }">
      <form class="form-contact-user" @submit.prevent="validate().then(handleSubmit)">
        <h4 class="title-form">Demande d'informations</h4>
        <div>
          Message pour <strong>{{ user.firstName }} {{ user.lastName }}</strong>
        </div>
        <ValidationProvider rules="required|minmax:1,1000" v-slot="{ errors,failed }">
          <textarea
            class="input-message"
            type="text"
            placeholder="Bonjour,"
            v-model="text"
            :class="`is-${failed}`"
          ></textarea>
          <span class="form-error">{{ errors[0] }}</span>
        </ValidationProvider>
        <button class="submit-button">ENVOYER LE MESSAGE</button>
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
      MessagesService.postMessage({
        sender: "users/" + this.$store.getters.user["@id"].split("/")[2],
        reciever: "users/" + this.user.id,
        text : this.text,
        productId : null
      })
      localStorage.setItem("successMessage", "Votre compte a bien été créé");
      this.text = "Bonjour"
    },
  },
};
</script>

<style scoped>
.frame-form-contact-user {
  margin: 50px 0px 50px 50px;
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
  margin-top: 20px;
  margin-bottom: 40px;
  height: 300px;
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
</style>
