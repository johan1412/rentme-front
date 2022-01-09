<template>
    <footer class="border-top">
        <div class="footer-box">
            <ul>
                <li class="footer-title">Informations pratiques</li>
                <li><router-link to="#" >Info 1</router-link></li>
                <li><router-link to="#" >Info 2</router-link></li>
                <li><router-link to="#" >Info 3</router-link></li>
            </ul>
            <ul>
                <li class="footer-title">Informations légales</li>
                <li><router-link to="#" >Info 1</router-link></li>
                <li><router-link to="#" >Info 2</router-link></li>
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
.footer-box {
  background-color: #ffffff;
  color: #444444;
  display: flex;
  justify-content: center;
  text-align: left;
  padding: 30px 0px 50px 0px;
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
</style>
