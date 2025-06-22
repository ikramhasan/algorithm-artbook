import { create } from "zustand";

type BubbleSortStore = {
  array: number[];
  arraySize: number;
  isRunning: boolean;
  isComplete: boolean;
  speed: number; // milliseconds between steps
  currentI: number; // outer loop index
  currentJ: number; // inner loop index
  comparingIndices: number[]; // indices being compared
  swappedIndices: number[]; // indices that were just swapped
  steps: number;
  setArray: (array: number[]) => void;
  setArraySize: (size: number) => void;
  setIsRunning: () => void;
  setSpeed: (speed: number) => void;
  nextStep: () => void;
  resetSort: () => void;
  generateRandomArray: () => void;
  generateArray: (type: "random" | "reverse" | "sorted" | "nearly") => void;
  initializeArray: () => void;
};

const generateArrayByType = (
  size: number,
  type: "random" | "reverse" | "sorted" | "nearly"
): number[] => {
  const array: number[] = [];

  switch (type) {
    case "random":
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
      }
      break;
    case "reverse":
      for (let i = size; i > 0; i--) {
        array.push(i);
      }
      break;
    case "sorted":
      for (let i = 1; i <= size; i++) {
        array.push(i);
      }
      break;
    case "nearly":
      for (let i = 1; i <= size; i++) {
        array.push(i);
      }
      // Swap a few random elements
      const swaps = Math.floor(size / 10);
      for (let i = 0; i < swaps; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
      }
      break;
  }

  return array;
};

export const useBubbleSortStore = create<BubbleSortStore>()((set, get) => ({
  array: [],
  arraySize: 30,
  isRunning: false,
  isComplete: false,
  speed: 100, // 100ms between steps
  currentI: 0,
  currentJ: 0,
  comparingIndices: [],
  swappedIndices: [],
  steps: 0,

  setArray: (array) =>
    set({
      array,
      isComplete: false,
      currentI: 0,
      currentJ: 0,
      comparingIndices: [],
      swappedIndices: [],
      steps: 0,
    }),

  setArraySize: (arraySize) => {
    const newArray = generateArrayByType(arraySize, "random");
    set({
      arraySize,
      array: newArray,
      isRunning: false,
      isComplete: false,
      currentI: 0,
      currentJ: 0,
      comparingIndices: [],
      swappedIndices: [],
      steps: 0,
    });
  },

  setIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),

  setSpeed: (speed) => set({ speed }),

  resetSort: () => {
    const state = get();
    const newArray = generateArrayByType(state.arraySize, "random");
    set({
      array: newArray,
      isRunning: false,
      isComplete: false,
      currentI: 0,
      currentJ: 0,
      comparingIndices: [],
      swappedIndices: [],
      steps: 0,
    });
  },

  generateRandomArray: () => {
    const state = get();
    const newArray = generateArrayByType(state.arraySize, "random");
    set({
      array: newArray,
      isRunning: false,
      isComplete: false,
      currentI: 0,
      currentJ: 0,
      comparingIndices: [],
      swappedIndices: [],
      steps: 0,
    });
  },

  generateArray: (type) => {
    const state = get();
    const newArray = generateArrayByType(state.arraySize, type);
    set({
      array: newArray,
      isRunning: false,
      isComplete: false,
      currentI: 0,
      currentJ: 0,
      comparingIndices: [],
      swappedIndices: [],
      steps: 0,
    });
  },

  // Initialize array with correct size on first load
  initializeArray: () => {
    const state = get();
    if (state.array.length !== state.arraySize || state.array.length === 0) {
      const newArray = generateArrayByType(state.arraySize, "random");
      set({
        array: newArray,
        isRunning: false,
        isComplete: false,
        currentI: 0,
        currentJ: 0,
        comparingIndices: [],
        swappedIndices: [],
        steps: 0,
      });
    }
  },

  nextStep: () => {
    const state = get();
    const { array, currentI, currentJ, steps } = state;

    if (state.isComplete) return;

    const newArray = [...array];
    const n = newArray.length;

    // Check if we've completed all passes
    if (currentI >= n - 1) {
      set({
        isComplete: true,
        isRunning: false,
        comparingIndices: [],
        swappedIndices: [],
      });
      return;
    }

    // Current comparison
    const j = currentJ;
    const i = currentI;

    // Compare adjacent elements
    if (j < n - i - 1) {
      const comparing = [j, j + 1];

      if (newArray[j] > newArray[j + 1]) {
        // Swap elements
        [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];

        set({
          array: newArray,
          currentJ: j + 1,
          comparingIndices: comparing,
          swappedIndices: comparing,
          steps: steps + 1,
        });
      } else {
        // No swap needed, just move to next comparison
        set({
          currentJ: j + 1,
          comparingIndices: comparing,
          swappedIndices: [],
          steps: steps + 1,
        });
      }
    } else {
      // End of current pass, move to next pass
      set({
        currentI: i + 1,
        currentJ: 0,
        comparingIndices: [],
        swappedIndices: [],
      });
    }
  },
}));
