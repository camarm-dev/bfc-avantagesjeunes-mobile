<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Commentaires</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <div class="list-title">
      Commentaires
    </div>
    <ion-list inset>
      <ion-item :key="comment.id_comment" v-for="comment in comments" v-if="comments">
        <ion-avatar>
          <img :src="comment.image_thumb_url.replace('[w_]', 'w40').replace('[h_]', 'h40').replace('[zc_]', 'zc1')" :alt="`Photo de profil`">
        </ion-avatar>
        <ion-label class="ion-text-wrap">
          <h6>
            {{ comment.commentaire }}
          </h6>
        </ion-label>
      </ion-item>
      <ion-item v-else>
        <ion-note>
          Soyez le premier à commenter !
        </ion-note>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonLabel,
  IonItem,
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import {
} from "lucide-vue-next";
import { Comment } from "@/types/avantages";

const { comments } = defineProps<{
  comments: Comment[] | false
}>()

</script>
