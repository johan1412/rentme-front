<template>
<div class="dqs">
  <Menu />
  <Banner />
  <div class="main-content">
    <div class="main-categories">
      <h1>LES GRANDES CATEGORIES</h1>
      <hr>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <router-link :to="'/category/' + category.id">
            <img :src="category.img" alt="" class="icon-category">
            <p>{{ category.title }}</p>
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
              <carousel :perPage="4">
                <slide v-for="post in posts" :key="post.id" class="p-2">
                  <router-link :to="'/posts/' + post.id" class="card-link">
                    <b-card :img-src="post.img" img-alt="Image" img-top tag="article">
                      <b-card-text>
                        {{ post.description }}
                      </b-card-text>
                      <template #footer>
                        <small class="text-muted">{{ post.price }}€ / jour</small>
                      </template>
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
import Menu from '../../layout/MainMenu.vue';
import Banner from '../../layout/Banner.vue';
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Menu,
    Banner,
    Carousel,
    Slide
  },
  name: "Home",
  data: () => {
    return {
      slide: 0,
      sliding: null,
      categories: [
        {id:1, title:'Bricolage', img:'https://picsum.photos/300/200'},
        {id:2, title:'Jardinage', img:'https://picsum.photos/300/200'},
        {id:3, title:'Véhicule', img:'https://picsum.photos/300/200'},
        {id:4, title:'High-tech', img:'https://picsum.photos/300/200'},
        {id:5, title:'Nettoyage', img:'https://picsum.photos/300/200'},
        {id:6, title:'Vetements', img:'https://picsum.photos/300/200'},
      ],
      posts: [
        {id:1, description:'chelsea is the best club in the world and chelsea has a great player', price:30, img:'https://picsum.photos/300/200/?image=41'},
        {id:2, description:'chelsea is the best club in the world and chelsea has a great player', price:60, img:'https://picsum.photos/300/200/?image=41'},
        {id:3, description:'chelsea is the best club in the world and chelsea has a great player', price:54, img:'https://picsum.photos/300/200/?image=41'},
        {id:4, description:'chelsea is the best club in the world and chelsea has a great player', price:25, img:'https://picsum.photos/300/200/?image=41'},
        {id:5, description:'chelsea is the best club in the world and chelsea has a great player', price:31, img:'https://picsum.photos/300/200/?image=41'},
        {id:6, description:'chelsea is the best club in the world and chelsea has a great player', price:40, img:'https://picsum.photos/300/200/?image=41'},
        {id:7, description:'chelsea is the best club in the world and chelsea has a great player', price:54, img:'https://picsum.photos/300/200/?image=41'},
        {id:8, description:'chelsea is the best club in the world and chelsea has a great player', price:55, img:'https://picsum.photos/300/200/?image=41'},
        {id:9, description:'chelsea is the best club in the world and chelsea has a great player', price:81, img:'https://picsum.photos/300/200/?image=41'},
        {id:10, description:'chelsea is the best club in the world and chelsea has a great player', price:28, img:'https://picsum.photos/300/200/?image=41'},
      ],
    }
  },
  methods: {
    onSlideStart() {
        this.sliding = true
    },
    onSlideEnd() {
        this.sliding = false
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
  font-size: 160%;
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
  transform: scale(1.1);
}

.main-offers .card-body p {
  color: #000000;
}

.main-offers .card-footer {
  text-align: center;
  font-size: 150%;
}

.main-offers .card-footer small {
  font-weight: bold;
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
</style>
