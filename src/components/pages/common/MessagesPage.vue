<template>
  <div>
    <div v-for="conversationsByProduct, productId of conversations.data" :key="conversationsByProduct.id">
        <div v-for="conversation, otherUser in conversationsByProduct" :key="conversation.id">
            <h3>productID: {{productId}}</h3>
            <h3>OtherUser: {{otherUser}}</h3>

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
		conversations: []
	}
  },
  async mounted() {
      this.conversations = await MessagesService.getConversations(this.$store.getters.user["@id"].split("/")[2])
  }
};
</script>

