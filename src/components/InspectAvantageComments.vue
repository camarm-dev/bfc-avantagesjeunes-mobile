<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Commentaires</ion-title>
      <ion-progress-bar color="secondary" v-if="loading" type="indeterminate"></ion-progress-bar>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <div class="list-title">
      Commentaires
    </div>
<!-- eslint-disable-next-line   -->
    <ion-list inset :key="comment.id_comment" v-for="comment in dynamicComments" v-if="dynamicComments.length > 0">
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
        <ion-buttons slot="end">
          <ion-button @click="answerTo = comment">
            <Reply slot="icon-only"/>
          </ion-button>
          <ion-button>
            <ThumbsUp slot="icon-only"/>
          </ion-button>
        </ion-buttons>
      </ion-item>
    </ion-list>
    <ion-list inset v-else>
      <ion-item>
        <ion-note>
          Soyez le premier à commenter !
        </ion-note>
      </ion-item>
    </ion-list>
    <ion-list inset>
      <ion-item v-if="answerTo">
        <ion-label class="ion-text-wrap">
          <h3>Répondre à</h3>
        </ion-label>
        <ion-item>
          <ion-avatar slot="start" class="small">
            <img style="border-radius: 50%;" :src="answerTo.image_thumb_url.replace('[w]', '40').replace('[h]', '40').replace('[zc]', '1')" :alt="`Photo de profil`">
          </ion-avatar>
          <ion-label>
            <p>{{ answerTo.commentaire }}</p>
          </ion-label>
        </ion-item>
      </ion-item>
      <ion-item lines="none">
        <ion-textarea @ionChange="commentContent = $event.detail.value" placeholder="Entrez votre commentaire..."/>
      </ion-item>
      <ion-item button :diabled="loading" :detail-icon="sendOutline">
        Envoyer
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import "@/theme/globals.css"
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
  IonNavLink,
  IonProgressBar,
  IonAvatar
} from "@ionic/vue"
import {
  Reply,
  ThumbsUp
} from "lucide-vue-next"
import { Comment } from "@/types/avantages"
import {readableDate} from "@/functions/native/dates"
import InspectProfile from "@/components/InspectProfile.vue"
import {sendOutline} from "ionicons/icons";

const { comments, id_avantage } = defineProps<{
  comments: Comment[] | false,
  id_avantage: number
}>()

</script>
<script lang="ts">
import {addComment, addCommentLike, getAvantage, removeComment} from "@/functions/fetch/avantages";

export default {
  data() {
    return {
      commentContent: '',
      answerTo: null as Comment | null,
      dynamicComments: this.comments || [] as Comment[],
      loading: false
    }
  },
  methods: {
    async reload() {
      this.dynamicComments = (await getAvantage(this.id_avantage, true)).comments as Comment[]
      this.loading = false
    },
    async sendComment() {
      this.loading = true
      await addComment(this.id_avantage, this.commentContent, this.answerTo?.id_comment)
      await this.reload()
      this.commentContent = ''
    },
    async deleteComment(id: string | number) {
      this.loading = true
      await removeComment(this.id_avantage, id)
      await this.reload()
    },
    async likeComment(id: string) {
      this.loading = true
      await addCommentLike(this.id_avantage, id)
      await this.reload()
    }
  }
}
</script>
<style>
ion-avatar.small {
  width: 25px;
  height: 25px;
}
</style>
