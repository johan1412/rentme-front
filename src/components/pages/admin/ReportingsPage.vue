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
            <td><router-link :to="reporting.product">{{ reporting.product.split('/')[2] }}</router-link></td>
            <td><router-link :to="reporting.sender">{{ reporting.sender.split('/')[2] }}</router-link></td>
            <td>{{ reporting.reason }}</td>
            <td class="actionsCol">
              <ul class="actions-list">
                <li v-b-modal.modalDeleteReporting @click="handleShowModalReporting(reporting.id)">Effacer le signalement</li>
                <li v-b-modal.modalDeleteProduct @click="handleShowModalProduct(reporting.product.split('/')[2])">Supprimer l'annonce</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal v-show="showModalReporting" id="modalDeleteReporting" size="lg">
        <div class="modal-body container m-auto">
          <h4 class="text-left">Suppression du signalement</h4>
          <p>Êtes-vous sûr de vouloir supprimer ce signalement ?</p>
        </div>
        <template #modal-footer="{ cancel }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="cancel()">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="deleteReporting(reportingSelected)" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
      <b-modal v-show="showModalProduct" id="modalDeleteProduct" size="lg">
        <div class="modal-body container m-auto">
          <h4 class="text-left">Suppression de l'annonce</h4>
          <p>Êtes-vous sûr de vouloir supprimer l'annonce {{ productSelected }} ?</p>
        </div>
        <template #modal-footer="{ cancel }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="cancel()">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="deleteProduct(productSelected)" variant="success">Valider</b-button>
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

export default {
  name: "ReportingsPage",
  data() {
    return {
      reportings: [],
      productSelected: null,
      showModalReporting: false,
      showModalProduct: false,
    }
  },
  created() {
    AuthService.getReportings().then(response => {
      this.$store.dispatch('reportings', response.data['hydra:member'])
      this.reportings = response.data['hydra:member'].sort((a, b) => {
        return a.product - b.product;
      })
    }).catch(e => console.log(e))
  },
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
      this.$router.push('/')
    }
  },
  methods:{
    deleteReporting(reportingId) {
      AuthService.deleteReporting(reportingId).then(() => {
        this.reportings = this.reportings.filter(r => !(r.id === reportingId))
        this.$store.dispatch('numberOfProductsReported',this.$store.getters.numberOfProductsReported - 1)
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
      })
      this.showModalReporting = false;
    },
    deleteProduct(productId) {
      AuthService.deleteProduct(productId).then(() => {
        /*AuthService.deleteReportingByProduct(productId).then(() => {
          this.reportings = this.reportings.filter(r => !(r.product === productId))
        }).catch(e => console.log(e))*/
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
      this.showModalProduct = false;
    },
    handleShowModalReporting(reportingId) {
      this.showModalReporting = true;
      this.reportingSelected = reportingId;
    },
    handleShowModalProduct(productId) {
      this.showModalProduct = true;
      this.productSelected = productId;
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