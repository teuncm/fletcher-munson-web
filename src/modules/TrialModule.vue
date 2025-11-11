<script setup>
import { useLayoutStore } from '@/stores/layoutStore';

const layoutStore = useLayoutStore();
function startExperiment() {

}
</script>

<template>
  <h1>
    Trial
  </h1>
  <p>This is a trial.</p>
  <!-- <button @click="layoutStore.nextPanel">Next</button> -->
</template>

<style scoped></style>
