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
      <h2>Confidentialité et Conditions d'Utilisation</h2>
      <p>
        <a href="https://avantagesjeunesconnect.camarm.fr/cgu" target="_blank">Conditions Générales d'Utilisation</a>
        •
        <a href="https://avantagesjeunesconnect.camarm.fr/privacy" target="_blank">Politique de confidentialité</a>
        •
        <a href="https://avantagesjeunesconnect.camarm.fr/usage" target="_blank">Appels aux API publiques</a>
      </p>
      <h2>Licence</h2>
      <p>
        Avantages Jeunes Connect est une application open source sous licence CECILL-2.1<br>
        <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile" target="_blank">Github</a>
        •
        <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/LICENSE" target="_blank">Licence</a>
      </p>
      <h2>Renseignements</h2>
      <p>
        Pour tous renseignements supplémentaires, merci de nous contacter à l'adresse: <a href="mailto:software@camarm.dev">software@camarm.dev</a>
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
