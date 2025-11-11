<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { audioChain, isPlaying, verifyRequirements } from '@/scripts/audioHelper';

import ContinueButton from '@/modules/utility/ContinueButton.vue';

const masterVolume = ref(-25);
const isPlayingState = ref(false);
const formattedVolume = computed(() => Number(masterVolume.value).toFixed(1));

watch(masterVolume, (newVolume) => {
  audioChain.masterGainUser.volume.rampTo(newVolume, 0.04);
});

function startDragging() {
  audioChain.synthC.triggerAttack(440);
}

function stopDragging() {
  audioChain.synthC.triggerRelease();
}

function updatePlayingState() {
  isPlayingState.value = isPlaying();
}

let intervalId;

onMounted(() => {
  intervalId = setInterval(updatePlayingState, 100);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <h1>Setup</h1>

  <p>Adjust the volume slider to a comfortable listening level. Setup the slider such that you would give the tone a <span class="hl">2/10</span> score in terms of perceived loudness. Dragging and holding the slider will automatically play audio.</p>

  <input type="range" :min="-50" :max="0" @pointerdown="startDragging" @pointerup="stopDragging" step="0.1" v-model="masterVolume" />
  <br></br>
  <p><span :class="verifyRequirements() ? 'yes' : 'no'">Browser requirements met: {{ verifyRequirements() ? 'Yes' : 'No' }}</span></p>
  <p class="maybe">Note: this application requires headphones</p>
  <p class="maybe">Audio is playing: <span class="playIndicator" :class="isPlayingState ? 'activeIndicator' : 'inactiveIndicator'"></span></p>
  <p class="maybe">Volume: <span class="hl">{{ formattedVolume }} dB</span></p>
  <ContinueButton />
</template>

<style scoped></style>
