"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Pause,
  Play,
  Undo,
  Gauge,
  Hash,
  Shuffle,
} from "lucide-react";
import { useMergeSortStore } from "@/logic/sorting/merge-sort-store";

const MergeSortFooter = () => {
  const {
    arraySize,
    isRunning,
    isComplete,
    speed,
    steps,
    setArraySize,
    setIsRunning,
    setSpeed,
    nextStep,
    resetSort,
    generateArray,
  } = useMergeSortStore();

  const speedOptions = [
    { label: "Very Slow", value: 1000 },
    { label: "Slow", value: 600 },
    { label: "Normal", value: 400 },
    { label: "Fast", value: 200 },
    { label: "Very Fast", value: 100 },
    { label: "Ultra Fast", value: 50 },
  ];

  const arraySizeOptions = [
    { label: "Small (20)", value: 20 },
    { label: "Medium (30)", value: 30 },
    { label: "Large (40)", value: 40 },
    { label: "XL (50)", value: 50 },
  ];

  const currentSpeedLabel =
    speedOptions.find((option) => option.value === speed)?.label || "Custom";

  const currentSizeLabel =
    arraySizeOptions.find((option) => option.value === arraySize)?.label ||
    `Custom (${arraySize})`;

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      {/* Stats counter */}
      <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm self-end">
        Steps: {steps} | Size: {arraySize} |{" "}
        {isComplete ? "Complete!" : isRunning ? "Running" : "Stopped"}
      </div>

      <div className="flex gap-2 bg-gray-500 w-fit p-4 rounded-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="rounded-full active:scale-95 transition-transform duration-50"
              disabled={isRunning}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Generate Array</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => generateArray("random")}>
                Random
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateArray("reverse")}>
                Reverse Sorted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateArray("sorted")}>
                Already Sorted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateArray("nearly")}>
                Nearly Sorted
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="rounded-full active:scale-95 transition-transform duration-50"
              disabled={isRunning}
            >
              <Hash className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuLabel>Size: {currentSizeLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {arraySizeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setArraySize(option.value)}
                  className={arraySize === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="rounded-full active:scale-95 transition-transform duration-50"
            >
              <Gauge className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuLabel>Speed: {currentSpeedLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {speedOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSpeed(option.value)}
                  className={speed === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className="rounded-full active:scale-95 transition-transform duration-50"
          onClick={setIsRunning}
          disabled={isComplete}
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          className="rounded-full active:scale-95 transition-transform duration-50"
          disabled={isRunning || isComplete}
          onClick={nextStep}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Button
          className="rounded-full active:scale-95 transition-transform duration-50"
          onClick={resetSort}
        >
          <Undo className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MergeSortFooter;
