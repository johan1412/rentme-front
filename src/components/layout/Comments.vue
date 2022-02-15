<template>
    <div class="comments-section">
        <div class="comments-section-header">
            <h4>Commentaires</h4>
            <div class="button-new-comment" @click="formIsVisible = !formIsVisible"><b-icon icon="chat-left-text-fill" aria-hidden="true"></b-icon>{{ formIsVisible ? 'Masquer le formulaire' : 'Ecrire un commentaire' }}</div>
        </div>
        <hr>
        <transition name="fade">
        <div v-if="formIsVisible" class="form-new-comment d-flex">
            <b-textarea v-model="inputComment"></b-textarea>
            <div @click="validateComment" class="button-new-comment-validate">Valider</div>
        </div>
        </transition>
        <div class="comments-list">
            <div v-if="comments.length < 1">
                <p>Il n'y a aucun commentaire</p>
            </div>
            <div class="comment-item" v-for="comment in commentsLocal" :key="comment.id">
                <div class="comment-top">
                    <div><strong>{{ comment.user.firstName }} {{ comment.user.lastName }}</strong> - {{ comment.createdAt }}</div>
                    <div class="comment-rating">{{ comment.rating }}/5</div>
                </div>
                <div class="comment-text">{{ comment.text }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comments",
    props: {
        comments: Array,
    },
    data() {
        return {
            newComment: '',
            formIsVisible: false,
            inputComment: '',
            commentsLocal: [],
        }
    },
    mounted() {
        this.commentsLocal = this.comments;
    },
    methods: {
        validateComment() {
            // fetch(.......).then(data) { let response = ... }
            let response = { id: 15, text: 'petit commentaire de test pour vérifier tout simplement.', createdAt: '01/01/2022', rating: '2.8', user: { id: 24, firstName: 'emile', lastName: 'Roux'} };
            this.commentsLocal.unshift(response);
        }
    }
}
</script>

<style scoped>

.comments-section {
    margin-top: 60px;
}

.comments-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-new-comment {
    background-color: rgb(250, 250, 250);
    padding: 10px;
    border: 1px solid #dddddd;
    cursor: pointer;
}

.button-new-comment .b-icon.bi {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    vertical-align: -5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.form-new-comment {
    transition: all 0.3s ease-in-out;
}

.button-new-comment-validate {
    margin: 0px 20px;
    padding: 10px;
    background-color: #ffffff;
    height: 40px;
    cursor: pointer;
    border: 1px solid #dddddd;
}

.comment-item {
    padding: 20px;
    margin: 10px 0px;
    border-radius: 10px;
    background-color: #ffffff;
}

.comment-top {
    display: flex;
    justify-content: space-between;
}

.comment-top .comment-rating {
    font-size: 130%;
}

</style>