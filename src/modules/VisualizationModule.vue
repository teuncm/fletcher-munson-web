<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useMeasurementsStore } from '@/stores/measurementsStore';

import { AUDIBLE_COLOR, INAUDIBLE_COLOR, setupChart } from '@/scripts/chartHelper';

const measurementsStore = useMeasurementsStore();
const canvasRef = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d');

  chartInstance = setupChart(ctx);

  updateChart();
});

measurementsStore.$subscribe((mutation, state) => {
  updateChart();
});

function updateChart() {
  if (chartInstance) {
    chartInstance.data.labels = measurementsStore.measurements.map(item => item.match_frequency);
    chartInstance.data.datasets[0].data = measurementsStore.measurements.map(item => item.match_amplitude);
    chartInstance.data.datasets[0].pointBackgroundColor = measurementsStore.measurements.map(m =>
      m.audible === false ? INAUDIBLE_COLOR : AUDIBLE_COLOR
    );
    chartInstance.update();
  } else {
    console.warn("Chart instance is not initialized");
  }
}

function exportMeasurementsCsv() {
  let csvContent = "data:text/csv;charset=utf-8,index,side,reference_frequency,match_frequency,match_amplitude,audible,timestamp\n";
  measurementsStore.$state.measurements.forEach((item, i) => {
    csvContent += `${i},${item.side},${item.reference_frequency},${item.match_frequency},${item.match_amplitude},${item.audible},${item.timestamp}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "measurements.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportMeasurementsJson() {
  const jsonStr = JSON.stringify(measurementsStore.$state.measurements, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "measurements.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function exportMetadataJson() {
  const jsonStr = JSON.stringify(measurementsStore.$state, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "metadata.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function exportChartPng() {
  const link = document.createElement('a');
  link.setAttribute('download', 'chart.png');
  link.setAttribute('href', canvasRef.value.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<template>
  <h1>
    Visualization
  </h1>
  <p>Below is a visualization of your measurements.</p>
  <canvas ref="canvasRef"></canvas>
  <br></br>
  <p>Export options:</p>
  <button @click="exportMeasurementsCsv">Export measurements (.csv)</button>
  <br></br>
  <button @click="exportChartPng">Export chart (.png)</button>
  <br></br>
  <button @click="exportMetadataJson">Export all experiment data (.json)</button>
</template>

<style scoped></style>
