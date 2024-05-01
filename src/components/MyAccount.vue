<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Mon profil</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <header class="profile">
      <div>
        <img class="profile-picture" :src="user.image_url || '/avatar.png'" alt="Votre photo">
      </div>
      <h2 class="welcome">{{ user.carte.prenom }} {{ user.carte.nom }}</h2>
      <p>{{ user.carte.cp }}, {{ user.carte.ville }}</p>
    </header>
    <div class="list-title">
      Mes informations
    </div>
<!--  Faire vérifier l'email si elle ne l'est pas  -->
<!--  https://backoffice.avantagesjeunes.com/api/carte/updateEmail ou updateTel  -->
<!--  email_old & email_new  -->
    <ion-list inset>
      <ion-item>
        <Phone class="icon ion-color-success" v-if="user.carte.tel_accepte"/>
        <Phone class="icon ion-color-danger" v-else/>
        <ion-label>
          <p>Téléphone</p>
          <h2>{{ user.carte.tel || "Non renseigné" }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <Mail class="icon ion-color-success" v-if="user.carte.email_accepte"/>
        <Mail class="icon ion-color-danger" v-else/>
        <ion-label>
          <p>Email</p>
          <h2>{{ user.carte.email|| "Non renseigné" }}</h2>
        </ion-label>
        <BadgeAlert id="verify-email-alert" v-if="!user.carte.email_accepte" slot="end" class="focusable ion-color-danger"/>
        <ion-alert :buttons="verifyEmailButtons" class="ion-color-primary" :sub-header="user.carte.email || 'Non renseigné'" trigger="verify-email-alert" header="Email non vérifiée" message="Votre addresse email n'a pas été vérifiée."/>
      </ion-item>
      <ion-item>
        <Cake class="icon ion-color-secondary"/>
        <ion-label>
          <p>Né le</p>
          <h2>{{ user.carte.date_naiss }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
    <div class="list-title">
      Actions
    </div>
    <ion-list inset>
      <ion-item button @click="logOut()">
        <LogOut class="icon ion-color-danger"/>
        <ion-label>
          <p>Déconnecter ce compte de cet appareil</p>
          <h2>Se déconnecter</h2>
        </ion-label>
      </ion-item>
      <ion-item button @click="createModal(ModifyInterests, 'modalModifyInterests', refs, { user }, true, [0, 0.75, 0.9])">
        <Zap class="icon"/>
        <ion-label>
          <p>Personnalisez vos suggestions</p>
          <h2>Mes centres d'intérêts</h2>
        </ion-label>
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
  IonAlert
} from "@ionic/vue"
import {
  Phone,
  Mail,
  Cake,
  Zap,
  BadgeAlert,
  LogOut
} from "lucide-vue-next"
import ModifyInterests from "@/components/ModifyInterests.vue"
import {logOut} from "@/functions/fetch/account"
</script>

<script lang="ts">
import { createModal } from "@/functions/modals"
import {getAccount} from "@/functions/fetch/account"
import {readableDate} from "@/functions/native/dates"
import {ref} from "vue"

const refs = {
  modalModifyInterests: ref(null)
} as any

window.addEventListener("closeModals", () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
})

export default {
  data () {
    return {
      user: {
        image_url: "",
        carte: {
          prenom: "",
          nom: "",
          date_naiss: "",
          numero: "",
          ville: "",
          cp: "",
          tel: "",
          tel_accepte: false,
          email: "",
          email_accepte: false,
          saison: "",
          date_vente: "",
          valid_datefin: ""
        }
      } as any,
      verifyEmailButtons: [
        {
          text: "Ignorer",
          role: "cancel",
        },
      ],
      refs: refs
    }
  },
  mounted() {
    this.refreshAccount()
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    refreshAccount() {
      getAccount().then(user => {
        this.user = user
        this.user.carte.date_naiss = readableDate(this.user.carte.date_naiss)
      })
    },
    createModal
  },
}
</script>
<style>
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}

.profile p {
  font-weight: 400 !important;
  opacity: 0.5;
  color: var(--ion-text-color) !important;
}

.profile p, .profile h2 {
  margin: 0;
}
</style>
