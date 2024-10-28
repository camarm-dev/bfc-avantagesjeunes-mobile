<template>
  <ion-page>
    <ion-header>
      <ion-toolbar @click="closeModals()">
        <ion-title>
          <ChevronDown class="focusable" @click="closeModals()"/>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="map-wrapper">
        <MapboxMap
            class="map-container"
            map-style="mapbox://styles/mapbox/streets-v12"
            access-token="pk.eyJ1IjoiY2FtYXJtLWRldiIsImEiOiJja3B6czl2bGowa2g2Mm5ycmdqMThhOHEzIn0.H-PjLIG_jQqZqvz3gPvjeQ"
            :center="center || [6.0258598544333974, 47.23521554332734]"
            :zoom="zoom || 9"
            :minZoom="4"
        >
          <MapboxMarker :key="marker.properties.id" v-for="marker in markers.features" :lng-lat="marker.geometry.coordinates">
            <div class="marker"></div>
            <template v-slot:popup>
              <h3>{{ marker.properties.title }}</h3>
              <p v-html="marker.properties.description"></p>
              <span v-if="marker.properties.otherAdvantages.length > 0">{{ marker.properties.otherAdvantages.length }} autres avantages disponibles ici</span>
              <ion-nav-link :key="organisme.id_organisme" v-for="organisme in marker.properties.organismes" router-direction="forward" :component="InspectOrganisme" :component-props="{ id_organisme: organisme.id_organisme }">
                <ion-button size="small" expand="full" color="secondary" class="gradient-button ion-no-margin">Tout voir <ion-icon :icon="chevronForwardOutline"/></ion-button>
              </ion-nav-link>
            </template>
          </MapboxMarker>
          <MapboxMarker v-if="user" :lng-lat="user.coordinates">
            <img :src="user.image" alt="Vous" class="user">
            <template v-slot:popup>
              <h3>Moi</h3>
              <p>{{ user.name }}</p>
            </template>
          </MapboxMarker>
        </MapboxMap>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonNavLink, IonIcon} from "@ionic/vue"
import { ChevronDown } from "lucide-vue-next"
import {closeModals} from "@/functions/modals"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import InspectOrganisme from "@/components/InspectOrganisme.vue"
import {chevronForwardOutline} from "ionicons/icons";
</script>

<script lang="ts">
export default {
  props: ["markers", "center", "zoom", "user"],
  data() {
    return {
      fullscreen: false
    }
  },
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

.ion-no-margin {
  margin: 0 !important;
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
