<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar v-if="loggedIn">
        <ion-avatar slot="start">
          <img src="/icon-foreground.png" alt="Logo AJC">
        </ion-avatar>
        <div slot="end" class="focusable">
          <ion-nav-link router-direction="forward" :component="InspectProfile" :component-props="{ editable: true, id: user.id_compte }">
            <img class="profile-picture small" :src="user.image_url || '/avatar.png'" alt="Votre photo">
          </ion-nav-link>
        </div>
        <ion-progress-bar color="secondary" v-if="loading" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
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

      <pulse-item vibrate>
        <ion-list inset v-if="!loggedIn">
          <ion-item @click="refreshAccount()">
            <ion-note class="ion-padding" color="light">
              Mmmh 🤔 Il semblerait que nous avons un problème pour charger les dernières informations. Clique ici pour recharger. Déconnecte toi si cela se reproduit.
            </ion-note>
          </ion-item>
        </ion-list>
      </pulse-item>

      <div class="list-title" v-if="user.badges">Mes badges</div>
      <div class="horizontal-carousel" v-if="user.badges">
        <UserBadge :badge="BADGES[badge.id_badge]" :date="badge.datetime" :key="badge.id_badge" :user="user" v-for="badge in user.badges"/>
      </div>
      <div class="list-title">Suggestions</div>
      <div class="horizontal-carousel">
        <div class="card card-only" v-if="user.suggestions.length <= 0">
          <ion-note>
            Aucun avantage suggéré
          </ion-note>
        </div>
        <AvantageCard :key="suggested.id_avantage" :used="usedAdvantagesIds.includes(suggested.id_avantage)" :favori="favoris_ids.includes(suggested.id_avantage)" :avantage="suggested" v-for="suggested in user.suggestions"/>
      </div>
      <ion-nav-link :component="FavoritesAvantages" :component-props="{ used: usedAdvantagesIds, avantages: user.favoris }">
        <div class="list-title button">
          <div>Mes favoris</div>
          <ion-icon :icon="chevronForwardOutline" color="medium"/>
        </div>
      </ion-nav-link>
      <div class="horizontal-carousel">
        <div class="card card-only" v-if="!user.favoris || user.favoris.length == 0">
          <ion-note>
            Tu n'as pas d'avantages favoris...
          </ion-note>
        </div>
        <AvantageCard :key="favori.id_avantage" :used="usedAdvantagesIds.includes(favori.id_avantage)" :favori="true" :avantage="favori" v-for="favori in user.favoris"/>
      </div>
      <ion-nav-link router-direction="forward" :component="InspectProfile" :component-props="{ editable: true, id: user.id_compte }">
        <pulse-item vibrate>
          <ion-list inset v-if="firstConnectionDisclaimer">
            <ion-item button @click="closeDisclaimer()" color="secondary">
              <BadgeAlert class="icon-ion-color-light"/>
              <ion-note class="ion-padding" color="light">Pense à vérifier tes informations.</ion-note>
            </ion-item>
            <ion-item>
              <ion-note class="ion-padding" color="light">
                Tu viens de te connecter, pense à vérifier tes informations personnelles disponible depuis ta page profil en haut à droite.
                Pense à maintenir ton profil à jour avec des données authentiques.
              </ion-note>
            </ion-item>
          </ion-list>
        </pulse-item>
      </ion-nav-link>

      <pulse-item vibrate>
        <ion-list inset v-if="!position">
          <ion-item @click="askPermission().then(refreshPosition)" color="danger">
            <Compass :size="64" class="icon-ion-color-light"/>
            <ion-note class="ion-padding" color="light">
              Active la localisation en cliquant ici. Tu pourra voir les avantages autour de toi.
            </ion-note>
          </ion-item>
        </ion-list>
      </pulse-item>

      <ion-list inset>
        <ion-nav-link :component="MapModal" :component-props="{ markers: { features: aroundMeAdvantages.results }, user: user_marker, center: user_marker?.coordinates || [6.0258598544333974, 47.23521554332734], zoom: getZoom(), radius }">
          <ion-item button>
            <MapIcon class="icon ion-color-success"/>
            <ion-label>
              <p>Autour de moi</p>
              <h2>Ouvrir la carte</h2>
            </ion-label>
          </ion-item>
        </ion-nav-link>
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
        <ion-item button :detail-icon="cogOutline" @click="createModal(SettingsModal, 'modalSettings', refs)">
          <ion-label>
            <p>Paramètres</p>
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
  </ion-page>
