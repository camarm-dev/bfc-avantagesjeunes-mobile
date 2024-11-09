<template>
  <ion-page>
    <ion-header>
      <div class="handle"></div>
    </ion-header>
    <ion-content :scroll-y="false" :fullscreen="true">
      <swiper
          :speed="600"
          :allow-touch-move="false"
          ref="landingSwiper"
      >
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Bienvenue sur <span class="contrast">Avantages Jeunes Connect</span>
                !</h1>
            </div>
            <div class="subtitle">
              Votre compagnon mobile pour la carte Avantages Jeunes !
            </div>
          </div>
          <div class="text">
            <img class="slide-image" :src="WelcomeImage" alt="AJC logo"/>
          </div>
          <LandingScreenNextButton class="margin-bottom" text="Commencer"/>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Pour commencer, <span class="contrast">connecte-toi</span></h1>
            </div>
            <div class="subtitle">
              Connecte-toi à l'aide de ton numéro de carte, et de ton mot de passe (ou code de première
              connexion). <a class="ion-color-medium is-underlined" href="https://www.avantagesjeunes.com/login/forgotpassword" target="_blank">Mot de passe oublié ?</a>
            </div>
          </div>
          <div class="text">
            <img class="slide-image variant" :src="CardImage" alt="Image de carte avantages jeunes"/>
          </div>
          <div class="bottom-container">
            <ion-button @click="open('https://www.avantagesjeunes.com/')" fill="outline" color="light" class="gradient-button" expand="full">Obtenir ma carte</ion-button>
            <LandingScreenNextButton class="margin-bottom" text="Me connecter"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="title">
            <h1 class="second-font no-capitalize">Entre ton <span class="contrast">numéro de carte</span></h1>
          </div>
          <div class="text">
            <NumberInput @input-change="(value) => numero = value" />
          </div>
          <div class="bottom-container">
            <LandingScreenNextButton :disabled="numero.length != 6" class="margin-bottom" text="Continuer"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Entre ton <span class="contrast">code de connexion</span></h1>
            </div>
          </div>
          <div class="text fullwidth">
            <ion-list class="fullwidth">
              <ion-item class="ion-border fullwidth large">
                <ion-input :value="password" @ionInput="password = $event.detail.value as string" type="password" placeholder="Entre ton code de connexion"/>
              </ion-item>
            </ion-list>
          </div>
          <div class="bottom-container">
            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header" class="ion-border ion-border-radius">
                  <ion-checkbox @click="$event.stopPropagation()" aria-label="J'accepte les présentes conditions." slot="start" color="secondary" justify="start" :checked="agree"
                                @ionChange="changeAgreeStatus($event.detail.checked)" label-placement="end" required/>
                  <ion-label class="ion-text-wrap" color="light">
                    J'accepte les présentes conditions.
                  </ion-label>
                </ion-item>
                <div class="ion-padding accordion-content" slot="content">
                  <ion-label class="ion-text-wrap" color="light">
                    - <a href="https://avantagesjeunesconnect.camarm.fr/cgu" target="_blank">Conditions générales
                    d'utilisation</a><br>
                    - <a href="https://avantagesjeunesconnect.camarm.fr/privacy" target="_blank">Politique de
                    confidentialité</a><br>
                    - J'ai pris connaissance du <a
                      href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile">code</a> et de <a
                      href="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/LICENSE">sa license</a>
                  </ion-label>
                </div>
              </ion-accordion>
            </ion-accordion-group>
            <LandingScreenPreviousButton text="Retour"/>
            <LandingScreenNextButton :action="login" :disabled="password.length == 0 || !agree" class="margin-bottom" text="Me connecter"/>
          </div>
        </swiper-slide>
        <swiper-slide v-if="firstConnection">
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Vérifie ton <span class="contrast">email</span></h1>
            </div>
            <div class="subtitle">
              Vérifie que cet adresse email est correcte, elle te sera utile pour activer ton compte.
            </div>
          </div>
          <div class="text fullwidth">
            <form class="fullwidth">
              <ion-list class="fullwidth">
                <ion-item class="ion-border fullwidth large">
                  <ion-input :value="email" @ionChange="email = $event.detail.value as string" type="email" placeholder="toi@email.com"/>
                </ion-item>
              </ion-list>
            </form>
          </div>
          <div class="bottom-container">
            <LandingScreenNextButton :disabled="email == ''" :action="validateAccountData" class="margin-bottom" text="Sauvegarder"/>
          </div>
        </swiper-slide>
        <swiper-slide v-if="firstConnection">
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Termine ton <span class="contrast">inscription</span></h1>
            </div>
            <div class="subtitle">
              Ceci est ta première connexion, tu dois donc changer ton mot de passe...
            </div>
          </div>
          <div class="text fullwidth">
            <form class="fullwidth">
              <ion-list class="fullwidth">
                <ion-item class="ion-border fullwidth large">
                  <ion-input @ionChange="changedPassword1 = $event.detail.value as string" type="password" placeholder="Entre ton nouveau mot de passe"/>
                </ion-item>
                <ion-item class="ion-border fullwidth large">
                  <ion-input @ionChange="changedPassword2 = $event.detail.value as string" type="password" placeholder="Confirme le mot de passe"/>
                </ion-item>
              </ion-list>
            </form>
          </div>
          <div class="bottom-container">
            <LandingScreenNextButton :disabled="changedPassword1 != changedPassword2 || changedPassword1 == ''" :action="finishSigning" class="margin-bottom" text="Sauvegarder"/>
          </div>
        </swiper-slide>
        <swiper-slide v-if="firstConnection">
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Active ton <span class="contrast">compte</span></h1>
            </div>
            <div class="subtitle">
              Un email t'as été envoyé sur {{ email }} pour activer ton compte.  Clique sur le lien et confirme pour te connecter !
            </div>
          </div>
          <div class="text"></div>
          <div class="bottom-container">
            <LandingScreenNextButton :action="login" class="margin-bottom" text="C'est fait !"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Tout est <span class="contrast">prêt</span> !</h1>
            </div>
            <div class="subtitle">
              Retrouve tes avantages utilisés, découvre-en d'autres et sauvegarde les !
            </div>
          </div>
          <div class="text">
            <img class="slide-image small" :src="Icon" alt="AJC icon"/>
          </div>
          <LandingScreenNextButton @click="close()" class="margin-bottom" text="Commencer"/>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonItem,
  IonList,
  IonCheckbox,
  IonLabel,
  IonInput,
  IonAccordion,
  IonAccordionGroup,
  alertController
} from "@ionic/vue"
import {Swiper, SwiperSlide} from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "@ionic/vue/css/ionic-swiper.css"
import LandingScreenNextButton from "@/components/LandingScreenNextButton.vue"
import {arrowForward} from "ionicons/icons"
import WelcomeImage from "@/assets/welcome.png"
import CardImage from "@/assets/card3d.png"
import Icon from "@/assets/icon3d.png"
import NumberInput from "@/components/NumberInput.vue"
import {displayToast} from "@/functions/toasts"
import {
  checkFirstConnectionCode,
  getToken,
  finishAccountCreation,
  changePasswordOnAccountCreation
} from "@/functions/fetch/account"
import {getCredentials, setCredentials} from "@/functions/credentials"
import {getIDFromToken} from "@/functions/fetch/tools"
import {vibrate} from "@/functions/native/tools"
import {defineComponent} from "vue"
import LandingScreenPreviousButton from "@/components/LandingScreenPreviousButton.vue"
import type {Swiper as SwiperClass} from "swiper/types"
import {CheckConnectionCodeInfosResponse, FinishSigningData} from "@/types/account"

