<script setup lang="ts">

import {IonImg, IonSkeletonText} from "@ionic/vue";
import PulseItem from "@/components/PulseItem.vue"
</script>

<template>
  <pulse-item vibrate @click="openDetails()">
    <ion-img v-if="badge.image_url" size="50" :src="badge.image_url"/>
    <ion-skeleton-text class="rounded-img" v-else size="50"/>
  </pulse-item>
</template>

<script lang="ts">

import {ref} from "vue";
import {createModal} from "@/functions/modals";
import BadgeDetailsModal from "@/components/BadgeDetailsModal.vue";

const refs = {
  detailModal: ref(null)
}

export default {
  props: [
    'badge',
    'date',
    'user'
  ],
  methods: {
    async openDetails() {
      await createModal(BadgeDetailsModal, 'detailModal', refs, { badge: this.badge, date: this.date, user: this.user }, true, [0, 0.75], true)
    }
  }
}
</script>

<style>

ion-img, .rounded-img {
  width: 50px;
  height: 50px;
}
</style>
