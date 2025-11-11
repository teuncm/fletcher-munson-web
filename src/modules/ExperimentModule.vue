<script setup>
import { useMeasurementsStore } from '@/stores/measurementsStore';
import { Measurement } from '@/scripts/measurement';
import { audioChain } from '@/scripts/audioHelper';
import { onMounted, ref } from 'vue';
import _ from 'lodash';

const measurementsStore = useMeasurementsStore();

const curIdx = ref(0);
const sliderB = ref(null);
const freqA = ref(1000);
const volA = ref(0);
const freqB = ref(measurementsStore.dataPoints[curIdx.value]);
const volB = ref(0);
const minB = ref(-25);
const maxB = ref(25);

let curRep = 0;

function randomizeSlider() {
  minB.value = _.random(-27, -22, true);
  maxB.value = _.random(22, 27, true);
  volB.value = _.random(-8, 8, true);
}

function playA() {
  audioChain.playA(freqA.value, volA.value);
}

function playB() {
  audioChain.playB(freqB.value, volB.value);
}

function toNext() {
  const [reference, frequency, amplitude] = [freqA.value, freqB.value, volB.value];

  measurementsStore.measurements.push(new Measurement("M", reference, frequency, amplitude));

  curIdx.value += 1;

  if (curIdx.value >= measurementsStore.dataPoints.length) {
    curIdx.value = 0;
    curRep += 1;

    if (curRep >= 2) {
      alert("Experiment complete!");
      curRep = 0;
      return;
    }
  }

  randomizeSlider();
  freqB.value = measurementsStore.dataPoints[curIdx.value];
}

function inaudible() {
  const [reference, frequency, amplitude] = [freqA.value, freqB.value, volB.value];

  measurementsStore.measurements.push(new Measurement("M", reference, frequency, amplitude, false));

  curIdx.value += 1;

  if (curIdx.value >= measurementsStore.dataPoints.length) {
    curIdx.value = 0;
    curRep += 1;

    if (curRep >= 2) {
      alert("Experiment complete!");
      curRep = 0;
      return;
    }
  }

  randomizeSlider();
  freqB.value = measurementsStore.dataPoints[curIdx.value];
}

onMounted(() => {
  randomizeSlider();
});
</script>

<template>
  <h1>
    Experiment
  </h1>
  <button @click="playA">A</button>
  <button @click="playB">B</button>
  <br></br>
  <button @click="inaudible">&#215;</button>
  <button @click="toNext">&rarr;</button>
  <br></br>
  <input ref="sliderB" type="range" :min="minB" :max="maxB" step="0.001" v-model="volB" />

</template>

<style scoped></style>
