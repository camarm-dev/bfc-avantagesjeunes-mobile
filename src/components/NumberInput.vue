<script setup lang="ts">

import {backspaceOutline} from "ionicons/icons";
import {
  IonGrid,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonRow,
  IonButton,
  IonLabel
} from "@ionic/vue"
</script>

<template>
  <ion-grid fixed>
    <ion-row>
      <ion-col size="2" :key="i" v-for="i in value.keys()">
        <ion-list>
          <ion-item :color="i == active ? 'dark': 'medium'">
            <h1>{{ value[i] != -1 && value[i] != undefined ? value[i]: '_' }}</h1>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-grid class="ion-margin-top">
    <ion-row :key="row" v-for="row in [1, 4, 7]">
      <ion-col :key="col" v-for="col in [1, 2, 3]">
        <ion-button :disabled="!value.includes(undefined)" @click="handleInput(row - 1 + col)">
          <ion-label>
            <h2>{{ row - 1 + col }}</h2>
          </ion-label>
        </ion-button>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="4"></ion-col>
      <ion-col size="4">
        <ion-button :disabled="!value.includes(undefined)" @click="handleInput(0)">
          <ion-label><h2>0</h2></ion-label>
        </ion-button>
      </ion-col>
      <ion-col size="4">
        <ion-button @click="erase()">
          <ion-icon slot="icon-only" :icon="backspaceOutline"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">

export default {
  data () {
    return {
      value: [-1, undefined, undefined, undefined, undefined, undefined],
      active: 0
    }
  },
  emits: {
    inputChange: String
  },
  methods: {
    handleInput (input: number) {
      this.value[this.active] = input
      this.$emit('inputChange', this.value.join(""))
      if (this.active == 5) return
      this.active += 1
    },
    erase () {
      this.value[this.active] = undefined
      this.$emit('inputChange', this.value.join(""))
      if (this.active == 0) return
      this.active -= 1
    }
  }
}
</script>

<style scoped>
ion-row, ion-grid {
  width: 100%;
}

.ion-color-medium :not(.toast-header, .toast-message) {
  color: var(--ion-color-medium);
}

.ion-color-medium::part(native) {
  background: var(--ion-color-primary-tint);
}

ion-button {
  width: 100%;
  --background: rgba(var(--ion-color-medium-rgb), 0.05);
}

ion-item::part(native) {
  --border-width: 0 0 0 0;
  border-color: transparent;
}
</style>
