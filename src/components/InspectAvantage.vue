<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Retour"></ion-back-button>
      </ion-buttons>
      <ion-title>Avantage</ion-title>
      <ion-buttons slot="end" @click="shareAdvantage()">
        <ion-icon slot="icon-only" :icon="shareOutline"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content ref="content" :fullscreen="true">
    <header class="avantage">
      <div class="image-wrapper">
        <img :src="avantage.image_url" alt="Image de l'avantage">
      </div>
      <h2 class="welcome">{{ avantage.offre }}</h2>
      <p class="carousel-el">
        <span v-for="secteur in avantage.secteurs">{{ (secteurs[secteur] || { 'nom': 'Tout les secteurs' }).nom }}{{ avantage.secteurs.indexOf(secteur) == avantage.secteurs.length -1 ? '': '&nbsp;—&nbsp;' }}</span>
      </p>
    </header>
    <ion-fab vertical="top" horizontal="end" class="top">
      <ion-fab-button color="primary" class="small" title="Ajouter aux favoris">
        <HeartOff size="20" @click="removeFavori(avantage.id_avantage); isFavori = !isFavori" v-if="isFavori" class="ion-color-secondary"/>
        <Heart size="20" @click="addFavori(avantage.id_avantage); isFavori = !isFavori" v-else class="ion-color-secondary"/>
      </ion-fab-button>
    </ion-fab>
    <div class="ion-margin-auto carousel-el">
      <ion-chip color="light">
        <Star size="9" class="icon small-icon ion-color-warning"/>
        {{ avantage.note }} / 5 ({{ avantage.nb_note }} avis)
      </ion-chip>
      <ion-chip :class="type || avantage.type" color="secondary" v-for="rubriqueId in avantage.categories">
        <Icon size="9" class="icon small-icon" :name="rubriques[rubriqueId].icon"/>
        {{ rubriques[rubriqueId].nom }}
      </ion-chip>
    </div>

    <ion-list inset>
      <ion-item @click="useAdvantage()" :disabled="!isUseAdvantageFunctionalityEnabled() || used" button color="secondary" class="gradient-button">
        <Ticket class="icon ion-color-primary"/>
        <ion-label class="ion-color-primary">
          <h2 class="ion-color-primary">Utiliser l'avantage</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="avantage.organismes.length > 1">
        <ion-select :value="selectedOrg" interface="action-sheet" @ionChange="selectedOrg = $event.detail.value" placeholder="Séléctionnez un lieu">
          <ion-select-option v-for="org in avantage.organismes" :value="org.id_organisme">{{ org.commune }}, {{ org.cp }}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-icon :icon="informationOutline" slot="start" color="medium"/>
        <ion-note v-if="used">
          Avantage déjà utilisé.
        </ion-note>
      </ion-item>
    </ion-list>

    <div class="list-title">
      Informations de l'avantage
    </div>
    <ion-list v-if="avantage.conditions != ''" inset>
      <ion-item class="description" v-html="avantage.conditions"/>
    </ion-list>

    <ion-list inset>
      <ion-item>
        <CalendarClock class="icon ion-color-success"/>
        <ion-label class="ion-text-wrap">
          <p>Du</p>
          <h2>{{ readableDate(avantage.datedebut) }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <CalendarX class="icon ion-color-danger"/>
        <ion-label class="ion-text-wrap">
          <p>Au</p>
          <h2>{{ readableDate(avantage.datefin) }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-list inset>
      <ion-item>
        <Sparkles class="icon ion-color-warning"/>
        <ion-label>
          <p>Type d'avantage</p>
          <h2 class="ion-text-capitalize">{{ avantage.type }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <SquareAsterisk class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Saison de validité</p>
          <h2 class="ion-text-capitalize">{{ avantage.saison }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>

    <div class="list-title">
      Avantage par
    </div>
    <ion-list inset v-for="org in avantage.organismes">
      <ion-item>
        <Building2 class="icon"/>
        <ion-label class="ion-text-wrap">
          <p>Organisation</p>
          <h2>{{ org.nom }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <Milestone class="icon ion-color-tertiary"/>
        <ion-label class="ion-text-wrap">
          <p>Adresse</p>
          <h2>{{ org.cp }}, {{ org.commune }}</h2>
          <p>{{ org.adresse }}</p>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.site" @click="open(org.site)">
        <MousePointer class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Site</p>
          <h2>{{ org.site }}</h2>
        </ion-label>
      </ion-item>
      <ion-item v-if="org.site2" @click="open(org.site2)">
        <MousePointer class="icon ion-color-tertiary"/>
        <ion-label>
          <p>Site Secondaire</p>
          <h2>{{ org.site2 }}</h2>
        </ion-label>
      </ion-item>
      <ion-item button @click="openMap(org.nom, `${org.adresse}, ${org.cp} ${org.commune}`)">
        <ion-label>
          <p>Voir sur la carte</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <div class="list-title">
      Image
    </div>
    <ion-list inset>
      <ion-item style="height: max-content" class="description">
        <img style="display: block; margin: 1em auto 1em auto; border-radius: 10px" :src="avantage.image_url" alt="Image de l'avantage">
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
  IonLabel,
  IonItem,
  IonBackButton,
  IonButtons,
  IonFabButton,
  IonFab,
  IonIcon,
  IonNote
} from '@ionic/vue';
import {informationOutline, shareOutline} from 'ionicons/icons'
import {
  CalendarClock,
  Sparkles,
  CalendarX,
  Star,
  SquareAsterisk,
  Milestone,
  Building2,
  MousePointer,
  Heart,
  HeartOff,
  Ticket
} from "lucide-vue-next";
import {secteurs, rubriques} from "@/functions/interfaces";
import Icon from "@/components/Icon.vue";
import {addFavori, removeFavori} from "@/functions/fetch/avantages";
</script>

<script lang="ts">
import {readableDate} from "@/functions/native/dates";
import {ref} from "vue";
import {getPosition} from "@/functions/fetch/geolocation";
import {createModal} from "@/functions/modals";
import MapModal from "@/components/MapModal.vue";
import { Share } from '@capacitor/share'
import {authenticateWithBiometry, setupBiometry} from "@/functions/native/biometry";
import {displayToast} from "@/functions/toasts";
import {loadingController} from "@ionic/vue";
import {checkAvailability, obtainAdvantage} from "@/functions/fetch/avantages";

export default {
  props: [
    'avantage',
    'favori',
    'type',
    'used'
  ],
  data() {
    return {
      isFavori: this.favori == undefined ? false: this.favori,
      selectedOrg: this.avantage.organismes[0].id_organisme
    }
  },
  mounted() {
    setupBiometry()
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    isUseAdvantageFunctionalityEnabled() {
      return (localStorage.getItem('userUseAdvantage') || 'false') == 'true'
    },
    async useAdvantage() {
      const loader = await loadingController.create({
        message: 'Récupération des informations'
      })
      await loader.present()
      if (!(await checkAvailability(this.avantage.id_avantage))[0].status) {
        await loader.dismiss()
        await displayToast('Avantage indisponible', 'Cet avantage est indisponible ou a déjà été utilisé', 2000, 'danger')
      }
      await authenticateWithBiometry(() => {
        loader.dismiss()
        obtainAdvantage(this.avantage.id_avantage, this.selectedOrg)
        }, () => {
        displayToast('Échec d\'authentification', 'Impossible de vous authentifier avec la biométrie', 2000, 'danger')
        loader.dismiss()
      })
    },
    async shareAdvantage() {
      const url = `https://www.avantagesjeunes.com/avantage/${this.avantage.id_avantage}`
      try {
        await Share.share({
          title: `${this.avantage.offre}`,
          text: 'Regarde cet avantage que j\'ai trouvé sur Avantages Jeunes Connect',
          url: url,
          dialogTitle: 'Partager cet avantage'
        })
      } catch {
        await navigator.clipboard.write(url)
        alert("Lien copié dans le presse papier")
      }
    },
    async openMap(org: string, address: string) {
      const refs = {
        modalMap: ref(null),
      }
      window.addEventListener('closeModals', () => {
        Object.keys(refs).forEach(key => {
          if (refs[key].value) refs[key].value.dismiss()
        })
      })

      const features = []

      for (const organisme of this.avantage.organismes) {
        const coords = organisme.latitude != '' ? [Number(organisme.longitude), Number(organisme.latitude)] : await this.getAvantageCoords(address)
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coords
          },
          properties: {
            title: org,
            description: address,
            otherAdvantages: []
          }
        })
      }

      const geojson = {
          type: 'FeatureCollection',
          features: features
      }

      const zoom = this.avantage.organismes.length === 1 ? 11: 8

      await createModal(MapModal, 'modalMap', refs, { markers: geojson, center: geojson.features[0].geometry.coordinates, zoom: zoom }, false, [], true)
    },
    async getAvantageCoords(address: string) {
      const coords = await getPosition(address)
      return [coords.lon, coords.lat]
    }
  }
}
</script>
<style>
.avantage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avantage p {
  font-weight: 400 !important;
  opacity: 0.5;
  color: var(--ion-text-color) !important;
}

.avantage h2 {
  margin-left: .5em !important;
  margin-top: -7px !important;
  margin-bottom: 7px !important;
}

.avantage p, .avantage h2 {
  margin: 0;
}

ion-chip {
  padding: 1em
}

.ion-margin-auto {
  margin: auto;
  width: max-content;
}

.description::part(native) {
  display: flex;
  flex-direction: column;
}

.description a {
  color: var(--ion-color-secondary)
}

.image-wrapper img {
  height: 15em;
  max-height: 15em;
  width: 100vw;
  min-width: 100vw;
  object-fit: cover;
}

.image-wrapper::after {
  content: '';
  position: absolute;
  width: 100vw;
  height: 9em;
  background: linear-gradient(var(--ion-color-primary) 10%, #081F3300 100%);
  z-index: 50;
  left: 0;
  top: 9.5em;
  rotate: 180deg;
}

ion-fab.top {
  top: 60px
}

ion-fab-button.small {
  width: 35px;
  height: 35px;
}

.blured::part(background) {
  z-index: 8;
  content: '';
  background-color: var(--ion-color-primary);
}

ion-fab.top {
  right: 5px;
}

.icon.small-icon {
  width: 22px;
  height: 22px;
}

ion-action-sheet {
  --button-background-selected: var(--ion-color-step-150, #fff) !important;
}

.carousel-el {
  width: 95% !important;
  min-width: 95% !important;
  display: flex !important;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
}

p.carousel-el {
  padding-left: 2.5%;
}

.carousel-el ion-chip, .carousel-el span {
  min-width: max-content;
}
</style>
