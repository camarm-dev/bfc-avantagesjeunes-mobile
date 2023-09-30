<script setup>
import { computed } from 'vue';
import { Clapperboard, Camera, Compass, Brush, Leaf, Cpu, Music4, Medal, Landmark, Smile, BookOpen, Library, Trophy } from 'lucide-vue-next'

const icons = {
  Clapperboard,
  Camera,
  Compass,
  Brush,
  Leaf,
  Cpu,
  Music4,
  Medal,
  Landmark,
  Smile,
  BookOpen,
  Library,
  Trophy
}

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: Number,
  color: String,
  strokeWidth: {
    type: Number,
    default: 2
  },
  defaultClass: String
})

const icon = computed(() => icons[props.name]);
</script>

<template>
  <component
      :is="icon"
      :size="size"
      :color="color"
      :stroke-width="strokeWidth" :default-class="defaultClass"
  />
</template>