<template>
  <div class="accordion" role="tablist">
    <div
      v-for="(conversationsByProduct, productId) of conversations.data"
      :key="conversationsByProduct.id"
    >
      <div
        v-for="(conversation, otherUser) in conversationsByProduct"
        :key="conversation.id"
      >
       


        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">
               <h3>productID: {{ productId }}</h3>
               <h3>OtherUser: {{ otherUser }}</h3>
              </b-button
            >
          </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

            <b-card-body>
              <b-card-text
                >
                        <Conversation :messages="conversation" />
                        <input type="text" />
                        <button>Envoyer</button>

                </b-card-text
              >
              
            </b-card-body>
          </b-collapse>
        </b-card>
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
    conversationToggle(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  }
};
</script>

