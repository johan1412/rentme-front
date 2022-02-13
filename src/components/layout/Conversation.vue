<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <p v-if="message.senderId == user">Moi : {{ message.text }}</p>
      <p v-else>{{ message.senderId }} : {{ message.text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
      return {
          user : this.$store.getters.user["@id"].split("/")[2]
      }
  },
  props: {
    messages: Array,
  },
  name: "Conversation",
};
</script>