</template>

<script setup lang="ts">
import  "@/theme/globals.css"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonNavLink,
  IonList,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAvatar,
  IonNote,
  IonProgressBar,
  IonIcon
} from "@ionic/vue"
import {
  CreditCard,
  MapIcon,
  ChevronRight,
  Compass,
  BadgeAlert
} from "lucide-vue-next"
import MyCard from "@/components/MyCard.vue"
import {askPermission} from "@/functions/native/geolocation"
import SettingsModal from "@/components/SettingsModal.vue"
import AvantageCard from "@/components/AvantageCard.vue"
import UsedAvantages from "@/components/UsedAvantages.vue"
import {chevronForwardOutline, informationCircle, cogOutline} from "ionicons/icons"
import LegalModal from "@/components/LegalModal.vue"
import PulseItem from "@/components/PulseItem.vue"
import {BADGES} from "@/functions/fetch/badges"
import UserBadge from "@/components/UserBadge.vue"
import FavoritesAvantages from "@/components/FavoritesAvantages.vue"
import InspectProfile from "@/components/InspectProfile.vue"
import MapModal from "@/components/MapModal.vue"
</script>

<script lang="ts">
import { ref } from "vue"
import {getAccount} from "@/functions/fetch/account"
import {getAvantage, getOrganisme} from "@/functions/fetch/avantages"
import {get} from "@/functions/fetch/tools"
import {hasPermission, getCurrentLocation} from "@/functions/native/geolocation"
import {createModal} from "@/functions/modals"
import {Badge} from "@/types/badges"
import {Avantage, Transaction, TransactionAvantage} from "@/types/avantages"
import {modalController, RefresherCustomEvent} from "@ionic/vue"
import {getCredentials} from "@/functions/credentials"
import {upgradeStorage} from "@/functions/cache"
import LandingScreen from "@/components/LandingScreen.vue"
import {Organisme} from "@/types/organismes";

const refs = {
  modalLogin: ref(null),
  modalMap: ref(null),
  modalInfos: ref(null),
  modalSettings: ref(null)
} as any

