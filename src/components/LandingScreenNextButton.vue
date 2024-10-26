<template>
  <ion-button :disabled="disabled" color="secondary" class="gradient-button" fill="clear" expand="full" @click="handleClick()">
    {{ text || "Continuer" }} <ion-icon slot="end" :icon="chevronForward"/>
  </ion-button>
</template>

<script lang="ts">
import {
  IonButton, IonIcon
} from "@ionic/vue"
import {useSwiper} from "swiper/vue"
import {chevronForward} from "ionicons/icons"
import {PropType} from "vue";

type ActionFunction = () => Promise<void>

export default {
  props: {
    text: {
      required: true,
      type: String
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    },
    action: {
      required: false,
      type: Function as PropType<ActionFunction>,
      default: async () => {}
    }
  },
  components: {
    IonButton,
    IonIcon
  },
  methods: {
    handleClick() {
      this.action().then(() => { this.swiper.slideNext() })
    }
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
