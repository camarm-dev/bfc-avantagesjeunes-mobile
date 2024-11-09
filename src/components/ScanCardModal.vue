<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h3>Scanner ma carte</h3>
      <div class="list-title">
        Progression
      </div>
      <br>
      <ion-list>
        <ion-item lines="none">
          <ion-note slot="start">
            {{ progress * 3 }} / 3
          </ion-note>
          <ion-label>
            <h6>{{ state }}</h6>
            <ion-progress-bar color="secondary" :value="progress"/>
          </ion-label>
        </ion-item>
      </ion-list>
      <br>
      <ion-list>
        <ion-item @click="scanCardFront()" :disabled="frontImageDone" button>
          <Check :class="`icon ion-color-${frontImageDone ? 'secondary': 'medium'}`"/>
          <ion-label>
            <p>Scanner le devant de la carte</p>
            <h3>Capturer la face avant</h3>
          </ion-label>
        </ion-item>
        <ion-item @click="scanCardBack()" button :disabled="!frontImageDone || backImageDone" lines="none">
          <Check :class="`icon ion-color${backImageDone ? 'secondary': 'medium'}`"/>
          <ion-label>
            <p>Scanner le dos de la carte</p>
            <h3>Capturer le dos</h3>
          </ion-label>
        </ion-item>

      </ion-list>
      <br>
      <pulse-item>
        <ion-list>
          <ion-item :detail-icon="checkmarkOutline" :disabled="!(frontImageDone && backImageDone)" color="secondary" button @click="close()">
            Terminer
          </ion-item>
       </ion-list>
      </pulse-item>
      <br>
      <ion-list>
        <ion-note>
          <ion-icon :icon="helpOutline"/>&nbsp;Prends ta carte en photo le plus à plat possible et en évitant les reflets.
        </ion-note>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonItem, IonLabel, IonIcon, IonNote, IonList, IonProgressBar} from "@ionic/vue"
import {Check} from "lucide-vue-next"
import {checkmarkOutline, helpOutline} from "ionicons/icons"
import PulseItem from "@/components/PulseItem.vue"
</script>

<script lang="ts">
import {saveCardImage} from "@/functions/native/camera"
import {displayToast} from "@/functions/toasts"
import {closeModals} from "@/functions/modals"

export default {
  data() {
    return {
      frontImageDone: false,
      backImageDone: false,
      state: "Numérise le devant de ta carte.",
      progress: 0/3
    }
  },
  methods: {
    async scanCardFront() {
      await saveCardImage("frontCardImage", "Ajoute une photo du devant de ta carte et recadre là.", () => {
        this.state = "Numérise le dos de ta carte."
        this.progress = 1/3
        this.frontImageDone = true
      })
    },
    async scanCardBack() {
      await saveCardImage("backCardImage", "Ajoute une photo du dos de ta carte et recadre là.", () => {
        this.state = "Finalise la numérisation."
        this.progress = 2/3
        this.backImageDone = true
      })
    },
    close() {
      this.progress = 3/3
      setTimeout(() => {
        closeModals()
        displayToast("Images enregistrées", "Les photos de ta carte ont bien été modifiées", 3000, "primary")
      }, 500)
    }
  }
}
</script>
<style scoped>
.list-title {
  margin-left: 5px;
}
</style>
