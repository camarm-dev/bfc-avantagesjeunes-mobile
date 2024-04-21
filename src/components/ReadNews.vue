<template>
  <ion-header>
    <ion-toolbar>
      <ion-title class="more-pd">{{ article.titre }}</ion-title>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end" @click="shareNews()">
        <ion-icon slot="icon-only" :icon="shareOutline"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content ref="content" :fullscreen="true" class="ion-padding no-top">
    <header class="avantage">
      <div class="image-wrapper">
        <img :src="article.image_url" alt="Couverture de l'article">
      </div>
    </header>
    <ion-header collapse="condense">
      <ion-toolbar class="title-section">
        <h1 class="ion-text-wrap">{{ article.titre }}</h1>
      </ion-toolbar>
    </ion-header>
    <ion-note>
      {{ date_debut }} — {{ date_fin }}
    </ion-note>
    <div class="article-content" v-html="article.contenu"/>
  </ion-content>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonIcon
} from '@ionic/vue';
import {shareOutline} from 'ionicons/icons'
</script>

<script lang="ts">
import {readableDate} from "@/functions/native/dates";
import { Share } from '@capacitor/share'

export default {
  props: [
    'article'
  ],
  data() {
    return {
      date_debut: this.article.date_debut,
      date_fin: this.article.date_fin
    }
  },
  mounted() {
    this.date_debut = readableDate(this.article.date_debut)
    this.date_fin = readableDate(this.article.date_fin)
  },
  methods: {
    async shareNews() {
      const url = `https://www.avantagesjeunes.com/compte/news/${this.article.slug}`
      try {
        await Share.share({
          title: `${this.article.titre}`,
          text: 'J\'ai lu cet article sur Avantages Jeunes Connect !',
          url: url,
          dialogTitle: 'Partager cet article'
        })
      } catch {
        await navigator.clipboard.write(url)
        alert("Lien copié dans le presse papier")
      }
    }
  }
}
</script>
<style scoped>
.image-wrapper img {
  height: 15em;
  max-height: 15em;
  width: 100vw;
  min-width: 100vw;
  object-fit: cover;
}

.image-wrapper::after {
  content: '';
  position: absolute;
  width: 100vw;
  height: 10em;
  background: linear-gradient(var(--ion-color-primary) 10%, #081F3300 100%);
  z-index: 50;
  left: 0;
  top: 9.5em;
  rotate: 180deg;
}

.avantage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
<style>
.article-content a {
  color: var(--ion-color-secondary) !important;
  text-decoration: none !important;
}

.article-content strong, .article-content b {
  font-weight: bold;
}

.article-content img {
  width: 100% !important;
  height: auto !important;
}

.no-top {
  --padding-top: 0px;
}

.title-section {
  height: max-content;
  text-align: left;
}

.title-section h1 {
  font-weight: bold;
  font-size: 30px;
  margin-left: -6px;
}

.more-pd {
  padding-inline: 102px;
}
</style>
