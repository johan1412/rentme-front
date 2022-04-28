<template>
  <div class="container p-5">
    <div v-if="user">
      <b-form-checkbox
        v-b-modal.modal-role
        v-model="roleRenter"
        name="roleRenterButton"
        class="role-button"
        switch
        >
        Activer la possibilité de pouvoir déposer des annonces
      </b-form-checkbox>
      <b-modal id="modal-role" centered title="Demande de confirmation">
        <p v-if="roleRenter" class="my-4">Êtes-vous sûr de vouloir vous ajouter la possibilité de déposer des annonces sur le site dans le but de mettre en locations des produits ?</p>
        <p v-else class="my-4">Êtes-vous sûr de vouloir vous enlever la possibilité de déposer des annonces sur le site ?<br>Vos annonces ne seront plus visibles par les autres utilisateurs du site</p>
        <template #modal-footer="{ ok, cancel }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="cancel()">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="handleChangeRole(ok())" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
      <br>
      <div class="edit-button mb-3">Modifier mes informations</div>
      <form>
        <table class="table">
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
            <td class="text-right pr-5"><label for="prenom">Mot de passe:</label></td>
            <td class="text-left">**********</td>
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
      </form>
    </div>
    <div v-else>
        <div>Désolé, aucune information sur vous n'a été trouvée</div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  name: "PersonalInformations",
  data: () => ({
      user: null,
      roleRenter: true,
  }),
  created() {
    if(this.$store.getters.user) {
        this.user = this.$store.getters.user;
        this.user.roles.includes("ROLE_RENTER") ? this.roleRenter = true : this.roleRenter = false;
    }
  },
  methods: {
    handleChangeRole() {
      let newRole = this.roleRenter ? "ROLE_RENTER" : "";
      let role = this.roleRenter ? this.user.roles.filter((value) => { return value != "ROLE_RENTER" }) : this.user.roles.push(newRole);
      AuthService.updateUser(this.user.id, {roles: role}).then(response => {
        console.log(response.data)
        this.$store.dispatch('user',response.data.data);
      }).catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
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