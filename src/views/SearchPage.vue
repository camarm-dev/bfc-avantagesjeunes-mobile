<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-searchbar  color="primary" @ionInput="handleInput($event.detail.value)" :value="query" show-clear-button="always" :animated="true" placeholder="Rechercher un avantage"></ion-searchbar>
      </ion-toolbar>
      <ion-toolbar style="height: max-content">
        <ion-list inset class="list-border">
          <ion-accordion-group>
            <ion-accordion value="first">
              <ion-item slot="header">
                <Settings2 slot="start" class="ion-color-medium"/>
                <ion-label>Filtres</ion-label>
              </ion-item>
              <ion-list class="no-radius" slot="content">
                <ion-item>
                  <ion-label>
                    <p>Rubriques</p>
                  </ion-label>
                  <ion-select @ionChange="rubriques = $event.detail.value" :multiple="true" interface="action-sheet" :interface-options="{ color: 'primary' }" placeholder="Toutes" value="all">
                    <ion-select-option v-for="rubrique in Object.keys(listeRubriques)" :value="rubrique">{{ listeRubriques[rubrique].nom }}</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>Secteurs</p>
                  </ion-label>
                  <ion-select @ionChange="secteurs = $event.detail.value" :multiple="true" interface="action-sheet" placeholder="Tous" value="all">
                    <ion-select-option v-for="secteur in Object.keys(listeSecteurs)" :value="secteur">{{ listeSecteurs[secteur].nom }}</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item button @click="search()">
                  <ion-label>
                    Appliquer
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
        </ion-list>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="loading" inset>
        <ion-item class="item-content">
          <ion-label class="loader">
            <ion-spinner color="medium" name="crescent"></ion-spinner>
            <p>Recherche d'avantages...</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-content>
        <ion-list v-if="!loading && results.length === 0" inset>
          <ion-item class="item-content">
            <ion-label class="loader">
              <Scan class="icon ion-color-medium"/>
              <p>Aucun avantage trouvé</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-list v-if="!loading && results.length > 0" inset>
          <ion-item class="item-content">
            <ion-label class="loader">
              <SearchCheck class="icon ion-color-success"/>
              <p>{{ results_count }} avantages trouvés, page {{ page + 1 }}.</p>
            </ion-label>
          </ion-item>
        </ion-list>

        <div class="grid-results">
          <AvantageCard :key="avantage.id_avantage" :used="used.includes(avantage.id_avantage)" :small="true" :favori="isAvantageFavori(avantage.id_avantage)" :avantage="avantage" v-for="avantage in results"/>
        </div>

        <ion-note v-if="endReached" class="ion-padding-start" style="display: block; margin-bottom: 2em;">
          Tous les résultats ont été chargés...
        </ion-note>
        <ion-infinite-scroll v-else @ionInfinite="loadMore">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-content>
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
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonNote
} from '@ionic/vue';
import {
  Settings2,
  Scan,
  SearchCheck
} from "lucide-vue-next";
import { secteurs as listeSecteurs, rubriques as listeRubriques } from "@/functions/interfaces";
import AvantageCard from "@/components/AvantageCard.vue";
</script>

<script lang="ts">
import {getAccount} from "@/functions/fetch/account";
import {Avantage} from "@/types/avantages";
import {get} from "@/functions/fetch/tools";
import {InfiniteScrollCustomEvent} from "@ionic/vue";

export default {
  data() {
    return {
      results: [] as Avantage[],
      results_count: 0,
      loading: false,
      query: '',
      page: 0,
      secteurs: [],
      rubriques: [],
      favoris: [] as number[],
      used: [] as number[],
      searchTimeout: setTimeout(() => {}, 100),
      endReached: false
    }
  },
  mounted() {
    getAccount().then(user => {
      this.favoris = user.favoris
      for (const object in user.transactions) {
        this.used.push(object.rid_avantage)
      }
      if (!this.favoris) this.favoris = []
    })
  },
  methods: {
    loadMore(event: InfiniteScrollCustomEvent) {
      this.page += 1
      this.performSearchRequest().then(response => {
        const success = response.count > 0
        if (success) {
          this.results_count += response.count
          for (const result of response.results) {
            this.results.push(result)
          }
        } else {
          this.endReached = true
        }
        event.target.complete()
      })
    },
    open(url: string) {
      window.open(url)
    },
    handleInput(query: string) {
      clearTimeout(this.searchTimeout)
      this.query = query
      this.searchTimeout = setTimeout(this.search, 1500)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    getInnerContent(html_string: string) {
      const el = document.createElement('div')
      el.innerHTML = html_string
      return el.innerText
    },
    isAvantageFavori(id_avantage: number) {
      return this.favoris.includes(id_avantage)
    },
    async performSearchRequest() {
      let url = `${localStorage.getItem('userApiUrl')}/search?q=${this.query}&page=${this.page}`
      if (this.secteurs.length > 0) {
        url += `&secteurs=${this.secteurs.join(',')}`
      }
      if (this.rubriques.length > 0) {
        url += `&rubriques=${this.rubriques.join(',')}`
      }

      return await get(url) as any
    },
    async search() {
      this.loading = true

      this.page = 0
      const response = await this.performSearchRequest()

      this.results = response.results
      this.results_count = response.count

      this.loading = false
    },
  },
}
</script>
<style>
ion-header {
  height: max-content;
}

.list-border {
  border-width: 0.55px;
  border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));
  border-style: solid;
}

ion-item-divider {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-end: 5px
}

ion-toolbar .sc-ion-searchbar-ios-h {
  padding-top: 15px;
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
  color: var(--color) !important;
}

ion-toolbar .sc-ion-searchbar-ios-h.ion-color-primary * {
  --color: var(--ion-color-primary-contrast);
  color: var(--color) !important;
}

ion-alert {
  --background: var(--ion-color-primary) !important;
}

ion-alert .alert-button {
  color: #fff !important;
}

ion-alert [aria-checked="true"].sc-ion-alert-ios .alert-checkbox-icon.sc-ion-alert-ios {
  border-color: var(--ion-color-secondary);
  background-color: var(--ion-color-secondary);
}

.item-content::part(native) {
  display: flex;
  flex-direction: column;
}

.loader {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  margin-right: 0;
}

.loader ion-spinner {
  margin-bottom: 5px;
  margin-inline-end: 0;
}

.loader .icon {
  margin-bottom: 5px;
  margin-inline-end: 0;
  height: 30px;
  width: 30px;
}

</style>
