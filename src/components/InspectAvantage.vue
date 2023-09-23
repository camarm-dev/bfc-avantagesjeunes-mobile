<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Avantage</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <header class="avantage">
      <div class="image-wrapper">
        <img :src="avantage.image_url" alt="Image de l'avantage">
      </div>
      <h2 class="welcome">{{ avantage.offre }}</h2>
      <p>
        -
        <span v-for="secteur in avantage.secteurs">{{ secteurs[secteur].nom || 'Tout les secteurs' }} -</span>
      </p>
    </header>
    <div class="ion-margin-auto">
      <ion-chip color="light">
        <Star size="10" class="icon ion-color-warning"/>
        {{ avantage.note }} / 5 ({{ avantage.nb_note }} avis)
      </ion-chip>
      <ion-chip :class="avantage.type" color="secondary" v-for="category in avantage.categories">
        <Icon size="10" class="icon" :name="categories[category].icon"/>
        {{ categories[category].nom }}
      </ion-chip>
    </div>
    <div class="list-title">
      Informations de l'avantage
    </div>
    <ion-list inset>
      <ion-item class="description" v-html="avantage.conditions"/>
    </ion-list>

    <ion-list inset>
      <ion-item>
        <CalendarClock class="icon ion-color-success"/>
        <ion-label class="ion-text-wrap">
          <p>Du</p>
          <h2>{{ readableDate(avantage.datedebut) }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <CalendarX class="icon ion-color-danger"/>
        <ion-label class="ion-text-wrap">
          <p>Au</p>
          <h2>{{ readableDate(avantage.datefin) }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-list inset>
      <ion-item>
        <Sparkles class="icon ion-color-warning"/>
        <ion-label>
          <p>Type d'avantage</p>
          <h2 class="ion-text-capitalize">{{ avantage.type }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <SquareAsterisk class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Saison de validité</p>
          <h2 class="ion-text-capitalize">{{ avantage.saison }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>

    <div class="list-title">
      Avantage par
    </div>
    <ion-list inset v-for="org in avantage.organismes">
      <ion-item>
        <Building2 class="icon"/>
        <ion-label class="ion-text-wrap">
          <p>Organisation</p>
          <h2>{{ org.nom }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <Milestone class="icon ion-color-tertiary"/>
        <ion-label class="ion-text-wrap">
          <p>Adresse</p>
          <h2>{{ org.cp }}, {{ org.commune }}</h2>
          <p>{{ org.adresse }}</p>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.site" @click="open(org.site)">
        <MousePointer class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Site</p>
          <h2>{{ org.site }}</h2>
        </ion-label>
      </ion-item>
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
  IonLabel,
  IonItem,
  IonBackButton,
  IonButtons,
} from '@ionic/vue';
import {
  CalendarClock,
  Sparkles,
  CalendarX,
  Star,
  SquareAsterisk,
  Milestone,
  Building2,
  MousePointer
} from "lucide-vue-next";
import {categories, secteurs} from "../functions/interfaces";
import Icon from "@/components/Icon.vue";
</script>

<script lang="ts">
import {readableDate} from "@/functions/native/dates";

export default {
  props: ['avantage'],
  methods: {
    open(url: string) {
      window.open(url)
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
  background: linear-gradient(var(--ion-color-primary) 10%, #081F3300 112%);
  z-index: 50;
  left: 0;
  top: 9.5em;
  rotate: 180deg;
}
</style>
