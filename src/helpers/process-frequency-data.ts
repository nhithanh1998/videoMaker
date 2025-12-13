export const processFrequencyData = (
  frequencyData: number[],
  numberOfBars: number,
  prevBars: number[] | null,
  options = {
    highFreqCutoff: 0.8,
    attack: 0.5,   // lên nhanh
    release: 0.3, // xuống chậm (càng lớn càng mượt)
    silenceFloor: 0.02,
  },
) => {
  // --- Detect silence ---
  const isSilent = frequencyData.every((v) => v < 0.002);
  if (isSilent) {
    return new Array(numberOfBars)
      .fill(0)
      .map((_, i) => {
        const base = options.silenceFloor;
        return prevBars
          ? prevBars[i] * options.release + base * (1 - options.release)
          : base;
      });
  }

  const maxFreqIndex = Math.floor(
    frequencyData.length * options.highFreqCutoff,
  );

  const bars = new Array(numberOfBars).fill(0);

  const bassEnd = Math.floor(numberOfBars * 0.2);
  const midEnd = Math.floor(numberOfBars * 0.85);

  let bassMax = 0.001;
  let midMax = 0.001;
  let trebleMax = 0.001;

  for (let i = 0; i < numberOfBars; i++) {
    const t = i / numberOfBars;

    const index = Math.min(
      Math.floor(Math.pow(t, 1.8) * maxFreqIndex),
      maxFreqIndex,
    );

    let value = frequencyData[index];

    if (i < bassEnd) {
      value = Math.pow(value, 0.5) * 0.6;
      bassMax = Math.max(bassMax, value);
    } else if (i < midEnd) {
      value = Math.pow(value, 0.85) * 1.2;
      midMax = Math.max(midMax, value);
    } else {
      value = Math.pow(value, 1.2) * 0.35;
      trebleMax = Math.max(trebleMax, value);
    }

    bars[i] = value;
  }

  for (let i = 0; i < numberOfBars; i++) {
    if (i < bassEnd) {
      bars[i] /= bassMax;
    } else if (i < midEnd) {
      bars[i] /= midMax;
    } else {
      bars[i] /= trebleMax;
    }

    bars[i] = Math.pow(bars[i], 0.9);

    // --- Temporal smoothing ---
    if (prevBars) {
      const prev = prevBars[i];
      const curr = bars[i];

      const factor =
        curr > prev ? options.attack : options.release;

      bars[i] = prev * factor + curr * (1 - factor);
    }

    // --- Floor nhẹ tránh rung ---
    bars[i] = Math.max(bars[i], options.silenceFloor);
  }

  return bars;
};
