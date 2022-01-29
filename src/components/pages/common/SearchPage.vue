<template>
<div class="dqs main-frame">
	<Menu />
	<div class="main-content row mx-0 justify-content-between">
		<div class="filters-box col-md-3">
			<h2>Filtres</h2>
			<hr class="main-hr">
			<div class="filters-categories">
				<b-list-group>
					<b-list-group-item @click="filter1Visible = !filter1Visible" v-b-toggle.collapse-1 class="d-flex justify-content-between align-items-center">
						Catégorie de produit
						<b-icon v-if="filter1Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<!-- <b-collapse visible id="collapse-1"> -->
					<b-collapse id="collapse-1">
						<ul>
							<li v-for="(category, index) in categories" :key="category.id">
								<input type="checkbox" :value="category.title" :id="'category' + (index + 1)" @change="selectedAllSubCategories(category)" />
								{{ category.title }} (tous)
								<ul class="">
									<li v-for="(subCategory, index) in category.categories" :key="subCategory.id">
										<input type="checkbox" :value="subCategory.title" :id="'subCategory' + (index + 1)" v-model="selected.categories" />
										{{ subCategory.title }}
									</li>
								</ul>
							</li>
						</ul>
					</b-collapse>

					<b-list-group-item @click="filter2Visible = !filter2Visible" v-b-toggle.collapse-2 class="d-flex justify-content-between align-items-center">
						Prix
						<b-icon v-if="filter2Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-2">
						<b-row class="my-1">
							<b-col lg="6">
								<label for="input-none">Min:</label>
								<b-form-input v-model="minPrice" type="number"></b-form-input>
							</b-col>
							<b-col lg="6">
								<label for="input-none">Max:</label>
								<b-form-input v-model="maxPrice" type="number"></b-form-input>
							</b-col>
						</b-row>
					</b-collapse>

					<b-list-group-item @click="filter3Visible = !filter3Visible" v-b-toggle.collapse-3 class="d-flex justify-content-between align-items-center">
						Localisation
						<b-icon v-if="filter3Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-3">
						<ul>
							<li v-for="(region, index) in regions" :key="region.id">
								<input type="checkbox" :value="region.name" :id="'region' + (index + 1)" v-model="selected.locations"/>
								{{ region.name }} ({{ region.number }})
							</li>
						</ul>
					</b-collapse>

					<b-list-group-item @click="filter4Visible = !filter4Visible" v-b-toggle.collapse-4 class="d-flex justify-content-between align-items-center">
						Notes
						<b-icon v-if="filter4Visible" icon="chevron-down" aria-hidden="true"></b-icon>
						<b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
					</b-list-group-item>
					<b-collapse id="collapse-4">
						<div class="collapse-notes">
							<input type="radio" value="4plus" id="4plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>4 étoiles ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="3plus" id="3plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>3 étoiles ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="2plus" id="2plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>2 étoiles ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="1plus" id="1plus" v-model="selected.notes"/>
							<b-icon icon="star-fill" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<b-icon icon="star" aria-hidden="true"></b-icon>
							<span>1 étoile ou plus</span>
						</div>
						<div class="collapse-notes">
							<input type="radio" value="0plus" id="0plus" v-model="selected.notes" />
							<span>toutes les notes</span>
						</div>
					</b-collapse>
				</b-list-group>
			</div>
		</div>
		<div class="col-md-1"></div>
		<div class="products-list col-md-8">
			<div class="searchbar-products">
				<form id="searchInputForm" action="https://vuejs.org/" method="get" >
					<b-form inline>
						<label for="inline-form-input">Rechercher : </label>
						<b-form-input id="inline-form-input" v-model="searchInput" name="words"></b-form-input>
						<b-button type="submit" variant="transparent"><b-icon icon="search" aria-hidden="true"></b-icon></b-button>
					</b-form>
				</form>
			</div>
			<div class="orderby-box row">
				<div v-if="paramWords != ''">
					<h2>{{ products.length }} résultat{{ products.length > 1 ? "s " : "" }} pour "{{ paramWords }}"</h2>
					<span>{{ nbResults }} résultat{{ nbResults > 1 ? "s " : "" }}</span>
				</div>
				<div v-else-if="paramCategory != ''">
					<h2>Catégorie {{ paramCategory }}</h2>
					<span>{{ nbResults }} résultat{{ nbResults > 1 ? "s " : "" }}</span>
				</div>
				<div v-else>
					<h2>0 catégorie et 0 recherche</h2>
					<span>{{ nbResults }} résultat{{ nbResults > 1 ? "s " : "" }}</span>
				</div>
				<div class="orderby-element">
					<p>Trié par : </p>
					<b-form-select v-model="selected.orderBy" :options="options" size="sm"></b-form-select>
					<b-button variant="light" @click="deckGrid = true"><b-icon icon="grid-fill" aria-hidden="true"></b-icon></b-button>
					<b-button variant="light" @click="deckGrid = false"><b-icon icon="list-ul" aria-hidden="true"></b-icon></b-button>
				</div>
			</div>
			<b-card-group deck v-bind:class="[deckGrid ? 'card-deck-custom-grid' : 'card-deck-custom-list']">
				<router-link v-for="product in sortedBy" :key="product.id" :to="'/products/' + product.id" :per-page="perPage" :current-page="currentPage">
					<b-card v-if="deckGrid" class="product-card" :img-src="product.files" img-alt="Image" img-top>
						<b-card-text class="product-card-text">{{ product.name }}</b-card-text>
						<template #footer>
							<small class="text-muted">{{ product.price }}€ / jour</small>
						</template>
					</b-card>
					<b-card v-else no-body class="overflow-hidden">
						<b-row no-gutters class="h-100">
							<b-col md="4">
								<b-card-img :src="product.files" alt="Image" class="rounded-0"></b-card-img>
							</b-col>
							<b-col md="8" class="d-flex flex-column justify-content-between">
								<b-card-body :title="product.name">
									<b-card-text>
										{{ product.description }}
									</b-card-text>
								</b-card-body>
								<b-card-footer class="bg-white d-flex justify-content-between align-items-center">
									<small><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon>&nbsp;Paris</small>
									<div>{{ product.price }}€ / jour</div>
									<b-button squared variant="outline-transparent">Voir l'annonce</b-button>
								</b-card-footer>
							</b-col>
						</b-row>
					</b-card>
				</router-link>
			</b-card-group>
			<b-pagination
				pills
				v-model="currentPage"
				:total-rows="nbResults"
				:per-page="perPage"
				first-number
				last-number
				align="center"
				limit="8"
				@change="onPageChanged"
			></b-pagination>
		</div>
	</div>
