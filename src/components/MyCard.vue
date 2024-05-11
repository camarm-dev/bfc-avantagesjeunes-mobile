<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Ma carte</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="openCardFullscreen()">
          <ion-icon slot="icon-only" :icon="scanOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <header class="profile">
      <pulse-item vibrate>
        <div class="card-swiper">
          <img @click="openCardFullscreen()" height="200" class="card-picture" :src="frontCardImage" alt="Votre carte">
        </div>
      </pulse-item>
      <ion-chip class="large-chip" color="success" v-if="user.carte.valid">
        <BadgeCheck class="icon ion-color-success" size="30"/>
        {{ user.carte.numero }}
      </ion-chip>

      <ion-chip class="large-chip" color="danger" v-else>
        <BadgeX class="icon ion-color-danger" size="30"/>
        {{ user.carte.numero }}
      </ion-chip>
    </header>

    <div class="list-title">
      Mes informations
    </div>
    <ion-list inset>
      <ion-item>
        <Fingerprint class="icon" />
        <ion-label>
          <p>Numéro</p>
          <h2>{{ user.carte.numero }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <SquareAsterisk v-if="user.carte.valid" class="icon ion-color-success"/>
        <SquareAsterisk v-else class="icon ion-color-danger"/>
        <ion-label>
          <p>Saison de validité</p>
          <h2>{{ user.carte.saison }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <ShieldCheck v-if="user.carte.valid" class="icon ion-color-success"/>
        <ShieldClose v-else class="icon ion-color-danger"/>
        <ion-label>
          <p>Valide jusqu'au</p>
          <h2>{{ user.carte.valid_datefin }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <Euro class="icon ion-color-secondary"/>
        <ion-label>
          <p>Achetée le</p>
          <h2>{{ user.carte.date_vente }}</h2>
        </ion-label>
      </ion-item>
      <ion-item :button="user.carte.livret" id="open-disclaimer">
        <Compass class="icon ion-color-tertiary" />
        <ion-label>
          <p>Version</p>
          <h2>{{ user.carte.livret ? 'Papier': 'Numérique' }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-alert
        v-if="user.carte.livret"
        trigger="open-disclaimer"
        header="Version papier"
        message="Vous ne pourrez pas utiliser les avantages depuis l'application avec la version papier. Utilisez les coupons physiques de votre livret."
    />

    <div class="list-title">
      Actions
    </div>
    <ion-list inset>
      <ion-item button @click="scanCard()">
        <Focus class="icon"/>
        <ion-label>
          <p>Modifier la photo</p>
          <h2>Scanner ma carte</h2>
        </ion-label>
      </ion-item>
      <ion-item button @click="removeCardScans()">
        <Trash2 class="icon ion-color-danger"/>
        <ion-label>
          <p>Réinitialiser les images</p>
          <h2>Supprimer les photos</h2>
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
  IonIcon,
  IonChip,
  IonButton
} from "@ionic/vue"
import {
  Fingerprint,
  ShieldCheck,
  ShieldClose,
  SquareAsterisk,
  Euro,
  BadgeCheck,
  BadgeX,
  Focus,
  Trash2,
  Compass
} from "lucide-vue-next"
import {scanOutline} from "ionicons/icons"
import PulseItem from "@/components/PulseItem.vue"
</script>

<script lang="ts">
import { createModal } from "@/functions/modals"
import {getAccount} from "@/functions/fetch/account"
import {readableDate} from "@/functions/native/dates"
import "swiper/css"
import "swiper/css/effect-flip"
import "swiper/css/pagination"
import "@ionic/vue/css/ionic-swiper.css"
import FullscreenCardModal from "@/components/FullscreenCardModal.vue"
import {ref} from "vue"
import ScanCardModal from "@/components/ScanCardModal.vue"

const refs = {
  modalFullscreen: ref(null),
  modalScanCard: ref(null)
} as any

window.addEventListener("closeModals", () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
})


export default {
  data () {
    return {
      frontCardImage: localStorage.getItem("frontCardImage") || "/carte.png",
      backCardImage: localStorage.getItem("backCardImage") || "/carte-dos.png",
      user: {
        image_url: "",
        carte: {
          cp: "",
          ville: "",
          numero: "",
          saison: "",
          date_vente: "",
          valid_datefin: "",
          valid: false
        }
      } as any,
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
        this.user.carte.valid_datefin = readableDate(this.user.carte.valid_datefin)
        this.user.carte.date_vente = readableDate(this.user.carte.date_vente)
      })
    },
    async scanCard() {
      await createModal(ScanCardModal, "modalScanCard", refs, {}, true, [0, 0.9], true)
    },
    async openCardFullscreen() {
      await createModal(FullscreenCardModal, "modalFullscreen", refs, { front: this.frontCardImage, back: this.backCardImage }, true, [0, 0.9], true)
    },
    removeCardScans() {
      localStorage.removeItem("frontCardImage")
      localStorage.removeItem("backCardImage")
      this.frontCardImage = "/carte.png"
      this.backCardImage = "/carte-dos.png"
    }
  }
}
</script>
<style>
.card-swiper {
  margin-bottom: 25px;
}

.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
  --swiper-pagination-bottom: -25px;
}

.profile p {
  font-weight: 400 !important;
  opacity: 0.5;
  color: var(--ion-text-color) !important;
}

.profile p, .profile h2 {
  margin: 0;
}

.swiper-pagination * {
  background: var(--ion-color-secondary) !important;
  box-shadow: 0 0 5px var(--ion-text-color) !important;
}

.swiper-pagination .swiper-pagination-bullet {
  background: var(--ion-color-secondary) !important;
  box-shadow: 0 0 5px var(--ion-text-color) !important;
}

.swiper-pagination .swiper-pagination-bullet-active {
  width: 10px !important;
  height: 10px !important;
}

.alert-wrapper {
  background: var(--ion-background-color) !important;
}
</style>
