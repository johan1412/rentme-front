<template>
  <div class="container">
    <div class="row">
      <div class="list-conversations col-3">
        <div v-for="conversationsByProduct, productId of conversations/*.data*/" :key="conversationsByProduct.id">
            <div v-for="conversation, otherUser in conversationsByProduct" :key="conversation.id">
              <h4>{{ otherUser }}</h4>
              <h4>Produit : {{productId}}</h4>
            </div>
        </div>
      </div>
      <div class="conversation-content col-9">
        <Conversation :messages="conversation" />
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
    }
  },
  async mounted() {
    /////////////////////////////////////// POUR TESTER DEBUT
    let conversations = [];
    let conversationsI = [];
    for(let i=0; i < 3; i++) {
      for(let j=0; j < 4; j++) {
        conversationsI.push({ id: 1, text: 'message de test pour vérifier si tout fonctionne bien, merci bien bonne journée', renderId: 1, receiverId: 3, createdAt: '14/02/2022', productId: 5 });
      }
      conversations.push(conversationsI);
    }
    this.conversations = conversations;
    /////////////////////////////////////// FIN
    if (this.$store.getters.user) {
      this.conversations = await MessagesService.getConversations(this.$store.getters.user["@id"].split("/")[2])
    }
  }
};
</script>

<style scoped>
.list-conversations {
  border-right: 1px solid #666666;
}
</style>