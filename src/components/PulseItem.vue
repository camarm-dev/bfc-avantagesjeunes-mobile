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
  props: {
    vibrate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      animated: false
    }
  },
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
      this.animated = true
      setTimeout(() => { this.animated = false; if (this.vibrate) vibrate() }, 250)
    },
    upEffect() {
      const item = this.$refs.item
      if (this.animated) {
        setTimeout(this.upEffect, 50)
        return
      }
      item.classList.add('up')
      setTimeout(this.reset, 500)
    }
  }
}
</script>

<style scoped>
.pulsing-item {
  transition: .25s ease-in-out;
  overflow: visible;
  z-index: 1000;
}

.pulsing-item.down {
  scale: 0.92;
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
    scale: 1.03;
  }
  100% {
    scale: 1;
  }
}
</style>
