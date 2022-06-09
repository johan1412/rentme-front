<template>
  <div >
    <div
        v-for="(conversationsByProduct, productId) of conversations.data"
        :key="conversationsByProduct.id"
    >
      <div
          v-for="(conversation, otherUser) in conversationsByProduct"
          :key="conversation.id"
      >
        <div class="row">
          <h2>ProductID: {{ productId }}</h2>
          <h2>OtherUser: {{ otherUser }}</h2>
        </div>
        <Conversation :messages="conversation" />
        <input type="text" :id="productId.toString()+'-'+otherUser.toString()" />
        <button
        @click="handleSubmit(productId,otherUser)"
        >Envoyer</button>
      </div>
    </div>
  </div>


</template>
<script>
import Conversation from "../../layout/Conversation.vue";
import MessagesService from "../../../services/MessagesService";
//import { response } from 'express';

export default {
  components: {
    Conversation,
  },
  name: "MessagesPage",
  data() {
    return {
      conversations: [],
      conversationsWithNames: [],
    };
  },
  mounted() {
    MessagesService.getConversations(
        this.$store.getters.user["@id"].split("/")[2]
    ).then(response => {
      console.log(response);
      this.conversations = response;
    }).catch(e => console.log(e));
  },
  methods: {
    handleSubmit(productId,otherUser){
     const text = document.getElementById(productId+'-'+otherUser).value
      MessagesService.postMessage({
        sender:"users/"+this.$store.getters.user["@id"].split("/")[2],
        reciever:"users/"+otherUser,
        text:text
      }).then(
          response => {
            console.log(response);
            MessagesService.getConversations(
                this.$store.getters.user["@id"].split("/")[2]
            ).then(response => {
              console.log(response);
              this.conversations = response;
            }).catch(e => console.log(e));
          }
      ).catch(e => console.log(e));
    }
  }
};
</script>

