<template>
  <div class="container">
    <h3 class="mt-5 text-left">Annonces signalées</h3>
    <hr>
    <div v-if="reportings.length > 0">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Annonce n°</th>
            <th scope="col">Utilisateur</th>
            <th scope="col">Raison</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reporting in reportings" :key="reporting.id">
            <td><router-link :to="reporting.product">{{ reporting.product.id }}</router-link></td>
            <td><router-link :to="reporting.sender">{{ reporting.sender.id }}</router-link></td>
            <td>{{ reporting.reason }}</td>
            <td class="actionsCol">
              <ul class="actions-list">
                <li  @click="handleShowModalReporting(reporting.id)" >Effacer le signalement</li>
                <li  @click="handleShowModalProduct(reporting)" >Supprimer l'annonce</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="modalDeleteReporting" size="lg">
        <div class="modal-body container m-auto">
          <h4 class="text-left">Suppression du signalement</h4>
          <p>Êtes-vous sûr de vouloir supprimer ce signalement ?</p>
        </div>
        <template #modal-footer="{ }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="$bvModal.hide('modalDeleteReporting')">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="deleteReporting(reportingSelected)" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
      <b-modal id="modalDeleteProduct" size="lg">
        <div class="modal-body container m-auto">
          <h4 class="text-left">Suppression de l'annonce</h4>
          <p>Êtes-vous sûr de vouloir supprimer l'annonce ?</p>
        </div>
        <template #modal-footer="">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="$bvModal.hide('modalDeleteProduct')">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="deleteProduct(reportingSelectedFormProduct)" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <div v-else>
      <div class="message-no-data">
        <div>Aucune annonce signalée pour le moment</div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../../../services/AuthService";
import {mapGetters} from "vuex";

export default {
  name: "ReportingsPage",
  data() {
    return {
      reportingSelected: null,
      reportingSelectedFormProduct: null
    }
  },
  computed:{
    ...mapGetters(['reportings'])
  },
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
      this.$router.push('/')
    }
    AuthService.getReportings(localStorage.getItem('token')).then(response => {
      this.$store.dispatch('reportings', response.data['hydra:member'])
    }).catch(e => console.log(e))
  },
  methods:{
    deleteReporting(reportingId) {
      AuthService.deleteReporting(reportingId,localStorage.getItem('token')).then(() => {
        this.$store.dispatch('numberOfProductsReported',this.$store.getters.numberOfProductsReported - 1)
        this.$store.dispatch('reportings',this.reportings.filter(report => !(report.id === reportingId)))
        this.$bvToast.toast("Le signalement selectionné a bien été supprimé", {
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-full',
          noAutoHide: true,
        });
      }).catch(e => {
        this.$bvToast.toast("Une erreur est survenue lors de la suppression du signalement", {
          title: 'Oups !',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-full',
          noAutoHide: true,
        });
        console.log(e)
      }).finally(() => this.$bvModal.hide('modalDeleteReporting'))
    },
    deleteProduct(reportingSelectedFormProduct) {
      AuthService.deleteProduct(reportingSelectedFormProduct.product.id,localStorage.getItem('token')).then(() => {
        this.$store.dispatch('numberOfProductsReported',this.$store.getters.numberOfProductsReported - 1)
        this.$store.dispatch('reportings',this.reportings.filter(report => !(report.id === reportingSelectedFormProduct.id)))
        this.$bvToast.toast("L'annonce selectionnée a bien été supprimée", {
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-full',
          noAutoHide: true,
        });
      }).catch(e => {
        this.$bvToast.toast("Une erreur est survenue lors de la suppression de l'annonce", {
          title: 'Oups !',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-full',
          noAutoHide: true,
        });
        console.log(e)
      })
       .finally(() => this.$bvModal.hide('modalDeleteProduct'))
    },
    handleShowModalReporting(reportingId) {
      this.$bvModal.show('modalDeleteReporting')
      this.reportingSelected = reportingId;
    },
    handleShowModalProduct(reporting) {
      this.$bvModal.show('modalDeleteProduct')
      this.reportingSelectedFormProduct = reporting;
    }
  },
}
</script>

<style>
.table {
  display: block;
  overflow-x: auto;
}

.table th {
  white-space: nowrap;
}

.table .actionsCol {
  white-space: nowrap;
}

.table .actions-list {
  list-style: none;
  text-decoration: underline;
  cursor: pointer;
  padding: 0px;
}
</style>
