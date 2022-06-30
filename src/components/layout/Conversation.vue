<template>
	<div class="frame-messages h-100">
    <div v-if="messages.length > 0 && productId && otherUser" class="h-100">
      <div class="banner-message d-flex align-items-center">
        <h5><router-link :to="'/users/' + userId">{{ otherUser }}</router-link></h5>
        <router-link :to="'/products/' + productId" class="product-link">{{ messages[0].productName }}</router-link>
      </div>
      <div class="bloc-messages-zone">
        <div class="only-messages">
          <div v-for="message in messages" :key="message.id">
            <p v-if="message.sender == user" class="own-message">{{ message.text }}</p>
            <p v-else class="other-message">{{ message.text }}</p>
          </div>
        </div>
        <div class="form-area">
          <input type="text" :id="productId.toString() + '-' + userId.toString()" placeholder="Entrez votre message ..."/>
          <b-button squared variant="light" @click="handleSubmit(productId, userId)">Envoyer</b-button>
        </div>
      </div>
    </div>
    <div v-else class="no-message d-flex justify-content-center align-items-center h5 text-center h-100">
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
      messagesRecieved: this.messages,
		};
	},
	props: {
		messages: Array,
    productId: String,
    otherUser: String,
    userId: Number,
	},
	name: "Conversation",
  methods: {
		handleSubmit(productId, userId) {
			const text = document.getElementById(productId + "-" + userId).value;
			MessagesService.postMessage({
				sender: "users/" + this.$store.getters.user["@id"].split("/")[2],
				reciever: "users/" + this.userId,
				text: text,
        product: 'products/' + productId,
			},localStorage.getItem('token'))
      .then(() => {
        MessagesService.getConversations(
          this.$store.getters.user["@id"].split("/")[2],
            localStorage.getItem('token')
        )
        .then((response) => {
          this.messagesRecieved = response;
        })
        .catch((e) => console.log(e));
        document.getElementById(productId + "-" + userId).value = "";
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

.banner-message h5 {
  border-right: 1px solid #000;
  padding-right: 10px;
  margin-right: 10px;
  margin-bottom: 0px;
}

.banner-message h5 a {
  color:#000;
}

.bloc-messages-zone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 100px);
  max-height: 600px;
}

.product-link {
  color: #000;
  font-size: 18px;
}

.bloc-messages-zone .only-messages {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  height: calc(100% - 100px);
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

@media screen and (max-width: 768px) {

  .no-message {
    display: none !important;
  }

  .banner-message h5 {
    font-size: 16px !important;
  }

  .banner-message .product-link {
    font-size: 14px;
  }

  .frame-messages {
    height: calc(100% - 32px) !important;
  }
  
}

@media screen and (max-width: 576px) {
  
  .bloc-messages-zone {
    font-size: 14px;
  }

  .banner-message h5 {
    font-size: 14px !important;
  }
  
}
</style>
