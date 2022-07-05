<template>
	<div class="page-messages container">
    <h1 class="h3 mt-5">Mes messages</h1>
    <hr>
    <div v-if="conversations.length <= 0">
      <div class="bloc-messagerie row w-100 p-5 mt-3">
        <p>Vous n'avez aucun message</p>
      </div>
    </div>
    <div v-else>
      <div class="bloc-messagerie row w-100 p-5">
        <div class="list-conversations col-md-4">
          <div v-for="(conversationsByProduct, productId) of conversations" :key="conversationsByProduct.id">
            <div v-for="(conversation, otherUser) in conversationsByProduct" :key="conversation.id">
              <div class="item-conversations row p-3" @click="handleClickConversation(conversation, productId, otherUser, conversation[0].userId)">
                <div class="info px-3">
                  <strong><b-icon icon="person-fill"></b-icon> {{ otherUser }}</strong>
                  <p>{{ conversation[0].productName.length > 30 ? conversation[0].productName.substring(0, 29) + "..." : conversation[0].productName }}</p>
                </div>
                <span
                    v-if="conversation.filter((element => !element.isRead && element.reciever == $store.getters.user['@id'].split('/')[2])).length > 0"
                    class="unread-messages"> {{ conversation.filter((element => !element.isRead && element.reciever == $store.getters.user["@id"].split("/")[2])).length }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="list-messages col-md-8">
          <div class="back-conversations" @click="handleBackConversations"><b-icon icon="arrow-left" aria-hidden="true"></b-icon></div>
          <Conversation @refreshConversation="refreshSelectedConversation" :messages="conversationSelected" :productId="productIdSelected" :otherUser="otherUserSelected" :userId="userId"/>
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
      productNameSelected: null,
      otherUserSelected: null,
      userId: null,
      intervalId: null
		};
	},
	mounted() {
    const allPermission = this.$store.getters.allPermission
    if(!allPermission){
      this.$router.push('/')
    }
    this.getConversations()
    this.intervalId = setInterval(this.getConversations, 2000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    getConversations(){
      MessagesService.getConversations(
          this.$store.getters.user.id,localStorage.getItem('token')
      )
          .then((response) => {
            this.conversations = response.data;
          })
          .catch((e) => console.log(e));

      if(this.conversationSelected.length > 0){
        this.conversationSelected = this.conversations[this.productIdSelected][this.otherUserSelected]
        MessagesService.setRead(
            this.userId,
            this.$store.getters.user.id,
            this.productIdSelected,
            localStorage.getItem('token')
        )
      }
    },
    refreshSelectedConversation(text){
       this.conversationSelected.push({
              firstname: this.conversationSelected[0].firstname,
              lastname: this.conversationSelected[0].lastname,
              productId: this.conversationSelected[0].productId,
              productName: this.conversationSelected[0].productName,
              reciever: this.otherUserSelected,
              sender: this.$store.getters.user.id,
              text: text,
              userId: this.userId,
            })
    },
    handleClickConversation(conversation, productId, otherUser, userId) {
      this.conversationSelected = conversation
      this.productIdSelected = productId;
      this.otherUserSelected = otherUser;
      this.userId = userId;

      let width = window.innerWidth;
      if(width < 768) {
        document.getElementsByClassName('list-conversations')[0].style.width = "0px";
        document.getElementsByClassName('list-messages')[0].style.width = "100%";
        document.getElementsByClassName('list-messages')[0].style.padding = "20px";
        document.getElementsByClassName('back-conversations')[0].style.display = "flex";
      }
    },
    handleBackConversations() {
      document.getElementsByClassName('list-conversations')[0].style.width = "100%";
      document.getElementsByClassName('list-messages')[0].style.width = "0%";
      document.getElementsByClassName('list-messages')[0].style.padding = "0px";
      document.getElementsByClassName('list-messages')[0].style.overflow = "hidden";
      document.getElementsByClassName('back-conversations')[0].style.display = "none";
    }
  },
};
</script>
<style scoped>
.unread-messages{
  background-color: red;
  color: white;
  border: black 1px solid;
  display: block;
  float: right;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  text-align: center;
  font-weight: bold;
  font-size: 0.85em;
  line-height: 25px;
}

.back-conversations {
  display: none;
  cursor: pointer;
  padding: 5px;
  font-size: 22px;
  width: 32px;
  height: 32px;
}

.back-conversations:hover {
  background-color: #f0f0f0;
}

.bloc-messagerie {
  background-color: #fff;
  height: 800px;
  max-height: 800px;
}

.list-conversations {
  float: left;
  border-right: 1px solid #e5e5e5;
  max-height: 600px;
  overflow-y: auto;
  padding: 0px;
}

.list-conversations .item-conversations {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
  margin: 0px;
}

.list-conversations .item-conversations:hover {
  background-color: #f5f5f5;
}

.list-conversations .item-conversations .img {
  width: 70px;
  height: 70px;
  overflow: hidden;
}

@media screen and (max-width: 992px) {

  .page-messages {
    max-width: 100%;
  }

  .page-messages h1 {
    font-size: 22px;
  }

  .bloc-messagerie {
    padding: 20px;
    margin: 0px 10px;
    width: auto !important;
  }
  
}

@media screen and (max-width: 768px) {

  .bloc-messagerie {
    padding: 0px !important;
    display: flex;
    flex-wrap: nowrap;
  }

  .list-conversations {
    transition: width 0.2s linear;
    border: none;
    width: 100%;
    height: 600px;
  }

  .item-conversations {
    display: flex;
  }

  .list-messages {
    width: 0%;
    padding: 0px;
    transition: width 0.2s linear;
    /*height: 700px;*/
  }
  
}

@media screen and (max-width: 576px) {

  .page-messages {
    padding: 0px 0px 60px 0px;
  }

  .page-messages h1 {
    font-size: 16px;
    margin: 0px 20px;
  }

  .bloc-messagerie {
    margin: 0px;
    padding: 0px !important;
  }

  .item-conversations {
    border: 1px solid #e5e5e5;
  }

}
</style>

