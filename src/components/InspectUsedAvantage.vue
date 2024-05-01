<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Résumé</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content ref="content" :fullscreen="true">
    <header class="avantage">
      <div class="image-wrapper">
        <img :src="avantage.image_url || '/no-img.png'" alt="Image de l'avantage">
      </div>
      <h2 class="welcome">{{ avantage.offre }}</h2>
    </header>

    <div class="list-title">
      Informations de la transaction
    </div>
    <ion-list v-if="avantage.conditions != ''" inset>
      <ion-item class="description" v-html="avantage.conditions"/>
    </ion-list>

    <ion-list inset>
      <ion-item>
        <CalendarClock class="icon ion-color-success"/>
        <ion-label class="ion-text-wrap">
          <p>Le</p>
          <h2>{{ readableDate(avantage.date_transaction) }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <ArrowLeftRight class="icon"/>
        <ion-label class="ion-text-wrap">
          <p>Type</p>
          <h2 class="ion-text-capitalize">{{ avantage.type_transaction }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <Ticket class="icon ion-color-secondary"/>
        <ion-label class="ion-text-wrap">
          <p>Identifiant de la transaction</p>
          <h2>{{ avantage.id_transaction }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {readableDate} from "@/functions/native/dates"
import "@/theme/globals.css"
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonLabel,
  IonItem,
  IonButtons,
  IonList,
  IonBackButton
} from "@ionic/vue"
import {
  CalendarClock,
  Ticket,
  ArrowLeftRight
} from "lucide-vue-next"
import {chevronBackOutline} from "ionicons/icons"
export default {
  props: [
    "avantage"
  ],
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonLabel,
    IonItem,
    IonButtons,
    IonList,
    IonBackButton,
    CalendarClock,
    Ticket,
    ArrowLeftRight,
  },
  setup() {
    return {
      chevronBackOutline,
      readableDate
    }
  }
}
</script>
<style>
.avantage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avantage p {
  font-weight: 400 !important;
  opacity: 0.5;
  color: var(--ion-text-color) !important;
}

.avantage h2 {
  margin-left: .5em !important;
  margin-top: -7px !important;
  margin-bottom: 7px !important;
}

.avantage p, .avantage h2 {
  margin: 0;
}

ion-chip {
  padding: 1em
}

.ion-margin-auto {
  margin: auto;
  width: max-content;
}

.description::part(native) {
  display: flex;
  flex-direction: column;
}

.description a {
  color: var(--ion-color-secondary)
}

.image-wrapper img {
  height: 15em;
  max-height: 15em;
  width: 100vw;
  min-width: 100vw;
  object-fit: cover;
}

.image-wrapper::after {
  content: '';
  position: absolute;
  width: 100vw;
  height: 9em;
  background: linear-gradient(var(--ion-color-primary) 10%, #081F3300 100%);
  z-index: 50;
  left: 0;
  top: 9.5em;
  rotate: 180deg;
}

ion-fab.top {
  top: 60px
}

ion-fab-button.small {
  width: 35px;
  height: 35px;
}

.blured::part(background) {
  z-index: 8;
  content: '';
  background-color: var(--ion-color-primary);
}

ion-fab.top {
  right: 5px;
}

.icon.small-icon {
  width: 22px;
  height: 22px;
}

ion-action-sheet {
  --button-background-selected: var(--ion-color-step-150, #fff) !important;
}
</style>
