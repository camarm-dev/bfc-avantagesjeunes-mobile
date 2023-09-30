<template>
  <ion-page>
    <ion-header>
      <ion-toolbar  @click="closeModals()">
        <ion-title>
          <ChevronDown class="focusable" @click="closeModals()"/>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="map-wrapper">
        <div ref="mapContainer" class="map-container"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonHeader} from '@ionic/vue'
import { ChevronDown } from 'lucide-vue-next'
import {closeModals} from "@/functions/modals";
</script>

<script lang="ts">
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoiY2FtYXJtLWRldiIsImEiOiJja3B6czl2bGowa2g2Mm5ycmdqMThhOHEzIn0.H-PjLIG_jQqZqvz3gPvjeQ"

export default {
  props: ['markers', 'center', 'zoom'],
  data() {
    return {
      map: {} as mapboxgl.Map,
      fullscreen: false
    }
  },
  mounted() {
    setTimeout(() => {
      const center = this.center || [6.0258598544333974, 47.23521554332734]
      const map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: this.zoom || 9,
        minZoom: 4,
      })

      map.on('load', () => {
        map.addSource('markers', this.markers)
      })


      this.map = map
    }, 500)
  },
  unmounted() {
    this.map.remove()
  }
}
</script>

<style scoped>
.map-wrapper {
  height: 100%;
  width: 100%;
  display: flex
}

.map-container {
  flex: 1
}

.marker {
  background-image: url('/marker.png');
  background-color: red;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>