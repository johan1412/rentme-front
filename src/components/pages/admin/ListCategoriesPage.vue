<template>
  <div class="container">
    <h3 class="text-left mt-4">Liste des categories</h3>
    <hr>
    <div class="frame-table table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Categorie principale</th>
            <th scope="col">Sous-catégories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td scope="row">{{ category.id }}</td>
            <td>
              <div>{{ category.name }}</div>
              <div class="table-icon" v-b-modal.modalEditCategory @click="editCategory(category)">
                <b-icon class="text-primary" icon="pencil" aria-hidden="true"></b-icon>
              </div>
              <div class="table-icon" v-b-modal.modalDeleteCategory @click="deleteCategory(category)">
                <b-icon class="text-danger" icon="trash" aria-hidden="true"></b-icon>
              </div>
            </td>
            <td>
              <ul class="subcategories-list">
                <li v-for="subCategory in category.children" :key="subCategory.id">
                  <div>{{ subCategory.name }}</div>
                  <div class="table-icon" v-b-modal.modalEditCategory @click="editCategory(category)">
                    <b-icon class="text-primary" icon="pencil" aria-hidden="true"></b-icon>
                  </div>
                  <div class="table-icon" v-b-modal.modalDeleteCategory @click="deleteCategory(subCategory)">
                    <b-icon class="text-danger" icon="trash" aria-hidden="true"></b-icon>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal id="modalDeleteCategory" title="Suppression">
      <div class="modal-body container m-auto">
        <p class="my-4">Êtes-vous sûr de vouloir supprimer la catégorie {{ deleteCategorySelected ? deleteCategorySelected.name : '' }} ?</p>
        <p>En supprimant cette catégorie, vous supprimerez toutes ses sous-catégories également.</p>
      </div>
      <template #modal-footer="{ cancel }">
        <div class="mx-auto">
          <b-button class="rounded-0 mr-1" @click="cancel(deleteCategoryCancel())">Annuler</b-button>
          <b-button class="rounded-0 ml-1" @click="deleteCategoryConfirm($bvModal.hide('modalDeleteCategory'))" variant="success">Confirmer</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="modalDeleteSubCategory" title="Suppression">
      <div class="modal-body container m-auto">
        <p class="my-4">Êtes-vous sûr de vouloir supprimer la catégorie {{ deleteCategorySelected ? deleteCategorySelected.name : '' }} ?</p>
      </div>
      <template #modal-footer="{ cancel }">
        <div class="mx-auto">
          <b-button class="rounded-0 mr-1" @click="cancel(deleteCategoryCancel())">Annuler</b-button>
          <b-button class="rounded-0 ml-1" @click="deleteCategoryConfirm($bvModal.hide('modalDeleteCategory'))" variant="success">Confirmer</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="modalEditCategory" size="lg" title="Modification">
        <div class="modal-body container m-auto">
          <ValidationObserver v-slot="{ validate }">
            <form @submit.prevent="validate().then(editCategoryConfirm)">
              <div class="form-group">
                <label>Nom actuel</label>
                <input type="text" class="form-control" :value="editCategorySelected ? editCategorySelected.name : ''" readonly/>
              </div>
              <div class="form-group">
                <label>Nouveau nom</label>
                <ValidationProvider rules="required|minmax:1,50" v-slot="{ errors, failed }">
                  <input
                    type="text"
                    v-model="newNameCategory"
                    id="newNameCategory"
                    :class="`is-${failed}`"
                    class="form-control"
                    placeholder="Saisissez un nouveau nom de catégorie"
                  />
                  <span class="form-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <template #modal-footer="{ cancel }">
          <div class="mx-auto">
            <b-button class="rounded-0 mr-1" @click="cancel(editCategoryCancel())">Annuler</b-button>
            <b-button class="rounded-0 ml-1" @click="editCategoryConfirm($bvModal.hide('modalEditCategory'))" variant="success">Valider</b-button>
          </div>
        </template>
      </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import AuthService from "@/services/AuthService";
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
  name: "ListCategoriesPage",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      deleteCategorySelected: null,
      editCategorySelected: null,
      newNameCategory: "",
    };
  },
  mounted() {
    const adminPermission = this.$store.getters.adminPermission
    if(!adminPermission){
      this.$router.push('/')
    }
    AuthService.getCategories()
      .then((response) => {
        this.$store.dispatch(
          "categories",
          response.data["hydra:member"].filter((category) => !category?.parent)
        );
      })
      .catch((e) => console.log(e));
    },
	computed: {
		...mapGetters(["categories"]),
	},
  methods: {
    deleteCategory(category) {
      this.deleteCategorySelected = category;
    },
    deleteCategoryConfirm() {
      AuthService.deleteCategory(this.deleteCategorySelected.id, localStorage.getItem("token"))
      .then((response) => {
        this.$store.dispatch("categories", response.data);
        this.$bvToast.toast('La catégorie a bien été supprimée', {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
        });
      })
      .catch(() => {
        this.$bvToast.toast('Une erreur est survenue', {
          variant: 'danger',
          solid: true,
          autoHideDelay: 3000,
        });
      });
      this.deleteCategorySelected = null;
    },
    deleteCategoryCancel() {
      this.deleteCategorySelected = null;
    },
    editCategory(category) {
      this.editCategorySelected = category;
    },
    editCategoryConfirm() {
      AuthService.editCategory(this.editCategorySelected.id, {name: this.newNameCategory}, localStorage.getItem("token"))
        .then((response) => {
          this.$store.dispatch("categories", response.data);
          this.$bvToast.toast('La catégorie a bien été modifiée', {
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          });
        })
        .catch(() => {
          this.$bvToast.toast('Une erreur est survenue', {
            variant: 'danger',
            solid: true,
            autoHideDelay: 3000,
          });
        });
      this.editCategorySelected = null;
    },
    editCategoryCancel() {
      this.editCategorySelected = null;
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