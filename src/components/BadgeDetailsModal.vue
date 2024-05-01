<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h3>{{ badge.nom }}</h3>
      <div class="list-title">
        Progression
      </div>
      <ion-list>
        <ion-item>
          <ion-note color="light" slot="start">{{ progress }} <span class="ion-color-medium"> / {{ badge.target }}</span></ion-note>
          <ion-label>
            <p>Objectif {{ progressInt > badge.target ? "dépassé": "atteint" }} — {{ `${roundNumber(progressInt / badge.target * 100)}%` }}</p>
            <ion-progress-bar :value="badge.target / progressInt" color="light"/>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <CalendarClock class="icon ion-color-success"/>
          <ion-label class="ion-text-wrap">
            <p>Débloqué le</p>
            <h2>{{ readableDate(date) }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <div class="list-title">
        Description
      </div>
      <ion-list>
        <ion-item lines="none">
          <ion-note class="ion-padding">{{ badge.condition }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonProgressBar, IonNote} from "@ionic/vue"
import {CalendarClock} from "lucide-vue-next"
import {readableDate} from "@/functions/native/dates"
</script>

<script lang="ts">
export default {
  props: [
      "badge",
      "date",
      "user"
  ],
  data() {
    return {
      progress: `${this.badge.target}+`,
      progressInt: this.badge.target
    }
  },
  mounted() {
    this.getProgress()
  },
  methods: {
    getProgress() {
      const category = this.user[this.badge.target_type]
      if (category && this.badge.target_type != 1) {
        this.progress = category.length
        this.progressInt = category.length
      }
    },
    roundNumber(value: number) {
      return Math.round(value)
    }
  }
}
</script>

<style scoped>
ion-list {
  margin-top: 1em;
}

.list-title {
  margin-left: 0.5em;
}

span.ion-color-medium {
  color: var(--ion-color-medium);
  font-size: .9em;
}

ion-progress-bar::part(track) {
  background-color: var(--ion-color-secondary);
  box-shadow: 0 0 2px var(--ion-color-secondary);
}

</style>
