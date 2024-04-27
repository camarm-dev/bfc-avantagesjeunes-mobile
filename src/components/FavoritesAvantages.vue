<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Mes favoris</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <div class="top-background red"></div>
    <div class="floating">
      <p>Retrouvez vos avantages favoris !</p>
      <h3>{{ avantages.length }} avantages favoris</h3>
    </div>

    <div class="list-title">
      Avantages favoris
    </div>
    <div class="card card-only" v-if="avantages.length == 0">
      <ion-note>
        Vous n'avez pas encore utilisé d'avantages...
      </ion-note>
    </div>
    <div v-else class="grid-results">
      <pulse-item v-for="avantage in avantages" :key="avantage.id_avantage">
        <AvantageCard type="heart" :small="true" :avantage="avantage" :favori="true" :used="used.includes(avantage.id_avantage)"/>
      </pulse-item>
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
  IonBackButton,
  IonButtons,
  IonNote
} from '@ionic/vue';
import AvantageCard from "@/components/AvantageCard.vue";
import PulseItem from "@/components/PulseItem.vue";
</script>

<script lang="ts">
export default {
  props: ['avantages', 'used'],
}
</script>
