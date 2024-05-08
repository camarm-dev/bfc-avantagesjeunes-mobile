<script setup lang="ts">
import StarsRange from "@/components/StarsRange.vue"
import {
  IonNote,
  IonButton,
  IonIcon
} from "@ionic/vue"
import {chevronForwardOutline} from "ionicons/icons"
</script>
<template>
  <div class="container">
    <ion-note>Donnez une note à cet avantage:</ion-note>
    <StarsRange :editable="true" :note="currentNote || 0" @noteChange="(value) => note = value" :label="true"/>
    <ion-note v-if="currentNote">Vous avez précédemment noté cet avantage {{ currentNote }} / 5</ion-note>

    <ion-spinner v-if="loading" name="dots"/>
    <ion-button v-else @click="sendNote()" class="ion-margin-vertical" fill="clear" color="light">
      Envoyer
      <ion-icon :icon="chevronForwardOutline"/>
    </ion-button>
  </div>
</template>

<script lang="ts">
import {addNote} from "@/functions/fetch/avantages"

export default {
  props: [
      "currentNote",
      "id_avantage"
  ],
  data() {
    return {
      note: this.currentNote || 0,
      loading: false
    }
  },
  methods: {
    async sendNote() {
      this.loading = true
      await addNote(this.id_avantage, this.note)
      this.closeModal()
    },
    closeModal() {
      window.dispatchEvent(new Event("closeNoteModal"))
    }
  }
}
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
  width: max-content;
}

.container ion-note:first-child {
  margin-bottom: .5em;
  margin-top: 0;
}

.container ion-note {
  margin-top: .5em;
}
</style>
