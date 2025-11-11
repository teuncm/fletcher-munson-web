<script setup>
import { onUnmounted, ref } from 'vue';
import { ensureTone } from '@/scripts/audioHelper';

import ContinueButton from '@/modules/utility/ContinueButton.vue';

const confirmed = ref(false);

async function startEngine() {
  await ensureTone();
}

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
}

onUnmounted(() => {
  enterFullscreen();
});
</script>

<template>
  <h1>Equal Loudness Experiment</h1>
  <p>Welcome to the equal loudness experiment! We will be measuring perceived loudness across different frequencies. Before we continue, please confirm the following:</p>

  <label for="confirm" @click="startEngine">
    <input id="confirm" type="checkbox" v-model="confirmed" />
    <span class="hl">I accept</span> that I am participating in this experiment at my own risk.
  </label>

  <br></br>

  <ContinueButton :disabled="!confirmed" />
</template>

<style scoped></style>
