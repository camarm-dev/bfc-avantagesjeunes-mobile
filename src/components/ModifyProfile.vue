<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modifier mon profil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="user.carte">
      <header class="profile">
        <div>
          <img @click="changePhoto()" class="profile-picture" :src="user.image_url || '/avatar.png'" alt="Votre photo">
          <div @click="changePhoto()" class="edit-icon">
            <Pen/>
          </div>
        </div>
      </header>
      <div class="list-title">
        Ma fiche
      </div>
      <ion-list inset>
        <ion-item>
          <ion-input @input="user.carte.prenom = $event.target.value; user.prenom = $event.target.value" label-placement="stacked" placeholder="Jean" :value="user.carte.prenom" label="Prénom"></ion-input>
        </ion-item>
        <ion-item>
          <ion-checkbox :checked="user.afficher_prenom" @ionChange="user.afficher_prenom = $event.detail.checked" color="secondary">
            <ion-label class="ion-text-wrap" color="medium">
              <p>Afficher le prénom sur mon profil ?</p>
            </ion-label>
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-input @input="user.carte.nom = $event.target.value; user.nom = $event.target.value" label-placement="stacked" placeholder="Bonaparte" :value="user.carte.nom" label="Nom"></ion-input>
        </ion-item>
        <ion-item>
          <ion-checkbox :checked="user.afficher_nom" @ionChange="user.afficher_nom = $event.detail.checked" color="secondary">
            <ion-label class="ion-text-wrap" color="medium">
              <p>Afficher le nom sur mon profil ?</p>
            </ion-label>
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-input @input="user.pseudo = $event.target.value" label-placement="stacked" placeholder="j.bona" :value="user.pseudo" label="Pseudo"></ion-input>
        </ion-item>
        <ion-item>
          <ion-checkbox :checked="user.utiliser_pseudo" @ionChange="user.utiliser_pseudo = $event.detail.checked" color="secondary">
            <ion-label class="ion-text-wrap" color="medium">
              <p>Utiliser le pseudo plutôt que le nom ?</p>
            </ion-label>
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-textarea @input="user.descriptif = $event.target.value" auto-grow label-placement="stacked" placeholder="J'adore la carte avantages jeunes !" :value="user.descriptif" label="Descriptif"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-checkbox :checked="user.afficher_ville" @ionChange="user.afficher_ville = $event.detail.checked" color="secondary">
            <ion-label class="ion-text-wrap" color="medium">
              Afficher l'emplacement ?
            </ion-label>
          </ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item button color="secondary" @click="save().then(closeModals)">
          Enregistrer
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import "@/theme/globals.css"
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonPage,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonInput,
  IonTextarea
} from "@ionic/vue"
import {
  Pen
} from "lucide-vue-next";
</script>

<script lang="ts">
import {getAccount, updateAccount, updatePhoto} from "@/functions/fetch/account"
import {Account} from "@/types/account";
import {closeModals} from "@/functions/modals";
import {getPhoto} from "@/functions/native/camera";
import {loadingController} from "@ionic/vue";

export default {
  data () {
    return {
      user: {} as Account,
    }
  },
  mounted() {
    this.refreshAccount()
  },
  methods: {
    refreshAccount() {
      getAccount().then(user => {
        this.user = user
      })
    },
    async save() {
      const newUser = await getAccount()
      newUser.pseudo = this.user.pseudo
      newUser.afficher_nom = this.user.afficher_nom
      newUser.prenom = this.user.prenom
      newUser.nom = this.user.nom
      newUser.afficher_prenom = this.user.afficher_prenom
      newUser.utiliser_pseudo = this.user.utiliser_pseudo
      newUser.descriptif = this.user.descriptif
      const loader = await loadingController.create({
        message: 'Enregistrement...'
      })
      await loader.present()
      await updateAccount(newUser)
      await loader.dismiss()
      closeModals()
    },
    async changePhoto() {
      const image = await getPhoto()
      const loader = await loadingController.create({
        message: 'Envoi de la nouvelle photo...'
      })
      await loader.present()
      await updatePhoto(image)
      this.refreshAccount()
      await loader.dismiss()
    },
    closeModals
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

.edit-icon {
  position: relative;
  left: 4em;
  bottom: 2.5em;
  background: var(--ion-color-tertiary);
  padding: .2em;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
