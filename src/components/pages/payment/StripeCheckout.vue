<template>
  <div>
    <stripe-checkout
        ref="checkoutRef"
        :pk="publishableKey"
        :session-id="sessionId"
    />
    <button @click="submit">Checkout!</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = 'pk_test_51ImJIiH1ST2SneRlcZYRNGSWv9DE5C9SeBkRtEjIcL72hRXM15rrWuViXIn7TibG2SJgjDHyrCWxcqUljDNm2wPn002HVq6LJB';
    return {
      loading: false,
      sessionId: 'cs_test_a1Ee2olpVYJChTPXQeLiG4bPozuXUU43gawsyAtDdS0jiMTr610GufuWaI', // session id from backend
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
