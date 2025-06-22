import { create } from "zustand";

type QuickSortStore = {
  array: number[];
  arraySize: number;
  isRunning: boolean;
  isComplete: boolean;
  speed: number; // milliseconds between steps
  stack: { low: number; high: number }[]; // Stack to simulate recursion
  currentLow: number;
  currentHigh: number;
  pivotIndex: number;
  currentJ: number; // Current position being compared
  currentI: number; // Current partition boundary
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

export const useQuickSortStore = create<QuickSortStore>()((set, get) => ({
  array: [],
  arraySize: 30,
  isRunning: false,
  isComplete: false,
  speed: 200, // 200ms between steps
  stack: [],
  currentLow: -1,
  currentHigh: -1,
  pivotIndex: -1,
  currentJ: -1,
  currentI: -1,
  comparingIndices: [],
  swappedIndices: [],
  steps: 0,

  setArray: (array) =>
    set({
      array,
      isComplete: false,
      stack: array.length > 0 ? [{ low: 0, high: array.length - 1 }] : [],
      currentLow: -1,
      currentHigh: -1,
      pivotIndex: -1,
      currentJ: -1,
      currentI: -1,
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
      stack: newArray.length > 0 ? [{ low: 0, high: newArray.length - 1 }] : [],
      currentLow: -1,
      currentHigh: -1,
      pivotIndex: -1,
      currentJ: -1,
      currentI: -1,
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
      stack: newArray.length > 0 ? [{ low: 0, high: newArray.length - 1 }] : [],
      currentLow: -1,
      currentHigh: -1,
      pivotIndex: -1,
      currentJ: -1,
      currentI: -1,
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
      stack: newArray.length > 0 ? [{ low: 0, high: newArray.length - 1 }] : [],
      currentLow: -1,
      currentHigh: -1,
      pivotIndex: -1,
      currentJ: -1,
      currentI: -1,
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
      stack: newArray.length > 0 ? [{ low: 0, high: newArray.length - 1 }] : [],
      currentLow: -1,
      currentHigh: -1,
      pivotIndex: -1,
      currentJ: -1,
      currentI: -1,
      comparingIndices: [],
      swappedIndices: [],
      steps: 0,
    });
  },

  initializeArray: () => {
    const state = get();
    if (state.array.length !== state.arraySize || state.array.length === 0) {
      const newArray = generateArrayByType(state.arraySize, "random");
      set({
        array: newArray,
        isRunning: false,
        isComplete: false,
        stack:
          newArray.length > 0 ? [{ low: 0, high: newArray.length - 1 }] : [],
        currentLow: -1,
        currentHigh: -1,
        pivotIndex: -1,
        currentJ: -1,
        currentI: -1,
        comparingIndices: [],
        swappedIndices: [],
        steps: 0,
      });
    }
  },

  nextStep: () => {
    const state = get();
    const { array, stack, currentLow, currentHigh, currentJ, currentI, steps } =
      state;

    // Check if sorting is complete
    if (stack.length === 0) {
      set({
        isComplete: true,
        isRunning: false,
        comparingIndices: [],
        swappedIndices: [],
        currentLow: -1,
        currentHigh: -1,
        pivotIndex: -1,
        currentJ: -1,
        currentI: -1,
      });
      return;
    }

    const newArray = [...array];

    // Start new partition if not currently partitioning
    if (currentLow === -1 || currentHigh === -1) {
      const { low, high } = stack[stack.length - 1];

      if (low >= high) {
        // Remove this range from stack
        const newStack = stack.slice(0, -1);
        set({
          stack: newStack,
          currentLow: -1,
          currentHigh: -1,
          pivotIndex: -1,
          currentJ: -1,
          currentI: -1,
          comparingIndices: [],
          swappedIndices: [],
        });
        return;
      }

      // Start partitioning
      set({
        currentLow: low,
        currentHigh: high,
        pivotIndex: high,
        currentJ: low,
        currentI: low - 1,
        comparingIndices: [high],
        swappedIndices: [],
        steps: steps + 1,
      });
      return;
    }

    // Continue partitioning
    const pivot = newArray[currentHigh];
    const j = currentJ;
    let i = currentI;

    if (j >= currentHigh) {
      // Partition complete - place pivot in final position
      const finalPivotPos = i + 1;
      if (finalPivotPos !== currentHigh) {
        [newArray[finalPivotPos], newArray[currentHigh]] = [
          newArray[currentHigh],
          newArray[finalPivotPos],
        ];
      }

      // Add new ranges to stack
      const newStack = stack.slice(0, -1);
      if (currentLow < finalPivotPos - 1) {
        newStack.push({ low: currentLow, high: finalPivotPos - 1 });
      }
      if (finalPivotPos + 1 < currentHigh) {
        newStack.push({ low: finalPivotPos + 1, high: currentHigh });
      }

      set({
        array: newArray,
        stack: newStack,
        currentLow: -1,
        currentHigh: -1,
        pivotIndex: -1,
        currentJ: -1,
        currentI: -1,
        comparingIndices: [],
        swappedIndices:
          finalPivotPos !== currentHigh ? [finalPivotPos, currentHigh] : [],
        steps: steps + 1,
      });
      return;
    }

    // Compare current element with pivot
    if (newArray[j] <= pivot) {
      i++;
      if (i !== j) {
        // Swap elements
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        set({
          array: newArray,
          currentJ: j + 1,
          currentI: i,
          comparingIndices: [j, currentHigh],
          swappedIndices: [i, j],
          steps: steps + 1,
        });
      } else {
        // No swap needed
        set({
          currentJ: j + 1,
          currentI: i,
          comparingIndices: [j, currentHigh],
          swappedIndices: [],
          steps: steps + 1,
        });
      }
    } else {
      // Element is greater than pivot, no swap
      set({
        currentJ: j + 1,
        comparingIndices: [j, currentHigh],
        swappedIndices: [],
        steps: steps + 1,
      });
    }
  },
}));
