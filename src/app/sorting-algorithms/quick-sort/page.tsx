"use client";

import React, { useEffect, useRef } from "react";
import { useQuickSortStore } from "@/logic/sorting/quick-sort-store";
import { cn } from "@/lib/utils";
import QuickSortFooter from "@/components/quick-sort/quick-sort-footer";

const QuickSort = () => {
  const {
    array,
    isRunning,
    isComplete,
    speed,
    comparingIndices,
    swappedIndices,
    pivotIndex,
    currentLow,
    currentHigh,
    nextStep,
    initializeArray,
  } = useQuickSortStore();

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
          const isPivot = pivotIndex === index;
          const isInCurrentPartition =
            currentLow !== -1 &&
            currentHigh !== -1 &&
            index >= currentLow &&
            index <= currentHigh;

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

          // Determine bar color based on state
          let barColor = "bg-blue-500";
          if (isComplete) {
            barColor = "bg-green-500";
          } else if (isPivot) {
            barColor = "bg-purple-500"; // Purple for pivot
          } else if (isSwapped) {
            barColor = "bg-red-500"; // Red for swapped
          } else if (isComparing) {
            barColor = "bg-yellow-500"; // Yellow for comparing
          } else if (isInCurrentPartition) {
            barColor = "bg-orange-400"; // Orange for current partition area
          }

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1"
              style={{ minWidth: barWidth + "px" }}
            >
              <div
                className={cn(
                  "transition-all duration-200 rounded-t-sm flex items-end justify-center text-white text-xs font-medium",
                  barColor
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

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg">
        <div className="text-sm font-medium mb-2">Quick Sort Legend:</div>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Pivot Element</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Swapped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span>Current Partition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Sorted</span>
          </div>
        </div>
      </div>

      <QuickSortFooter />
    </div>
  );
};

export default QuickSort;
