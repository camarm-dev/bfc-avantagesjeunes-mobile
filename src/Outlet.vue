<template>
  <ion-app>
    <ion-nav :root="TabsPage"></ion-nav>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonNav } from "@ionic/vue"
import TabsPage from "@/views/TabsPage.vue"
</script>
