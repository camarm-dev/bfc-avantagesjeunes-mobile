<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-searchbar show-clear-button="always" :animated="true" placeholder="Rechercher un avantage"></ion-searchbar>
      </ion-toolbar>
      <ion-toolbar style="height: max-content">
        <ion-list inset class="list-border">
          <ion-accordion-group>
            <ion-accordion value="first">
              <ion-item slot="header">
                <Settings2 slot="start" class="ion-color-medium"/>
                <ion-label>Filtres</ion-label>
              </ion-item>
              <ion-list slot="content">
                <ion-item>
                  <ion-label>
                    <p>Rubrique</p>
                  </ion-label>
                  <ion-select interface="action-sheet" :interface-options="{ color: 'primary' }" placeholder="Toutes" value="all">
                    <ion-select-option value="all">Toutes</ion-select-option>
                    <ion-select-option>Cinéma</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>Secteur</p>
                  </ion-label>
                  <ion-select interface="action-sheet" placeholder="Toutes" value="all">
                    <ion-select-option value="all">Tous</ion-select-option>
                    <ion-select-option>Besancon</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
        </ion-list>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-content>

      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel
} from '@ionic/vue';
import {
  Settings2
} from "lucide-vue-next";
</script>

<script lang="ts">
import {getAccount} from "@/functions/fetch/account";
import {getAvantage} from "@/functions/fetch/avantages";
import {Avantage} from "@/functions/interfaces";

export default {
  data () {
    return {
      avantages: [] as Avantage[],
    }
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    getInnerContent(html_string: string) {
      const el = document.createElement('div')
      el.innerHTML = html_string
      return el.innerText
    }
  },
}
</script>
<style>
ion-header {
  height: max-content;
}

.list-border {
  border-width: 0.55px;
  border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));
  border-style: solid;
}

ion-item-divider {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-end: 5px
}

ion-toolbar .sc-ion-searchbar-ios-h {
  padding-top: 15px;
  --background: var(--ion-color-tertiary);
  --color: var(--ion-color-tertiary-contrast);
  color: var(--color) !important;
}

ion-toolbar .sc-ion-searchbar-ios-h.ion-color-tertiary * {
  --color: var(--ion-color-tertiary-contrast);
  color: var(--color) !important;
}
</style>
