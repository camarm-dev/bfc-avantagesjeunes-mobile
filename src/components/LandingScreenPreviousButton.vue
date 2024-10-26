<template>
  <ion-button class="previous-button" color="light" fill="clear" @click="swiper.slidePrev()">
    <ion-icon slot="start" :icon="chevronBack"/> {{ text || "Retour" }}
  </ion-button>
</template>

<script lang="ts">
import {
  IonButton, IonIcon
} from "@ionic/vue"
import {useSwiper} from "swiper/vue"
import {chevronBack} from "ionicons/icons"

export default {
  props: {
    text: {
      required: true,
      type: String
    }
  },
  components: {
    IonButton,
    IonIcon
  },
  setup() {
    const swiper = useSwiper()
    return {
      swiper,
      chevronBack
    }
  },
}
</script>
