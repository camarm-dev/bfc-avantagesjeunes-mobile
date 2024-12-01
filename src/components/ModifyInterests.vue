<template>
  <ion-page>
    <ion-content>
      <div class="list-title">
        Sélectionnez des centres d'intérêt
      </div>
      <ion-list inset>
        <ion-item :key="category.id" :class="`focusable ${!category.selected ? 'disabled': ''}`" v-for="category in userInterests" @click="category.selected = !category.selected">
          <Icon :name="category.icon" class="icon"/>
          <ion-label>
            <h2>{{ category.nom }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list inset>
        <ion-item @click="save()" button color="success">
          Save
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage} from "@ionic/vue"
import Icon from "@/components/Icon.vue"
</script>

<script lang="ts">
import {categories} from "@/functions/interfaces"
import {getAccount, updateAccount} from "@/functions/fetch/account"
import {closeModals} from "@/functions/modals"
import {displayToast} from "@/functions/toasts"

type Category = typeof categories[keyof typeof categories] & { selected: boolean, id: string }

export default {
  props: ["user"],
  data() {
    return {
      userInterests: [] as Category[]
    }
  },
  mounted() {
    const userInterests = []
    const currentUserInterests = this.user.centres_interet ? this.user.centres_interet: []
    const categoriesList: Category[] = Object.values(categories) as any[] as Category[]
    for (const category of categoriesList) {
      const categoryId = Object.keys(categories)[Object.values(categories).indexOf(category)]
      category.selected = currentUserInterests.includes(Number(categoryId))
      category.id = categoryId
      userInterests.push(category)
    }
    this.userInterests = userInterests
  },
  methods: {
    async save() {
      const newUser = await getAccount()
      newUser.centres_interet = this.getSelectedInterests()
      await updateAccount(newUser)
      await displayToast("Mon compte", "Centres d'intérêts mis à jour", 2000, "success")
      closeModals()
    },
    getSelectedInterests() {
      const selectedInterests: number[] = []
      for (const category of this.userInterests) {
        if (category.selected) {
          selectedInterests.push(Number(category.id))
        }
      }
      return selectedInterests
    }
  }
}
</script>
<style scoped>
.list-title {
  margin-top: 18px
}

.disabled {
  --color: var(--ion-color-medium)
}
</style>
