export class Measurement {
  constructor(side, reference_frequency, match_frequency, match_amplitude, trial, audible = true, timestamp = new Date().toISOString()) {
    this.side = side;
    this.reference_frequency = reference_frequency;
    this.match_frequency = match_frequency;
    this.match_amplitude = match_amplitude;
    this.trial = trial;
    this.audible = audible;
    this.timestamp = timestamp;
  }
}
