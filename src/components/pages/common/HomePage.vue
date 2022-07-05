<template>
<div class="dqs">
  <Banner />
  <div class="main-content">
    <div class="main-categories">
      <h1>LES GRANDES CATEGORIES</h1>
      <hr>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <router-link :to="'/search?category=' + category.name">
            <img :src="category.img !== null ? mediaRoot+category.img.path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png' " alt="" class="icon-category">
            <p>{{ category.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="best-offers">
      <h1>LES MEILLEURES OFFRES DU MOMENT</h1>
      <hr>
      <div class="main-offers">
        <b-container>
          <b-row>
            <b-col cols="12">
              <carousel :perPage="productsPerPage">
                <slide v-for="product in products" :key="product.id" class="p-2">
                  <router-link :to="'/products/' + product.id" class="card-link">
                    <b-card class="product-card">
                      <template #header>
                        <div>
                          <img :src="product._source.image_path !== 0 ? mediaRoot+product._source.image_path : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'" alt="image du produit">
                        </div>
                      </template>
                      <b-card-text class="d-flex flex-column justify-content-between">
                        <div class="product-card-text">{{ product._source.name }}</div>
                        <div class="text-muted">
                          <div class="price-bloc">{{ product._source.price }}€ / jour</div>
                          <div class="ratings-bloc">
                            <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 0.2) ? 'star' : (product._source.average_ratings > 0.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                            <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 1.2) ? 'star' : (product._source.average_ratings > 1.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                            <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 2.2) ? 'star' : (product._source.average_ratings > 2.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                            <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 3.2) ? 'star' : (product._source.average_ratings > 3.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                            <b-icon :icon="(!product._source.average_ratings || product._source.average_ratings < 4.2) ? 'star' : (product._source.average_ratings > 4.8 ? 'star-fill' : 'star-half')" aria-hidden="true"></b-icon>
                            <span> ({{ product._source.numbers_of_ratings ? product._source.numbers_of_ratings : 0 }} avis)</span>
                          </div>
                          <div class="address-bloc">{{ product._source.ville }} &bull; {{ product._source.region }} ({{ product._source.region_number }})</div>
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
    </div>
  </div>
</div>
</template>

<script>
import Banner from '../../layout/Banner.vue';
import AuthService from '../../../services/AuthService';
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Banner,
    Carousel,
    Slide
  },
  name: "Home",
  data: () => {
    return {
      slide: 0,
      sliding: null,
      categories: [],
      products: [],
      productsPerPage: 4,
    }
  },
  computed:{
    mediaRoot(){
      return process.env.VUE_APP_URL+'/media'
    }
  },
  mounted() {
    AuthService.getCategories().then(response => {
      this.categories = response.data['hydra:member'].filter(category => !category?.parent);
    }).catch(e => console.log(e))
    AuthService.getProductsByKeyWord({
        page: 0,
      }).then(response => {
        this.products = response.data.hits.hits;
      }).catch(e => console.log(e))
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },  
  methods: {
    onSlideStart() {
        this.sliding = true
    },
    onSlideEnd() {
        this.sliding = false
    },
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
  },
};
</script>

<style>
.main-content {
  margin: auto;
  padding: 50px;
  padding-top: 0px;
}

.main-categories,
.best-offers {
  width: 100%;
  margin: 100px auto;
  max-width: 1200px;
  text-align: left;
}

.main-content h1 {
  font-size: 140%;
  margin: 0px;
}

.main-content hr {
  border-color: #bbbbbb;
}

.main-categories ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0px;
}

.main-categories ul li {
  flex: 0 0 16.66666%;
}

.main-categories .icon-category {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.main-categories ul li p {
  text-align: center;
  padding-top: 10px;
  text-decoration: none;
  color: #000000;
  font-size: 120%;
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

.best-offers .main-offers {
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

@media screen and (max-width: 1400px) {

  .main-content h1,
  .main-content hr {
    margin: 0px 20px;
  }

}

@media screen and (max-width: 768px) {
  
  .main-categories ul li {
    padding: 0px 5px;
  }

}

@media screen and (max-width: 768px) {

  .main-content h1 {
    font-size: 18px;
  }

  .main-categories {
    margin-top: 30px;
  }

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

@media screen and (max-width: 768px) {

  .main-categories .icon-category {
    height: 80px;
    width: 80px;
  }

  .main-categories ul li p {
    font-size: 12px;
  }

}
</style>
