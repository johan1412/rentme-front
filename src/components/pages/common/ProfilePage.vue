<template>
<div class="dqs main-frame">
	<div class="container m-0 p-0 mw-100">
		<div class="row mt-5">
			<div class="col-md-8">
				<div class="user-details">
					<h2>{{ user.firstName }} {{ user.lastName }}</h2><h2 class="title-separator"> | </h2><h4 class="user-details-note">{{ user.note }}/5 <small> (0 note)</small></h4>
					<div>Habite à <strong>{{ addressCity }} ({{ addressRegion }})</strong></div>
					<div class="row user-products">
						<div class="col-md-12">
							<h4>Annonces de ce loueur <small> ({{ products.length }})</small></h4>
							<hr>
							<div v-if="paginatedProducts.length > 0" class="">
                <b-card-group deck class="card-deck-custom-grid">
                    <router-link v-for="product in paginatedProducts" :key="product.id" :to="'/products/' + product.id" :per-page="perPage" :current-page="currentPage">
                        <b-card class="product-card" :img-src="product.files" img-alt="Image" img-top>
                            <b-card-text class="product-card-text">{{ product.name }}</b-card-text>
                            <template #footer>
                                <small class="text-muted">{{ product.price }}€ / jour</small>
                            </template>
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
              <div v-else>
                <p>Aucune annonce trouvée</p>
              </div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="contact-form">
					<FormContact v-bind:user="user"/>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import FormContact from '../../layout/FormContact.vue';

export default {
  components: {
    FormContact,
  },
  name: "Product",
  data() {
    return {
      user: {},
      perPage: 8,
      currentPage: 1,
      paginatedProducts: [],
      nbResults: 0,
      products: [],
      addressCity: '',
      addressRegion: '',
    }
  },
  mounted() {
	let userId = this.$route.params.userId;
	if (userId) {
		/*let user = fetch(blablabla + userId)
    let addressUser = user.address.split('///&///&///&///&');
    this.addressCity = addressUser[1].charAt(0).toUpperCase() + addressUser[1].slice(1);
    this.addressRegion = addressUser[2];*/
    ///////////////////////////////
    this.addressCity = 'paris'.charAt(0).toUpperCase() + 'paris'.slice(1);
    this.addressRegion = '75';
    ///////////////////////////////
		let user = {
			id: 2,
			firstName: 'julien',
			lastName: 'Etienne',
			address: 'avenue des champs elysées///&///&///&///&, paris///&///&///&, 75',
			note: '1.6',
			products: [
				{ id: 1, region: 'Ain', name: 'nom du produit test', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 24, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
        { id: 2, region: 'test1', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 28, note: '4', files: 'https://picsum.photos/500/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
        { id: 3, region: 'test2', name: 'nom du produittest', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 54, note: '5', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
        { id: 4, region: 'test3', name: ' test fou', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 39, note: '1', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
        { id: 5, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 33, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
        { id: 21, region: 'Ain', name: 'nom du test', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 45, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
        { id: 22, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 63, note: '2', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
        { id: 23, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 85, note: '4', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
        { id: 24, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 145, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'sub item 222', parent:'Bricolage'}, },
        { id: 25, region: 'Ain', name: 'nom du produit', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', address: 'adresse du loueur', price: 10, note: '3', files: 'https://picsum.photos/300/300', category: {id:1, name:'Perceuse', parent:'Bricolage'}, },
      ],
			comments: [
				{ id: 1, text: 'blobloblo', createdAt: '01/01/2022', rating: '2.8', user: { id: 24, firstName: 'emile', lastName: 'Roux'}},
                { id: 2, text: 'bliblibli', createdAt: '05/01/2022', rating: '3.7', user: { id: 21, firstName: 'stephane', lastName: 'Martin'}},
                { id: 3, text: 'blablabla', createdAt: '02/01/2022', rating: '1', user: { id: 37, firstName: 'amelie', lastName: 'Audart'}},
			]
		};
		this.user = user;
    this.products = user.products;
    this.nbResults = this.user.products.length;
    this.paginate(this.perPage, 0);
	}
  },
  methods: {
    paginate(page_size, page_number) {
      let productsToParse = this.products;
      this.paginatedProducts = productsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
      window.scrollTo(0, 0);
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

.user-main-presentation {
	margin-top: 30px;
}

.user-products {
    margin-top: 60px;
}

.user-link {
	color: #000000;
}

.user-details h2,
.user-details-note {
	display: inline;
	margin: 20px 20px 20px 0px;
}

.card-deck .card {
    margin-top: 10px;
    margin-bottom: 30px;
}

.card-deck-custom-grid .card img {
	width: 250px;
	height: 200px;
}

</style>