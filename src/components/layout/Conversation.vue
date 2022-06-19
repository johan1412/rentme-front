<template>
	<div class="h-100">
    <div v-if="messages.length > 0 && productId && otherUser" class="h-100">
      <div class="banner-message d-flex justify-content-between align-items-center">
        <h5>{{ otherUser }}</h5>
        <a href="#">Titre de l'annonce</a>
      </div>
      <div class="bloc-messages-zone">
        <div class="only-messages">
          <div v-for="message in messages" :key="message.id">
            <p v-if="message.sender == user" class="own-message">{{ message.text }}</p>
            <p v-else class="other-message">{{ message.text }}</p>
          </div>
        </div>
        <div class="form-area">
          <input type="text" :id="productId.toString() + '-' + otherUser.toString()" placeholder="Entrez votre message ..."/>
          <b-button squared variant="light" @click="handleSubmit(productId, otherUser)">Envoyer</b-button>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center h5 text-center h-100">
      <img src="/images/diverging-arrows.png">
      <p>Selectionnez une conversation<br> pour voir les messages</p>
    </div>
	</div>
</template>
<script>
import MessagesService from "../../services/MessagesService";

export default {
	components: {},
	data() {
		return {
			user: this.$store.getters.user["@id"].split("/")[2],
		};
	},
	props: {
		messages: Array,
    productId: String,
    otherUser: String,
	},
	name: "Conversation",
  methods: {
		handleSubmit(productId, otherUser) {
			const text = document.getElementById(productId + "-" + otherUser).value;
			MessagesService.postMessage({
				sender: "users/" + this.$store.getters.user["@id"].split("/")[2],
				reciever: "users/" + otherUser,
				text: text,
			},localStorage.getItem('token'))
      .then(() => {
        MessagesService.getConversations(
          this.$store.getters.user["@id"].split("/")[2],
            localStorage.getItem('token')
        )
        .then((response) => {
          this.conversations = response;
        })
        .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
		},
	},
};
</script>
<style scoped>
.list-messages img {
  transform: rotateY(180deg);
  height: auto;
  width: 30%;
}

.banner-message {
  padding: 10px;
  border-bottom: 1px solid #b3b3b3;
  height: 50px;
}

.bloc-messages-zone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px);
  max-height: 600px;
}

.bloc-messages-zone .only-messages {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  height: calc(100% - 50px - 50px);
}

.bloc-messages-zone .form-area {
  padding: 30px 0px 0px 0px;
  border-top: 1px solid #b3b3b3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.bloc-messages-zone input {
  padding: 10px;
  border: none;
  border-bottom: 1px solid #c5c5c5;
  width: calc(100% - 100px);
}

.bloc-messages-zone button {
  margin-left: 10px;
  padding: 10px;
  width: 100px;
  border: 1px solid #a5a5a5 !important;
}

.own-message {
  background-color: #4682b4;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 60%;
  float: right;
}

.other-message {
  background-color: #e5e5e5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 60%;
  float: left;
}
</style>
