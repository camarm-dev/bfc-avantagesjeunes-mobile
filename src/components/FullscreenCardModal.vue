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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent} from '@ionic/vue'
import { EffectFlip, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue';

const modules = [
  EffectFlip,
  Pagination
]
</script>

<script lang="ts">
export default {
  props: ['front', 'back']
}
</script>
<style>
.card-swiper.fullscreen {
  margin-top: 2em;
}

.fullscreen img {
  height: 100% !important;
  width: auto !important;
}

.fullscreen .swiper-pagination {
  bottom: -2em !important;
}
</style>

