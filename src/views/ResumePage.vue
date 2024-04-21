<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar v-if="loggedIn">
        <ion-avatar slot="start">
          <img src="/icon-foreground.png" alt="Logo AJC">
        </ion-avatar>
        <div slot="end" class="focusable">
          <ion-nav-link router-direction="forward" :component="MyAccount">
            <img class="profile-picture small" :src="user.image_url || '/avatar.png'" alt="Votre photo">
          </ion-nav-link>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="loggedIn">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="top-background"></div>
      <div class="floating">
        <p>{{ welcome_formula }}, {{ user.carte.prenom }}</p>
        <h3>{{ usedAdvantages.length }} avantages utilisés</h3>
        <ion-nav-link router-direction="forward" :component="UsedAvantages" :component-props="{ total: usedAdvantages.length, avantages: usedAdvantages, favoris: favoris_ids }">
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
        <AvantageCard :used="usedAdvantagesIds.includes(suggested.id_avantage)" :favori="favoris_ids.includes(suggested.id_avantage)" :avantage="suggested" v-for="suggested in user.suggestions"/>
      </div>
      <div class="list-title">Mes favoris</div>
      <div class="horizontal-carousel">
        <div class="card card-only" v-if="!user.favoris || user.favoris.length == 0">
          <ion-note>
            Vous n'avez pas d'avantages favoris...
          </ion-note>
        </div>
        <AvantageCard :used="usedAdvantagesIds.includes(favori.id_avantage)" :favori="true" :avantage="favori" v-for="favori in user.favoris"/>
      </div>

      <ion-list inset v-if="!position">
        <ion-item @click="askPermission().then(refreshPosition)" color="danger">
          <Compass size="64" class="icon-ion-color-light"/>
          <ion-note class="ion-padding" color="light">
            Activez la localisation en cliquant ici. Vous pourrez voir les avantages autour de vous.
          </ion-note>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item @click="openAroundMeMap()" button>
          <MapIcon class="icon ion-color-success"/>
          <ion-label>
            <p>Autour de moi</p>
            <h2>Ouvrir la carte</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>
              <ion-spinner class="small" name="crescent" v-if="aroundMeLoading"></ion-spinner>
              <span v-else>{{ aroundMeAdvantages.count }}</span>
               avantages autour de moi.
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>
              Rayon de
            </p>
          </ion-label>
          <ion-select interface="popover" @ionChange="getAroundMeAdvantages($event.detail.value)" value="1">
            <ion-select-option value="1">1 Km</ion-select-option>
            <ion-select-option value="5">5 Km</ion-select-option>
            <ion-select-option value="10">10 Km</ion-select-option>
            <ion-select-option value="50">50 Km</ion-select-option>
          </ion-select>
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
      <ion-list inset>
        <ion-item button @click="createModal(ExperimentalModal, 'modalExperimental', refs)">
          <ion-label>
            <p>Fonctionnalités expérimentales 🧪</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list inset>
        <ion-item button :detail-icon="informationCircle" @click="createModal(LegalModal, 'modalInfos', refs)">
          <ion-label>
            <p>Informations légales</p>
          </ion-label>
        </ion-item>
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
            Ajouter votre carte, accédez à vos avantages utilisés et recherchez plus facilement ceux dont vous pouvez bénéficiez !
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
        <ion-note class="ion-color-medium ion-margin-auto underline" v-if="hasLoggedInFields()">
          <a href="/resume" @click="reload()">Utiliser le compte précédant</a>
        </ion-note>
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
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAvatar
} from '@ionic/vue';
import {
  BadgeInfo,
  HelpCircle,
  CreditCard,
  MapIcon,
  ChevronRight,
  Compass
} from "lucide-vue-next";
import LoginModal from "@/components/LoginModal.vue";
import AvantagesJeunesIcon from "@/components/AvantagesJeunesIcon.vue";
import MyAccount from "@/components/MyAccount.vue";
import MyCard from "@/components/MyCard.vue";
import {askPermission} from "@/functions/native/geolocation";
import ExperimentalModal from "@/components/ExperimentalModal.vue";
import AvantageCard from "@/components/AvantageCard.vue";
import UsedAvantages from "@/components/UsedAvantages.vue";
import {informationCircle} from "ionicons/icons";
import LegalModal from "@/components/LegalModal.vue";
</script>

