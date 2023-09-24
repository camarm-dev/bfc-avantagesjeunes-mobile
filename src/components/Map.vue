<template>
  <ion-page>
    <ion-content>
      <div class="map-wrapper">
        <div ref="mapContainer" class="map-container"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage} from '@ionic/vue'
</script>

<script lang="ts">
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoiY2FtYXJtLWRldiIsImEiOiJja3B6czl2bGowa2g2Mm5ycmdqMThhOHEzIn0.H-PjLIG_jQqZqvz3gPvjeQ"

export default {
  data() {
    return {
      map: {}
    }
  },
  mounted() {
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [47.23521554332734, 6.0258598544333974],
      zoom: 2,
    })
    this.map._onWindowResize()
    console.log(this.map)
  },
  unmounted() {
    this.map.remove()
  }
}
</script>

<style scoped>
ion-content {
  max-height: 90vh;
}

.map-wrapper {
  display: flex;
  flex: 1;
  position: relative;
  height: 100%;
}

.map-container {
  flex: 1;
  width: 100%;
  height: 100%
}
</style>