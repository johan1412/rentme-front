<template>
	<div class="bloc-menu sticky-top" @mouseleave="mouseLeave()">
		<div class="common-menu">
      <div class="icon arrow-left" @click="handleClickPrev(0)">&lsaquo;</div>
			<ul>
        <li v-for="(category, index) in categories" :key="category.id" @mouseover="mouseOver(index)">
          <router-link :to="'/search?category=' + category.name.toLowerCase()">{{ category.name }}</router-link>
        </li>
      </ul>
      <div class="icon arrow-right" @click="handleClickNext(0)">&rsaquo;</div>
    </div>
    <div class="sub-common-menu">
      <div v-for="(category, index) in categories" :key="category.id">
        <ul v-if="activeCategory == index" @click="activeCategory = null" class="sub-list">
          <li v-for="subCategory in category.children" :key="subCategory.id">
            <router-link :to="'/search?category=' + subCategory.name.toLowerCase()">{{ subCategory.name }}</router-link>
          </li>
        </ul>
      </div>
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
	methods: {
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
.bloc-menu {
  background-color: #ffffff;
	width: 95%;
	max-width: 1800px;
	margin: 30px auto;
	border-radius: 10px;
}

.common-menu {
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

.common-menu > ul > li > a.underline::after {
	width: 100%;
	transition: width 0.3s;
}

.sub-common-menu .sub-list {
    display: flex;
    justify-content: flex-start;
    list-style: none;
    margin: 0px;
    width: 100%;
    background-color: #ffffff;
}

.sub-common-menu ul li a {
  color: #000000;
  display: block;
  padding: 20px;
  text-decoration: none;
}

.sub-common-menu ul li a:hover {
    background-color: #f0f0f0;
}

@media screen and (max-width: 992px) {

  .common-menu {
    font-size: 14px;
  }

  .common-menu > ul > li > a {
    padding: 10px 20px;
    font-size: 16px;
    letter-spacing: normal;
  }

}

@media screen and (max-width: 768px) {

  .common-menu > ul > li > a {
    padding: 10px 20px;
    font-size: 14px;
  }

  .common-menu .icon {
    padding: 0px 25px;
    font-size: 25px;
  }

  .sub-common-menu * {
    font-size: 14px;
  }

}

@media screen and (max-width: 576px) {

  .bloc-menu {
    margin: 15px auto;
  }

  .common-menu > ul > li > a {
    padding: 10px 15px;
    font-size: 12px;
  }

  .common-menu .icon {
    padding: 0px 20px;
    font-size: 20px;
  }

  .sub-common-menu * {
    font-size: 12px;
  }

}
</style>
