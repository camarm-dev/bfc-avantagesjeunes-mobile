<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Ma carte</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <header class="profile">
      <div>
        <img class="card-picture" :src="'/carte.png'" alt="Votre carte">
      </div>
      <ion-chip class="large-chip" color="success" v-if="user.carte.valid">
        <BadgeCheck class="icon ion-color-success" size="30"/>
        {{ user.carte.numero }}
      </ion-chip>

      <ion-chip class="large-chip" color="danger" v-else>
        <BadgeX class="icon ion-color-danger" size="30"/>
        {{ user.carte.numero }}
      </ion-chip>
    </header>
    <div class="list-title">
      Mes informations
    </div>
    <ion-list inset>
      <ion-item>
        <Fingerprint class="icon" />
        <ion-label>
          <p>Numéro</p>
          <h2>{{ user.carte.numero }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <SquareAsterisk class="icon ion-color-success"/>
        <ion-label>
          <p>Saison de validité</p>
          <h2>{{ user.carte.saison }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <ShieldCheck v-if="user.carte.valid" class="icon ion-color-success"/>
        <ShieldClose v-else class="icon ion-color-danger"/>
        <ion-label>
          <p>Valide jusqu'au</p>
          <h2>{{ user.carte.valid_datefin }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <Euro class="icon ion-color-secondary"/>
        <ion-label>
          <p>Achetée le</p>
          <h2>{{ user.carte.date_vente }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-list inset>

    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonLabel,
  IonItem,
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import {
  Fingerprint,
  ShieldCheck,
  ShieldClose,
  SquareAsterisk,
  Euro,
  BadgeCheck,
  BadgeX
} from "lucide-vue-next";
</script>

<script lang="ts">
import { createModal } from "@/functions/modals";
import {getAccount} from "@/functions/fetch/account";
import {readableDate} from "@/functions/native/dates";

export default {
  data () {
    return {
      user: {
        image_url: "",
        carte: {
          cp: "",
          ville: "",
          numero: "",
          saison: "",
          date_vente: "",
          valid_datefin: "",
          valid: false
        }
      } as any,
    }
  },
  mounted() {
    this.refreshAccount()
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    refreshAccount() {
      getAccount().then(user => {
        this.user = user
        this.user.carte.valid_datefin = readableDate(this.user.carte.valid_datefin)
        this.user.carte.date_vente = readableDate(this.user.carte.date_vente)
      })
    },
    createModal
  },
}
</script>
<style>
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}

.profile p {
  font-weight: 400 !important;
  opacity: 0.5;
  color: var(--ion-text-color) !important;
}

.profile p, .profile h2 {
  margin: 0;
}
</style>
