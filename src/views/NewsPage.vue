<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="openInBrowser()">
            <ion-icon slot="icon-only" :icon="globeOutline"/>
          </ion-button>
        </ion-buttons>
        <ion-title>Actualités</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Actualités</ion-title>
          <ion-buttons :collapse="true" slot="end">
            <ion-button>
              <ion-icon slot="icon-only" :icon="newspaperOutline"/>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-note class="ion-padding-start" style="display: block">
        Les dernières actualités Avantages Jeunes.
      </ion-note>
      <br>
      <NewsCard v-if="loading" :loading="loading" :article="{}"/>
      <div v-else v-for="article in news" :key="article.id_actualite">
        <NewsCard :loading="false" :article="article"/>
        <br>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonIcon,
  IonNote,
  IonButtons
} from '@ionic/vue';
import NewsCard from "@/components/NewsCard.vue";
import {globeOutline, informationOutline, newspaperOutline} from "ionicons/icons";
</script>

<script lang="ts">
import {getNews} from "@/functions/fetch/news";

export default {
  data () {
    return {
      news: [] as any[],
      page: 1,
      loading: true
    }
  },
  mounted() {
    this.fetchNews().then(() => {
      this.loading = false
    })
  },
  methods: {
    async fetchNews() {
      this.news = (await getNews(this.page)).results as any[]
      console.log(this.news)
    },
    openInBrowser() {
      window.open('https://www.avantagesjeunes.com/compte/news')
    }
  }
}
</script>
<style>

</style>
