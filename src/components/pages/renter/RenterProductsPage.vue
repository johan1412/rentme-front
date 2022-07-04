<template>
  <div class="container">
    <h1 class="h3 mt-5">Mes annonces</h1>
    <hr>
    <b-card-group v-if="user.products.length > 0" class="card-deck-custom-grid">
      <router-link v-for="product in user.products" :key="product.id" :to="'/products/' + product.id">
        <b-card class="product-card">
          <template #header>
            <div class="bloc-image">
              <img :src="product.files.length !== 0 ? 'https://localhost:8443/media'+product.files[0].path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
            </div>
          </template>
          <b-card-text class="product-card-text">{{ product.name }}</b-card-text>
          <b-card-text class="text-muted">
            <div class="price-bloc">{{ product.price }}€ / jour</div>
            <div class="ratings-bloc">
              <b-icon :icon="(!product.averageRatings || product.averageRatings < 0.2) ? 'star' : (product.averageRatings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
              <b-icon :icon="(!product.averageRatings || product.averageRatings < 1.2) ? 'star' : (product.averageRatings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
              <b-icon :icon="(!product.averageRatings || product.averageRatings < 2.2) ? 'star' : (product.averageRatings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
              <b-icon :icon="(!product.averageRatings || product.averageRatings < 3.2) ? 'star' : (product.averageRatings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
              <b-icon :icon="(!product.averageRatings || product.averageRatings < 4.2) ? 'star' : (product.averageRatings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
              <span> ({{ product.numbersOfRatings ? product.numbersOfRatings : 0 }} avis)</span>
            </div>
            <div class="address-bloc">{{ product.address.city }} &bull; {{ product.address.region.name }} ({{ product.address.region.number }})</div>
          </b-card-text>
        </b-card>
        <div class="action-icon"><b-icon class="text-danger" icon="trash" v-b-modal.modalDeleteProduct @click="deleteProduct($event, product)" aria-hidden="true"></b-icon></div>
      </router-link>
		</b-card-group>
    <div v-else>Vous n'avez aucune annonce enregistrée</div>
    <b-modal id="modalDeleteProduct" title="Suppression">
      <div class="modal-body container m-auto">
        <p class="my-4">Êtes-vous sûr de vouloir supprimer le produit <strong><i>" {{ deleteProductSelected ? deleteProductSelected.name : '' }} "</i></strong> ?</p>
      </div>
      <template #modal-footer="{ cancel }">
        <div class="mx-auto">
          <b-button class="rounded-0 mr-1" @click="cancel(deleteProductCancel())">Annuler</b-button>
          <b-button class="rounded-0 ml-1" @click="deleteProductConfirm($bvModal.hide('modalDeleteProduct'))" variant="success">Confirmer</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import AuthService from '../../../services/AuthService';
import {mapGetters} from "vuex";

export default {
  name: "RenterProductsPage",
  data() {
    return {
      deleteProductSelected: null,
    };
  },
  computed:{
    ...mapGetters(['user'])
  },
  mounted() {
    const renterPermission = this.$store.getters.renterPermission
    if(!renterPermission){
      this.$router.push('/')
    }
  },
  methods: {
    deleteProduct(e, product) {
      e.preventDefault();
      this.deleteProductSelected = product;
    },
    deleteProductConfirm() {
      if (this.user.products.filter(product => product.id === this.deleteProductSelected.id)[0].reservations.length === 0){
        AuthService.deleteProduct(this.deleteProductSelected.id, localStorage.getItem('token'))
            .then((res) => {
              console.log(res)
              this.$store.dispatch("user", {...this.user,products:this.user.products.filter(product => product.id !== this.deleteProductSelected.id)});
              this.$bvToast.toast('L\'annonce a bien été supprimée', {
                variant: 'success',
                solid: true,
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              });
              this.deleteProductSelected = null;
            })
            .catch(() => {
              this.$bvToast.toast('Une erreur est survenue', {
                title: 'Oups !',
                variant: 'danger',
                solid: true,
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              });
              this.deleteProductSelected = null;
            });
      }else {
        this.$bvToast.toast('Vous ne pouvez pas supprimer ce produit, car il est rattaché aux réservations', {
          title: 'Oups !',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000,
        });
      }
    },
    deleteProductCancel() {
      this.deleteProductSelected = null;
    },
  },
};
</script>

<style scoped>
.card-deck-custom-grid a {
  text-decoration: none;
  color: #000;
}

.bloc-image {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-icon .b-icon.bi {
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease-in-out;
}

.action-icon .b-icon.bi:hover {
  transform: scale(1.3);
}

@media screen and (max-width: 1200px) {

  .container {
    padding-bottom: 20px;
  }

  .product-card {
    font-size: 14px;
    width: 250px !important;
  }

  .product-card .card-header {
    height: 180px;
    width: 250px;
  }

  .product-card img {
    max-height: 180px;
    max-width: 250px;
  }

}

@media screen and (max-width: 768px) {

  .product-card {
    font-size: 12px;
    width: 200px !important;
  }

  .product-card .card-header {
    height: 150px;
    width: 200px;
  }

  .product-card img {
    max-height: 150px;
    max-width: 200px;
  }

}

@media screen and (max-width: 576px) {

  .card-deck-custom-grid {
    display: flex;
    flex-wrap: wrap;
  }

  .card-deck-custom-grid a {
    width: 50%;
  }

  .product-card {
    font-size: 10px;
    width: 100% !important;
  }

  .product-card .card-header {
    height: 100px;
    width: 100%;
  }

  .product-card img {
    max-height: 100px;
    max-width: 100%;
  }

}
</style>

