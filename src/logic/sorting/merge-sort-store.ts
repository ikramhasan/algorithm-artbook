import { create } from "zustand";

type MergeSortStore = {
  array: number[];
  arraySize: number;
  isRunning: boolean;
  isComplete: boolean;
  speed: number; // milliseconds between steps
  stack: {
    left: number;
    right: number;
    mid?: number;
    phase: "divide" | "merge";
  }[]; // Stack to track merge sort phases
  currentLeft: number;
  currentRight: number;
  currentMid: number;
  leftArray: number[];
  rightArray: number[];
  leftIndex: number;
  rightIndex: number;
  mergeIndex: number;
  comparingIndices: number[]; // indices being compared
  mergingIndices: number[]; // indices being merged
  divideRange: number[]; // range being divided
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

export const useMergeSortStore = create<MergeSortStore>()((set, get) => ({
  array: [],
  arraySize: 30,
  isRunning: false,
  isComplete: false,
  speed: 400, // 400ms between steps (slower than quick sort for better visualization)
  stack: [],
  currentLeft: -1,
  currentRight: -1,
  currentMid: -1,
  leftArray: [],
  rightArray: [],
  leftIndex: -1,
  rightIndex: -1,
  mergeIndex: -1,
  comparingIndices: [],
  mergingIndices: [],
  divideRange: [],
  steps: 0,

  setArray: (array) =>
    set({
      array,
      isComplete: false,
      stack:
        array.length > 1
          ? [{ left: 0, right: array.length - 1, phase: "divide" }]
          : [],
      currentLeft: -1,
      currentRight: -1,
      currentMid: -1,
      leftArray: [],
      rightArray: [],
      leftIndex: -1,
      rightIndex: -1,
      mergeIndex: -1,
      comparingIndices: [],
      mergingIndices: [],
      divideRange: [],
      steps: 0,
    }),

  setArraySize: (arraySize) => {
    const newArray = generateArrayByType(arraySize, "random");
    set({
      arraySize,
      array: newArray,
      isRunning: false,
      isComplete: false,
      stack:
        newArray.length > 1
          ? [{ left: 0, right: newArray.length - 1, phase: "divide" }]
          : [],
      currentLeft: -1,
      currentRight: -1,
      currentMid: -1,
      leftArray: [],
      rightArray: [],
      leftIndex: -1,
      rightIndex: -1,
      mergeIndex: -1,
      comparingIndices: [],
      mergingIndices: [],
      divideRange: [],
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
      stack:
        newArray.length > 1
          ? [{ left: 0, right: newArray.length - 1, phase: "divide" }]
          : [],
      currentLeft: -1,
      currentRight: -1,
      currentMid: -1,
      leftArray: [],
      rightArray: [],
      leftIndex: -1,
      rightIndex: -1,
      mergeIndex: -1,
      comparingIndices: [],
      mergingIndices: [],
      divideRange: [],
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
      stack:
        newArray.length > 1
          ? [{ left: 0, right: newArray.length - 1, phase: "divide" }]
          : [],
      currentLeft: -1,
      currentRight: -1,
      currentMid: -1,
      leftArray: [],
      rightArray: [],
      leftIndex: -1,
      rightIndex: -1,
      mergeIndex: -1,
      comparingIndices: [],
      mergingIndices: [],
      divideRange: [],
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
      stack:
        newArray.length > 1
          ? [{ left: 0, right: newArray.length - 1, phase: "divide" }]
          : [],
      currentLeft: -1,
      currentRight: -1,
      currentMid: -1,
      leftArray: [],
      rightArray: [],
      leftIndex: -1,
      rightIndex: -1,
      mergeIndex: -1,
      comparingIndices: [],
      mergingIndices: [],
      divideRange: [],
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
          newArray.length > 1
            ? [{ left: 0, right: newArray.length - 1, phase: "divide" }]
            : [],
        currentLeft: -1,
        currentRight: -1,
        currentMid: -1,
        leftArray: [],
        rightArray: [],
        leftIndex: -1,
        rightIndex: -1,
        mergeIndex: -1,
        comparingIndices: [],
        mergingIndices: [],
        divideRange: [],
        steps: 0,
      });
    }
  },

  nextStep: () => {
    const state = get();
    const {
      array,
      stack,
      currentLeft,
      currentMid,
      leftArray,
      rightArray,
      leftIndex,
      rightIndex,
      mergeIndex,
      steps,
    } = state;

    // Check if sorting is complete
    if (stack.length === 0) {
      set({
        isComplete: true,
        isRunning: false,
        comparingIndices: [],
        mergingIndices: [],
        divideRange: [],
        currentLeft: -1,
        currentRight: -1,
        currentMid: -1,
        leftArray: [],
        rightArray: [],
        leftIndex: -1,
        rightIndex: -1,
        mergeIndex: -1,
      });
      return;
    }

    const currentTask = stack[stack.length - 1];
    const { left, right, phase } = currentTask;

    if (phase === "divide") {
      // Handle divide phase
      if (left >= right) {
        // Base case - remove from stack
        const newStack = stack.slice(0, -1);
        set({
          stack: newStack,
          divideRange: [],
          steps: steps + 1,
        });
        return;
      }

      // Show the range being divided
      const mid = Math.floor((left + right) / 2);

      // Remove current task and add merge task and two divide tasks
      const newStack = stack.slice(0, -1);
      newStack.push({ left, right, mid, phase: "merge" });
      newStack.push({ left: mid + 1, right, phase: "divide" });
      newStack.push({ left, right: mid, phase: "divide" });

      set({
        stack: newStack,
        divideRange: Array.from(
          { length: right - left + 1 },
          (_, i) => left + i
        ),
        steps: steps + 1,
      });
    } else if (phase === "merge") {
      // Handle merge phase
      const mid = currentTask.mid!;

      // Initialize merge if not started
      if (currentLeft === -1) {
        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);

        set({
          currentLeft: left,
          currentRight: right,
          currentMid: mid,
          leftArray: leftArr,
          rightArray: rightArr,
          leftIndex: 0,
          rightIndex: 0,
          mergeIndex: left,
          mergingIndices: Array.from(
            { length: right - left + 1 },
            (_, i) => left + i
          ),
          comparingIndices: [],
          steps: steps + 1,
        });
        return;
      }

      // Continue merging
      const newArray = [...array];

      if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        // Compare elements from left and right arrays
        const leftVal = leftArray[leftIndex];
        const rightVal = rightArray[rightIndex];

        set({
          comparingIndices: [
            currentLeft + leftIndex,
            currentMid + 1 + rightIndex,
          ],
          steps: steps + 1,
        });

        // Choose the smaller element
        if (leftVal <= rightVal) {
          newArray[mergeIndex] = leftVal;
          set({
            array: newArray,
            leftIndex: leftIndex + 1,
            mergeIndex: mergeIndex + 1,
            comparingIndices: [],
          });
        } else {
          newArray[mergeIndex] = rightVal;
          set({
            array: newArray,
            rightIndex: rightIndex + 1,
            mergeIndex: mergeIndex + 1,
            comparingIndices: [],
          });
        }
      } else if (leftIndex < leftArray.length) {
        // Copy remaining left elements
        newArray[mergeIndex] = leftArray[leftIndex];
        set({
          array: newArray,
          leftIndex: leftIndex + 1,
          mergeIndex: mergeIndex + 1,
          comparingIndices: [],
          steps: steps + 1,
        });
      } else if (rightIndex < rightArray.length) {
        // Copy remaining right elements
        newArray[mergeIndex] = rightArray[rightIndex];
        set({
          array: newArray,
          rightIndex: rightIndex + 1,
          mergeIndex: mergeIndex + 1,
          comparingIndices: [],
          steps: steps + 1,
        });
      } else {
        // Merge complete - remove task from stack
        const newStack = stack.slice(0, -1);
        set({
          stack: newStack,
          currentLeft: -1,
          currentRight: -1,
          currentMid: -1,
          leftArray: [],
          rightArray: [],
          leftIndex: -1,
          rightIndex: -1,
          mergeIndex: -1,
          mergingIndices: [],
          comparingIndices: [],
          steps: steps + 1,
        });
      }
    }
  },
}));
