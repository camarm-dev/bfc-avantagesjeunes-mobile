<script setup lang="ts">
import {
  Star
} from "lucide-vue-next"
</script>
<template>
  <div class="star-range" v-if="editable">
    <Star :key="i" @click="setNote(i + 1)" :class="`star ${i + 1 <= dynamicNote ? 'filled': ''}`" v-for="i in Array(5).keys()"/>
    <p v-if="label">{{ dynamicNote }} / 5</p>
  </div>
  <div class="star-range" v-else>
    <Star :key="i" :class="`star ${i + 1 <= note ? 'filled': ''}`" v-for="i in Array(5).keys()"/>
    <p v-if="label">{{ dynamicNote }} / 5</p>
  </div>
</template>

<script lang="ts">
export default {
  props: [
      "editable",
      "note",
      "label"
  ],
  data() {
    return {
      dynamicNote: this.note
    }
  },
  methods: {
    setNote(note: number) {
      this.dynamicNote = note
    }
  }
}
</script>

<style scoped>
.star-range {
  width: max-content;
}

.star {
  margin-left: .2em;
  margin-right: .2em;
  color: var(--ion-color-star);
}

.star.filled {
  fill: var(--ion-color-star)
}
</style>