export default defineComponent({
  components: {
    LandingScreenPreviousButton,
    NumberInput,
    IonLabel,
    IonCheckbox,
    IonList,
    IonItem,
    IonInput,
    LandingScreenNextButton,
    IonPage,
    IonHeader,
    IonContent,
    Swiper,
    SwiperSlide,
    IonButton,
    IonAccordion,
    IonAccordionGroup
  },
  data () {
    return {
      numero: "",
      password: "",
      agree: false,
      firstConnection: false,
      changedPassword1: "",
      changedPassword2: "",
      cardID: 0,
      firstConnectionCode: "",
      email: "",
      accountData: {} as unknown as FinishSigningData,
      defaultPhoto: "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"
    }
  },
  setup () {
    return {
      Icon,
      arrowForward,
      WelcomeImage,
      CardImage
    }
  },
  methods: {
    goToSlide(slide: number) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const landingSwiper = this.$refs.landingSwiper?.$el?.swiper as unknown as SwiperClass | undefined
      console.log(landingSwiper)
      if (landingSwiper) {
        landingSwiper.slideTo(slide)
      }
    },
    close() {
      const event = new Event("landingScreenClosed")
      window.dispatchEvent(event)
      const reloadEvent = new Event("refresh")
      window.dispatchEvent(reloadEvent)
    },
    open(url: string) {
      window.open(url)
    },
    async validateAccountData() {
      // Finish account modification
      await finishAccountCreation(this.cardID, this.accountData)
    },
    async login () {
      if (!this.agree) {
        await displayToast("Conditions d'utilisation", "Il faut lire et accepter les conditions d'utilisation pour ajouter une carte.", 2000, "danger")
        return
      }
      const response = await getToken(this.numero, this.password, false)
      const token = response.token
      if (token) {
        const cards = await getCredentials()
        const accountId = getIDFromToken(token)
        cards.push({
          numero: this.numero,
          password: this.password,
          id: accountId
        })
        await setCredentials(cards)
        localStorage.setItem("currentCardToken", token)
        localStorage.setItem("currentCardId", accountId)
        await displayToast("Connecté", "Ta carte Avantages Jeunes a bien été ajoutée !", 2000, "primary")
        setTimeout(() => {
          vibrate()
          this.close()
        }, 2000)
        return
      }
      const checkFirstConnection = await checkFirstConnectionCode(this.numero, this.password)
      if (checkFirstConnection.status) {
        const data = checkFirstConnection as unknown as CheckConnectionCodeInfosResponse
        this.firstConnection = true
        this.firstConnectionCode = this.password
        this.email = data.carte.email
        this.cardID = data.carte.id_carte

        // Save account data
        this.accountData = {
          adresse: data.carte.adresse,
          cp: data.carte.cp,
          date_naiss: data.carte.date_naiss,
          email: this.email,
          emailConfirm: this.email,
          emailNew: this.email,
          email_accepte: false,
          id_carte: data.carte.id_carte,
          newsletter: "",
          nom: data.carte.nom,
          numero: data.carte.numero,
          photo: "",
          prenom: data.carte.prenom,
          sexe: data.carte.sexe,
          statut: data.carte.statut,
          tel: data.carte.tel,
          tel_accepte: false,
          ville: data.carte.ville
        }
      } else {
        const alert = await alertController.create({
          header: "Impossible de t'authentifier",
          message: `Réessaye de te connecter.\navantagesjeunes.com «${response.message}»`,
          buttons: [
            {
              text: "Confirmer",
              role: "confirm",
              handler: () => {
                this.goToSlide(1)
                this.password = ""
              }
            }
          ]
        })
        await alert.present()
        throw "Impossible de se connecter"
      }
    },
    async finishSigning () {
      const response = await changePasswordOnAccountCreation(this.numero, this.cardID, this.changedPassword1, this.changedPassword1, this.firstConnectionCode, this.defaultPhoto)
      if (!response.status) {
        const alert = await alertController.create({
          header: "Erreur",
          message: `Une erreur est survenue. avantagesjeunes.com «${response.message}»`,
          buttons: [
            {
              text: "Confirmer",
              role: "confirm"
            }
          ]
        })
        await alert.present()
        throw "Erreur API"
      }
      this.password = this.changedPassword1 // Set new password
    },
    changeAgreeStatus(status: boolean) {
      this.agree = status
    },
  }
})
</script>

