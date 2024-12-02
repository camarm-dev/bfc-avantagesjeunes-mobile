<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="rotateLeft()">
            <RotateCcw slot="icon-only" class="ion-color-secondary"/>
          </ion-button>
          <ion-button @click="rotateRight()">
            <RotateCw slot="icon-only" class="ion-color-secondary"/>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button color="danger" @click="abort()">
            <ion-icon slot="icon-only" color="danger" :icon="closeOutline"/>
          </ion-button>
          <ion-button color="success" @click="saveEditedImage()">
            <ion-icon slot="icon-only" color="success" :icon="checkmarkOutline"/>
          </ion-button>
        </ion-buttons>
        <ion-title>Recadre l'image</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <Cropper
          ref="cropper"
          class="cropper"
          :src="base64Image"
          :auto-zoom="true"
          :stencil-props="{
            aspectRatio: 445/280
          }"
          :stencil-size="{
            width: 445,
            height: 280
          }"
      />

      <ion-list inset>
        <ion-note>
          Recadre l'image pour que ta carte tienne dans le rectangle.
        </ion-note>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonIcon, IonNote, IonList, IonButtons, IonButton} from "@ionic/vue"
import {checkmarkOutline, closeOutline} from "ionicons/icons"
import {
  RotateCcw,
  RotateCw
} from "lucide-vue-next"
// @ts-expect-error
import { Cropper } from "vue-advanced-cropper/dist/index.esm-browser"
import { type Cropper as CropperType } from "vue-advanced-cropper"
import "vue-advanced-cropper/dist/style.css"
</script>

<script lang="ts">
export default {
  props: ["base64Image", "event"],
  methods: {
    rotateLeft() {
      (this.$refs.cropper as typeof CropperType).rotate(-90)
    },
    rotateRight() {
      (this.$refs.cropper as typeof CropperType).rotate(90)
    },
    saveEditedImage() {
      const { canvas } = (this.$refs.cropper as typeof CropperType).getResult()
      const editedImageEvent = new CustomEvent(this.event, { detail: { image: canvas.toDataURL() } })
      window.dispatchEvent(editedImageEvent)
      this.abort()
    },
    abort() {
      window.dispatchEvent(new Event("closeResizingModal"))
    }
  }
}
</script>
<style scoped>
.cropper {
  max-height: 80vh;
}
</style>
