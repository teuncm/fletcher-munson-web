<script setup>
import { useLayoutStore } from '@/stores/layoutStore';

const layoutStore = useLayoutStore();

const props = defineProps({
  label: {
    type: String,
    default: 'Continue'
  },
  skip: {
    type: Number,
    required: false
  }
});
</script>

<template>
  <button @click="layoutStore.nextPanel(skip)">
    {{ label }}
  </button>
</template>