</div>
</template>

<script>
import Menu from '../../layout/CommonMenu.vue';

export default {
  components: {
    Menu,
  },
  name: "Home",
  data() {
	return {
		paramCategory: '',
		paramWords: '',
		searchInput: null,
		nbResults: 0,
		filter1Visible: false,
		filter2Visible: false,
		filter3Visible: false,
		filter4Visible: false,
		deckGrid: true,
		selected: {
			categories: [],
			locations: [],
			orderBy: null,
			notes: "0plus",
		},
		options: [
          { value: null, text: '' },
          { value: 'noteUp', text: 'note croissante' },
          { value: 'noteDown', text: 'note décroissante' },
          { value: 'priceUp', text: 'prix croissant' },
          { value: 'priceDown', text: 'prix décroissant' },
        ],
		categories: this.$store.state.categories ? this.$store.state.categories : this.getCategories(),
		products: [
			{ id: 1, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 24, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
			{ id: 2, region: 'test1', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 28, note: '4', files: 'https://picsum.photos/500/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 3, region: 'test2', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 54, note: '5', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
			{ id: 4, region: 'test3', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 39, note: '1', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
			{ id: 5, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 33, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 6, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 33, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 7, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 87, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 8, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 115, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
			{ id: 9, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 45, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 10, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 14, note: '1', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 11, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 21, note: '1', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 12, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 25, note: '5', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 13, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 22, note: '4', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 15, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 56, note: '4', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 16, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 23, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 17, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 17, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 18, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 32, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 19, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 45, note: '5', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 20, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 27, note: '4', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 21, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 45, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 22, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 63, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 23, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 85, note: '4', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 24, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 145, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
			{ id: 25, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 10, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
			{ id: 26, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 30, note: '6', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
		],
		paginatedProducts: [],
		regions: [
			{ id: 1, number: "01", name: "Ain"},
			{ id: 2, number: "02", name: "test1"},
			{ id: 3, number: "03", name: "test2"},
			{ id: 4, number: "04", name: "test3"},
			{ id: 5, number: "05", name: "Ain"},
			{ id: 6, number: "06", name: "Ain"},
			{ id: 7, number: "07", name: "Ain"},
			{ id: 8, number: "08", name: "Ain"},
			{ id: 9, number: "09", name: "Ain"},
			{ id: 10, number: "10", name: "Ain"},
			{ id: 11, number: "11", name: "Ain"},
			{ id: 12, number: "12", name: "Ain"},
			{ id: 13, number: "13", name: "Ain"},
			{ id: 14, number: "14", name: "Ain"},
			{ id: 15, number: "15", name: "Ain"},
			{ id: 16, number: "16", name: "Ain"},
			{ id: 17, number: "17", name: "Ain"},
			{ id: 18, number: "18", name: "Ain"},
			{ id: 19, number: "19", name: "Ain"},
			{ id: 20, number: "20", name: "Ain"},
			{ id: 21, number: "21", name: "Ain"},
			{ id: 22, number: "22", name: "Ain"},
			{ id: 23, number: "23", name: "Ain"},
			{ id: 24, number: "24", name: "Ain"},
			{ id: 25, number: "25", name: "Ain"},
			{ id: 26, number: "26", name: "Ain"},
			{ id: 27, number: "27", name: "Ain"},
			{ id: 28, number: "28", name: "Ain"},
			{ id: 29, number: "29", name: "Ain"},
			{ id: 30, number: "30", name: "Ain"},
			{ id: 31, number: "31", name: "Ain"},
			{ id: 32, number: "32", name: "Ain"},
			{ id: 33, number: "33", name: "Ain"},
			{ id: 34, number: "34", name: "Ain"},
			{ id: 35, number: "35", name: "Ain"},
			{ id: 36, number: "36", name: "Ain"},
			{ id: 37, number: "37", name: "Ain"},
			{ id: 38, number: "38", name: "Ain"},
			{ id: 39 ,number: "39", name: "Ain"},
			{ id: 40, number: "40", name: "Ain"},
			{ id: 41, number: "41", name: "Ain"},
			{ id: 42, number: "42", name: "Ain"},
			{ id: 43, number: "43", name: "Ain"},
			{ id: 44, number: "44", name: "Ain"},
			{ id: 45, number: "45", name: "Ain"},
			{ id: 46, number: "46", name: "Ain"},
			{ id: 47, number: "47", name: "Ain"},
			{ id: 48, number: "48", name: "Ain"},
			{ id: 49, number: "49", name: "Ain"},
			{ id: 50, number: "50", name: "Ain"},
			{ id: 51, number: "51", name: "Ain"},
			{ id: 52, number: "52", name: "Ain"},
			{ id: 53, number: "53", name: "Ain"},
			{ id: 54, number: "54", name: "Ain"},
			{ id: 55, number: "55", name: "Ain"},
			{ id: 56, number: "56", name: "Ain"},
			{ id: 57, number: "57", name: "Ain"},
			{ id: 58, number: "58", name: "Ain"},
			{ id: 59, number: "59", name: "Ain"},
			{ id: 60, number: "60", name: "Ain"},
			{ id: 61, number: "61", name: "Ain"},
			{ id: 62, number: "62", name: "Ain"},
			{ id: 63, number: "63", name: "Ain"},
			{ id: 64, number: "64", name: "Ain"},
			{ id: 65, number: "65", name: "Ain"},
			{ id: 66, number: "66", name: "Ain"},
			{ id: 67, number: "67", name: "Ain"},
			{ id: 68, number: "68", name: "Ain"},
			{ id: 69, number: "69", name: "Ain"},
			{ id: 70, number: "70", name: "Ain"},
			{ id: 71, number: "71", name: "Ain"},
			{ id: 72, number: "72", name: "Ain"},
			{ id: 73, number: "73", name: "Ain"},
			{ id: 74, number: "74", name: "Ain"},
			{ id: 75, number: "75", name: "Ain"},
			{ id: 76, number: "76", name: "Ain"},
			{ id: 77, number: "77", name: "Ain"},
			{ id: 78, number: "78", name: "Ain"},
			{ id: 79, number: "79", name: "Ain"},
			{ id: 80, number: "80", name: "Ain"},
			{ id: 81, number: "81", name: "Ain"},
			{ id: 82, number: "82", name: "Ain"},
			{ id: 83, number: "83", name: "Ain"},
			{ id: 84, number: "84", name: "Ain"},
			{ id: 85, number: "85", name: "Ain"},
			{ id: 86, number: "86", name: "Ain"},
			{ id: 87, number: "87", name: "Ain"},
			{ id: 88, number: "88", name: "Ain"},
			{ id: 89, number: "89", name: "Ain"},
			{ id: 90, number: "90", name: "Ain"},
			{ id: 91, number: "91", name: "Ain"},
			{ id: 92, number: "92", name: "Ain"},
			{ id: 93, number: "93", name: "Ain"},
			{ id: 94, number: "94", name: "Ain"},
			{ id: 95, number: "95", name: "Ain"},
			{ id: 96, number: "96", name: "Ain"},
			{ id: 97, number: "971", name: "Ain"},
			{ id: 98, number: "972", name: "Ain"},
			{ id: 99, number: "973", name: "Ain"},
			{ id: 100, number: "974", name: "Ain"},
			{ id: 101, number: "976", name: "Ain"},
		],
		perPage: 15,
        currentPage: 1,
		minPrice: 0,
		maxPrice: 0,
	}
  },
  mounted() {
	let category = this.$route.query.category;
	let words = this.$route.query.words;
	if (words) {
		this.paramWords = words;
	} else if (category && this.categories.some(c => c.title == category)) {
		this.paramCategory = category;
		this.initializaFilterCategories();
	}
	this.nbResults = this.products.length;
	this.minPrice = this.getMinPrice();
	this.maxPrice = this.getMaxPrice();
	this.paginate(this.perPage, 0);
  },
  watch: {
    '$route.query': {
        immediate: false,
		handler(newVal) {
			if (newVal.words) {
				this.paramWords = newVal.words;
			} else if(newVal.category) {
				this.paramCategory = newVal.category;
				this.initializaFilterCategories();
			}
			this.paginate(this.perPage, 0);
		}
    },
	'minPrice': {
		handler(newVal) {
			this.minPrice = newVal;
		}
	},
	'maxPrice': {
		handler(newVal) {
			this.maxPrice = newVal;
		}
	},
  }, 
  methods: {
	paginate(page_size, page_number) {
		let productsToParse = this.products;
		this.paginatedProducts = productsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
	},
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
	getCategories() {
		return [
			{
				id:1,
				title:'Bricolage',
				categories: [
					{id:11, title:'sub item 111'},
					{id:12, title:'sub item 211'},
					{id:13, title:'sub item 311'},
					{id:14, title:'sub item 411'},
					{id:15, title:'sub item 511'},
				]
			},
			{
				id:2,
				title:'Jardinage',
				categories: [
					{id:21, title:'sub item 122'},
					{id:22, title:'sub item 222'},
					{id:23, title:'sub item 322'},
					{id:24, title:'sub item 422'},
					{id:25, title:'sub item 522'},
				]
			},
			{
				id:3,
				title:'Véhicule',
				categories: [
					{id:31, title:'sub item 133'},
					{id:32, title:'sub item 233'},
					{id:33, title:'sub item 333'},
					{id:34, title:'sub item 433'},
					{id:35, title:'sub item 533'},
				]
			},
		]
	},
	getMaxPrice() {
		let max =  Math.max(...this.products.map((p) => { return p.price }));
		return max;
	},
	getMinPrice() {
		let min = Math.min(...this.products.map((p) => { return p.price }));
		return min;
	},
	applyFilters() {
		let locations = this.selected.locations;
		let selectedCategories = this.selected.categories;
		let orderedProducts = this.products;
		let notesFilter = this.selected.notes;
		let currentPage = this.currentPage;
		let perPage = this.perPage;

		let next1 = (locations && (locations.length > 0)) ? orderedProducts.filter(p => locations.includes(p.region)) : orderedProducts;
		let next2 = (selectedCategories && (selectedCategories.length > 0)) ? next1.filter(p => selectedCategories.includes(p.category.name)) : next1;
		let next3 = next2.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);
		let res = [];
		switch (notesFilter) {
			case '1plus': res = next3.filter(p => p.note >= 1); break;
			case '2plus': res = next3.filter(p => p.note >= 2); break;
			case '3plus': res = next3.filter(p => p.note >= 3); break;
			case '4plus': res = next3.filter(p => p.note >= 4); break;
			default: res = next3; break;
		}
		this.nbResults = res.length;
		return res.filter((row, index) => {
			let start = (currentPage - 1) * perPage;
			let end = currentPage * perPage;
			if(index >= start && index < end) return true;
		});
	},
	sortedRefresh() {
		switch (this.selected.orderBy) {
			case 'noteUp':
				return this.applyFilters().sort((a, b) => { return a.note - b.note });
			case 'noteDown':
				return this.applyFilters().sort((a, b) => { return b.note - a.note });
			case 'priceUp':
				return this.applyFilters().sort((a, b) => { return a.price - b.price });
			case 'priceDown':
				return this.applyFilters().sort((a, b) => { return b.price - a.price });
			default:
				return this.applyFilters();
		}
	},
	selectedAllSubCategories(category) {
		let index = this.categories.map(function(elt) { return elt.title }).indexOf(typeof category === 'string' ? category : category.title) + 1;
		if (index > 0) {
			let categoryObject = typeof category === 'string' ? this.categories[index - 1] : category;
			if (document.getElementById('category' + index).checked) {
				categoryObject.categories.forEach(element => {
					this.selected.categories.push(element.title);
				});
			} else {
				categoryObject.categories.forEach(element => {
					let subIndex = this.selected.categories.indexOf(element.title);
					this.selected.categories.splice(subIndex, 1);
				});
			}
		}
	},
	unselectAllCategories() {
		this.selected.categories = [];
		this.categories.forEach((category, index) => {
			index += 1;
			document.getElementById('category' + index).checked = false;
		});
	},
	initializaFilterCategories() {
		let category = this.paramCategory;
		this.unselectAllCategories();
		let index = this.categories.map(function(elt) { return elt.title }).indexOf(category) + 1;
		document.getElementById('category' + index).checked = true;
		this.selectedAllSubCategories(category);
	}
  },
  computed: {
	sortedBy() {
		return this.sortedRefresh();
	},
  }
};
</script>

<style scoped>
.main-frame {
	width: 95%;
	max-width: 1800px;
	margin: 0px auto;
}

.main-content {
	padding: 0px;
}

.filters-box {
	max-height: min-content; /*1000px;*/
	background-color: #ffffff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}

.filters-box h2 {
	text-align: center;
	margin-top: 20px;
}

.filters-box .main-hr {
	width: 50%;
}

.filters-box ul {
	list-style: none;
	margin-bottom: 3px;
}

.filters-box input[type="checkbox"] {
	height: 15px;
	width: 15px;
}

.filters-categories {
	margin-top: 40px;
}

.filters-categories .list-group-item {
	border: none;
	border-bottom: 1px solid #bbbbbb;
	font-size: 120%;
	margin: 20px 0px;
}

.filters-categories .collapse {
	padding-left: 20px;
}

.collapse-notes {
	padding: 5px 0px;
	display: flex;
	align-items: center;
}

.collapse-notes input {
	margin-right: 10px;
	height: 15px;
	width: 15px;
	border-radius: 0px !important;
}

.collapse-notes span {
	margin-left: 10px;
}

.products-list {
	padding: 0px;
}

.searchbar-products {
	background-color: #ffffff;
	border-radius: 10px;
	padding: 10px 0px;
}

.searchbar-products form label {
	font-size: 120%;
	margin: 0px 30px;
}

.searchbar-products form input,
.searchbar-products form input:focus,
.searchbar-products form input:active {
	border: none;
	border-bottom: 1px solid #000000;
	border-radius: 0px;
	outline: none;
	box-shadow: none;
	padding: 0px;
	height: auto;
	font-size: 120%;
}

.searchbar-products form .btn {
	border: none;
	outline: none;
	box-shadow: none;
}

.orderby-box {
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.orderby-box .orderby-element select,
.orderby-box .orderby-element p,
.orderby-box .orderby-element .btn {
	display: inline;
	margin-left: 10px;
}

.orderby-box .orderby-element select {
	width: auto;
	border: none;
	outline: none;
	box-shadow: none;
}

.orderby-box .orderby-element .btn {
	padding: 5px;
}

.card-deck-custom-list {
	display: block;
}

.card-deck-custom-grid {
	display: flex;
}

.card-deck-custom-grid .card {
	flex: none;
	margin-top: 40px;
	transition: all .2s ease-in-out;
}

.card-deck-custom-list .card {
	flex: none;
	display: block;
	margin-top: 40px;
	height: 300px;
}

.card-deck a {
	text-decoration: none;
}

.card-deck-custom-grid .card:hover {
	transform: scale(1.05);
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.card-deck-custom-grid .card img {
	width: 300px;
	height: 300px;
}

.card-deck-custom-list .card img {
	width: 300px;
	height: 300px;
}

.card-deck-custom-list .card-title,
.card-deck-custom-list .card-footer {
	color: #000000;
}

.card-deck-custom-list .card-footer .btn {
	color: #ffffff;
	border: 1px solid #000000;
	outline: none;
	box-shadow: none;
	background-color: rgba(0, 0, 0, 0.8);
}

.card-deck-custom-list .card-footer .btn:hover {
	color: #000000;
	border: 1px solid #000000;
	background-color: #ffffff;
}

.card-deck .card .card-body .card-text {
	overflow: hidden;
	text-overflow: ellipsis;
	height: 100px;
}

.card-deck .card .card-body .card-text {
	color: #000000;
}

.card-deck .card .card-footer {
	text-align: center;
	font-size: 150%;
}

.products-list .pagination {
	margin: 70px 0px;
}

</style>