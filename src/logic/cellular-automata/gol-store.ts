import { create } from "zustand";

type GolStore = {
  width: number;
  height: number;
  isRunning: boolean;
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setCell: (x: number, y: number, value: number) => void;
  resetGrid: () => void;
  setIsRunning: () => void;
};

export const useGolStore = create<GolStore>()((set) => ({
  width: 100,
  height: 100,
  isRunning: false,
  grid: [],
  resetGrid: () =>
    set({
      grid: Array.from({ length: 100 }, () =>
        Array.from({ length: 100 }, () => 0)
      ),
    }),
  setGrid: (grid) => set({ grid }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setCell: (x, y, value) =>
    set((state) => ({
      grid: state.grid.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, cellIndex) => (cellIndex === x ? value : cell))
          : row
      ),
    })),
}));
