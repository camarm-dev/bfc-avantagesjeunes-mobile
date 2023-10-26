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
      <div class="action-item" v-for="avantage in avantages">
        <AvantageCard :expand="true" :avantage="avantage" :type="'green'" :favori="favoris.includes(avantage.avantage_id)"/>
        <div class="action">
          <Clipboard class="bubble-icon"/>
          <p>Copier</p>
        </div>
        <div class="action">
          <Newspaper class="bubble-icon"/>
          <p>Voir</p>
        </div>
      </div>
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
import { Clipboard, Newspaper } from "lucide-vue-next";
import AvantageCard from "@/components/AvantageCard.vue";
</script>

<script lang="ts">
export default {
  props: ['total', 'avantages', 'favoris']
}
</script>
<style>
</style>
