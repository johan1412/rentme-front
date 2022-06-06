<template>
<div>
    <h1 class="text-center mt-5">
        Creation d'une annonce
    </h1>
    <AddProductForm />
</div>
</template>
<script>
import AddProductForm from '../../form/AddProductForm'
export default {
    components: { 
        AddProductForm
    },
  name: "AddProductPage"
};
</script>
