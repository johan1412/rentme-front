<template>
    <div class="frame-form-contact-user">
        <form class="form-contact-user" action="#" method="post">
            <h4 class="title-form">Demande d'informations</h4>
            <div>Message pour <strong>{{ user.firstName }} {{ user.lastName }}</strong></div>
            <textarea class="input-message" type="text" placeholder="Bonjour,"></textarea>
            <button class="submit-button">ENVOYER LE MESSAGE</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "FormContact",
    props: {
        user: Object,
    }
}
</script>

<style scoped>
.frame-form-contact-user {
    margin: 50px 0px 50px 50px;
    padding: 40px 50px;
    background-color: #ffffff;
    border-radius: 25px;
}

.form-contact-user {
    display: flex;
    flex-direction: column;
}

.title-form {
    text-align: center;
    margin-bottom: 40px;
}

.input-message {
    margin-top: 20px;
    margin-bottom: 40px;
    height: 300px;
    border: 1px solid #cccccc;
}

.submit-button {
    background-color: #ea9009;
    color: #ffffff;
    width: fit-content;
    padding: 5px 30px;
    margin: auto;
    font-weight: bold;
    font-size: 90%;
    border: 1px solid #dddddd;
}
</style>