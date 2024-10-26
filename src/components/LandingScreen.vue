<template>
  <ion-page>
    <ion-header>
      <div class="handle"></div>
    </ion-header>
    <ion-content :scroll-y="false">
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
            <LandingScreenPreviousButton text="Retour"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Entrez votre <span class="contrast">code de connexion</span></h1>
            </div>
          </div>
          <div class="text">
            <ion-list inset>
              <ion-input :value="password" @ionInput="password = $event.detail.value as string" type="password" placeholder="****************"/>
            </ion-list>
          </div>
          <div class="bottom-container">
            <ion-accordion-group ref="agreeAccordion">
              <ion-accordion value="first">
                <ion-item slot="header" class="ion-border ion-border-radius">
                  <ion-label class="ion-text-wrap" color="light">
                    J'accepte les présentes conditions.
                  </ion-label>
                  <ion-checkbox aria-label="J'accepte les présentes conditions." slot="start" color="secondary" justify="start" :checked="agree"
                                @ionChange="changeAgreeStatus($event.detail.checked)" label-placement="end" required>
                  </ion-checkbox>
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
          <div class="text">
            <ion-list inset>
              <ion-input label-placement="floating" label="Email" @ionChange="email = $event.detail.value as string" type="email" placeholder="john@doe.com"/>
              <ion-input label-placement="floating" label="Nouveau mot de passe" @ionChange="changedPassword1 = $event.detail.value as string" type="password" placeholder="****************"/>
              <ion-input label-placement="floating" label="Confirmez le mot de passe" @ionChange="changedPassword1 = $event.detail.value as string" type="password" placeholder="****************"/>
            </ion-list>
          </div>
          <div class="bottom-container">
            <LandingScreenNextButton :action="finishSigning" class="margin-bottom" text="Sauvegarder"/>
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
            <img class="slide-image" :src="Icon" alt="Remède icon"/>
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
  IonIcon,
  IonPage,
  IonButton,
  IonItem,
  IonList,
  IonCheckbox,
  IonLabel,
  IonInput,
  IonAccordion,
  IonAccordionGroup, alertController
} from "@ionic/vue"
import {Swiper, SwiperSlide} from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "@ionic/vue/css/ionic-swiper.css"
import Icon from "@/assets/remede3d.png"
import Quote from "@/assets/quote3d.png"
import Ellipse from "@/assets/ellipse3d.png"
import FunctionalitiesIllustration from "@/assets/functionalities.png"
import RocketIcon from "@/assets/rocket.png"
import OpenSourceIcon from "@/assets/osi.png"
import LandingScreenNextButton from "@/components/LandingScreenNextButton.vue"
import {arrowForward} from "ionicons/icons"
import WelcomeImage from "@/assets/welcome.png"
import CardImage from "@/assets/card3d.png"
import NumberInput from "@/components/NumberInput.vue";
import {displayToast} from "@/functions/toasts";
import {getToken} from "@/functions/fetch/account";
import {getCredentials, setCredentials} from "@/functions/credentials";
import {getIDFromToken} from "@/functions/fetch/tools";
import {vibrate} from "@/functions/native/tools";
import {defineComponent, ref} from "vue";
import LandingScreenPreviousButton from "@/components/LandingScreenPreviousButton.vue";
import type {Swiper as SwiperClass} from "swiper/types";

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
    IonIcon,
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
    closeAccordion() {
      // TODO not working
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const agreeAccordion = this.$refs.agreeAccordion?.$el as unknown as HTMLIonAccordionGroupElement | undefined
      console.log(agreeAccordion)
      if (agreeAccordion) {
        agreeAccordion.value = undefined;
      }
    },
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
      const reloadEvent = new Event("reload")
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
          header: 'Impossible de vous authentifier',
          message: `Veuillez réessayer de vous connecter.\navantagesjeunes.com «${response.message}»`,
          buttons: [
            {
              text: 'Confirmer',
              role: 'confirm',
              handler: () => {
                this.goToSlide(1)
                this.password = ""
              }
            }
          ]
        })
        await alert.present()
        throw 'Impossible de se connecter'
      }
      // TODO if first connection
      if (false) {
        this.firstConnection = true
      }
    },
    async finishSigning () {
      if (this.changedPassword1 != this.changedPassword2) {
        await displayToast("Erreur", "Les mots de passes de correspondent pas.", 2000, "danger")
        return
      }
      // TODO Change pwd

      // re-login
      this.password = this.changedPassword1
      await this.login()
    },
    changeAgreeStatus(status: boolean) {
      this.agree = status
      this.closeAccordion()
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
