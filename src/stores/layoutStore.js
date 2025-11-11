import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Store for managing layout data.
 */
export const useLayoutStore = defineStore('layout', () => {
  /* Panel flow. debug and theory are hidden panels for debug mode. */
  const curFlowIdx = ref(0);
  const panelFlow = ref(['intro', 'setup', 'trialbriefing', 'trial', 'experimentbriefing', 'experiment', 'experimentend', 'visualization']);
  const panels = ref({ 'intro': true, 'setup': false, 'trialbriefing': false, 'trial': false, 'experimentbriefing': false, 'experiment': false, 'experimentend': false, 'visualization': false, 'debug': false, 'theory': false });
  const debugMode = ref(import.meta.env.DEV);

  function nextPanel(skip = 1) {
    if (curFlowIdx.value >= panelFlow.value.length - 1) {
      console.warn("Reached the end of panel flow.");

      return;
    }

    panels.value[panelFlow.value[curFlowIdx.value]] = false;
    curFlowIdx.value += skip;
    panels.value[panelFlow.value[curFlowIdx.value]] = true;
  }

  function toggleDebug() {
    if (debugMode.value) {
      Object.keys(panels.value).forEach(key => {
        panels.value[key] = true;
      });
    } else {
      Object.keys(panels.value).forEach(key => {
        panels.value[key] = false;
      });

      panels.value[panelFlow.value[curFlowIdx.value]] = true;
    }
  }

  return { panelFlow, panels, debugMode, toggleDebug, nextPanel };
});
