<template>
<div class="main-menu" v-bind:class="{ 'fixed-top': isFixed }">
    <ul>
        <li v-for="(category, index) in categories" :key="category.id" @mouseover="mouseOver(index)" @mouseleave="mouseLeave()">
            <router-link :to="'/search?category=' + category.title">{{ category.title }}</router-link>
            <ul v-if="activeCategory == index" @click="activeCategory = null">
                <li v-for="subCategory in category.categories" :key="subCategory.id"><router-link :to="subCategory.url">{{ subCategory.title }}</router-link></li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "MainMenu",
    data: () => {
        return {
            activeCategory: null,
            isFixed: false,
            categories: [
                {
                    id:1,
                    title:'Bricolage',
                    categories: [
                        {id:11, title:'sub item 111', url:'#'},
                        {id:12, title:'sub item 211', url:'#'},
                        {id:13, title:'sub item 311', url:'#'},
                        {id:14, title:'sub item 411', url:'#'},
                        {id:15, title:'sub item 511', url:'#'},
                    ]
                },
                {
                    id:2,
                    title:'Jardinage',
                    categories: [
                        {id:21, title:'sub item 122', url:'#'},
                        {id:22, title:'sub item 222', url:'#'},
                        {id:23, title:'sub item 322', url:'#'},
                        {id:24, title:'sub item 422', url:'#'},
                        {id:25, title:'sub item 522', url:'#'},
                    ]
                },
                {
                    id:3,
                    title:'Véhicule',
                    categories: [
                        {id:31, title:'sub item 133', url:'#'},
                        {id:32, title:'sub item 233', url:'#'},
                        {id:33, title:'sub item 333', url:'#'},
                        {id:34, title:'sub item 433', url:'#'},
                        {id:35, title:'sub item 533', url:'#'},
                    ]
                },
                {
                    id:4,
                    title:'High-tech',
                    categories: [
                        {id:41, title:'sub item 144', url:'#'},
                        {id:42, title:'sub item 244', url:'#'},
                        {id:43, title:'sub item 344', url:'#'},
                        {id:44, title:'sub item 444', url:'#'},
                        {id:45, title:'sub item 544', url:'#'},
                    ]
                },
                {
                    id:5,
                    title:'Nettoyage',
                    categories: [
                        {id:51, title:'sub item 155', url:'#'},
                        {id:52, title:'sub item 255', url:'#'},
                        {id:53, title:'sub item 355', url:'#'},
                        {id:54, title:'sub item 455', url:'#'},
                        {id:55, title:'sub item 555', url:'#'},
                    ]
                },
                {
                    id:6,
                    title:'Vetements',
                    categories: [
                        {id:61, title:'sub item 166', url:'#'},
                        {id:62, title:'sub item 266', url:'#'},
                        {id:63, title:'sub item 366', url:'#'},
                        {id:64, title:'sub item 466', url:'#'},
                        {id:65, title:'sub item 566', url:'#'},
                    ]
                },
            ],
        }
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
        }
    },
}
</script>

<style>
.main-menu {
    border-top: 2px solid #000000;
    background-color: #ffffff;
}

.main-menu ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0px;
    padding: 0px;
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
}

.main-menu > ul > li > a {
    padding: 20px 40px;
    font-size: 120%;
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
