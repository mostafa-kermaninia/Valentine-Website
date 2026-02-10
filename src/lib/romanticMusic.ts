// Romantic piano melody generator using Web Audio API
const createRomanticMusic = (): { play: () => void; stop: () => void } => {
  let audioContext: AudioContext | null = null;
  let isPlaying = false;
  let timeouts: number[] = [];

  // A romantic melody in the key of C major / A minor
  const melody: [number, number, number][] = [
    // [frequency, startTime, duration]
    [523.25, 0, 1.5],    // C5
    [659.25, 1.5, 1],    // E5
    [783.99, 2.5, 1.5],  // G5
    [880, 4, 2],         // A5
    [783.99, 6, 1],      // G5
    [659.25, 7, 1.5],    // E5
    [698.46, 8.5, 2],    // F5
    [659.25, 10.5, 1],   // E5
    [523.25, 11.5, 1.5], // C5
    [493.88, 13, 1],     // B4
    [523.25, 14, 2],     // C5
    [659.25, 16, 1.5],   // E5
    [783.99, 17.5, 1],   // G5
    [880, 18.5, 2],      // A5
    [1046.50, 20.5, 2.5],// C6
    [880, 23, 1],        // A5
    [783.99, 24, 1.5],   // G5
    [659.25, 25.5, 2],   // E5
    [523.25, 27.5, 3],   // C5
  ];

  // Bass accompaniment
  const bass: [number, number, number][] = [
    [130.81, 0, 4],    // C3
    [174.61, 4, 3],    // F3
    [164.81, 7, 4],    // E3
    [146.83, 11, 3],   // D3
    [130.81, 14, 4],   // C3
    [174.61, 18, 3],   // F3
    [196.00, 21, 3],   // G3
    [130.81, 24, 6],   // C3
  ];

  const playNote = (
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    volume: number = 0.15,
    type: OscillatorType = "sine"
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.value = 2000;

    osc.type = type;
    osc.frequency.value = freq;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    const start = ctx.currentTime + startTime;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.08);
    gain.gain.setValueAtTime(volume, start + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    osc.start(start);
    osc.stop(start + duration + 0.1);
  };

  const playSequence = (ctx: AudioContext) => {
    // Play melody
    melody.forEach(([freq, start, dur]) => {
      playNote(ctx, freq, start, dur, 0.12, "sine");
      // Add harmonic shimmer
      playNote(ctx, freq * 2, start + 0.02, dur * 0.8, 0.03, "sine");
    });

    // Play bass
    bass.forEach(([freq, start, dur]) => {
      playNote(ctx, freq, start, dur, 0.08, "triangle");
    });

    // Loop after melody ends
    const loopTime = 30;
    const tid = window.setTimeout(() => {
      if (isPlaying && audioContext) {
        playSequence(audioContext);
      }
    }, loopTime * 1000);
    timeouts.push(tid);
  };

  return {
    play: () => {
      if (isPlaying) return;
      audioContext = new AudioContext();
      isPlaying = true;
      playSequence(audioContext);
    },
    stop: () => {
      isPlaying = false;
      timeouts.forEach(clearTimeout);
      timeouts = [];
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
    },
  };
};

export default createRomanticMusic;
