<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ajouter une carte</ion-title>
        <ion-buttons slot="end">
          <ion-button color="medium" @click="closeModals()">
            <XCircle/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <img style="margin: auto; display: block" alt="Carte avantage jeunes 2023 2024 BFC" width="150" src="/carte.png"/>

      <form class="login">

        <ion-list inset>
          <ion-item color="secondary">
            <ion-input label-placement="stacked" label="Numéro de carte" :maxLength="9" required color="light" v-maskito="cardNumberOptions" :value="numero" @input="numero = $event.target.value" type="text" placeholder="00-00-00"></ion-input>
          </ion-item>
        </ion-list>

        <ion-list inset>
          <ion-item class="ion-border">
            <ion-input color="light" label-placement="stacked" label="Mon mot de passe" required :value="password" @input="password = $event.target.value" type="password" placeholder="*******"></ion-input>
          </ion-item>
        </ion-list>

        <ion-list inset>
          <ion-item class="ion-border">
            <ion-checkbox color="secondary" justify="start" :checked="agree" @input="agree = !agree" label-placement="end" required>
              <ion-label class="ion-text-wrap" color="light">
                J'accepte les <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/CGU.md" target="_blank">conditions d'utilisation</a> de Avantages Jeunes Connect et j'ai pris connaissance du
                <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile">code</a> et de <a href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/LICENSE">sa license</a>.
              </ion-label>
            </ion-checkbox>
          </ion-item>
        </ion-list>

        <ion-button color="secondary" expand="full" type="button" @click="login()">Ajouter</ion-button>

      </form>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTitle, IonInput, IonButton, IonList, IonPage } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
import { maskito as vMaskito } from '@maskito/vue';

const cardNumberOptions = {
  mask: [
    ...Array(2).fill(/\d/),
  '-',
  ...Array(2).fill(/\d/),
  '-',
  ...Array(2).fill(/\d/)
  ],
  elementPredicate: (el: HTMLIonInputElement) => {
    return new Promise((resolve) => {
  requestAnimationFrame(async () => {
    const input = await el.getInputElement();
    resolve(input);
  });
});
},
}
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";
import {getConnectedCards, getToken} from "@/functions/fetch/account";
import {displayToast} from "@/functions/toasts";
import {vibrate} from "@/functions/native/tools";
import {getIDFromToken} from "@/functions/fetch/tools";

export default {
  methods: {
    data() {
      return {
        numero: "",
        password: "",
        agree: false
      }
    },
    async login () {
      if (!this.agree) {
        await displayToast('Conditions d\'utilisation', 'Veuillez accepter les conditions d\'utilisation pour ajouter une carte', 2000, 'danger')
        return
      }
      const response = await getToken(this.numero.replaceAll('-', ''), this.password)
      const token = response.token
      if (token) {
        const cards = getConnectedCards()
        const accountId = getIDFromToken(token)
        cards.push({
          numero: this.numero.replaceAll('-', ''),
          password: this.password,
          id: accountId
        })
        localStorage.setItem('userCards', JSON.stringify(cards))
        localStorage.setItem('currentCardToken', token)
        localStorage.setItem('currentCardId', accountId)
        await displayToast('Connecté', 'Votre carte Avantages Jeunes a bien été ajoutée !', 2000, 'primary')
        setTimeout(() => {
          vibrate()
          location.reload()
        }, 2000)
      }
    },
    closeModals
  }
}
</script>
