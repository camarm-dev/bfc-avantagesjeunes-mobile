<template>
  <ion-page>
    <ion-header>
      <ion-toolbar  @click="this.$router.goBack()">
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
import {IonPage, IonHeader, IonContent, IonToolbar, IonTitle} from '@ionic/vue'
import { ChevronDown } from 'lucide-vue-next'
import {closeModals} from "@/functions/modals";
</script>

<script lang="ts">
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
mapboxgl.accessToken = "pk.eyJ1IjoiY2FtYXJtLWRldiIsImEiOiJja3B6czl2bGowa2g2Mm5ycmdqMThhOHEzIn0.H-PjLIG_jQqZqvz3gPvjeQ"

export default {
  props: ['markers', 'center', 'zoom', 'user'],
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
        if (this.markers) {
          for (const feature of this.markers.features) {
            const el = document.createElement('div');
            el.className = 'marker';
            const moreAdvantages = feature.properties.otherAdvantages.length > 0 ? `${feature.properties.otherAdvantages.length} autres avantages disponibles ici`: ''
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>${moreAdvantages}`
                )

            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
          }
        }

        if (this.user) {
          const el = document.createElement('img');
          el.className = 'user';
          el.src = this.user.image

          const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                  `<h3>Moi</h3><p>${this.user.name}</p>`
              )

          new mapboxgl.Marker(el)
              .setLngLat(this.user.coordinates)
              .setPopup(popup)
              .addTo(map);
        }
      })


      this.map = map
    }, 500)
  },
  unmounted() {
    // this.map.remove()
  }
}
</script>

<style>
.map-wrapper {
  height: 100%;
  width: 100%;
  display: flex
}

.map-container {
  flex: 1
}

.user {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--ion-color-primary);
  cursor: pointer;
}

.marker {
  content: url('/marker.png');
  background-size: cover;
  width: 22px;
  cursor: pointer;
  object-fit: fill;
}

.mapboxgl-popup {
  max-width: 150px;
  max-height: 100px;
}

.mapboxgl-popup-content {
  background-color: var(--ion-color-primary);
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  max-width: 250px;
  height: max-content;
  border-radius: 7px;
}

.mapboxgl-popup-content p {
  color: var(--ion-color-medium)
}

.mapboxgl-popup-content h2 {
  margin: 0
}

.mapboxgl-popup-close-button {
  right: 0;
  top: 0;
  background-color: var(--ion-color-primary-tint);
  font-size: 24px;
  padding: 0 2.5px 2.5px;
}

.mapboxgl-popup-close-button:hover {
  background-color: var(--ion-color-primary-shade);
}

.mapboxgl-popup-tip {
  border-top-color: var(--ion-color-primary) !important;
}

.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
  border-right-color: var(--ion-color-primary) !important;
}

.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: var(--ion-color-primary) !important;
}

.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
  border-top-color: var(--ion-color-primary) !important;
}
</style>
