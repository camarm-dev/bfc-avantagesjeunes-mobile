<script setup lang="ts">

</script>

<template>
<div class="pulsing-item" ref="item">
  <slot/>
</div>
</template>

<script>
import {vibrate} from "@/functions/native/tools";

export default {
  mounted() {
    this.$refs.item.addEventListener('touchstart', this.downEffect)
    this.$refs.item.addEventListener('touchend', this.upEffect)
  },
  methods: {
    reset() {
      const item = this.$refs.item
      item.classList.remove('up')
      item.classList.remove('down')
    },
    downEffect() {
      const item = this.$refs.item
      this.reset()
      item.classList.add('down')
      vibrate()
    },
    upEffect() {
      const item = this.$refs.item
      this.reset()
      item.classList.add('up')
    }
  }
}
</script>

<style scoped>
.pulsing-item {
  transition: .5s ease-in-out;
}

.pulsing-item.down {
  scale: 0.9;
}

.pulsing-item.up {
  scale: 1;
  animation: .5s pulse ease-in-out;
}

@keyframes pulse {
  0% {
    scale: 0.9;
  }
  30% {
    scale: 1.05;
  }
  100% {
    scale: 1;
  }
}
</style>
