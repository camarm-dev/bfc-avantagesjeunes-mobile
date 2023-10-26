<script setup lang="ts">

import InspectAvantage from "@/components/InspectAvantage.vue";
import {IonNavLink, IonSkeletonText} from "@ionic/vue";
</script>

<template>
  <ion-nav-link :component-props="{ avantage: avantage, favori: favori || false, type: type }" router-direction="forward" :component="InspectAvantage">
    <div :class="`card focusable ${type || avantage.type} ${small ? 'small': ''}`">
      <header>
        <img v-if="avantage.image_url" alt="Image de l'avantage" :src="avantage.image_url"/>
        <ion-skeleton-text class="image" v-else :animated="true"></ion-skeleton-text>
      </header>
      <div class="content" v-if="avantage.offre">
        <h3>{{ avantage.offre }}</h3>
        <p>{{ getInnerContent(avantage.conditions) }}</p>
      </div>
      <div class="content" v-else>
        <ion-skeleton-text :animated="true" style="width: 80%; margin-top: 2em;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 100%;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 20%;"></ion-skeleton-text>
      </div>
    </div>
  </ion-nav-link>
</template>

<script lang="ts">
export default {
  props: ['avantage', 'favori', 'type', 'small'],
  methods: {
    getInnerContent(html_string: string) {
      const el = document.createElement('div')
      el.innerHTML = html_string
      return el.innerText
    }
  }
}
</script>

<style scoped>

ion-skeleton-text {
  height: 1em;
  border-radius: 5px;
  --background: rgba(57, 74, 93, 0.7);
  --background-rgb: 57, 74, 93;
}

ion-skeleton-text.image {
  width: 90%;
  height: 140%;
  margin: auto;
  border-radius: 10px;
}
</style>