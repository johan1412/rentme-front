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
              <div class="table-icon"  @click="editCategory(category)">
                <b-icon class="text-primary" icon="pencil" aria-hidden="true"></b-icon>
              </div>
              <div class="table-icon" @click="deleteCategory(category)">
                <b-icon class="text-danger" icon="trash" aria-hidden="true"></b-icon>
              </div>
            </td>
            <td>
              <ul class="subcategories-list">
                <li v-for="subCategory in category.children" :key="subCategory.id">
                  <div>{{ subCategory.name }}</div>
                  <div class="table-icon" @click="editCategory(subCategory)">
                    <b-icon class="text-primary" icon="pencil" aria-hidden="true"></b-icon>
                  </div>
                  <div class="table-icon"  @click="deleteCategory(subCategory)">
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
        <p class="my-4">Êtes-vous sûr de vouloir supprimer la catégorie ou la sous-catégorie {{ deleteCategorySelected ? deleteCategorySelected.name : '' }} ?</p>
        <p>En supprimant cette catégorie et si une catégorie principale, vous supprimerez toutes ses sous-catégories également.</p>
      </div>
      <template #modal-footer="{ cancel }">
        <div class="mx-auto">
          <b-button class="rounded-0 mr-1" @click="cancel(deleteCategoryCancel)">Annuler</b-button>
          <b-button class="rounded-0 ml-1" @click="deleteCategoryConfirm(deleteCategorySelected)" variant="success">Confirmer</b-button>
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
              <div class="form-group required">
                <label class="control-label">Nouveau nom</label>
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
            <b-button class="rounded-0 ml-1" @click="editCategoryConfirm(editCategorySelected)" variant="success">Valider</b-button>
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
    },
	computed: {
		...mapGetters(["categories"]),
	},
  methods: {
    deleteCategory(category) {
      this.deleteCategorySelected = category;
      this.$bvModal.show('modalDeleteCategory')
    },
    deleteCategoryConfirm(deleteCategorySelected) {
      AuthService.deleteCategory(deleteCategorySelected.id, localStorage.getItem("token"))
      .then(() => {
        if (deleteCategorySelected.parent !== null){
          this.$store.dispatch("categories", this.$store.getters.categories
              .map(category => ({...category,children:category.children.length === 0 ? category.children : category.children.filter(child => child.id !== deleteCategorySelected.id)})));
        }else {

          this.$store.dispatch("categories", this.categories.filter(category => category.id !== deleteCategorySelected.id ));
        }
        this.$root.$bvToast.toast('La catégorie a bien été supprimée', {
          toaster: 'b-toaster-top-full',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000,
        });
      })
      .catch(() => {
        this.$root.$bvToast.toast('Vous ne pouvez pas supprimer cette catégorie, car elle est déjà attaché à des annonces', {
          toaster: 'b-toaster-top-full',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
      })
      .finally(() => {
        this.deleteCategorySelected = null
        this.$bvModal.hide('modalDeleteCategory')
      });
    },
    deleteCategoryCancel() {
      this.deleteCategorySelected = null;
    },
    editCategory(category) {
      this.editCategorySelected = category;
      this.$bvModal.show('modalEditCategory')
    },
    editCategoryConfirm(editCategorySelected) {
      AuthService.editCategory(editCategorySelected.id, {name: this.newNameCategory}, localStorage.getItem("token"))
        .then((response) => {
          if (response.data.parent !== null){
            this.$store.dispatch("categories", this.$store.getters.categories
                .map(category => ({...category,children:category.children.length === 0 ? category.children : category.children.map(child => child.id !== response.data.id ? child : {...child,name:response.data.name})})));
          }else {

            this.$store.dispatch("categories", this.categories.map(category => category.id !== response.data.id ? category: {...category,name:response.data.name}));
          }
          this.$root.$bvToast.toast('La catégorie a bien été modifiée', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(() => {
          this.$root.$bvToast.toast('Une erreur est survenue', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
          });
        })
      .finally(() => {
        this.editCategorySelected = null;
        this.newNameCategory = ""
        this.$bvModal.hide('modalEditCategory')
    })
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
