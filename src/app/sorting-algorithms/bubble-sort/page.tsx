"use client";

import React, { useEffect, useRef } from "react";
import { useBubbleSortStore } from "@/logic/sorting/bubble-sort-store";
import { cn } from "@/lib/utils";
import BubbleSortFooter from "@/components/bubble-sort/bubble-sort-footer";

const BubbleSort = () => {
  const {
    array,
    isRunning,
    isComplete,
    speed,
    comparingIndices,
    swappedIndices,
    nextStep,
    initializeArray,
  } = useBubbleSortStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize with correct array size
  useEffect(() => {
    initializeArray();
  }, [initializeArray]);

  // Auto-step when running
  useEffect(() => {
    if (!isRunning || isComplete) return;

    const interval = setInterval(() => {
      nextStep();
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, isComplete, speed, nextStep]);

  const maxValue = Math.max(...array, 1);

  return (
    <div className="absolute inset-0 border bg-accent p-4">
      <div
        ref={containerRef}
        className="h-full w-full flex items-end justify-center gap-1 overflow-x-auto"
      >
        {array.map((value, index) => {
          const isComparing = comparingIndices.includes(index);
          const isSwapped = swappedIndices.includes(index);
          const height =
            (value / maxValue) *
            ((typeof window !== "undefined" ? window.innerHeight : 600) * 0.7); // 70% of screen height
          const barWidth = Math.max(
            20,
            Math.min(
              60,
              ((typeof window !== "undefined" ? window.innerWidth : 800) *
                0.8) /
                array.length
            )
          );

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1"
              style={{ minWidth: barWidth + "px" }}
            >
              <div
                className={cn(
                  "transition-all duration-200 rounded-t-sm flex items-end justify-center text-white text-xs font-medium",
                  isSwapped
                    ? "bg-red-500"
                    : isComparing
                    ? "bg-yellow-500"
                    : isComplete
                    ? "bg-green-500"
                    : "bg-blue-500"
                )}
                style={{
                  height: Math.max(height, 30) + "px",
                  width: "100%",
                }}
              >
                <span
                  className="mb-1 select-none"
                  style={{
                    fontSize: barWidth < 30 ? "10px" : "12px",
                  }}
                >
                  {barWidth > 25 ? value : ""}
                </span>
              </div>
              {barWidth > 30 && (
                <div className="text-xs text-muted-foreground select-none">
                  {index}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <BubbleSortFooter />
    </div>
  );
};

export default BubbleSort;
