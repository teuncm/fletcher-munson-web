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
  <pre>{{ JSON.stringify(measurementsStore.$state, null, 2) }}</pre>
  <p><span class="hl">Warning!</span> This action is irreversible.</p>
  <button @click="clearAll">Clear data</button>
</template>

<style scoped>
p {
  color: red;
}
</style>
