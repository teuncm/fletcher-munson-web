import * as Tone from 'tone';

const AB_DURATION_SECONDS = 0.8;
const AB_DURATION_TONE = Tone.Time(`${AB_DURATION_SECONDS}s`);
const SYNTH_SETTINGS = {
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.02,
    decay: 0.02,
    sustain: 1.0,
    release: 0.02,
  },
  volume: 0,
};

class AudioChain {
  constructor() {
    this.gainA = new Tone.Volume(0);
    this.gainB = new Tone.Volume(0);
    this.vibrato = new Tone.Vibrato({
      frequency: 4,
      depth: 0.02,
    });
    this.masterGainFixed = new Tone.Volume(0);
    this.masterGainUser = new Tone.Volume(-30);
    this.masterLimiter = new Tone.Limiter(-20);

    this.meter = new Tone.Meter();
    this.masterGainFixed.connect(this.meter);

    this.gainA.connect(this.masterGainFixed);
    this.gainB.connect(this.masterGainFixed);
    this.masterGainFixed.connect(this.masterGainUser);
    this.masterGainUser.connect(this.vibrato);
    this.vibrato.connect(this.masterLimiter);
    this.masterLimiter.toDestination();

    this.synthA = new Tone.Synth({
      ...SYNTH_SETTINGS,
    }).connect(this.gainA);

    this.synthB = new Tone.Synth({
      ...SYNTH_SETTINGS,
    }).connect(this.gainB);

    this.synthC = new Tone.Synth({
      ...SYNTH_SETTINGS,
    }).connect(this.masterGainFixed);
  }

  playA(freq, gain = 0) {
    this.gainA.volume.value = gain;
    this.synthA.triggerAttackRelease(freq, AB_DURATION_TONE);
  }

  playB(freq, gain = 0) {
    this.gainB.volume.value = gain;
    this.synthB.triggerAttackRelease(freq, AB_DURATION_TONE);
  }
}

let toneReady = false;
export let audioChain = null;

/**
 * Ensure that Tone.js is started and ready to play sounds.
 */
export async function ensureTone() {
  if (toneReady) {
    return audioChain;
  }

  await Tone.start();

  // Warm up audio with a quick, quiet sound.
  const synth = new Tone.Synth({
    oscillator: { type: 'sine' },
    volume: -50,
    envelope: {
      release: 0.01,
    },
  }).toDestination();

  synth.triggerAttackRelease("C4", "0.01s");

  toneReady = true;
  audioChain = new AudioChain();

  return audioChain;
}

export function isPlaying() {
  if (!audioChain) {
    return false;
  }

  return audioChain.meter.getValue() > -7;
}

export function verifyRequirements() {
  const ctx = Tone.getContext();

  return (ctx.sampleRate >= 44100 && ctx.destination.channelCount == 2);
}
