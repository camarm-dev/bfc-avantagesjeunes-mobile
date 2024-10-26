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
              <h1 class="second-font no-capitalize">Pour commencer, <span class="contrast">connectez-vous</span></h1>
            </div>
            <div class="subtitle">
              Connectez vous à l'aide de votre numéro de carte, et de votre mot de passe (ou code de première
              connexion).
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
            <h1 class="second-font no-capitalize">Entrez votre <span class="contrast">numéro de carte</span></h1>
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
              <h1 class="second-font no-capitalize">Entrez votre <span class="contrast">code de connexion</span></h1>
            </div>
          </div>
          <div class="text fullwidth">
            <ion-list class="fullwidth">
              <ion-item class="ion-border fullwidth large">
                <ion-input :value="password" @ionInput="password = $event.detail.value as string" type="password" placeholder="Entrez votre mot de passe"/>
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
              <h1 class="second-font no-capitalize">Terminez votre <span class="contrast">inscription</span></h1>
            </div>
            <div class="subtitle">
              Ceci est votre première connexion, vous devez donc changer votre mot de passe et renseigner quelques informations supplémentaires pour pouvoir continuer...
            </div>
          </div>
          <div class="text fullwidth">
            <form @submit.prevent="finishSigning()" class="fullwidth">
              <ion-list class="fullwidth">
                <ion-item class="ion-border fullwidth large">
                  <ion-input @ionChange="email = $event.detail.value as string" type="email" placeholder="Entrez votre e-mail"/>
                </ion-item>
                <ion-item class="ion-border fullwidth large">
                  <ion-input @ionChange="changedPassword1 = $event.detail.value as string" type="password" placeholder="Entrez votre nouveau mot de passe"/>
                </ion-item>
                <ion-item class="ion-border fullwidth large">
                  <ion-input @ionChange="changedPassword2 = $event.detail.value as string" type="password" placeholder="Confirmez le mot de passe"/>
                </ion-item>
              </ion-list>
            </form>
          </div>
          <div class="bottom-container">
            <LandingScreenNextButton :disabled="changedPassword1 != changedPassword2 || email == ''" :action="finishSigning" class="margin-bottom" text="Sauvegarder"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Tout est <span class="contrast">prêt</span> !</h1>
            </div>
            <div class="subtitle">
              Retrouvez vos avantages utilisés, découvrez-en d'autres et sauvegardez les !
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
import Quote from "@/assets/quote3d.png"
import Ellipse from "@/assets/ellipse3d.png"
import FunctionalitiesIllustration from "@/assets/functionalities.png"
import RocketIcon from "@/assets/rocket.png"
import OpenSourceIcon from "@/assets/osi.png"
import LandingScreenNextButton from "@/components/LandingScreenNextButton.vue"
import {arrowForward} from "ionicons/icons"
import WelcomeImage from "@/assets/welcome.png"
import CardImage from "@/assets/card3d.png"
import Icon from "@/assets/icon3d.png"
import NumberInput from "@/components/NumberInput.vue"
import {displayToast} from "@/functions/toasts"
import {getToken} from "@/functions/fetch/account"
import {getCredentials, setCredentials} from "@/functions/credentials"
import {getIDFromToken} from "@/functions/fetch/tools"
import {vibrate} from "@/functions/native/tools"
import {defineComponent} from "vue"
import LandingScreenPreviousButton from "@/components/LandingScreenPreviousButton.vue"
import type {Swiper as SwiperClass} from "swiper/types"

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
      email: ""
    }
  },
  setup () {
    return {
      Icon,
      Quote,
      Ellipse,
      FunctionalitiesIllustration,
      RocketIcon,
      OpenSourceIcon,
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
    async login () {
      if (!this.agree) {
        await displayToast("Conditions d'utilisation", "Veuillez lire et accepter les conditions d'utilisation pour ajouter une carte.", 2000, "danger")
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
        await displayToast("Connecté", "Votre carte Avantages Jeunes a bien été ajoutée !", 2000, "primary")
        setTimeout(() => {
          vibrate()
          this.close()
        }, 2000)
      } else {
        const alert = await alertController.create({
          header: "Impossible de vous authentifier",
          message: `Veuillez réessayer de vous connecter.\navantagesjeunes.com «${response.message}»`,
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
      // TODO if first connection
      // eslint-disable-next-line no-constant-condition
      if (false) {
        this.firstConnection = true
      }
    },
    async finishSigning () {
      if (this.changedPassword1 != this.changedPassword2) {
        const alert = await alertController.create({
          header: "Erreur",
          message: "Les mots de passes ne correspondent pas.",
          buttons: [
            {
              text: "Confirmer",
              role: "confirm"
            }
          ]
        })
        await alert.present()
        return
      }
      // TODO Change pwd and finish signing
      const response = {
        status: false,
        message: ""
      }
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
      }
      // re-login
      this.password = this.changedPassword1
      await this.login()
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