window.addEventListener("closeModals", () => {
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
      firstConnectionDisclaimer: false,
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
        suggestions: [] as Avantage[],
        transactions: [] as Transaction[],
        favoris: [] as Avantage[],
        badges: [] as Badge[]
      } as any,
      usedAdvantages: [] as any[],
      favoris_ids: [] as number[],
      aroundMeAdvantages: {
        count: 0,
        results: []
      },
      usedAdvantagesIds: [] as number[],
      radius: "1",
      welcome_formula: "Bonjour",
      loading: false,
      canLandingScreenDismiss: false,
      canReconnect: false as boolean
    }
  },
  mounted() {
    upgradeStorage()
    window.addEventListener("refresh", () => {
      this.refreshAccount()
    })

    this.refs["page"] = this.$refs.page

    this.hasLoggedInFields()
        .then(hasLoggedInFields => {
          this.canReconnect = hasLoggedInFields
          if (hasLoggedInFields) {
            this.loggedIn = true
            this.refreshAccount()
          }
        })
        .then(async () => {
          if (!this.loggedIn) {
            const modal = await modalController.create({
              component: LandingScreen,
              presentingElement: this.$refs.page as HTMLElement,
              canDismiss: async () => this.canLandingScreenDismiss,
              handle: true
            })
            await modal.present()
            window.addEventListener("landingScreenClosed", () => {
              this.canLandingScreenDismiss = true
              modal.dismiss()
              this.loggedIn = true
            })
          }
        })

    const now = new Date()
    if (now.getHours() > 12) {
      this.welcome_formula = "Bonne après-midi"
    }
    if (now.getHours() > 18) {
      this.welcome_formula = "Bonne soirée"
    }
    this.firstConnectionDisclaimer = (localStorage.getItem("firstConnectionDisclaimer") || "true") == "true";
  },
  methods: {
    async refresh(event: RefresherCustomEvent) {
      this.refreshAccount()
      event.target?.complete()
    },
    async hasLoggedInFields(): Promise<boolean> {
      return ((await getCredentials()).length > 0 && localStorage.getItem("currentCardToken")) as boolean
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
    closeDisclaimer() {
      localStorage.setItem("firstConnectionDisclaimer", "false")
      this.firstConnectionDisclaimer = false
    },
    async refreshPosition() {
      this.position = await hasPermission()
      this.user_marker = {
        coordinates: this.position ? await getCurrentLocation(): [6.0258598544333974, 47.23521554332734],
        image: this.user.image_url || "/avatar.png",
        name: `${this.user.carte.prenom} ${this.user.carte.nom}`
      }
    },
    refreshAccount() {
      this.loading = true
      getAccount().then(async user => {
        this.user = user
        localStorage.setItem("userLikes", JSON.stringify(user.likes || []))
        const suggestionAvantages = []
        for (const suggestion of this.user.suggestions) {
          suggestionAvantages.push(await getAvantage((suggestion.id_avantage)))
        }
        this.user.suggestions = suggestionAvantages

        const usedAdvantages = []
        for (const advantage of (this.user.transactions || [])) {
          const object = await getAvantage(advantage.rid_avantage) as TransactionAvantage
          object.id_transaction = advantage.id_transaction
          object.date_transaction = advantage.date_transaction
          object.type_transaction = advantage.type
          object.coupon_traite = advantage.coupon_traite
          object.organisme = (await getAvantage(advantage.rid_avantage)).organismes.find(org => org.id_organisme == advantage.rid_organisme) as Organisme
          usedAdvantages.push(object)
          this.usedAdvantagesIds.push(advantage.rid_avantage)
        }
        this.usedAdvantages = usedAdvantages

        if (!this.user.favoris) this.user.favoris = []
        this.favoris_ids = this.user.favoris

        const avantagesFavoris = []
        for (const favori of this.user.favoris) {
          avantagesFavoris.push(await getAvantage((favori)))
        }
        this.user.favoris = avantagesFavoris
        await this.refreshPosition().catch(() => {
          this.position = false
        })
        await this.getAroundMeAdvantages()
        this.loading = false
        this.loggedIn = true
      }).catch(() => {
        this.loggedIn = false
      })
    },
    async getAroundMeAdvantages(radius = "1") {
      this.aroundMeLoading = true
      this.radius = radius
      const coordinates = this.position ? await getCurrentLocation(): [6.0258598544333974, 47.23521554332734]
      this.aroundMeAdvantages = await get(`https://api-ajc.camarm.fr/around-me?longitude=${coordinates[0]}&latitude=${coordinates[1]}&radius=${radius}`, false) as any
      this.aroundMeLoading = false
    },
    getZoom() {
      switch (this.radius) {
        case "1":
          return 14
        case "5":
          return 11
        case "10":
          return 9
        case "50":
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
  color: var(--ion-background-color) !important;
}

.login-button:hover ion-label h2 {
  color: var(--ion-color-primary) !important;
}

.login-button ion-label p {
  color: var(--ion-color-contrast) !important;
}

.login-button:hover ion-label p {
  color: var(--ion-color-contrast) !important;
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
