<template>
  <div class="container">
    <div id="notfound">
      <div class="error-outer-container">
        <div class="error-inner-container">
          <span class="text-oops">Oups!</span>
          <span class="text-error">Erreur 404 - l'URL demandée n'a pas été trouvée</span>
          <div class="text-light home-button"><a href="/" >Page d'accueil</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Error404",

}
</script>

<style scoped>
.error-outer-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.error-inner-container{
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.text-oops{
  font-size: 9em;
  text-align: center;
}

.text-error{
  font-weight: bold;
  font-size: 1.7em;
  text-align: center;
}

.home-button:hover {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #000000 !important;
}

.home-button:hover a {
  color : #343a40;
}

.home-button a{
  text-decoration: none;
  color: white;
}

.home-button{
  margin-top: 40px;
  background-color: #343a40;
  padding: 12px 30px;
  cursor: pointer;
}

</style>
