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
      <div class="top-background"></div>
      <div class="floating">
        <p>{{ welcome_formula }}, {{ user.carte.prenom }}</p>
        <h3>{{ user.carte.total }} avantages utilisés</h3>
        <ion-nav-link router-direction="forward"> <!-- :component="UsedAvantages" -->
          <p class="footer focusable">Tout voir<ChevronRight/></p>
        </ion-nav-link>
      </div>
      <div class="list-title">Suggestions</div>
      <div class="horizontal-carousel">
        <div class="card card-only" v-if="user.suggestions.length <= 0">
          <ion-note>
            Aucun avantage suggéré
          </ion-note>
        </div>
        <ion-nav-link :component-props="{ avantage: suggested, favori: favoris_ids.includes(suggested.id_avantage) }" router-direction="forward" :component="InspectAvantage" v-for="suggested in user.suggestions">
          <div :class="`card focusable ${suggested.type}`">
            <header>
              <img alt="Image de l'avantage" :src="suggested.image_url"/>
            </header>
            <div class="content">
              <h3>{{ suggested.offre }}</h3>
              <p>{{ getInnerContent(suggested.conditions) }}</p>
            </div>
          </div>
        </ion-nav-link>

      </div>
      <div class="list-title">Mes favoris</div>
      <div class="horizontal-carousel">
        <div class="card card-only" v-if="!user.favoris">
          <ion-note>
            Vous n'avez pas d'avantages favoris...
          </ion-note>
        </div>
        <ion-nav-link :component-props="{ avantage: favori, favori: true }" router-direction="forward" :component="InspectAvantage" v-for="favori in user.favoris">
          <div :class="`card focusable ${favori.type}`">
            <header>
              <img alt="Image de l'avantage" :src="favori.image_url"/>
            </header>
            <div class="content">
              <h3>{{ favori.offre }}</h3>
              <p>{{ getInnerContent(favori.conditions) }}</p>
            </div>
          </div>
        </ion-nav-link>
      </div>
      <ion-list inset>
        <ion-item @click="createModal(Map, 'modalMap', refs, {}, true)" button>
          <MapIcon class="icon ion-color-success"/>
          <ion-label>
            <p>Autour de moi</p>
            <h2>Ouvrir la carte</h2>
          </ion-label>
        </ion-item>
      </ion-list>
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

    <ion-content class="ion-display-flex" v-else :fullscreen="true">
      <div>
        <img style="margin: auto; display: block" height="90" src="/welcome.png"/>
        <br>
        <ion-label class="ion-text-center">
          <h1>Bienvenue</h1>
          <h3 class="ion-color-medium">Sur Avantages Jeunes Connect !</h3>
        </ion-label>
        <br>
        <ion-row class="ion-justify-content-center">
          <ion-chip id="open-info-alert" class="chip-square" color="secondary">
            <BadgeInfo size="36" class="ion-color-primary"/>
          </ion-chip>
          <ion-alert class="ion-color-primary" sub-header="avantagesjeunes.com" trigger="open-info-alert" header="Informations" message="Avantages Jeunes Connect est une application non officielle open source développée par un unique étudiant. Nous nous dédommageons de tous dysfonctionnement créé."/>
          <br>
          <ion-chip id="open-question-alert" class="chip-square" color="tertiary">
            <HelpCircle size="36" class="ion-color-tertiary"/>
          </ion-chip>
          <ion-alert class="ion-color-primary" sub-header="avantagesjeunes.com" trigger="open-question-alert" header="Informations" message="Si c'est votre première connexion, merci de finir l'activation de votre compte sur avantagesjeunes.com/login avant de vous connecter sur Avantages Jeunes Connect"/>
        </ion-row>
        <ion-note class="ion-text-center">
          <p>
            Ajouter vos cartes, accédez à vos avantages utilisés et recherchez plus facilement ceux dont vous pouvez bénéficiez !
          </p>
        </ion-note>
        <ion-list inset>
          <ion-item class="login-button" color="secondary" button @click="createModal(LoginModal, 'modalLogin', refs)">
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
  IonItem,
  IonChip,
} from '@ionic/vue';
import {
  BadgeInfo,
  HelpCircle,
  CreditCard,
  MapIcon,
  ChevronRight
} from "lucide-vue-next";
import LoginModal from "@/components/LoginModal.vue";
import AvantagesJeunesIcon from "@/components/AvantagesJeunesIcon.vue";
import MyAccount from "@/components/MyAccount.vue";
import MyCard from "@/components/MyCard.vue";
import { createModal } from "@/functions/modals";
import InspectAvantage from "@/components/InspectAvantage.vue";
import Map from "@/components/Map.vue";
</script>

<script lang="ts">
import { ref } from "vue";
import {getAccount} from "@/functions/fetch/account";
import {getAvantage} from "@/functions/fetch/avantages";

let refs = {
  modalLogin: ref(null),
  modalMap: ref(null)
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
          total: 0,
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
        },
        suggestions: [] as any[],
        favoris: [] as [] || false,
      } as any,
      favoris_ids: [],
      welcome_formula: "Bonjour"
    }
  },
  mounted() {
    window.addEventListener('reload', () => {
      this.refreshAccount()
    })

    refs['page'] = this.$refs.page

    if (localStorage.getItem('userCards') && localStorage.getItem('currentCardToken')) {
      this.loggedIn = true
      this.refreshAccount()
    }

    const now = new Date()
    if (now.getHours() > 12) {
      this.welcome_formula = "Bonne après-midi"
    }
    if (now.getHours() > 18) {
      this.welcome_formula = "Bonne soirée"
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
      getAccount().then(async user => {
        this.user = user
        let suggestionAvantages = []
        for (const suggestion of this.user.suggestions) {
          suggestionAvantages.push(await getAvantage((suggestion.id_avantage)))
        }
        this.user.suggestions = suggestionAvantages

        if (!this.user.favoris) this.user.favoris = []
        this.favoris_ids = this.user.favoris

        let avantagesFavoris = []
        for (const favori of this.user.favoris) {
          avantagesFavoris.push(await getAvantage((favori)))
        }
        this.user.favoris = avantagesFavoris
      }).catch(err => {
        this.loggedIn = false
      })
    },
    getInnerContent(html_string: string) {
      const el = document.createElement('div')
      el.innerHTML = html_string
      return el.innerText
    }
  },
}
</script>
<style>
.login-button ion-label h2 {
  color: var(--ion-color-tertiary) !important;
}

.login-button:hover ion-label h2 {
  color: var(--ion-color-tertiary-tint) !important;
}

.login-button ion-label p {
  color: var(--ion-color-tertiary-tint) !important;
}

.login-button:hover ion-label p {
  color: var(--ion-color-tertiary-contrast) !important;
}

.login-button svg, .login-button svg * {
  color: #fff !important;
}
</style>
