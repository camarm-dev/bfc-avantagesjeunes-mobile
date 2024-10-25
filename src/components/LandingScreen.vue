<template>
  <ion-page>
    <ion-header>
      <div class="handle"></div>
    </ion-header>
    <ion-content :fullscreen="true">
      <swiper
          :pagination="{ clickable: true, enabled: true }"
          :modules="[Pagination]"
          :speed="600"
      >
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Bienvenue sur <span class="contrast">Avantages Jeunes Connect</span>
                !</h1>
            </div>
            <div class="subtitle">
              Votre compagnon mobile pour la carte Avantages Jeune !
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
            <ion-button fill="outline" color="light" class="gradient-button" expand="full">Obtenir ma carte</ion-button>
            <LandingScreenNextButton class="margin-bottom" text="Me connecter"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Entrez votre <span class="contrast">numéro de carte</span></h1>
            </div>
          </div>
          <div class="text">
            <NumberInput @input-change="(value) => numero = value" />
          </div>
          <LandingScreenNextButton :disabled="numero.length != 6" class="margin-bottom" text="Continuer"/>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="title">
              <h1 class="second-font no-capitalize">Entrez votre <span class="contrast">mot de passe</span></h1>
            </div>
            <div class="subtitle">
              <ion-list>
                <ion-accordion-group>
                  <ion-accordion>
                    <ion-item slot="header" class="ion-border">
                      <ion-label class="ion-text-wrap" color="light">
                        J'accepte les présentes conditions.
                      </ion-label>
                      <ion-checkbox slot="start" color="secondary" justify="start" :checked="agree"
                                    @ionChange="changeAgreeStatus($event.detail.checked)" label-placement="end" required>
                      </ion-checkbox>
                    </ion-item>
                    <div class="ion-padding" slot="content">
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
              </ion-list>
            </div>
          </div>
          <div class="text">
            <ion-list inset>

            </ion-list>

          </div>
          <LandingScreenNextButton class="margin-bottom" text="Me connecter"/>
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
          <LandingScreenNextButton class="margin-bottom" text="Commencer"/>
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
  IonButton, IonItem, IonList, IonCheckbox, IonLabel
} from "@ionic/vue"
import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Parallax} from "swiper/modules"
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

export default {
  components: {
    NumberInput,
    IonLabel, IonCheckbox, IonList, IonItem,
    LandingScreenNextButton,
    IonPage,
    IonHeader,
    IonIcon,
    IonContent,
    Swiper,
    SwiperSlide,
    IonButton
  },
  data () {
    return {
      numero: "",
      password: "",
      agree: false
    }
  },
  setup () {
    return {
      Pagination,
      Parallax,
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
    close() {
      const event = new Event("landingScreenClosed")
      window.dispatchEvent(event)
    },
  }
}
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

.image {
  width: 4em !important;
  position: absolute;
  z-index: 100;
}

.quote {
  left: 1.5em;
  bottom: 10em;
  animation: float 5s infinite reverse ease-in-out;
  transition: .5s ease-in-out;
}

.ellipse {
  right: 1.5em;
  top: 12em;
  animation: float 5s infinite ease-in-out;
  animation-delay: 3s;
  transition: .5s ease-in-out;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 70%;
}
</style>