<script lang="ts">
import { ref } from "vue";
import {getAccount} from "@/functions/fetch/account";
import {getAvantage} from "@/functions/fetch/avantages";
import {get} from "@/functions/fetch/tools";
import {hasPermission, getCurrentLocation} from "@/functions/native/geolocation";
import {createModal} from "@/functions/modals";
import MapModal from "@/components/MapModal.vue";

let refs = {
  modalLogin: ref(null),
  modalMap: ref(null),
  modalInfos: ref(null),
  modalExperimental: ref(null)
} as any

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
})

export default {
  data () {
    return {
      loggedIn: false,
      position: true,
      user_marker: null as any,
      refs: refs,
      aroundMeLoading: true,
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
        transactions: [] as any[],
        favoris: [] as [] || false,
      } as any,
      usedAdvantages: [] as any[],
      favoris_ids: [],
      aroundMeAdvantages: {
        count: 0,
        results: []
      },
      usedAdvantagesIds: [],
      radius: '1',
      welcome_formula: "Bonjour",
    }
  },
  mounted() {
    localStorage.setItem('userApiUrl', 'https://api-ajc.camarm.fr')
    window.addEventListener('reload', () => {
      this.refreshAccount()
    })

    this.refs['page'] = this.$refs.page

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
    async openAroundMeMap() {
      await createModal(MapModal, 'modalMap', refs, { markers: { features: this.aroundMeAdvantages.results }, user: this.user_marker, center: this.user_marker?.coordinates || [6.0258598544333974, 47.23521554332734], zoom: this.getZoom() }, false, [], true)
    },
    async refresh(event: CustomEvent) {
      await this.refreshAccount()
      event.target.complete()
    },
    hasLoggedInFields() {
      return localStorage.getItem('userCards') && localStorage.getItem('currentCardToken')
    },
    reload() {
      location.reload()
    },
    open(url: string) {
      window.open(url)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    async refreshPosition() {
      this.position = await hasPermission()
      this.user_marker = {
        coordinates: this.position ? await getCurrentLocation(): [6.0258598544333974, 47.23521554332734],
        image: this.user.image_url || '/avatar.png',
        name: `${this.user.carte.prenom} ${this.user.carte.nom}`
      }
    },
    refreshAccount() {
      getAccount().then(async user => {
        this.user = user
        let suggestionAvantages = []
        for (const suggestion of this.user.suggestions) {
          suggestionAvantages.push(await getAvantage((suggestion.id_avantage)))
        }
        this.user.suggestions = suggestionAvantages

        let usedAdvantages = []
        for (const advantage of this.user.transactions) {
          const object = await getAvantage((advantage.rid_avantage)) as any
          object.id_transaction = advantage.id_transaction
          object.date_transaction = advantage.date_transaction
          object.type_transaction = advantage.type
          usedAdvantages.push(object)
          this.usedAdvantagesIds.push(advantage.rid_avantage)
        }
        this.usedAdvantages = usedAdvantages

        if (!this.user.favoris) this.user.favoris = []
        this.favoris_ids = this.user.favoris

        let avantagesFavoris = []
        for (const favori of this.user.favoris) {
          avantagesFavoris.push(await getAvantage((favori)))
        }
        this.user.favoris = avantagesFavoris
        await this.refreshPosition().catch((e) => {
          this.position = false
        })
        await this.getAroundMeAdvantages()
      }).catch(err => {
        this.loggedIn = false
      })
    },
    async getAroundMeAdvantages(radius: string = '1') {
      this.aroundMeLoading = true
      this.radius = radius
      const coordinates = this.position ? await getCurrentLocation(): [6.0258598544333974, 47.23521554332734]
      this.aroundMeAdvantages = await get(`https://api-ajc.camarm.fr/around-me?longitude=${coordinates[0]}&latitude=${coordinates[1]}&radius=${radius}`)
      this.aroundMeLoading = false
    },
    getZoom() {
      switch (this.radius) {
        case '1':
          return 14
        case '5':
          return 11
        case '10':
          return 9
        case '50':
          return 7
        default:
          return 11
      }
    },
    createModal
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

.ion-justify-content-center {
  display: flex;
  justify-content: center
}

.ion-margin-auto {
  display: block
}

ion-note.underline a {
  text-decoration: underline;
}

ion-refresher {
  z-index: 50;
}

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
