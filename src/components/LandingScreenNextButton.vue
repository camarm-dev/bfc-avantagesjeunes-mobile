<template>
  <ion-button :disabled="disabled" color="secondary" class="gradient-button" fill="clear" expand="full" @click="swiper.slideNext()">
    {{ text || "Continuer" }} <ion-icon slot="end" :icon="chevronForward"/>
  </ion-button>
</template>

<script lang="ts">
import {
  IonButton, IonIcon
} from "@ionic/vue"
import {useSwiper} from "swiper/vue"
import {chevronForward} from "ionicons/icons"

export default {
  props: [
      "text",
      "disabled"
  ],
  components: {
    IonButton,
    IonIcon
  },
  setup() {
    const swiper = useSwiper()
    return {
      swiper,
      chevronForward
    }
  },
}
</script>
