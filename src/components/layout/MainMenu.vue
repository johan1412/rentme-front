<template>
  <div class="main-menu" v-bind:class="{ 'fixed-top': isFixed }">
    <div class="icon arrow-left" @click="handleClickPrev(0)">&lsaquo;</div>
    <ul>
      <li v-for="(category, index) in categories" :key="category.id" @mouseover="mouseOver(index)" @mouseleave="mouseLeave()">
        <router-link :to="'/search?category=' + category.name.toLowerCase()">{{ category.name }}</router-link>
        <ul v-if="activeCategory == index" @click="activeCategory = null">
          <li v-for="subCategory in category.children" :key="subCategory.id">
            <router-link :to="'/search?category=' + subCategory.name.toLowerCase()">{{ subCategory.name }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="icon arrow-right" @click="handleClickNext(0)">&rsaquo;</div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import {mapGetters} from "vuex";

export default {
  name: "MainMenu",
  data: () => {
      return {
          activeCategory: null,
          isFixed: false
      }
  },
  created() {
    AuthService.getCategories().then(response => {
      this.$store.dispatch('categories',response.data['hydra:member'].filter(category => !category?.parent))
    }).catch(e => console.log(e))
  },
  computed:{
  ...mapGetters(['categories'])
  },
  mounted() {
      window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY >= 87) {
          this.isFixed = true
      } else {
          this.isFixed = false
      }
    },
    mouseOver(index) {
      this.activeCategory = index
    },
    mouseLeave() {
      this.activeCategory = null
    },
    handleClickNext(number) {
      let width = document.querySelector(".main-menu ul").offsetWidth;
      document.getElementsByClassName("main-menu")[number].getElementsByTagName("ul")[0].scrollLeft += width;
    },
    handleClickPrev(number) {
      let width = document.querySelector(".main-menu ul").offsetWidth;
      document.getElementsByClassName("main-menu")[number].getElementsByTagName("ul")[0].scrollLeft -= width;
    }
  },
}
</script>

<style>
.main-menu {
  border-top: 2px solid #000000;
  background-color: #ffffff;
  display: flex;
  align-items: center;
}

.main-menu .icon {
  padding: 0px 30px;
  cursor: pointer;
  font-size: 32px;
}

.main-menu .arrow-left {
  border-right: 1px solid #000000;
}

.main-menu .arrow-right {
  border-left: 1px solid #000000;
}

.main-menu ul {
  display: flex;
	justify-content: flex-start;
	list-style: none;
	margin: 0px;
	padding: 0px;
  overflow: hidden;
}

.main-menu ul li {
    display: block;
    position: relative;
    background-color: #ffffff;
    color: #000000;
}

.main-menu ul a {
    display: block;
    color: #000000;
    text-decoration: none;
    padding: 20px;
    font-size: 90%;
    white-space: nowrap;
}

.main-menu > ul > li > a {
    padding: 20px 40px;
    font-size: 120%;
    letter-spacing: 0.5px;
}

.main-menu > ul > li > a::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000000;
    transition: width 0.3s;
}

.main-menu > ul > li > a:hover::after {
    width: 100%;
    transition: width 0.3s;
}

.main-menu ul li ul {
    display: block;
    position: absolute;
    left: 0px;
    top: 61px;
    margin: 0px;
    padding: 0px;
    width: 100%;
    z-index: 1;
}

.main-menu ul li ul li:hover {
    background-color: #f0f0f0;
}
</style>
