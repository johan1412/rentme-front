<template>
    <footer>
        <div class="footer-box">
            <ul>
                <li class="footer-title">Informations pratiques</li>
                <li><router-link to="#" >Nous contacter</router-link></li>
                <li><router-link to="#" >Le concept</router-link></li>
                <li><router-link to="#" >FAQ</router-link></li>
            </ul>
            <ul>
                <li class="footer-title">Informations légales</li>
                <li><router-link to="/conditions-generales-utilisation" >Conditions Générales d'Utilisation</router-link></li>
                <li><router-link to="/conditions-generales-vente" >Conditions Générales de Vente</router-link></li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>

footer {
  margin-top: auto;
}

.footer-box {
  background-color: #ffffff;
  color: #444444;
  display: flex;
  justify-content: center;
  text-align: left;
  padding: 30px 0px 50px 0px;
  margin-top: 50px;
  margin-bottom: 0px;
}

.footer-box ul {
  list-style: none;
  margin: 0px 40px;
}

.footer-title {
  font-size: 150%;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-box ul a {
  color: #555555;
  text-decoration: none;
}

@media screen and (max-width: 768px) {

  .footer-box {
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px 20px 0px;
  }

  .footer-box ul {
    margin: 10px 0px;
    padding: 0px;
    text-align: center;
  }

  .footer-box .footer-title {
    font-size: 18px;
  }

}
</style>
