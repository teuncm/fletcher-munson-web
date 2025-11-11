<script setup>
import { useMeasurementsStore } from '@/stores/measurementsStore';

const measurementsStore = useMeasurementsStore();

function clearAll() {
  measurementsStore.measurements = [];
}
</script>

<template>
  <h1>
    Debug
  </h1>
  <p><a href="https://github.com/teuncm/fletcher-munson-web">GitHub repo</a></p>
  <pre>{{ JSON.stringify(measurementsStore.$state, null, 2) }}</pre>
  <button @click="clearAll">Clear data</button>
</template>

<style scoped></style>
