<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Organisation</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <header class="profile">
      <div>
        <img class="profile-picture" :src="org.image_url || '/org-avatar.png'" alt="Votre photo">
      </div>
      <h2 class="welcome">{{ org.nom }}</h2>
      <p>{{ org.cp }}, {{ org.commune }}</p>
    </header>
    <div class="list-title">
      Détails
    </div>
    <ion-list inset>
      <ion-item>
        <Milestone class="icon ion-color-tertiary"/>
        <ion-label class="ion-text-wrap">
          <p>Adresse</p>
          <h2>{{ org.cp }}, {{ org.commune }}</h2>
          <p>{{ org.adresse }}</p>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.tel" @click="copy(org.tel)">
        <Phone class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Numéro</p>
          <h2>{{ org.tel }}</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.site" @click="open(org.site)">
        <MousePointer class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Site</p>
          <h2>{{ org.site }}</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.site2" @click="open(org.site2)">
        <MousePointer class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Site Secondaire</p>
          <h2>{{ org.site2 }}</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.facebook" @click="open(org.facebook)">
        <Facebook class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Facebook</p>
          <h2>{{ org.facebook.replace('https://www.facebook.com/', '').replace('https://m.facebook.com/', '').replace('/', '') }}</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.twitter" @click="open(org.twitter)">
        <Twitter class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Twitter</p>
          <h2>{{ org.twitter }}</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.youtube" @click="open(org.youtube)">
        <Youtube class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Youtube</p>
          <h2>{{ org.youtube }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
    <div class="list-title">
      Localisation
    </div>
    <div class="minimap-wrapper">
      <div ref="miniMapContainer" class="minimap-container"/>
    </div>
    <div class="list-title">
      Avantages
    </div>
    <div class="grid-results">
      <AvantageCard :small="true" :used="usedAdvantagesIds.includes(avantage.id_avantage)" :favori="favoris.includes(avantage.id_avantage)" :avantage="avantage" v-for="avantage in avantages"/>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonLabel,
  IonItem,
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import {
  MousePointer,
  Facebook,
  Twitter,
  Youtube,
  Phone, Milestone
} from "lucide-vue-next";
import AvantageCard from "@/components/AvantageCard.vue";
</script>

<script lang="ts">
import {getAvantage, getOrganisme} from "@/functions/fetch/avantages";
import {getAccount} from "@/functions/fetch/account";
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import {Clipboard} from "@capacitor/clipboard";
import {displayToast} from "@/functions/toasts";
mapboxgl.accessToken = "pk.eyJ1IjoiY2FtYXJtLWRldiIsImEiOiJja3B6czl2bGowa2g2Mm5ycmdqMThhOHEzIn0.H-PjLIG_jQqZqvz3gPvjeQ"

export default {
  props: ['id_organisme'],
  data() {
    return {
      org: {
        avantages: []
      } as any,
      avantages: [],
      usedAdvantagesIds: [],
      favoris: [],
    }
  },
  mounted() {
    this.loadOrg().then(() => {
      this.loadAdvantages()
      this.loadUser()
      setTimeout(this.loadMap, 500)
    })
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    async loadOrg() {
      this.org = await getOrganisme(this.id_organisme)
    },
    loadMap() {
      const coords = [this.org.longitude, this.org.latitude]
      const element = this.$refs.miniMapContainer
      console.log(element)
      const map = new mapboxgl.Map({
        container: element,
        style: "mapbox://styles/mapbox/streets-v12",
        center: coords,
        zoom: 10,
        minZoom: 4,
      })
      map.on('load', () => {
        const el = document.createElement('div');
        el.className = 'marker';
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${this.org.nom}</h3><p>${this.org.adresse}</p>`
            )

        new mapboxgl.Marker(el)
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map);
      })
    },
    async loadUser() {
      const user = await getAccount()
      this.favoris = user.favoris
      const usedAdvantagesIds = []
      for (const transaction of user.transactions) {
        usedAdvantagesIds.push(transaction.rid_avantage)
      }
      this.usedAdvantagesIds = usedAdvantagesIds
    },
    async loadAdvantages() {
      for (const avantage_id of this.org.avantages) {
        this.avantages.push(await getAvantage(avantage_id))
      }
    },
    async copy(text: string) {
      try {
        await Clipboard.write({
          string: text.toString()
        })
        await displayToast('', 'Copié dans le presse papier !', 3000, 'success')
      } catch (e) {
        await displayToast('', `Copie impossible ! ${e} ${text}`, 3000, 'danger')
      }
    }
  }
}
</script>
<style>
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}

.profile p {
  font-weight: 400 !important;
  opacity: 0.5;
  color: var(--ion-text-color) !important;
}

.profile p, .profile h2 {
  margin: 0;
}

.profile h2 {
  max-width: 90%;
  text-align: center;
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

.minimap-wrapper {
  background: var(--ion-color-primary-shade);
  margin-inline-start: 16px;
  margin-inline-end: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 10px;
  padding: .9em .8em;
}

.minimap-container {
  border-radius: 10px;
  height: 18em;
  width: 100%;
}

</style>
