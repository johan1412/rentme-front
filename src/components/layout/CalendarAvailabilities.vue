<template>
    <div class="frame-calendar">
        <form class="form-calendar" action="#" method="post">
            <h4 class="title-form">Disponibiltés</h4>
            <div class="mb-5">Inclure calendrier ici ...</div>
            <button class="submit-button">LOUER</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "CalendarAvailabilities",
    props: {
        product: Object,
    }
}
</script>

<style scoped>
.frame-calendar {
    margin: 50px 0px 50px 50px;
    padding: 40px 50px;
    background-color: #ffffff;
    border-radius: 25px;
}

.form-calendar {
    display: flex;
    flex-direction: column;
}

.title-form {
    text-align: center;
    margin-bottom: 40px;
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