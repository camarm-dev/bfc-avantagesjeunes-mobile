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
          <ion-button color="light" @click="answerTo = comment">
            <Reply slot="icon-only"/>
          </ion-button>
          <ion-button color="light" @click="removeLike(comment.id_comment)" v-if="comment.likesIdCompte ? comment.likesIdCompte.includes(userId): false">
            <ThumbsUp class="filled-like" slot="icon-only"/>
          </ion-button>
          <ion-button @click="likeComment(comment.id_comment)" color="light" v-else>
            <ThumbsUp slot="icon-only"/>
          </ion-button>
          <ion-button @click="deleteComment(comment.id_comment)" color="danger" v-if="comment.rid_compte == userId">
            <Trash slot="icon-only"/>
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
        <ion-item lines="none">
          <ion-avatar slot="start" class="small">
            <img style="border-radius: 50%;" :src="answerTo.image_thumb_url.replace('[w]', '40').replace('[h]', '40').replace('[zc]', '1')" :alt="`Photo de profil`">
          </ion-avatar>
          <ion-label class="mw-1">
            <p>{{ answerTo.commentaire }}</p>
          </ion-label>
        </ion-item>
        <X @click="answerTo = null"/>
      </ion-item>
      <ion-item lines="none">
        <ion-textarea :auto-grow="true" :disabled="loading" :value="commentContent" @input="commentContent = $event.target.value as string" placeholder="Entrez votre commentaire...">

        </ion-textarea>
      </ion-item>
      <ion-item @click="sendComment()" button :disabled="loading || commentContent.length === 0" :detail-icon="sendOutline">
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
  IonLabel,
  IonItem,
  IonList,
  IonBackButton,
  IonButtons,
  IonNavLink,
  IonProgressBar,
  IonAvatar,
  IonNote,
  IonButton,
  IonTextarea
} from "@ionic/vue"
import {
  Reply,
  ThumbsUp,
  Trash,
  X
} from "lucide-vue-next"
import { Comment } from "@/types/avantages"
import {readableDate} from "@/functions/native/dates"
import InspectProfile from "@/components/InspectProfile.vue"
import {sendOutline} from "ionicons/icons"

// eslint-disable-next-line
const { comments, id_avantage } = defineProps<{
  comments: Comment[] | false,
  id_avantage: number
}>()

</script>
<script lang="ts">
import {addComment, addCommentLike, getAvantage, removeComment, removeCommentLike} from "@/functions/fetch/avantages"

export default {
  data() {
    return {
      commentContent: "" as string,
      answerTo: null as Comment | null,
      dynamicComments: this.comments || [] as Comment[],
      loading: false,
      userId: Number(localStorage.getItem("currentCardId"))
    }
  },
  mounted() {
    this.reload()
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
      this.commentContent = ""
      this.answerTo = null
    },
    async deleteComment(id: string | number) {
      this.loading = true
      await removeComment(this.id_avantage, id)
      await this.reload()
    },
    async likeComment(id: string | number) {
      this.loading = true
      await addCommentLike(this.id_avantage, id)
      await this.reload()
    },
    async removeLike(id: string | number) {
      this.loading = true
      await removeCommentLike(this.id_avantage, id)
      await this.reload()
    }
  }
}
</script>
<style>
ion-avatar.small {
  width: 25px;
  height: 25px;
  margin-right: 6px;
}

.mw-1 {
  max-width: 7.5em;
}

.filled-like {
  fill: currentColor;
}

.filled-like path:first-child {
  fill: transparent;
  stroke: transparent;
}
</style>
