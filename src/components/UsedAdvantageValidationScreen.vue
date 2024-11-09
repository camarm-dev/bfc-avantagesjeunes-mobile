<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Reçu</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-content class="content">
      <ion-header class="header">
        <img :src="PartnersBanner" alt="Bannière partenaires">
      </ion-header>
      <img style="width: 85%;" :src="Banner" alt="Bannière avantagesjeunes.com">
      <div class="group">
        <h2>Avantage validé</h2>
        <ion-icon color="success" :icon="checkmarkCircleOutline" class="icon ion-color-success"/>
      </div>
      <p>{{ avantage.offre }}</p>
      <p>{{ avantage.organisme.nom }}</p>
      <p>{{ avantage.organisme.adresse }}</p>
      <p>{{ avantage.organisme.cp }} {{ avantage.organisme.commune }}</p>
      <div class="box">
        <h3>Donnez votre avis</h3>
        <StarsRange :note="note" @noteChange="(value) => note = value" :editable="true"/>
        <ion-button @click="sendNote()" size="small" color="secondary">
          Valider
        </ion-button>
      </div>
    </ion-content>
    <ion-item>
      <ion-note class="ion-padding">
        Ce document est un reçu que tu peux montrer au vendeur !
      </ion-note>
    </ion-item>
  </ion-content>
</template>
<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButtons,
  IonIcon,
  IonItem,
  IonButton,
  IonBackButton
} from "@ionic/vue"
import { checkmarkCircleOutline } from "ionicons/icons"
import Banner from "@/assets/banner.png"
import PartnersBanner from "@/assets/partners-banner.png"
import StarsRange from "@/components/StarsRange.vue";
</script>
<script lang="ts">
import "@/theme/globals.css"
import {addNote} from "@/functions/fetch/avantages";
import {PropType} from "vue";
import {TransactionAvantage} from "@/types/avantages";
import {displayToast} from "@/functions/toasts";
export default {
  data() {
    return {
      note: 0,
    }
  },
  props: {
    avantage: {
      required: true,
      type: Object as PropType<TransactionAvantage>
    }
  },
  methods: {
    async sendNote() {
      await addNote(this.avantage.id_avantage, this.note)
      await displayToast('', 'Note ajoutée', 2000, 'primary')
    }
  }
}
</script>
<style>
.content {
  --background: #fff;
  --color: var(--ion-color-dark);
  text-align: center;
}

.group {
  margin-bottom: 2em;
  margin-top: 2em;
}
.group * {
  margin: 0;
}

.header {
  margin-bottom: 2em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 15px 2px;
}

.box {
  padding: .2em .5em .5em;
  text-align: center;
  margin: 1em auto auto;
  width: 85%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.star-range {
  margin: 1em auto;
  scale: 1.5;
}

.star {
  color: var(--ion-color-secondary) !important
}
.star.filled {
  fill: var(--ion-color-secondary) !important
}

p {
  font-size: 0.9em;
  margin: auto;
  max-width: 85%;
  text-align: left;
}

.icon {
  font-size: 53px;
}

h2 {
  font-weight: bold;
}
</style>
