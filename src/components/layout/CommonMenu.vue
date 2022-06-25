<template>
	<div>
		<div class="common-menu">
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
		<div class="common-menu" v-bind:class="{ 'fixed-top': isFixed, 'd-none': !isFixed }">
      <div class="icon arrow-left" @click="handleClickPrev(1)">&lsaquo;</div>
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
      <div class="icon arrow-right" @click="handleClickNext(1)">&rsaquo;</div>
		</div>
	</div>
</template>

<script>
import AuthService from "@/services/AuthService";
import { mapGetters } from "vuex";

export default {
	name: "CommonMenu",
	data: () => {
		return {
			activeCategory: null,
			isFixed: false,
		};
	},
	created() {
		AuthService.getCategories()
			.then((response) => {
				this.$store.dispatch(
					"categories",
					response.data["hydra:member"].filter((category) => !category?.parent)
				);
			})
			.catch((e) => console.log(e));
	},
	computed: {
		...mapGetters(["categories"]),
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
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		mouseOver(index) {
			this.activeCategory = index;
		},
		mouseLeave() {
			this.activeCategory = null;
		},
    handleClickNext(number) {
      let width = document.querySelector(".common-menu ul").offsetWidth;
      document.getElementsByClassName("common-menu")[number].getElementsByTagName("ul")[0].scrollLeft += width;
    },
    handleClickPrev(number) {
      let width = document.querySelector(".common-menu ul").offsetWidth;
      document.getElementsByClassName("common-menu")[number].getElementsByTagName("ul")[0].scrollLeft -= width;
    }
	},
};
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.common-menu .icon {
  padding: 0px 30px;
  cursor: pointer;
  font-size: 32px;
}

.common-menu .arrow-left {
  border-right: 1px solid #000000;
}

.common-menu .arrow-right {
  border-left: 1px solid #000000;
}

.common-menu ul {
	display: flex;
	justify-content: flex-start;
	list-style: none;
	margin: 0px;
	padding: 0px;
  overflow: hidden;
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
  white-space: nowrap;
}

.common-menu > ul > li > a {
	padding: 20px 40px;
	font-size: 120%;
}

.common-menu > ul > li > a::after {
	content: "";
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
