<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modifier mon mot de passe</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="user.carte">
      <div class="list-title">
        Mot de passe actuel
      </div>
      <ion-list inset>
        <ion-item>
          <ion-input class="ion-margin-bottom" helper-text="Rempli automatiquement" disabled type="password" :value="oldPassword"></ion-input>
        </ion-item>
      </ion-list>
      <div class="list-title">
        Nouveau mot de passe
      </div>
      <ion-list inset>
        <ion-item>
          <ion-input @input="newPassword = $event.target.value;" placeholder="Nouveau mot de passe" type="password" :value="newPassword"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input @input="newPasswordConfirm = $event.target.value;" placeholder="Confirmer le mot de passe" type="password" :value="newPasswordConfirm"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item :disabled="newPassword != newPasswordConfirm || newPassword == ''" button color="secondary" @click="save().then(closeModals)">
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
import {getAccount, updatePassword} from "@/functions/fetch/account"
import {Account} from "@/types/account"
import {closeModals} from "@/functions/modals"
import {alertController, loadingController} from "@ionic/vue"
import {getCredentials, setCredentials} from "@/functions/credentials"
import {Card} from "@/functions/fetch/interfaces"
import {getIDFromToken} from "@/functions/fetch/tools"
import {displayToast} from "@/functions/toasts"

export default {
  data () {
    return {
      user: {} as Account,
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      oldCredentials: {} as unknown as Card,
      accountId: 0
    }
  },
  mounted() {
    this.refreshAccount()
  },
  methods: {
    refreshAccount() {
      const token = localStorage.getItem("currentCardToken") || ""
      this.accountId = getIDFromToken(token)
      getAccount().then(user => {
        this.user = user
        getCredentials().then(creds => {
          const credentials = creds.find((creds) => creds.id == this.accountId.toString()) as Card
          this.oldPassword = credentials.password
          this.oldCredentials = credentials
        })
      })
    },
    async save() {
      const loader = await loadingController.create({
        message: "Enregistrement..."
      })
      await loader.present()
      const response = await updatePassword(this.user.carte.id_carte, this.oldPassword, this.newPassword)
      if (!response.status) {
        const alert = await alertController.create({
          header: "Impossible de modifier le mot de passe",
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
      // Changing credentials with new password
      const cards = await getCredentials()
      cards.splice(cards.indexOf(this.oldCredentials), 1)
      cards.push({
        numero: this.user.numero,
        password: this.newPassword,
        id: this.accountId.toString()
      })
      await setCredentials(cards)
      await loader.dismiss()
      await displayToast("Mot de passe mis à jour", "Le nouveau mot de passe à été modifié et enregistré !", 2000, "primary")
      closeModals()
    },
    closeModals
  },
}
</script>
