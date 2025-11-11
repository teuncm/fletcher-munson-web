<script setup>
import { onMounted } from 'vue';

import TrialBriefingModule from './modules/TrialBriefingModule.vue';
import TrialModule from './modules/TrialModule.vue';
import ExperimentBriefingModule from './modules/ExperimentBriefingModule.vue';
import ExperimentModule from './modules/ExperimentModule.vue';
import VisualizationModule from './modules/VisualizationModule.vue';
import TheoryModule from './modules/TheoryModule.vue';
import DebugModule from './modules/DebugModule.vue';
import IntroModule from './modules/IntroModule.vue';
import SetupModule from './modules/SetupModule.vue';
import ContinueButton from '@/modules/utility/ContinueButton.vue';

import { useLayoutStore } from '@/stores/layoutStore';
import ExperimentEndModule from './modules/ExperimentEndModule.vue';

const layoutStore = useLayoutStore();

onMounted(() => {
  layoutStore.toggleDebug();
});
</script>

<template>
  <div>
    <div id="devtoggle">
      <label for="devtoggle-checkbox">
        <input id="devtoggle-checkbox" type="checkbox" @change="layoutStore.toggleDebug"
          v-model="layoutStore.debugMode" />
        <span>developer mode </span><span id="devspan" class="hl" v-if="layoutStore.panels.debug">enabled</span>
      </label>
    </div>

    <div v-if="layoutStore.panels.intro">
      <IntroModule />
    </div>

    <div v-if="layoutStore.panels.setup">
      <SetupModule />
    </div>

    <div v-if="layoutStore.panels.trialbriefing">
      <TrialBriefingModule />
    </div>

    <div v-if="layoutStore.panels.trial">
      <TrialModule />
    </div>

    <div v-if="layoutStore.panels.experimentbriefing">
      <ExperimentBriefingModule />
    </div>

    <div v-if="layoutStore.panels.experiment">
      <ExperimentModule />
    </div>

    <div v-if="layoutStore.panels.experimentend">
      <ExperimentEndModule />
    </div>

    <div v-if="layoutStore.panels.visualization">
      <VisualizationModule />
    </div>

    <div v-if="layoutStore.panels.debug">
      <DebugModule />
    </div>

    <div v-if="layoutStore.panels.theory">
      <TheoryModule />
    </div>

    <div id="devnext">
      <ContinueButton v-if="layoutStore.debugMode" label="Next panel" />
    </div>
  </div>
</template>

<style scoped></style>
