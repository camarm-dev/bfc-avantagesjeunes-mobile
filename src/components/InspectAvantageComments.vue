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
    <ion-list inset :key="comment.id_comment" v-for="comment in comments" v-if="comments">
      <ion-item>
        <ion-avatar slot="start">
          <ion-nav-link :component="InspectProfile" :component-props="{ id: comment.rid_compte }" router-direction="forward">
            <img style="border-radius: 50%" :src="comment.image_thumb_url.replace('[w]', '40').replace('[h]', '40').replace('[zc]', '1')" :alt="`Photo de profil`">
          </ion-nav-link>
        </ion-avatar>
        <ion-label class="ion-text-wrap">
          <p>{{ readableDate(comment.datetime) }}</p>
          <h6>
            {{ comment.commentaire }}
          </h6>
        </ion-label>
        <Reply slot="end"/>
      </ion-item>
    </ion-list>
    <ion-list inset v-else>
      <ion-item>
        <ion-note>
          Soyez le premier à commenter !
        </ion-note>
      </ion-item>
    </ion-list>
    <ion-note style="display: block" class="ion-padding">
      Cette section est en construction... Vous pourrez bientôt commenter et interagir depuis cette page.
    </ion-note>
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
  IonButtons,
  IonNavLink
} from '@ionic/vue';
import {
  Reply
} from "lucide-vue-next";
import { Comment } from "@/types/avantages";
import {readableDate} from "../functions/native/dates";
import InspectProfile from "@/components/InspectProfile.vue";

const { comments } = defineProps<{
  comments: Comment[] | false
}>()

</script>
