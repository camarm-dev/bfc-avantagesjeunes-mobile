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
      <div :key="avantage.id_avantage" class="action-item" v-for="avantage in avantages">
        <AvantageCard :expand="true" :avantage="avantage" :type="'green'" :used="true" :favori="favoris.includes(avantage.avantage_id)"/>
        <div class="action" @click="copy(avantage.id_transaction)">
          <ClipboardIcon class="bubble-icon"/>
          <p>Copier</p>
        </div>
        <div class="action">
          <ion-nav-link router-direction="forward" :component="InspectUsedAvantage" :component-props="{ avantage: avantage }">
            <Newspaper class="bubble-icon"/>
            <p>Voir</p>
          </ion-nav-link>
        </div>
      </div>
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
  IonNavLink,
  IonNote
} from "@ionic/vue"
import { ClipboardIcon, Newspaper } from "lucide-vue-next"
import AvantageCard from "@/components/AvantageCard.vue"
import InspectUsedAvantage from "@/components/InspectUsedAvantage.vue"
</script>

<script lang="ts">
import {displayToast} from "@/functions/toasts"
import { Clipboard } from "@capacitor/clipboard"

export default {
  props: ["total", "avantages", "favoris"],
  methods: {
    async copy(text: string) {
      try {
        await Clipboard.write({
          string: text.toString(),
          label: "Avantage: identifiant de transaction"
        })
        await displayToast("", "Identifiant de transaction copié !", 3000, "success")
      } catch (e) {
        await displayToast("", `Copie impossible ! ${e} ${text}`, 3000, "danger")
      }
    }
  }
}
</script>
<style>
.action ion-nav-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.action p {
  font-size: .9em;
}
</style>
