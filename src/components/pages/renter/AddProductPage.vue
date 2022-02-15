<template>
<div>
    <h1>
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
