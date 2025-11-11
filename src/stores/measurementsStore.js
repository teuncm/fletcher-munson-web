import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';

/**
 * Store for managing measurement data.
 */
export const useMeasurementsStore = defineStore('measurements', () => {
  const dataPoints = ref(_.union([150, 200, 250, 400, 600, 800, 900, 1000], [1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 8500, 9000]));
  const numDataPoints = ref(dataPoints.value.length);
  const measurements = ref([]);

  return { dataPoints, numDataPoints, measurements };
});
