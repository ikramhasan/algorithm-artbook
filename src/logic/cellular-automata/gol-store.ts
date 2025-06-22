import { create } from "zustand";

type GolStore = {
  cellSize: number;
  width: number;
  height: number;
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setCell: (x: number, y: number, value: number) => void;
};

export const useGolStore = create<GolStore>()((set) => ({
  cellSize: 16, // 1rem = 16px, from w-4 h-4
  width: 100,
  height: 100,
  grid: [],
  setGrid: (grid) => set({ grid }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setCell: (x, y, value) =>
    set((state) => ({
      grid: state.grid.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, cellIndex) => (cellIndex === x ? value : cell))
          : row
      ),
    })),
}));
