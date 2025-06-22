"use client";

import { cn } from "@/lib/utils";
import { useGolStore } from "@/logic/cellular-automata/gol-store";
import React, { useEffect, useRef, useState } from "react";

// const CELL_SIZE = 16; // 1rem = 16px, from w-4 h-4

const GameOfLife = () => {
  const {
    cellSize,
    width,
    height,
    grid,
    setGrid,
    setWidth,
    setHeight,
    setCell,
  } = useGolStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const { width: containerWidth, height: containerHeight } =
        container.getBoundingClientRect();
      const newWidth = Math.floor(containerWidth / cellSize);
      const newHeight = Math.floor(containerHeight / cellSize);
      setWidth(newWidth);
      setHeight(newHeight);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [cellSize, setHeight, setWidth]);

  useEffect(() => {
    if (width > 0 && height > 0) {
      setGrid(
        Array.from({ length: height }, () =>
          Array.from({ length: width }, () => (Math.random() > 0.5 ? 0 : 0))
        )
      );
    }
  }, [width, height, setGrid]);

  return (
    <div className="absolute inset-0 border bg-accent p-4">
      <div
        ref={containerRef}
        className="h-full w-full"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsMouseDown(true);
        }}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              <button
                key={cellIndex}
                className={cn(
                  "h-4 w-4 border border-gray-300",
                  cell === 1 ? "bg-black" : "bg-white"
                )}
                onMouseDown={() => {
                  setCell(cellIndex, rowIndex, cell === 1 ? 0 : 1);
                }}
                onMouseEnter={() => {
                  if (isMouseDown) {
                    setCell(cellIndex, rowIndex, cell === 1 ? 0 : 1);
                  }
                }}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameOfLife;
