// Pattern definitions - relative coordinates from top-left

export const patterns = {
  glider: [
    [0, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  pulsar: [
    // Top part
    [2, 0],
    [3, 0],
    [4, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [0, 2],
    [5, 2],
    [7, 2],
    [12, 2],
    [0, 3],
    [5, 3],
    [7, 3],
    [12, 3],
    [0, 4],
    [5, 4],
    [7, 4],
    [12, 4],
    [2, 5],
    [3, 5],
    [4, 5],
    [8, 5],
    [9, 5],
    [10, 5],
    // Middle gap
    [2, 7],
    [3, 7],
    [4, 7],
    [8, 7],
    [9, 7],
    [10, 7],
    [0, 8],
    [5, 8],
    [7, 8],
    [12, 8],
    [0, 9],
    [5, 9],
    [7, 9],
    [12, 9],
    [0, 10],
    [5, 10],
    [7, 10],
    [12, 10],
    // Bottom part
    [2, 12],
    [3, 12],
    [4, 12],
    [8, 12],
    [9, 12],
    [10, 12],
  ],
  blinker: [
    // Simple period-2 oscillator - alternates between horizontal and vertical
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  beacon: [
    [0, 0],
    [1, 0],
    [0, 1],
    [3, 2],
    [2, 3],
    [3, 3],
  ],
  // Logic gates as patterns
  andGate: [
    // Input A
    [0, 2],
    // Input B
    [0, 4],
    // Gate logic (simplified representation)
    [2, 2],
    [3, 2],
    [2, 3],
    [3, 3],
    [2, 4],
    [3, 4],
    // Output line
    [5, 3],
  ],
  orGate: [
    // Input A
    [0, 2],
    // Input B
    [0, 4],
    // Gate logic
    [2, 2],
    [3, 2],
    [4, 2],
    [2, 3],
    [4, 3],
    [2, 4],
    [3, 4],
    [4, 4],
    // Output
    [6, 3],
  ],
  xorGate: [
    // Input A
    [0, 1],
    // Input B
    [0, 5],
    // Gate representation
    [2, 1],
    [3, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [2, 4],
    [3, 4],
    [2, 5],
    // Output
    [6, 3],
  ],
  notGate: [
    // Input
    [0, 2],
    // Gate
    [2, 1],
    [3, 1],
    [2, 2],
    [4, 2],
    [2, 3],
    [3, 3],
    // Output (inverted)
    [6, 2],
  ],
  nandGate: [
    // Combination of AND + NOT
    [0, 2],
    [0, 4], // Inputs
    [2, 2],
    [3, 2],
    [2, 3],
    [3, 3],
    [2, 4],
    [3, 4], // AND part
    [5, 2],
    [6, 2],
    [5, 3],
    [5, 4], // NOT part
    [8, 3], // Output
  ],
  norGate: [
    // Combination of OR + NOT
    [0, 2],
    [0, 4], // Inputs
    [2, 2],
    [3, 2],
    [4, 2],
    [2, 3],
    [4, 3],
    [2, 4],
    [3, 4],
    [4, 4], // OR part
    [6, 2],
    [7, 2],
    [6, 3],
    [6, 4], // NOT part
    [9, 3], // Output
  ],
  xnorGate: [
    // Combination of XOR + NOT
    [0, 1],
    [0, 5], // Inputs
    [2, 1],
    [3, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [2, 4],
    [3, 4],
    [2, 5], // XOR part
    [6, 2],
    [7, 2],
    [6, 3],
    [6, 4], // NOT part
    [9, 3], // Output
  ],
  gliderGun: [
    // Gosper Glider Gun - produces gliders periodically (period 30)
    // Left square
    [1, 5],
    [1, 6],
    [2, 5],
    [2, 6],
    // Left part of gun
    [11, 5],
    [11, 6],
    [11, 7],
    [12, 4],
    [12, 8],
    [13, 3],
    [13, 9],
    [14, 3],
    [14, 9],
    [15, 6],
    [16, 4],
    [16, 8],
    [17, 5],
    [17, 6],
    [17, 7],
    [18, 6],
    // Right part of gun
    [21, 3],
    [21, 4],
    [21, 5],
    [22, 3],
    [22, 4],
    [22, 5],
    [23, 2],
    [23, 6],
    [25, 1],
    [25, 2],
    [25, 6],
    [25, 7],
    // Right square
    [35, 3],
    [35, 4],
    [36, 3],
    [36, 4],
  ],
  eater: [
    // Eater 1 with approaching glider - demonstrates eating in action
    // Eater pattern
    [20, 15],
    [21, 15],
    [20, 16],
    [22, 16],
    [22, 17],
    [22, 18],
    [23, 18],
    // Glider positioned to hit the eater (adjusted for precise collision)
    [11, 5],
    [12, 6],
    [10, 7],
    [11, 7],
    [12, 7],
  ],
  acorn: [
    // Acorn - famous methuselah that stabilizes after 5206 generations
    [1, 0],
    [3, 1],
    [0, 2],
    [1, 2],
    [4, 2],
    [5, 2],
    [6, 2],
  ],
};
