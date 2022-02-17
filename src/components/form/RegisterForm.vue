<template>
  <div class="container m-auto">
      <form @submit.prevent="handleSubmit">
         <b-card class="form-frame mx-auto">
          <b-card-text class="form-top text-center">
            <b-icon icon="person-circle" aria-hidden="true"></b-icon>
            <p>INSCRIVEZ-VOUS</p>
          </b-card-text>
          <b-card-text class="form-data">
            <div class="form-group">
              <input
                type="text"
                v-model="firstName"
                id="firstName"
                aria-describedby="emailHelp"
                placeholder="Saisissez votre nom"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                v-model="lastName"
                id="lastName"
                placeholder="Saisissez votre prénom"
              />
            </div>
            <div class="form-group address-form mt-4">
              <label class="address-label">Votre adresse</label>
              <div class="frame-address-form-input">
                <input
                  type="text"
                  v-model="addressStreet"
                  id="addressStreet"
                  placeholder="Nom de la rue"
                  @change="handleChangeAddress"
                />
                <input
                  type="text"
                  v-model="addressCity"
                  id="addressCity"
                  placeholder="Nom de la ville"
                  @change="handleChangeAddress"
                />
                <input
                  type="text"
                  v-model="addressRegion"
                  id="addressRegion"
                  placeholder="Numéro de département"
                  @change="handleChangeAddress"
                />
              </div>
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="email"
                id="exampleInputEmail1"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                id="exampleInputPassword1"
                placeholder="Nouveau mot de passe"
              />
            </div>
            <div class="form-group mt-5">
              <b-form-checkbox
                id="roleChoice"
                v-model="role"
                name="roleChoice"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Je souhaite pouvoir mettre en location mes produits sur le site
              </b-form-checkbox>
            </div>
          </b-card-text>
          <button type="submit" class="btn btn-submit mb-3">S'inscrire</button>
        </b-card>
      </form>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  name: "Register",
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
