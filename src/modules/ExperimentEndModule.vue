<script setup>
import ContinueButton from '@/modules/utility/ContinueButton.vue';
import { onUnmounted } from 'vue';

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

onUnmounted(() => {
  exitFullscreen();
});
</script>

<template>
  <h1>
    Experiment Finished
  </h1>
  <p>You have finished the experiment! On the next page you will the results of the experiment. Please <span class="hl">export and save</span> the results, they will be lost upon reloading the page.</p>
  <ContinueButton />
</template>

<style scoped></style>
