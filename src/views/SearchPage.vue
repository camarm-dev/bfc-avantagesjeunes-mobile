<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-searchbar color="tertiary" show-clear-button="always" animated="true" placeholder="Rechercher un avantage"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
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
} from '@ionic/vue';
import {
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
ion-toolbar {
  //padding-top: .5em
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
