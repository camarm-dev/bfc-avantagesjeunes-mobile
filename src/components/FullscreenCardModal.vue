<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="card-swiper fullscreen">
        <swiper :flip-effect="{ slideShadows: false }" :pagination="{ enabled: true, clickable: true, type: 'bullets' }" :modules="modules" :loop="true" effect="flip" :slide-per-view="1">
          <swiper-slide>
            <img height="400" class="card-picture" :src="front" alt="Votre carte">
          </swiper-slide>
          <swiper-slide>
            <img height="400" class="card-picture" :src="back" alt="Votre carte">
          </swiper-slide>
        </swiper>
      </div>
      <ion-item color="black" lines="none">
        <SunDim slot="start"/>
        <ion-label>
          <ion-range :value="brightness * 100" @ionChange="setBrightness($event.detail.value)"/>
        </ion-label>
        <Sun slot="end"/>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonRange, IonItem, IonLabel} from '@ionic/vue'
import { EffectFlip, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Sun, SunDim } from "lucide-vue-next";

const modules = [
  EffectFlip,
  Pagination
]
</script>

<script lang="ts">
import { ScreenBrightness } from '@capacitor-community/screen-brightness';

export default {
  props: ['front', 'back'],
  data() {
    return {
      brightness: 0.5
    }
  },
  mounted() {
    this.getBrightness().then(value => {
      this.brightness = value
    })
  },
  methods: {
    async getBrightness() {
      const { brightness } = await ScreenBrightness.getBrightness()
      return brightness
    },
    async setBrightness(value: number) {
      await ScreenBrightness.setBrightness({ brightness: value / 100 })
      this.brightness = value / 100
      console.log(this.brightness)
    }
  }
}
</script>
<style>
.card-swiper.fullscreen {
  margin-top: 2em;
}

.fullscreen img {
  height: 100% !important;
  max-height: 450px !important;
  width: auto !important;
}

.fullscreen .swiper-pagination {
  bottom: -2em !important;
}

ion-range {
  --bar-background: var(--ion-color-medium);
  --bar-background-active: var(--ion-color-secondary);
}
</style>

