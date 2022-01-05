<template>
  <div id="banner">
    <div>
      <p class="banner-text banner-text-big">
        LOCATION DE PARTICULIER À PARTICULIER
      </p>
      <p class="banner-text banner-text-small">
        Trouver le matériel qu'il vous faut au plus proche de chez vous
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Banner",
};
</script>
<style scoped>
#banner {
  height: 550px;
  width: 98%;
  background-image: url("../../../public/images/banner.jpg");
  background-size: cover;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-text {
  color: #ffffff;
  text-align: center;
}

.banner-text-big {
  font-size: 2.5em;
  font-weight: bold;
}

.banner-text-small {
  font-size: 1.8em;
}
</style>