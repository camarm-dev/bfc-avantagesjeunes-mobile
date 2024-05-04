<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Utilisateur</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <header class="profile">
      <div>
        <img class="profile-picture" :src="user.image_url || '/avatar.png'" alt="Photo de profil">
      </div>
      <h2 class="welcome" v-if="user.utiliser_pseudo && user.pseudo">{{ user.pseudo }}</h2>
      <h2 class="welcome" v-if="user.prenom">{{ user.prenom }} {{ user.nom }}</h2>
      <h3 class="welcome" v-if="user.carte">{{ getAge(user.carte.date_naiss) }} ans</h3>
      <p>{{ user.descriptif }}</p>
      <p v-if="user.carte">{{ user.carte.ville }}, {{ user.carte.cp }}</p>
    </header>
    <div class="list-title">
      Détails
    </div>
    <ion-list inset>
      <ion-item>
        <ion-note>
          Rien ici encore !
        </ion-note>
      </ion-item>
    </ion-list>
    <div class="list-title" v-if="user.badges">Badges</div>
    <div class="horizontal-carousel" v-if="user.badges">
      <UserBadge :badge="BADGES[badge.id_badge]" :date="badge.datetime" :key="badge.id_badge" :user="user" v-for="badge in user.badges"/>
    </div>
    <div class="list-title" v-if="user.centres_interet">Centres d'intérêts</div>
    <div class="ion-margin-auto mt-1 carousel-el" v-if="user.centres_interet">
      <ion-chip :key="interest.icon" color="secondary" v-for="interest in interests">
        <Icon :size="9" class="icon small-icon" :name="interest.icon"/>
        {{ interest.nom }}
      </ion-chip>
    </div>
    <div class="list-title">
      Favoris
    </div>
    <div class="horizontal-carousel">
      <div class="card card-only" v-if="!user.favoris || avantages.length == 0">
        <ion-note>
          Pas d'avantage en favori...
        </ion-note>
      </div>
      <AvantageCard :key="favori.id_avantage" :used="usedAdvantagesIds.includes(favori.id_avantage)" :favori="true" :avantage="favori" v-for="favori in avantages"/>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import "@/theme/globals.css"
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonNote,
  IonChip,
  IonItem,
  IonList
} from "@ionic/vue"
import AvantageCard from "@/components/AvantageCard.vue"
import {BADGES} from "@/functions/fetch/badges";
import UserBadge from "@/components/UserBadge.vue";
import Icon from "@/components/Icon.vue";
</script>

<script lang="ts">
import {getAvantage} from "@/functions/fetch/avantages"
import {getAccount, getUser} from "@/functions/fetch/account"
import "mapbox-gl/dist/mapbox-gl.css"
import {Organisme} from "@/types/organismes"
import {Avantage} from "@/types/avantages"
import {Account} from "@/types/account"
import {categories} from "@/functions/interfaces";

export default {
  props: ["id"],
  data() {
    return {
      user: {} as Account,
      org: {} as Organisme,
      avantages: [] as Avantage[],
      interests: [] as { nom: string, icon: string }[],
      usedAdvantagesIds: [] as number[],
      favoris: [] as number[]
    }
  },
  mounted() {
    this.loadUser().then(() => {
      this.loadAdvantages()
      this.loadUsed()
    })
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    async loadUser() {
      this.user = await getUser(this.id)
      for (const interest of this.user.centres_interet) {
        this.interests.push(categories[interest])
      }
    },
    async loadUsed() {
      const account = await getAccount()
      for (const transaction of account.transactions) {
        this.usedAdvantagesIds.push(transaction.rid_avantage)
      }
    },
    async loadAdvantages() {
      this.favoris = this.user.favoris
      for (const avantage_id of this.user.favoris || []) {
        this.avantages.push(await getAvantage(avantage_id))
      }
    },
    getAge(dateString: string) {
      const birth = new Date(dateString)
      const now = new Date()

      let years = (now.getFullYear() - birth.getFullYear());

      if (now.getMonth() < birth.getMonth() || now.getMonth() == birth.getMonth() && now.getDate() < birth.getDate()) {
        years--;
      }
      return years
    }
  }
}
</script>
<style>
.mt-1 {
  margin-top: .5em !important;
  padding-bottom: .2em !important;
  padding-top: .2em !important;
}

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