<style scoped>
.handle {
  width: 36px;
  height: 5px;
  border-radius: 8px;
  display: block;
  margin: 6px auto auto;
  background: var(--ion-color-step-350, #c0c0be) !important;
  cursor: pointer;
}

.fullwidth {
  width: 100%;
}

.large {
  scale: 1.02;
}

ion-accordion-group {
  width: 100%;
  border-radius: 14px;
  margin-bottom: 12px;
}

.accordion-content {
  text-align: left;
}

.bottom-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center
}

.no-capitalize {
  text-transform: none;
}

ion-content {
  height: 100%;
}

.ion-border-radius {
  border-radius: 7px !important;
}

.swiper, .swiper-wrapper, .swiper-slide {
  height: 100%;
}

.swiper-slide {
  padding: 2em 1em 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.subtitle {
  text-align: left;
  line-break: strict;
  word-break: normal;
  font-weight: normal;
  color: var(--ion-color-medium);
}

.second-font {
  font-size: 2em;
  margin-top: 0;
  text-align: left;
  font-weight: bold;
}

.contrast {
  color: var(--ion-color-secondary);
}

.slide-image {
  width: 80% !important;
}

.slide-image.variant {
  width: 70% !important;
  rotate: 9deg;
  animation: floating 10s infinite ease-in-out;
  transition: .5s ease-in-out;
}

@keyframes floating {
  0% {
    transform: translate(0%, 0%);
    scale: 1;
  }
  50% {
    transform: translate(0%, -8%);
  }
  60% {
    transform: translate(0%, -8%);
    scale: 1.05;
  }
  90% {
    transform: translate(0%, 0%);
    scale: 1;
  }
  100% {
    transform: translate(0%, 0%);
    scale: 1;
  }
}

.slide-image {
  rotate: -9deg;
  animation: float 20s infinite ease-in-out;
  transition: .5s ease-in-out;
}

.slide-image.small {
  width: 60% !important;
  rotate: -10deg;
}

@keyframes float {
  0% {
    transform: translate(0%, 0%);
    scale: 1;
  }
  50% {
    transform: translate(-2%, -8%);
    scale: 1;
  }
  60% {
    transform: translate(-2%, -8%);
    scale: 1.02;
  }
  90% {
    transform: translate(0%, 0%);
    scale: 1.02;
  }
  100% {
    transform: translate(0%, 0%);
    scale: 1;
  }
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 70%;
}
</style>
