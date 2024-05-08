<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Informations</ion-title>
        <ion-buttons slot="end">
          <ion-button color="medium" @click="closeModals()">
            <XCircle/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Avantages Jeunes Connect</h2>
      <p>
        Avantages Jeunes Connect (AJC) est une application alternative au site <a href="https://avantagesjeunes.com" target="_blank">avantagejeunes.com</a> non-officielle, gratuite et open source.
      </p>
      <h2>Mentions légales</h2>
      <p>
        <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/LEGAL.md" target="_blank">Mentions légales</a>
        •
        <a href="https://www.camarm.dev" target="_blank">Développeur</a>
        •
        <a href="https://labse.camarm.fr" target="_blank">Labse Softwares</a>
      </p>
      <h2>Licence</h2>
      <p>
        Avantages Jeunes Connect est une application open source sous licence CECILL-2.1<br>
        <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile" target="_blank">Github</a>
        •
        <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/LICENSE" target="_blank">Licence</a>
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTitle, IonButton, IonPage } from "@ionic/vue"
import { XCircle} from "lucide-vue-next"
import {closeModals} from "@/functions/modals"
</script>

<style scoped>
a {
  color: var(--ion-color-secondary);
  font-weight: bold;
}

a:hover {
  color: var(--ion-color-secondary-shade)
}

</style>
