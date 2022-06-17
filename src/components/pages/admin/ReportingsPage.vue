<template>
  <div class="container">
    <h3 class="mt-5 text-left">Annonces signalées</h3>
    <hr>
    <div v-if="reportings.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Produit</th>
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
            <td>
              <button class="btn btn-danger" @click="deleteReporting(reporting.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
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
      }).catch(e => console.log(e))
    }
  },
}
</script>

<style>

</style>