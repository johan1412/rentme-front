<template>
    <div class="frame-calendar">
        <form class="form-calendar" action="#" method="post">
            <h4 class="title-form">Reservation</h4>
            <div class="mb-4 mt-3">
                <HotelDatePicker v-on:period-selected="dateSelected" v-on:clear-selection="clearDates" :showSingleMonth="showSingleMonth" :disabledDates="disabledDates" :halfDay="halfDay" :minNights="minNights" :hoveringTooltip="hoveringTooltip" />
            </div>
            <div class="date-picker-price mb-2">Total : {{ totalPrice }}€</div>
          <div>
            <stripe-checkout
                ref="checkoutRef"
                :pk="publishableKey"
                :session-id="sessionId"
            />
            <div class="submit-button" @click="submit">LOUER</div>
          </div>
        </form>
    </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker';
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css';
import AuthService from "@/services/AuthService";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    name: "CalendarAvailabilities",
    props: {
        product: Object,
    },
    components: {
        HotelDatePicker,
      StripeCheckout,
    },
    data() {
      this.publishableKey = 'pk_test_51ImJIiH1ST2SneRlcZYRNGSWv9DE5C9SeBkRtEjIcL72hRXM15rrWuViXIn7TibG2SJgjDHyrCWxcqUljDNm2wPn002HVq6LJB';
        return {
          loading: false,
          sessionId: '', // session id from backend
          disabledDates: [],
          halfDay: false,
          minNights: 0,
          hoveringTooltip: false,
          startingDate: '',
          endingDate: '',
          showSingleMonth: true,
          totalPrice: 0,
          productLocal: this.product,
        }
    },
    methods: {
        pad(s) {
          return (s < 10) ? '0' + s : s;
        },
        convertDate(d) {
            return [d.getFullYear(), this.pad(d.getMonth()+1), this.pad(d.getDate())].join('-');
        },
        priceCalcul(startingDate, endingDate) {
            const date1 = new Date(startingDate);
            const date2 = new Date(endingDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
            this.totalPrice = (diffDays * this.product.price).toString();
        },
        dateSelected(e, datein, dateout) {
            this.startingDate = this.convertDate(datein);
            this.endingDate = this.convertDate(dateout);
            let elt = document.getElementsByClassName('vhd__datepicker__input');
            let d1 = datein;
            let d2 = dateout;
            elt[0].innerHTML = [this.pad(d1.getDate()), this.pad(d1.getMonth()+1), d1.getFullYear()].join('-');
            elt[1].innerHTML = [this.pad(d2.getDate()), this.pad(d2.getMonth()+1), d2.getFullYear()].join('-');
            this.priceCalcul(this.startingDate, this.endingDate);
        },
        clearDates() {
            this.startingDate = '';
            this.endingDate = '';
            let elt = document.getElementsByClassName('vhd__datepicker__input');
            elt[0].innerHTML = 'Début';
            elt[1].innerHTML = 'Fin';
        },
      submit () {
        if (this.$store.getters.user){
          AuthService.getSessionIdPayment({...this.product,price:this.totalPrice},this.$store.getters.user)
              .then(response => {
                this.sessionId = response.data.id
                console.log(response.data.id)
              }).catch(e => console.log(e))
          this.$refs.checkoutRef.redirectToCheckout();
        }
      },
    },
    mounted() {
        let elt = document.getElementsByClassName('vhd__datepicker__input');
        elt[0].innerHTML = 'Début';
        elt[1].innerHTML = 'Fin';
        let reservations = this.product.reservations;
        reservations.forEach(reservation => {
            let start = new Date(reservation.rentalBeginDate);
            let end = new Date(reservation.rentalEndDate);
            for(start; start<=end; start.setDate(start.getDate()+1)){
                this.disabledDates.push(this.convertDate(new Date(start)));
            }
        });
    }
}
</script>

<style>
.frame-calendar {
    margin: 50px 0px 50px 50px;
    padding: 40px 50px;
    min-width: 350px;
    background-color: #ffffff;
    border-radius: 25px;
}

.form-calendar {
    display: flex;
    flex-direction: column;
}

.title-form {
    text-align: center;
    margin-bottom: 40px;
}

.submit-button {
    background-color: #0072b5;
    color: #ffffff;
    width: fit-content;
    padding: 5px 30px;
    margin: auto;
    font-weight: bold;
    font-size: 90%;
    border: 1px solid #dddddd;
    cursor:pointer
}
</style>
