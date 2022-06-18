<template>
  <div class="container p-5">
    <div class="spinner-middle">
      <div v-show="isLoading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="user">
      <b-form-checkbox
        v-b-modal.modal-role
        v-model="roleRenter"
        name="roleRenterButton"
        class="role-button"
        switch
        :change="showModal = !showModal"
        >
        Activer la possibilité de pouvoir déposer des annonces
      </b-form-checkbox>
      <b-modal v-model="showModal" id="modal-role" centered title="Demande de confirmation">
        <p v-if="roleRenter" class="my-4">Êtes-vous sûr de vouloir vous ajouter la possibilité de déposer des annonces sur le site dans le but de mettre en locations des produits ?</p>
        <p v-else class="my-4">Êtes-vous sûr de vouloir vous enlever la possibilité de déposer des annonces sur le site ?<br>Vos annonces ne seront plus visibles par les autres utilisateurs du site</p>
        <template #modal-footer="{ }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="closeModal()">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="handleChangeRole()" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
      <br>
      <div class="edit-button mb-3" v-b-modal.modalEditUser>Modifier mes informations</div>
      <table class="table table-informations">
        <tr>
          <td class="text-right pr-5"><label for="prenom">Prénom:</label></td>
          <td class="text-left">{{ user.firstName }}</td>
        </tr>
        <tr>
          <td class="text-right pr-5"><label for="prenom">Nom:</label></td>
          <td class="text-left">{{ user.lastName }}</td>
        </tr>
        <tr>
          <td class="text-right pr-5"><label for="prenom">Email:</label></td>
          <td class="text-left">{{ user.email }}</td>
        </tr>
        <tr>
          <td class="text-right pr-5"><label for="prenom">Adresse:</label></td>
          <td class="text-left">{{ user.address.streetName }} ({{ user.address.city }} - {{ user.address.region }})</td>
        </tr>
        <tr>
          <td class="text-right pr-5"><label for="prenom">Role:</label></td>
          <td class="text-left">{{ user.roles.includes("ROLE_ADMIN") ? 'Administrateur' : 'loueur' }}</td>
        </tr>
      </table>
      <b-modal id="modalEditUser" size="lg">
        <div class="modal-body container m-auto">
          <ValidationObserver v-slot="{ validate }">
            <form @submit.prevent="validate().then(handleEditUser)">
              <h4 class="text-center">Informations personnelles</h4>
              <div class="form-group">
                <label>Prénom</label>
                <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
                  <input
                    type="text"
                    v-model="firstName"
                    id="firstName"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Saisissez votre nom"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label>Nom</label>
                <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
                  <input
                    type="text"
                    v-model="lastName"
                    id="lastName"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Saisissez votre prénom"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group address-form mt-4">
                <label class="address-label">Adresse</label>
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
                      class="form-control mt-3"
                      placeholder="Nom de la ville"
                    />
                    <span class="form-error">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <ValidationProvider rules="required|integer|between:1,99" v-slot="{ errors }">
                    <b-form-select v-model="addressRegion" :options="optionsRegion" value-field="id" text-field="name" class="mt-3">
                      <template #first>
                        <b-form-select-option :value="null" enabled>-- Selectionnez votre département --</b-form-select-option>
                      </template>
                    </b-form-select>
                    <span class="form-error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-group">
                <label>Email</label>
                <ValidationProvider rules="required|email|minmax:1,50" v-slot="{ errors, failed }">
                  <input
                    type="email"
                    v-model="email"
                    id="exampleInputEmail1"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Email"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <template #modal-footer="{ ok, cancel }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="cancel()">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="handleEditUser()" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <div v-else>
        <div>Désolé, aucune information sur vous n'a été trouvée</div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import RegionService from "../../services/RegionService";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, oneOf, between, integer } from 'vee-validate/dist/rules';

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
    message: 'Ce champs doit etre un nombre',
});

extend('between', {
    ...between,
    message: 'La valeur doit être entre {min} et {max}',
    params: ['min', 'max']
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
  name: "PersonalInformations",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    user: null,
    roleRenter: true,
    isLoading: false,
    firstName: "",
    lastName: "",
    addressStreet: "",
    addressCity: "",
    addressRegion: null,
    email: "",
    optionsRegion: [],
    showModal: true
  }),
  created() {
    if(this.$store.getters.user) {
        this.user = this.$store.getters.user;
        this.user.roles.includes("ROLE_RENTER") ? this.roleRenter = true : this.roleRenter = false;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.addressStreet = this.user.address.streetName;
        this.addressCity = this.user.address.city;
        this.email = this.user.email;
    }
    RegionService.getRegions().then(response => {
      this.optionsRegion = response.data['hydra:member'];
      this.$store.dispatch('regions',response.data['hydra:member'])
      this.addressRegion = this.user.address.region.slice(9);
    }).catch(e => console.log(e))
  },
  mounted() {
    const userPermission = this.$store.getters.userPermission
    if(!userPermission){
      this.$router.push('/')
    }
  },
  methods: {
    handleChangeRole() {
      this.isLoading = true;
      let newRole = this.roleRenter ? "ROLE_RENTER" : "";
      let role = this.user.roles;
      if(this.roleRenter) {
        this.user.roles.unshift(newRole);
        role = this.user.roles;
      } else {
        role = this.user.roles.filter((value) => { return value != "ROLE_RENTER" });
        if(role.length == 0) role.push("ROLE_USER");
      }
      AuthService.updateUser(this.user.id, {roles: role}).then(response => {
        this.$store.dispatch('user',response.data.data);
      }).catch(
        e => console.log(e)
      ).finally(() => {
        this.showModal = false;
        this.isLoading = false;
      })
    },
    closeModal(){
      this.showModal = false;
    },
    handleEditUser() {
      this.address = { streetName: this.addressStreet, city: this.addressCity, region: 'regions/' + this.addressRegion };
      AuthService.updateUser(this.user.id, { firstName: this.firstName, lastName: this.lastName, address: this.address, email: this.email})
        .then(() => {
          localStorage.setItem("successMessage", "Vos informations ont été modifiées avec succès");
          this.$router.go()
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }
}
</script>

<style scoped>
.spinner-middle {
  position: absolute;
  top: 50vh;
  left: 50vw;
}

.edit-button {
  cursor: pointer;
  text-decoration: underline;
  width: fit-content;
}

.role-button {
  width: fit-content;
  cursor: pointer;
}
</style>