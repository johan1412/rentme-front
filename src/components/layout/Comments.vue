<template>
    <div class="comments-section">
        <div class="comments-section-header">
            <h4>Commentaires et notes des clients</h4>
            <div class="button-new-comment" @click="formIsVisible = !formIsVisible"><b-icon icon="chat-left-text-fill" aria-hidden="true"></b-icon>{{ formIsVisible ? 'Masquer le formulaire' : 'Ecrire un commentaire' }}</div>
        </div>
        <hr>
        <transition name="fade">
        <div v-if="formIsVisible" class="form-new-comment d-flex">
            <b-textarea v-model="newComment"></b-textarea>
            <div @click="validateComment" class="button-new-comment-validate">Valider</div>
        </div>
        </transition>
        <div class="comments-list">
            <div v-if="product.comments.length < 1">
                <p>Il n'y a aucun commentaire</p>
            </div>
            <div class="comment-item" v-for="comment in product.comments" :key="comment.id">
                <div class="comment-top">
                    <div><strong :class="comment.user == user ? 'personal-comment' : ''">{{ comment.user.firstName }} {{ comment.user.lastName }}</strong> - {{ comment.createdAt }}</div>
                    <div class="comment-rating">{{ comment.rating ? comment.rating : '-' }}/5</div>
                </div>
                <div class="comment-text">{{ comment.text }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentService from '../../services/CommentService';
import {mapGetters} from "vuex";

export default {
    name: "Comments",
    data() {
        return {
            formIsVisible: false,
            newComment:"",
            hasAlreadyComment : false,
            idComment : null
        }
    },
    computed:{
      ...mapGetters(['user','product'])
    },
  mounted(){
    if (this.user.comments.length !== 0){
      if(this.user.comments.filter(comment => comment.product.id === this.product.id).length !== 0){
        const comment = this.user.comments.filter(comment => comment.product.id === this.product.id)[0]
        this.newComment  = comment.text
      }
    }
  },
    methods: {
        validateComment() {
          if (this.user.comments.length !== 0){
            if(this.user.comments.filter(comment => comment.product.id === this.product.id).length !== 0){
              const comment = this.user.comments.filter(comment => comment.product.id === this.product.id)[0]
              this.hasAlreadyComment = true
              this.idComment = comment.id
            }
          }
          if (!this.hasAlreadyComment){
            CommentService.postComment({
              user : '/users/'+this.user.id,
              text : this.newComment,
              product : '/products/'+this.product.id,
            },localStorage.getItem('token'))
            .then((response) => {
              this.$store.dispatch('user',{...this.user,comments:[...this.user.comments,response.data]})
              this.$store.dispatch('product',{...this.product,comments:[...this.product.comments,response.data]})
              this.$bvToast.toast('Votre commentaire a été enregistré avec succès', {
                title: 'Merci !',
                variant: 'success',
                solid: true,
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000
              })
            }).catch(e => {
                  console.log(e)
                  this.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
                    title: 'Oups !',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    autoHideDelay: 3000
                  })
                })
          }else{
            CommentService.updateComment({
              text: this.newComment,
            },this.idComment,localStorage.getItem('token'))
                .then(response => {
                  this.$store.dispatch('user',{...this.user,comments:this.user.comments.map(comment => comment.id === this.idComment ? {...comment,text:response.data.text} : comment)})
                  this.$store.dispatch('product',{...this.product,comments:this.product.comments.map(comment => comment.id === this.idComment ? {...comment,text:response.data.text} : comment)})
                  this.$bvToast.toast('Votre commentaire a été enregistré avec succès', {
                    title: 'Merci !',
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    autoHideDelay: 3000
                  })
                }).catch(e => {
                  console.log(e)
                  this.$bvToast.toast('Une erreur est survenue, veuillez réessayer', {
                    title: 'Oups !',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-top-full',
                    noAutoHide: true,
                    autoHideDelay: 3000
                  })
                })
          }
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

.button-new-comment:hover {
    border: 1px solid #999999;
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

.personal-comment {
    background-color: #0072b5;
    color: #ffffff;
    padding: 5px 10px;
}

@media screen and (max-width: 992px) {

  .comments-section-header h4 {
    font-size: 20px !important;
  }

  .button-new-comment {
    padding: 7px;
    font-size: 14px;
  }

  .button-new-comment .b-icon.bi {
    height: 15px !important;
    width: 15px !important;
    vertical-align: -3px !important;
  }

  .comments-list p {
    font-size: 14px;
  }
  
}

@media screen and (max-width: 576px) {

  .comments-section-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .comments-section-header h4 {
    font-size: 18px !important;
  }

  .button-new-comment {
    padding: 7px;
    font-size: 12px;
  }
  
}

</style>
