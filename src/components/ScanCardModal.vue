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
            <ion-progress-bar color="success" :value="progress"/>
          </ion-label>
        </ion-item>
      </ion-list>
      <br>
      <ion-list>
        <ion-item @click="scanCardFront()" :disabled="frontImageDone" button>
          <Check :class="`icon ion-color-${frontImageDone ? 'success': 'medium'}`"/>
          <ion-label>
            <p>Scanner le devant de la carte</p>
            <h3>Capturer la face avant</h3>
          </ion-label>
        </ion-item>
        <ion-item @click="scanCardBack()" button :disabled="!frontImageDone || backImageDone" lines="none">
          <Check :class="`icon ion-color${backImageDone ? 'success': 'medium'}`"/>
          <ion-label>
            <p>Scanner le dos de la carte</p>
            <h3>Capturer le dos</h3>
          </ion-label>
        </ion-item>

      </ion-list>
      <br>
      <pulse-item>
        <ion-list>
          <ion-item :detail-icon="checkmarkOutline" :disabled="!(frontImageDone && backImageDone)" color="success" button @click="close()">
            Terminer
          </ion-item>
       </ion-list>
      </pulse-item>
      <br>
      <ion-list>
        <ion-note>
          <ion-icon :icon="helpOutline"/>&nbsp;Prenez votre carte en photo le plus à plat possible et en évitant les reflets.
        </ion-note>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonItem, IonLabel, IonIcon, IonNote, IonList, IonProgressBar} from '@ionic/vue'
import {Check} from 'lucide-vue-next';
import {checkmarkOutline, helpOutline} from "ionicons/icons";
import PulseItem from "@/components/PulseItem.vue"
</script>

<script lang="ts">
import {saveCardImage} from "@/functions/native/camera";
import {displayToast} from "@/functions/toasts";
import {closeModals} from "@/functions/modals";

export default {
  data() {
    return {
      frontImageDone: false,
      backImageDone: false,
      state: 'Numérisez le devant de votre carte.',
      progress: 0/3
    }
  },
  methods: {
    async scanCardFront() {
      await saveCardImage('frontCardImage', 'Ajoutez une photo du devant de votre carte et recadrez là.', () => {
        this.state = 'Numérisez le dos de votre carte.'
        this.progress = 1/3
        this.frontImageDone = true
      })
    },
    async scanCardBack() {
      await saveCardImage('backCardImage', 'Ajoutez une photo du dos de votre carte et recadrez là.', () => {
        this.state = 'Finalisez la numérisation.'
        this.progress = 2/3
        this.backImageDone = true
      })
    },
    close() {
      this.progress = 3/3
      setTimeout(() => {
        closeModals()
        displayToast('Images enregistrées', 'Les photos de ta carte ont bien été modifiées', 3000, 'success')
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
