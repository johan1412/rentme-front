<template>
  <div class="main-offers">
    <b-container>
      <b-row>
        <b-col class="frame-carousel" cols="12">
          <carousel :perPage="productsPerPage">
            <slide v-for="product in products" :key="product.id" class="p-2">
              <router-link :to="'/products/' + product.id" class="card-link">
                <b-card class="product-card">
                  <template #header>
                    <div>
                      <img :src="product.path !== 0 ? 'https://localhost:8443/media'+product.path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
                    </div>
                  </template>
                  <b-card-text class="d-flex flex-column justify-content-between">
                    <div class="product-card-text">{{ product.name }}</div>
                    <div class="text-muted">
                      <div class="price-bloc">{{ product.price }}€ / jour</div>
                      <div class="ratings-bloc">
                        <b-icon :icon="(!product.averageRatings || product.averageRatings < 0.2) ? 'star' : (product.averageRatings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                        <b-icon :icon="(!product.averageRatings || product.averageRatings < 1.2) ? 'star' : (product.averageRatings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                        <b-icon :icon="(!product.averageRatings || product.averageRatings < 2.2) ? 'star' : (product.averageRatings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                        <b-icon :icon="(!product.averageRatings || product.averageRatings < 3.2) ? 'star' : (product.averageRatings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                        <b-icon :icon="(!product.averageRatings || product.averageRatings < 4.2) ? 'star' : (product.averageRatings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                        <span> ({{ product.numbersOfRatings ? product.numbersOfRatings : 0 }} avis)</span>
                      </div>
                      <div class="address-bloc">{{ product.city }} &bull; {{ product.regionName }} ({{ product.region }})</div>
                    </div>
                  </b-card-text>
                </b-card>
              </router-link>
            </slide>
          </carousel>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import AuthService from '../../services/AuthService';

export default {
    components: {
      Carousel,
      Slide
    },
    name: "SimilarAds",
    props: {
      subCategory: Object,
    },
    data() {
      return {
        products: [],
        productsPerPage: 4,
      }
    },
    mounted() {
      let subCategory = this.subCategory;
      AuthService.getProductsBySubCategory(subCategory.id).then(response => {
        if(response.data.products) {
          let results = response.data.products.filter(product => product.isValid == true);
          this.products = results.length <= 10 ? results : results.slice(0, 10);
        }
      });
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        let width = window.innerWidth;
        if(width > 992) {
          this.productsPerPage = 4;
        } else if(width > 576) {
          this.productsPerPage = 2;
        } else {
          this.productsPerPage = 2;
        }
      }
    }
};
</script>

<style scoped>
.main-offers {
  width: 100%;
  margin: 50px auto;
  max-width: 1200px;
  text-align: left;
}

.VueCarousel-slide {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 10px 2px !important;
}

.main-offers .VueCarousel-dot {
  height: 15px !important;
  width: 15px !important;
  background-color: #444444 !important;
}

.main-offers .VueCarousel-dot--active {
  height: 20px !important;
  width: 20px !important;
}

.main-offers {
  margin: 50px 0px;
}

.main-offers .card-link {
  text-decoration: none;
}

.main-offers .card {
  transition: all .2s ease-in-out;
}

.main-offers .card:hover {
  transform: scale(1.05);
}

.VueCarousel .card-header {
  background-color: rgba(50, 50, 50, 0.2);
  height: 200px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.VueCarousel .card img {
	max-width: 100%;
	max-height: 200px;
  width: auto;
  height: auto;
}

.VueCarousel .card .card-body .product-card-text {
  display: -webkit-box;
  overflow : hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5rem;
  height: 4.5rem;
  color: #000000;
}

.VueCarousel .card-body .price-bloc {
  background-color: #4499AD;
  color: #ffffff;
  padding: 5px 10px;
  margin: 10px 0px;
  width: fit-content;
}

.VueCarousel .card-body .ratings-bloc {
  color: #4499AD;
}

.VueCarousel .card-body .address-bloc {
  font-size: 90%;
}

@media screen and (max-width: 992px) {
  
  .main-offers .VueCarousel-slide {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
}

@media screen and (max-width: 768px) {

  .frame-carousel {
    padding: 0px;
  }

  .VueCarousel-inner {
    display: flex;
    flex-wrap: wrap;
  }

  .VueCarousel-slide {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 10px 2px !important;
  }

  .main-offers .VueCarousel-dot {
    display: none;
  }

  .main-offers .card {
    font-size: 12px;
  }

}
</style>