<template>
<div class="container">
    <h1 class="h3 mt-5">Creation d'une annonce</h1>
    <hr><br>
    <AddProductForm />
</div>
</template>
<script>
import AddProductForm from '../../form/AddProductForm';

export default {
    components: { 
        AddProductForm
    },
  name: "AddProductPage"
};
</script>
