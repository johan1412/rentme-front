<template>
  <div class="container m-auto">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" class="form-control" v-model="name" id="title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="textarea"
          class="form-control"
          v-model="description"
          id="description"
        />
      </div>
      <div class="form-group">
        <label for="price">Prix / Jour (€)</label>
        <input type="number" class="form-control" v-model="price" id="price" />
      </div>
      <div class="form-group">
        <label for="address">Adresse</label>
        <input
          type="text"
          class="form-control"
          v-model="address"
          id="address"
        />
      </div>
      <div class="form-group">
        <label for="category">Catégorie</label>
        <select class="form-control" v-model="category" id="category">
          <option value="2">Test cat2</option>
        </select>
      </div>
      <div class="form-group">
        <label for="photos">Photos</label>
        <input
          type="file"
          class="form-control"
          id="photos"
          ref="file"
          @change="uploadFile"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  name: "AddProductForm",
  data: () => ({
    name: "",
    description: "",
    address: "",
    price: "",
    category: "",
    images: null
  }),
  methods: {
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    handleSubmit: async function () {
      const formData = new FormData();
      formData.append('file', this.Images);
      let image = await AuthService.postImage(formData);
      if(image.data.contentUrl){
      await AuthService.postProduct({
        name: this.name,
        description: this.description,
        address: this.address,
        price: parseInt(this.price),
        category: "/categories/" + this.category,
        user: this.$store.getters.user["@id"],
        files: [
          {path : image.data.contentUrl}
        ]
      });
      this.$router.push("/");}
    },
  },
};
</script>
