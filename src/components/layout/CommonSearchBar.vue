<template>
    <div class="searchbar-products">
        <form id="searchInputForm" action="https://vuejs.org/" method="get" >
            <b-form inline>
                <label for="inline-form-input">Rechercher : </label>
                <b-form-input id="inline-form-input" v-model="searchInput" name="words"></b-form-input>
                <b-button type="submit" variant="transparent"><b-icon icon="search" aria-hidden="true"></b-icon></b-button>
            </b-form>
        </form>
    </div>
</template>

<script>
export default {
    name: "CommonSearchBar",
    data() {
        return {
            searchInput: null,
        }
    }
}
</script>

<style>

</style>