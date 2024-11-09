<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modifier mon email</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="user.carte">
      <div class="list-title">
        Mail actuel
      </div>
      <ion-list inset>
        <ion-item>
          <ion-input disabled type="email" :value="user.carte.email"></ion-input>
        </ion-item>
      </ion-list>
      <div class="list-title">
        Nouvelle adresse mail
      </div>
      <ion-list inset>
        <ion-item>
          <ion-input @input="newEmail = $event.target.value;" placeholder="Nouvelle adresse mail" type="email" :value="newEmail"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input @input="newEmailConfirm = $event.target.value;" placeholder="Confirme l'adresse mail" type="email" :value="newEmailConfirm"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item :disabled="newEmail != newEmailConfirm || newEmail == ''" button color="secondary" @click="save().then(closeModals)">
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
  IonItem,
  IonInput,
} from "@ionic/vue"
</script>

<script lang="ts">
import {getAccount, updateEmail} from "@/functions/fetch/account"
import {Account} from "@/types/account"
import {closeModals} from "@/functions/modals"
import {alertController, loadingController} from "@ionic/vue"

export default {
  data () {
    return {
      user: {} as Account,
      newEmail: "",
      newEmailConfirm: ""
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
      const loader = await loadingController.create({
        message: "Enregistrement..."
      })
      await loader.present()
      const response = await updateEmail(this.user.carte.id_carte, this.user.carte.email, this.newEmail)
      if (!response.status) {
        const alert = await alertController.create({
          header: "Impossible de modifier l'email",
          message: `Veuillez réessayer.\navantagesjeunes.com «${response.message}»`,
          buttons: [
            {
              text: "Confirmer",
              role: "confirm"
            }
          ]
        })
        await alert.present()
      }
      await loader.dismiss()
      closeModals()
    },
    closeModals
  },
}
</script>
