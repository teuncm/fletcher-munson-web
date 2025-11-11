import Chart from 'chart.js/auto';

Chart.defaults.color = '#111';
Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.2)';

const LINE_COLOR = 'rgba(0, 0, 0, 0.5)';
export const AUDIBLE_COLOR = 'rgba(0, 0, 255, 0.5)';
export const INAUDIBLE_COLOR = 'rgba(255, 0, 0, 0.5)';

const baseline = [
  { x: 20, y: 0 },
  { x: 20000, y: 0 },
];

export function setupChart(ctx) {
  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Measurements',
          data: [],
          backgroundColor: AUDIBLE_COLOR,
          borderColor: LINE_COLOR,
          showLine: false,
          pointRadius: 5,
          pointStyle: 'circle',
        },
        {
          label: 'Baseline',
          data: baseline,
          borderColor: LINE_COLOR,
          showLine: true,
          pointRadius: 0,
          // borderDash: [6, 3],
        }
      ],
    },
    options: {
      animation: false,
      scales: {
        x: {
          type: 'logarithmic',
          position: 'bottom',
          title: {
            display: true,
            text: 'Frequency (Hz)'
          },
          min: 20,
          max: 20000,
        },
        y: {
          ticks: {
            callback: function (value) {
              return value > 0 ? `+${value}` : value;
            }
          },
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Relative Amplitude (dB)'
          },
          min: -27,
          max: 27
        }
      }
    }
  });
};
