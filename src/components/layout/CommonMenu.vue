<template>
<div>
    <div class="common-menu">
        <ul>
            <li v-for="(category, index) in categories" :key="category.id" @mouseover="mouseOver(index)" @mouseleave="mouseLeave()">
                <router-link :to="'/search?category=' + category.name.toLowerCase()">{{ category.name }}</router-link>
                <ul v-if="activeCategory == index" @click="activeCategory = null">
                    <li v-for="subCategory in category.children" :key="subCategory.id"><router-link :to="subCategory.url">{{ subCategory.name }}</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="common-menu" v-bind:class="{ 'fixed-top': isFixed, 'd-none': !isFixed }">
        <ul>
            <li v-for="(category, index) in categories" :key="category.id" @mouseover="mouseOver(index)" @mouseleave="mouseLeave()">
                <router-link :to="'/search?category=' + category.name.toLowerCase()">{{ category.name }}</router-link>
                <ul v-if="activeCategory == index" @click="activeCategory = null">
                    <li v-for="subCategory in category.children" :key="subCategory.id"><router-link :to="'/search?category=' + subCategory.name.toLowerCase()">{{ subCategory.name }}</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import AuthService from "@/services/AuthService";
import {mapGetters} from "vuex";

export default {
    name: "CommonMenu",
    data: () => {
        return {
            activeCategory: null,
            isFixed: false,
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
            if (window.scrollY >= 117) {
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
        }
    },
}
</script>

<style>
.fixed-top {
    margin-top: 0px !important;
}
.common-menu {
    background-color: #ffffff;
    width: 95%;
    max-width: 1800px;
	margin: 30px auto;
	border-radius: 10px;
}

.common-menu ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0px;
    padding: 0px;
}

.common-menu ul li {
    display: block;
    position: relative;
    background-color: #ffffff;
    color: #000000;
}

.common-menu ul a {
    display: block;
    color: #000000;
    text-decoration: none;
    padding: 20px;
    font-size: 90%;
}

.common-menu > ul > li > a {
    padding: 20px 40px;
    font-size: 120%;
}

.common-menu > ul > li > a::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000000;
    transition: width 0.3s;
}

.common-menu > ul > li > a:hover::after {
    width: 100%;
    transition: width 0.3s;
}

.common-menu ul li ul {
    display: block;
    position: absolute;
    left: 0px;
    top: 61px;
    margin: 0px;
    padding: 0px;
    width: 100%;
    z-index: 1;
}

.common-menu ul li ul li:hover {
    background-color: #f0f0f0;
}
</style>
