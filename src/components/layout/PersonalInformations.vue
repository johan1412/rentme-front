<template>
  <div class="container p-5">
    <div class="spinner-middle">
      <div v-show="isLoading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="user">
      <div @click="$bvModal.show('modalEditRole')">
        <b-form-checkbox
            v-model="roleRenter"
            name="roleRenterButton"
            class="role-button"
            switch
        >
          Activer la possibilité de pouvoir déposer des annonces
        </b-form-checkbox>
      </div>
      <b-modal id="modalEditRole">
        <div class="modal-body container m-auto">
          <p v-if="roleRenter" class="my-4">Êtes-vous sûr de vouloir vous ajouter la possibilité de déposer des annonces sur le site dans le but de mettre en locations des produits ?</p>
          <p v-else class="my-4">Êtes-vous sûr de vouloir vous enlever la possibilité de déposer des annonces sur le site ?<br>Vos annonces ne seront plus visibles par les autres utilisateurs du site</p>
        </div>
        <template #modal-footer="{ }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="handleCancelRole()">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="handleChangeRole()" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
      <br>
      <div class="edit-button mb-3"  @click="$bvModal.show('modalEditUser')">Modifier mes informations</div>
      <div class="edit-button mb-3"  @click="$bvModal.show('modalEditAddress')">Modifier l'addresse</div>
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
          <td class="text-left">{{ user.address.streetName }} ({{ user.address.city }} - {{ user.address.region.name }})</td>
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
                    v-model="user.firstName"
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
                    v-model="user.lastName"
                    id="lastName"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Saisissez votre prénom"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label>Email</label>
                <ValidationProvider rules="required|email|minmax:1,50" v-slot="{ errors, failed }">
                  <input
                    type="email"
                    v-model="user.email"
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
        <template #modal-footer="{ }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="$bvModal.hide('modalEditUser')">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="handleEditUser()" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
      <b-modal id="modalEditAddress" size="lg">
        <div class="modal-body container m-auto">
          <ValidationObserver v-slot="{ validate }">
            <form @submit.prevent="validate().then(handleEditUser)">
              <h4 class="text-center">Informations personnelles</h4>
              <div class="form-group address-form mt-4">
                <label class="address-label">Adresse</label>
                <div class="frame-address-form-input">
                  <ValidationProvider rules="required|minmax:1,100" v-slot="{ errors, failed }">
                    <input
                      type="text"
                      v-model="user.address.streetName"
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
                      v-model="user.address.city"
                      id="addressCity"
                      :class="`is-${failed}`"
                      class="form-control mt-3"
                      placeholder="Nom de la ville"
                    />
                    <span class="form-error">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <ValidationProvider rules="required|integer|between:1,99" v-slot="{ errors }">
                    <b-form-select v-model="region" :options="regions" value-field="id" text-field="name" class="mt-3">
                      <template #first>
                        <b-form-select-option :value="null" enabled>-- Selectionnez votre département --</b-form-select-option>
                      </template>
                    </b-form-select>
                    <span class="form-error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <template #modal-footer="{ }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="$bvModal.hide('modalEditAddress')">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="handleEditAddress()" variant="success">Valider</b-button>
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
import {mapGetters} from "vuex";

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
    roleRenter: true,
    isLoading: false,
    region: "",
  }),
  computed:{
    ...mapGetters(['user','regions'])
  },
  mounted() {
    const userPermission = this.$store.getters.userPermission
    if(!userPermission){
      this.$router.push('/')
    }
    if(this.$store.getters.user) {
      this.$store.getters.user.roles.includes("ROLE_RENTER") ? this.roleRenter = true : this.roleRenter = false;
    }
    RegionService.getRegions(localStorage.getItem('token')).then(response => {
      this.$store.dispatch('regions',response.data['hydra:member'])
    }).catch(e => console.log(e))
  },
  methods: {
    handleChangeRole() {
      this.isLoading = true;
      let newRole = this.roleRenter ? "ROLE_RENTER" : "";
      let role = this.user.roles;
      if(this.roleRenter) {
        this.user.roles.unshift(newRole);
        role = this.user.roles;
        this.$bvToast.toast('Votre nouveau role loueur a été enregistré avec succès', {
          title: 'Merci !',
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000
        })
      } else {
        role = this.user.roles.filter((value) => { return value != "ROLE_RENTER" });
        if(role.length == 0) role.push("ROLE_USER");
        this.$bvToast.toast('Votre role loueur a été enlevé avec succès', {
          title: 'Merci !',
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000
        })
      }
      AuthService.updateUser(this.user.id, {roles: role},localStorage.getItem('token')).then(response => {
        this.$store.dispatch('user',response.data);
      }).catch(
      ).finally(() => {
        this.$bvModal.hide('modalEditRole')
        this.isLoading = false;
        localStorage.clear();
        this.$store.dispatch('user',null)
        this.$store.dispatch('numberOfProductsNotValid',0)
        this.$store.dispatch('numberOfProductsReported',0)
        this.$store.dispatch('parentCategories',[])
        this.$store.dispatch('reservations',[])
        if(this.$route.fullPath !== '/') {
          this.$router.push('/login')
        } else {
          this.$router.go()
        }
      })
      if (this.roleRenter){
        this.user.products.forEach(product => {
          AuthService.updateProduct(product.id, {hasRight: true},localStorage.getItem('token'))
          .then(response => {
            this.$store.dispatch('user',{...this.user,products:this.user.product.map(product.id === response.data.id ? {...product,hasRight:response.data.hasRight} : product)});
          }).catch(
              e => console.log(e)
          )
        })
      }else{
        this.user.products.forEach(product => {
          AuthService.updateProduct(product.id, {hasRight: false},localStorage.getItem('token'))
              .then(response => {
                this.$store.dispatch('user',{...this.user,products:this.user.product.map(product.id === response.data.id ? {...product,hasRight:response.data.hasRight} : product)});
              }).catch(
              e => console.log(e)
          )
        })
      }

    },
    handleCancelRole() {
      this.roleRenter = !this.roleRenter;
      this.$bvModal.hide('modalEditRole')
    },
    closeModal(){
      this.showModal = false;
    },
    handleEditUser() {
      AuthService.updateUser(this.user.id, { firstName: this.user.firstName, lastName: this.user.lastName, email: this.user.email},localStorage.getItem('token'))
        .then((response) => {
          this.$bvToast.toast('Vos informations a été enregistré avec succès', {
            title: 'Merci !',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-top-full',
            autoHideDelay: 3000
          })
          this.$store.dispatch('user',response.data)
          localStorage.clear();
          this.$store.dispatch('user',null)
          this.$store.dispatch('products',[])
          this.$store.dispatch('numberOfProductsNotValid',0)
          this.$store.dispatch('numberOfProductsReported',0)
          this.$store.dispatch('parentCategories',[])
          this.$store.dispatch('reservations',[])
          if(this.$route.fullPath !== '/') {
            this.$router.push('/login')
          } else {
            this.$router.go()
          }
        }).catch(e => {
            console.log(e)
            this.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
              title: 'Oups !',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              noAutoHide: true,
              autoHideDelay: 3000
            })
          })
          .finally(() => this.$bvModal.hide('modalEditUser'));
    },
    handleEditAddress() {
      AuthService.updateAddress(this.user.address.id, {...this.user.address, streetName: this.user.address.streetName, city: this.user.address.city, region: 'regions/' +this.region},localStorage.getItem('token'))
          .then((response) => {
            this.$store.dispatch('user', {...this.user,address:response.data})
            this.$bvToast.toast('Votre adresse a été enregistré avec succès', {
              title: 'Merci !',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 3000
            })
          })
          .catch(e => {
            console.log(e)
            this.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
              title: 'Oups !',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 3000
            })
          })
          .finally(() => this.$bvModal.hide('modalEditAddress'));
    }
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

@media screen and (max-width: 576px) {

  .table-informations td {
    padding: 5px 10px !important;
  }
  
}
</style>
