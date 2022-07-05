<template>
  <div class="container">
    <h3 class="text-left mt-4">Liste des départements</h3>
    <hr>
    <div class="frame-table table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nom</th>
            <th scope="col">Numéro</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="region in regions" :key="region.id">
            <td scope="row">{{ region.id }}</td>
            <td><div>{{ region.name }}</div></td>
            <td><div>{{ region.number }}</div></td>
            <td>
              <div class="table-icon"  @click="editRegion(region)">
                <b-icon class="text-primary" icon="pencil" aria-hidden="true"></b-icon>
              </div>
              <div class="table-icon" @click="deleteRegion(region)">
                <b-icon class="text-danger" icon="trash" aria-hidden="true"></b-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal id="modalDeleteRegion" title="Suppression">
      <div class="modal-body container m-auto">
        <p class="my-4">Êtes-vous sûr de vouloir supprimer le département {{ deleteRegionSelected ? deleteRegionSelected.name : '' }} ?</p>
      </div>
      <template #modal-footer="{  }">
        <div class="mx-auto">
          <b-button class="rounded-0 mr-1" @click="deleteRegionCancel()">Annuler</b-button>
          <b-button class="rounded-0 ml-1" @click="deleteRegionConfirm(deleteRegionSelected)" variant="success">Confirmer</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="modalEditRegion" size="lg" title="Modification">
        <div class="modal-body container m-auto">
          <ValidationObserver v-slot="{ validate }">
            <form @submit.prevent="validate().then(editRegionConfirm)">
              <div class="form-group">
                <label>Nom actuel</label>
                <input type="text" class="form-control" :value="editRegionSelected ? editRegionSelected.name : ''" readonly/>
              </div>
              <div class="form-group">
                <label>Nouveau nom</label>
                <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
                  <input
                    type="text"
                    v-model="newNameRegion"
                    id="newNameRegion"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Saisissez un nouveau nom de département"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label>Numéro actuel</label>
                <input type="text" class="form-control" :value="editRegionSelected ? editRegionSelected.number : ''" readonly/>
              </div>
              <div class="form-group">
                <label>Nouveau numéro</label>
                <ValidationProvider rules="required" v-slot="{ errors, failed }">
                  <input
                    type="number"
                    v-model="newNumberRegion"
                    id="newNumberRegion"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Saisissez un nouveau numéro de département"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <template #modal-footer="{ cancel }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="cancel(editRegionCancel())">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="editRegionConfirm(editRegionSelected)" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import RegionService from "@/services/RegionService";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

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

export default {
  name: "ListRegionsPage",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      deleteRegionSelected: null,
      editRegionSelected: null,
      newNameRegion: "",
      newNumberRegion: "",
    };
  },
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
      this.$router.push('/')
    }
    },
	computed: {
		...mapGetters(["regions"]),
	},
  methods: {
    deleteRegion(region) {
      this.deleteRegionSelected = region;
      this.$bvModal.show('modalDeleteRegion')
    },
    deleteRegionConfirm(deleteRegionSelected) {
      RegionService.deleteRegion(deleteRegionSelected.id, localStorage.getItem("token"))
        .then(() => {
          this.$store.dispatch("regions", this.regions.filter(region => region.id !== deleteRegionSelected.id));
          this.$bvToast.toast('Le département a bien été supprimée', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          });
        })
        .catch(() => {
          this.$bvToast.toast('Vous ne pouvez pas supprimer cette region, car elle est déjà attaché aux autres adresses', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            solid: true,
            autoHideDelay: 3000,
          });
        })
      .finally(() => {
        this.deleteRegionSelected = null;
        this.$bvModal.hide('modalDeleteRegion')
      })
    },
    deleteRegionCancel() {
      this.deleteRegionSelected = null;
      this.$bvModal.hide('modalDeleteRegion')
    },
    editRegion(region) {
      this.editRegionSelected = region;
      this.$bvModal.show('modalEditRegion')
    },
    editRegionConfirm(editRegionSelected) {
      let nameToSend = this.newNameRegion != "" ? this.newNameRegion : this.deleteRegionSelected.name;
      let numberTiSend = this.newNumberRegion != "" ? this.newNumberRegion : this.deleteRegionSelected.number;
      RegionService.updateRegion(editRegionSelected.id, { name: nameToSend, number: parseInt(numberTiSend) }, localStorage.getItem("token"))
        .then((response) => {
          this.$store.dispatch("regions", this.regions.map(region => region.id !== editRegionSelected.id ? region : {...region,name:response.data.name,number:response.data.number}));
          this.$bvToast.toast('Le département a bien été modifié', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          });
        })
        .catch(() => {
          this.$bvToast.toast('Une erreur est survenue', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            solid: true,
            autoHideDelay: 3000,
          });
        })
      .finally(() =>{
        this.editRegionSelected = null
        this.$bvModal.hide('modalEditRegion')
      })
    },
    editRegionCancel() {
      this.editRegionSelected = null;
      this.$bvModal.hide('modalEditRegion')
    },
  },
};
</script>

<style>
.frame-table {
  width: 100%;
  overflow-x: scroll;
}

.frame-table .table {
  display: table;
  width: 100%;
  min-width: 1000px;
}

.frame-table .table td {
  text-align: center;
  vertical-align: middle;
}

.frame-table .table .subcategories-list {
  margin: 0px!important;
}

.frame-table .table .subcategories-list li {
  list-style: none;
  margin: 5px 10px;
}

.frame-table .table td div {
  display: inline-block;
  margin: 0px 10px;
}

.frame-table .table td div:first-child {
  margin-right: 40px;
}

.frame-table .table td .table-icon {
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 25px;
}

.frame-table .table td .table-icon:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media screen and (max-width: 1200px) {
  
  .container  h3{
    margin-top: 20px !important;
    font-size: 26px;
  }
  
}

@media screen and (max-width: 768px) {
  
  .container  h3{
    font-size: 20px;
  }
  
}

@media screen and (max-width: 576px) {

  .container h3 {
    font-size: 16px;
    margin-top: 0px !important;
  }

}
</style>
