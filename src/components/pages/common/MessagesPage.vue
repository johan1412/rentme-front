<template>
	<div class="page-messages container">
    <h1 class="h3 mt-5">Mes messages</h1>
    <hr><br>
    <div v-if="conversations.length <= 0">
      <div class="bloc-messagerie row w-100 p-5">
        <p class="p-5">Vous n'avez aucun message</p>
      </div>
    </div>
    <div v-else>
      <div class="bloc-messagerie row w-100 p-5">
        <div class="list-conversations col-md-4">
          <div v-for="(conversationsByProduct, productId) of conversations.data" :key="conversationsByProduct.id">
            <div v-for="(conversation, otherUser) in conversationsByProduct" :key="conversation.id">
              <div class="item-conversations row p-3" @click="handleClickConversation(conversation, productId, otherUser)">
                <div class="img">
                  <img src="https://via.placeholder.com/70" alt="">
                </div>
                <div class="info px-3">
                  <h5>{{ otherUser }}</h5>
                  <!--<p>{{ product.title.length < 20 ? product.title : product.title.substring(0, 20) + "..." }}</p>-->
                  <p>Titre de l'annonce {{ productId }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-messages col-md-8">
          <Conversation :messages="conversationSelected" :productId="productIdSelected" :otherUser="otherUserSelected"/>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import Conversation from "../../layout/Conversation.vue";
import MessagesService from "../../../services/MessagesService";

export default {
	components: {
		Conversation,
	},
	name: "MessagesPage",
	data() {
		return {
			conversations: [],
      conversationSelected: [],
      productIdSelected: null,
      otherUserSelected: null,
		};
	},
	mounted() {
		MessagesService.getConversations(
			this.$store.getters.user["@id"].split("/")[2]
		)
    .then((response) => {
      this.conversations = response;
    })
    .catch((e) => console.log(e));
	},
  methods: {
    handleClickConversation(conversation, productId, otherUser) {
      this.conversationSelected = conversation;
      this.productIdSelected = productId;
      this.otherUserSelected = otherUser;
    }
  },
};
</script>
<style scoped>
.bloc-messagerie {
  background-color: #fff;
}

.list-conversations {
  float: left;
  border-right: 1px solid #e5e5e5;
  max-height: 600px;
  overflow-y: scroll;
}

.list-conversations .item-conversations {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
}

.list-conversations .item-conversations:hover {
  background-color: #f5f5f5;
}

.list-conversations .item-conversations .img {
  width: 70px;
  height: 70px;
  overflow: hidden;
}
</style>

