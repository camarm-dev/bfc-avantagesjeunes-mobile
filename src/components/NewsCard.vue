<script setup lang="ts">

import {IonNavLink, IonSkeletonText} from "@ionic/vue";
import ReadNews from "@/components/ReadNews.vue";
import PulseItem from "@/components/PulseItem.vue"
</script>

<template>
  <pulse-item>
    <ion-nav-link :component-props="{ article: article }" router-direction="forward" :component="ReadNews">
      <div class="card focusable news full">
        <header>
          <img v-if="article.image_url" alt="Image de l'avantage" :src="article.image_url"/>
          <ion-skeleton-text class="image" v-else :animated="true"></ion-skeleton-text>
        </header>
        <div class="content" v-if="!loading">
          <h3>{{ article.titre }}</h3>
          <p>{{ getInnerContent(article.contenu) }}</p>
        </div>
        <div class="content" v-else>
          <ion-skeleton-text :animated="true" style="width: 80%; margin-top: 2em;"></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 100%;"></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 20%;"></ion-skeleton-text>
        </div>
      </div>
    </ion-nav-link>
  </pulse-item>
</template>

<script lang="ts">
export default {
  props: ['article', 'loading'],
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
