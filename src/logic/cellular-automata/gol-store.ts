import { create } from "zustand";

type GolStore = {
  width: number;
  height: number;
  isRunning: boolean;
  speed: number; // milliseconds between steps
  grid: number[][];
  generation: number;
  setGrid: (grid: number[][]) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setCell: (x: number, y: number, value: number) => void;
  resetGrid: () => void;
  setIsRunning: () => void;
  setSpeed: (speed: number) => void;
  nextStep: () => void;
  countNeighbors: (x: number, y: number, grid: number[][]) => number;
};

const countNeighbors = (x: number, y: number, grid: number[][]): number => {
  let count = 0;
  const height = grid.length;
  const width = grid[0]?.length || 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue; // Skip the cell itself

      const newX = x + dx;
      const newY = y + dy;

      // Check bounds
      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        count += grid[newY][newX];
      }
    }
  }

  return count;
};

export const useGolStore = create<GolStore>()((set, get) => ({
  width: 100,
  height: 100,
  isRunning: false,
  speed: 100, // 100ms between steps
  grid: [],
  generation: 0,
  resetGrid: () =>
    set({
      grid: Array.from({ length: 100 }, () =>
        Array.from({ length: 100 }, () => 0)
      ),
      generation: 0,
    }),
  setGrid: (grid) => set({ grid }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setSpeed: (speed) => set({ speed }),
  setCell: (x, y, value) =>
    set((state) => ({
      grid: state.grid.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, cellIndex) => (cellIndex === x ? value : cell))
          : row
      ),
    })),
  countNeighbors: (x, y, grid) => countNeighbors(x, y, grid),
  nextStep: () => {
    const state = get();
    const { grid, width, height } = state;

    if (grid.length === 0) return;

    const newGrid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0)
    );

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const neighbors = countNeighbors(x, y, grid);
        const currentCell = grid[y][x];

        // Conway's Game of Life rules:
        // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
        // 2. Any live cell with two or three live neighbors lives on to the next generation
        // 3. Any live cell with more than three live neighbors dies (overpopulation)
        // 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

        if (currentCell === 1) {
          // Live cell
          if (neighbors < 2) {
            newGrid[y][x] = 0; // Dies from underpopulation
          } else if (neighbors === 2 || neighbors === 3) {
            newGrid[y][x] = 1; // Survives
          } else {
            newGrid[y][x] = 0; // Dies from overpopulation
          }
        } else {
          // Dead cell
          if (neighbors === 3) {
            newGrid[y][x] = 1; // Becomes alive through reproduction
          }
        }
      }
    }

    set((state) => ({
      grid: newGrid,
      generation: state.generation + 1,
    }));
  },
}));
