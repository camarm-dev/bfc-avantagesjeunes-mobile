<template>
  <ion-page>
    <UsedAdvantageValidationScreen :avantage="avantage" :backButton="backButton" />
  </ion-page>
</template>
<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
import UsedAdvantageValidationScreen from "@/components/UsedAdvantageValidationScreen.vue"
</script>
<script lang="ts">
import { PropType } from 'vue'
import { TransactionAvantage } from "@/types/avantages";

export default {
  props: {
    avantage: {
      required: true,
      type: Object as PropType<TransactionAvantage>
    },
    backButton: {
      required: false,
      type: Boolean,
      default: true
    }
  }
}
</script>
