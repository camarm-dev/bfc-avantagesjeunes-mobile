<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Paramètres</ion-title>
        <ion-buttons slot="end">
          <ion-button color="medium" @click="closeModals()">
            <XCircle/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="list-title">
        Avantages
      </div>
      <ion-list inset>
        <ion-item class="ion-text-wrap">
          <ion-label>
            <h2>Fonction "Utiliser cet avantage"</h2>
            <p>Utiliser l'avantage depuis l'app</p>
          </ion-label>
        </ion-item>
        <ion-item class="ion-color-danger">
          <ion-label class="ion-color-danger ion-text-wrap">
            <p>
              Cette fonctionnalité étant expérimentale, elle peut causer des problèmes de fonctionnement avec votre compte.
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>Activé</p>
          </ion-label>
          <ion-toggle :checked="useAdvantage" @ionChange="changeUseAdvantageFunctionality($event.detail.checked)" slot="end" color="secondary"></ion-toggle>
        </ion-item>
      </ion-list>
      <div class="list-title">
        API Map & Recherche
      </div>
      <ion-list inset>
        <ion-item>
          <ion-label>
            <p>Validité</p>
          </ion-label>
          <BadgeCheck v-if="validApi && testedApi" class="ion-color-success" slot="end"/>
          <BadgeX v-if="!validApi && testedApi" class="ion-color-danger" slot="end"/>
          <ion-spinner v-if="!testedApi" color="medium" slot="end" name="crescent"></ion-spinner>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>Version</p>
          </ion-label>
          <ion-label v-if="testedApi" slot="end">
            {{ api.version }}
          </ion-label>
          <ion-spinner v-else name="crescent" slot="end" color="medium"></ion-spinner>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>Dataset</p>
          </ion-label>
          <ion-label v-if="testedApi" slot="end">
            {{ api.dataset }}
          </ion-label>
          <ion-spinner v-else name="crescent" slot="end" color="medium"></ion-spinner>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTitle, IonButton, IonList, IonPage, IonToggle } from "@ionic/vue";
import { XCircle, BadgeCheck, BadgeX } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";
import {displayToast} from "@/functions/toasts";

export default {
  data() {
    return {
      apiUrl: 'https://api-ajc.camarm.fr' as any,
      validApi: false,
      testedApi: true,
      useAdvantage: false,
      api: {
        version: 'Aucune',
        dataset: 'Aucun'
      }
    }
  },
  mounted() {
    this.apiUrl = localStorage.getItem('userApiUrl') || 'https://api-ajc.camarm.fr'
    localStorage.setItem('userApiUrl', this.apiUrl)
    this.useAdvantage = (localStorage.getItem('userUseAdvantage') || 'false') == 'true'
    this.checkApi()
  },
  methods: {
    changeUseAdvantageFunctionality(value: boolean) {
      this.useAdvantage = value
      localStorage.setItem('userUseAdvantage', JSON.stringify(this.useAdvantage))
    },
    async checkApi() {
      this.testedApi = false
      try {
        await fetch(this.apiUrl).then(resp => resp.json()).then(resp => {
          this.api = resp
          this.validApi = true
        }).catch(e => {
          this.validApi = false
        })
      } catch {
        this.validApi = false
      }
      this.testedApi = true
    },
    closeModals
  }
}
</script>
<style>
ion-toggle::part(track) {
  border-width: 0.55px;
  border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));
  border-style: solid;
  box-sizing: border-box;
}
</style>
