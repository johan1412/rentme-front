<template>
  <div class="container">
    <h3 class="mt-5">Annonce en attente de validation ({{ numberOfProductsNotValid }})</h3>
    <hr>
    <div v-if="numberOfProductsNotValid > 0">
      <b-card-group deck class="card-deck-custom-list">
        <div v-for="product in products" :key="product.id" class="d-flex align-items-center">
          <router-link :to="'/products/' + product.id" class="mt-3">
            <b-card no-body class="overflow-hidden">
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
          <div class="d-flex flex-column">
            <div class="p-2">
              <button type="button" class="btn btn-success"  @click="toValid(item)">VALIDER</button>
            </div>
            <div class="p-2">
              <button type="button" class="btn btn-danger" @click="toDelete(item)">REFUSER</button>
            </div>
          </div>
        </div>
      </b-card-group>
    </div>
    <div v-else>
      <p>Aucune annonce en attente de validation pour le moment</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AuthService from "../../../services/AuthService";

export default {
  name: "ProductsPage",
  data() {
    return {
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
    }
  },
  created() {
    AuthService.getProductsNotValid().then(response => {
          this.$store.dispatch('products',response.data['hydra:member'])
    }
    ).catch(e => console.log(e))
  },
  computed:{
    ...mapGetters(['numberOfProductsNotValid','products'])
  },
  mounted() {
      const adminPermission = this.$store.getters.adminPermission
      if(!adminPermission){
          this.$router.push('/')
      }
  },
   methods:{
    toValid(product){
      AuthService.updateProduct(product.id,{isValid:true}).then(response => {
        console.log(response.data)
        this.$store.commit('products',this.$store.getters.products.filter(product => !(product.id === response.data.id)))
        this.$store.dispatch('numberOfProductsNotValid',this.$store.getters.numberOfProductsNotValid-1)
      }).catch(e => console.log(e))
      console.log(product)
    },
    toDelete(product){
      AuthService.deleteProduct(product.id).then(() => {
        this.$store.commit('products',this.$store.getters.products.filter(prod => !(prod.id === product.id)))
        this.$store.dispatch('numberOfProductsNotValid',this.$store.getters.numberOfProductsNotValid-1)
      }).catch(e => console.log(e))
      console.log(product)
    }
  },
};
</script>