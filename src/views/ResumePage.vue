<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar v-if="loggedIn">
        <ion-label slot="start">
          <p>Bienvenue,</p>
          <h4>{{ user.carte.prenom }}</h4>
        </ion-label>
        <div slot="end" class="focusable">
          <ion-nav-link router-direction="forward" :component="MyAccount">
            <img class="profile-picture small" :src="user.image_url || '/avatar.png'" alt="Votre photo">
          </ion-nav-link>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="loggedIn">
      <div class="floating"></div>
      <ion-list inset>
        <ion-nav-link router-direction="forward" :component="MyCard">
          <ion-item button>
            <CreditCard class="icon"/>
            <ion-label>
              <p>Données</p>
              <h2>Ma carte</h2>
            </ion-label>
          </ion-item>
        </ion-nav-link>
      </ion-list>
    </ion-content>

    <ion-content color="primary" class="ion-display-flex" v-else :fullscreen="true">
      <div>
        <img style="margin: auto; display: block" width="80" src="/neon-icon.png"/>
        <ion-label class="ion-text-center">
          <h1>Bienvenue</h1>
          <h3>Sur Avantages Jeunes Connect !</h3>
        </ion-label>
        <br>
        <ion-row class="ion-justify-content-center">
          <ion-chip id="open-info-alert" class="chip-square" color="secondary">
            <BadgeInfo size="36" class="ion-color-primary"/>
          </ion-chip>
          <ion-alert sub-header="avantagesjeunes.com" trigger="open-info-alert" header="Informations" message="Avantages Jeunes Connect est une application non officielle open source développée par un unique étudiant. Nous nous dédommageons de tous dysfonctionnement créé."/>
          <br>
          <ion-chip id="open-question-alert" class="chip-square" color="tertiary">
            <HelpCircle size="36" class="ion-color-tertiary"/>
          </ion-chip>
          <ion-alert sub-header="avantagesjeunes.com" trigger="open-question-alert" header="Informations" message="Si c'est votre première connexion, merci de finir l'activation de votre compte sur avantagesjeunes.com/login avant de vous connecter sur Avantages Jeunes Connect"/>
        </ion-row>
        <ion-note class="ion-text-center">
          <p>
            Ajouter vos cartes, accédez à vos avantages utilisés et recherchez plus facilement ceux dont vous pouvez bénéficiez !
          </p>
        </ion-note>
        <ion-list inset>
          <ion-item color="secondary" button @click="createModal(LoginModal, 'modalLogin', refs)">
            <AvantagesJeunesIcon class="ion-icon ion-color-primary" slot="start"/>
            <ion-label class="ion-text-wrap">
              <h2>Ajouter ma carte</h2>
              <p>Avec mes identifiants Avantages Jeunes</p>
            </ion-label>
          </ion-item>
        </ion-list>
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
  IonNavLink,
  IonList,
  IonLabel,
  IonItem, IonChip,
} from '@ionic/vue';
import {
  BadgeInfo,
  HelpCircle,
  CreditCard
} from "lucide-vue-next";
import LoginModal from "@/components/LoginModal.vue";
import AvantagesJeunesIcon from "@/components/AvantagesJeunesIcon.vue";
import MyAccount from "@/components/MyAccount.vue";
import MyCard from "@/components/MyCard.vue";
</script>

<script lang="ts">
import { ref } from "vue";
import { createModal } from "@/functions/modals";
import {getAccount} from "@/functions/fetch/account";

let refs = {
  modalLogin: ref(null),
  modalAccount: ref(null)
} as any

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
  window.dispatchEvent(new Event('reload'))
})

export default {
  data () {
    return {
      loggedIn: false,
      refs: refs,
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
    }
  },
  mounted() {
    window.addEventListener('reload', () => {
      this.refreshAccount()
    })

    if (localStorage.getItem('userCards') && localStorage.getItem('currentCardToken')) {
      this.loggedIn = true
      this.refreshAccount()
    }
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
      }).catch(err => {
        this.loggedIn = false
      })
    },
    createModal
  },
}
</script>
