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
          <router-link :to="'/search?category=' + category.name">
            <img :src="category.img" alt="" class="icon-category">
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
              <carousel :perPage="4">
                <slide v-for="post in posts" :key="post.id" class="p-2">
                  <router-link :to="'/products/' + post.id" class="card-link">
                    <b-card :img-src="post.files" img-alt="Image" img-top tag="article">
                      <b-card-text>
                        {{ post.name }}
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
import AuthService from '../../../services/AuthService';
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
      categories: [],
      posts: [
        {id:1, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:30, files:'https://picsum.photos/300/200/?image=41'},
        {id:2, name:'chelsea is the best club in the world and chelsea has a great player chelsea is the best club in the world and chelsea has a great player chelsea is the best club in the world and chelsea has a great player chelsea is the best club in the world and chelsea has a great player, chelsea is the best club in the world and chelsea has a great player chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the worldchelsea is the best chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world  chelsea is the best club in the world club in the world chelsea is the best club in the world  chelsea is the best club in the world  and chelsea has a great player', price:60, files:'https://picsum.photos/300/200/?image=41'},
        {id:3, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:54, files:'https://picsum.photos/300/400/?image=41'},
        {id:4, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:25, files:'https://picsum.photos/500/200/?image=41'},
        {id:5, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:31, files:'https://picsum.photos/300/200/?image=41'},
        {id:6, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:40, files:'https://picsum.photos/300/200/?image=41'},
        {id:7, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:54, files:'https://picsum.photos/300/200/?image=41'},
        {id:8, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:55, files:'https://picsum.photos/300/200/?image=41'},
        {id:9, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:81, files:'https://picsum.photos/300/200/?image=41'},
        {id:10, name:'chelsea is the best club in the world and chelsea has a great player', description:'chelsea is the best club in the world and chelsea has a great player', price:28, files:'https://picsum.photos/300/200/?image=41'},
      ],
    }
  },
  mounted() {
    AuthService.getCategories().then(response => {
      this.categories = response.data['hydra:member'];
    }).catch(e => console.log(e))
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
  height: 350px;
  transition: all .2s ease-in-out;
}

.main-offers .card:hover {
  transform: scale(1.05);
}

.main-offers .card-img-top {
  width: 100%;
  height: 180px;
}

.main-offers .card-body {
  padding: 0px;
  margin: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main-offers .card-body .card-text {
  color: #000000;
  height: 100%;
  text-overflow: ellipsis;
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
