<template>
  <div>
    <gmap-map
        :zoom="10"    
        :center="center"
        style="width:60%; height: 300px; min-width:300px;"
      >
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

export default {
  name: "GoogleMap",
  props: {
    address: String,
  },
  data() {
    return {
      center: { 
        lat: 0,
        lng: 0
      },
      locationMarkers: [],
      existingPlace: null,
      productAddress: '',
    };
  },
  methods: {
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    async callGeocode() {
      let addressEncoded = encodeURI(this.productAddress);
      let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${this.$apiKey}`);
      return response.json();
    }
  },
  async mounted() {
    this.productAddress = this.address;
    let position = await this.callGeocode();
    if (position.status == "OK") {
        let lat = position.results[0].geometry.location.lat;
        let lng = position.results[0].geometry.location.lng;
        let point = {lat: lat, lng: lng};
        this.center = point;
        this.locationMarkers.push({position: {lat: lat, lng: lng}});
    }
  },
};
</script>