<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Mes avantages</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <div class="top-background purple"></div>
    <div class="floating">
      <p>Retrouvez vos codes et bons ici !</p>
      <h3>{{ total }} avantages utilisés</h3>
    </div>

    <div class="list-title">
      Avantages utilisés
    </div>
    <div class="big-list">
      <div class="card card-only" v-if="avantages.length == 0">
        <ion-note>
          Vous n'avez pas encore utilisé d'avantages...
        </ion-note>
      </div>
      <AvantageCard :expand="true" :avantage="avantage" :type="'green'" :favori="favoris.includes(avantage.avantage_id)" v-for="avantage in avantages"/>
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
} from '@ionic/vue';
import AvantageCard from "@/components/AvantageCard.vue";
</script>

<script lang="ts">
export default {
  props: ['total', 'avantages', 'favoris']
}
</script>
<style>
</style>
