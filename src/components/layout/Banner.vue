<template>
  <div id="banner">
    <div v-if="user" class="welcome-message">Bonjour {{ user.firstName }} {{ user.lastName }} !</div>
    <div class="banner-text-box">
      <p class="banner-text banner-text-big">
        LOCATION DE PARTICULIER À PARTICULIER
      </p>
      <p class="banner-text banner-text-small">
        Trouver le matériel qu'il vous faut au plus proche de chez vous
      </p>
    </div>
    <div class="searchForm">
      <ValidationObserver v-slot="{ validate }">
        <form @submit.prevent="validate().then(handleSubmit)">
          <ValidationProvider rules="max:50" v-slot="{ errors,failed }">
            <input type="text" v-model="searchInput" :class="`is-${failed}`" placeholder="Rechercher un produit ..." />
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
      user: null,
    }
  },
  methods: {
    handleSubmit: function () {
      this.$router.push('/search?words=' + this.searchInput);
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler() {
        if(this.$store.getters.user){
          this.user = { firstName: this.$store.getters.user.firstName, lastName: this.$store.getters.user.lastName };
        } else {
          this.user = null;
        }
      }
    }
  }
};
</script>
<style scoped>
#banner {
  position: relative;
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
  font-size: 36px;
  font-weight: bold;
}

.banner-text-small {
  font-size: 26px;
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

.welcome-message {
  position: absolute;
  top: 0;
  right: 0;
  width: max-content;
  padding: 15px 40px;
  background-color: rgba(250 , 250, 250, 0.8);
  color: #000000;
  margin: 10px 0px;
}

@media screen and (max-width: 992px) {
  
  .banner-text-big {
    font-size: 25px;  
  }

  .banner-text-small {
    font-size: 20px;
  }

}

@media screen and (max-width: 576px) {

  #banner {
    height: 400px;
  }

  .banner-text-box {
    border-radius: 0px;
    margin-top: 60px;
  }

  .banner-text-big {
    font-size: 18px;  
  }

  .banner-text-small {
    font-size: 14px;
  }

  #banner .searchForm {
    margin-top: 50px;
  }

  #banner .searchForm form > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #banner .searchForm input {
    padding: 10px;
    font-size: 16px;
    min-width: 100px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  #banner .searchForm .btn {
    padding: 10px;
    font-size: 16px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    margin-top: 10px;
  }

  .welcome-message {
    padding: 10px 30px;
    margin: 10px 0px;
    font-size: 14px;
  }

}
</style>
