<template>
  <div id="banner">
    <div class="banner-text-box">
      <p class="banner-text banner-text-big">
        LOCATION DE PARTICULIER À PARTICULIER
      </p>
      <p class="banner-text banner-text-small">
        Trouver le matériel qu'il vous faut au plus proche de chez vous
      </p>
    </div>
    <div class="searchForm">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit">
          <ValidationProvider rules="max:50" v-slot="{ errors }">
            <input type="text" v-model="searchInput" placeholder="Rechercher un produit ..." />
            <span><button type="submit" class="btn btn-dark">Rechercher</button></span>
            <div class="form-error-banner">{{ errors[0] }}</div>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('max', {
  validate(value, { max }) {
    return value.length <= max;
  },
  message: 'Ce champs doit contenir au maximum {max} caractères',
  params: ['max']
});

export default {
  name: "Banner",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      searchInput: '',
    }
  },
  methods: {
    handleSubmit: function () {
      this.$router.push('/search?words=' + this.searchInput);
    },
  }
};
</script>
<style scoped>
#banner {
  height: 600px;
  width: 100%;
  background-image: url("../../../public/images/banner.jpg");
  background-size: cover;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-text-box {
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  backdrop-filter: blur(4px);
  background-color: rgba(50 , 50, 50, 0.3);
  border-radius: 25px;
}

.banner-text {
  color: #eeeeee;
  text-align: center;
  font-family: 'Roboto-bold';
}

.banner-text-big {
  font-size: 3em;
  font-weight: bold;
}

.banner-text-small {
  font-size: 1.8em;
}

#banner .searchForm {
  display: flex;
  justify-content: center;
  margin-top: 200px;
}

#banner .searchForm input {
  padding: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  outline: none;
  font-size: 140%;
  min-width: 150px;
}

#banner .searchForm .btn {
  padding: 15px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border: none;
  font-size: 140%;
  vertical-align: baseline;
}

.form-error-banner {
  color: #eeeeee;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #ff7f00;
  margin: 10px;
}
</style>
