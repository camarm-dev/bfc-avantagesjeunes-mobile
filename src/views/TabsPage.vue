<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar v-if="loggedIn" slot="bottom">
        <ion-tab-button tab="home" href="/resume">
          <ResumeIcon class="icon"/>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <SearchIcon class="icon"/>
        </ion-tab-button>

        <ion-tab-button tab="news" href="/news">
          <NewsIcon class="icon"/>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet } from "@ionic/vue"
import {
  Search as SearchIcon,
  CreditCard as ResumeIcon,
  Newspaper as NewsIcon
} from "lucide-vue-next"
</script>

<script lang="ts">

import {changedVibration, endVibration} from "@/functions/native/tools"
import {getCredentials} from "@/functions/credentials"

export default {
  data() {
    return {
      loggedIn: false as boolean
    }
  },
  mounted() {
    this.updateTheme()
    this.updateLoggedInStatus()
    window.addEventListener("closeModals", () => {
      this.updateTheme()
      endVibration()
      this.updateLoggedInStatus()
    })
    window.addEventListener("reloaded", changedVibration)
  },
  beforeUpdate() {
    this.updateLoggedInStatus()
  },
  methods: {
    updateTheme() {
      const theme = localStorage.getItem("userAppearance")
      theme == "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
    },
    updateLoggedInStatus() {
      getCredentials().then(cards => {
        if (cards.length > 0 && localStorage.getItem("currentCardToken")) {
          this.loggedIn = true
        }
      })
    }
  }
}
</script>

<style scoped>
.icon {
  width: 28px;
  height: 28px;
  margin: 0;
}

ion-tab-button {
  border-top: 2px solid #00000000;
}

ion-tab-button * {
  font-size: 1.3em !important;
}

ion-tab-button.tab-selected {
  border-top: 2px solid var(--ion-color-secondary);
}
</style>
