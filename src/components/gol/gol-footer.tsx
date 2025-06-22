"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowRight, Pause, Play, Undo, Gauge } from "lucide-react";
import { useGolStore } from "@/logic/cellular-automata/gol-store";

const GolFooter = () => {
  const {
    setIsRunning,
    isRunning,
    resetGrid,
    nextStep,
    speed,
    setSpeed,
    generation,
    fillPattern,
  } = useGolStore();

  const speedOptions = [
    { label: "Very Slow", value: 1000 },
    { label: "Slow", value: 500 },
    { label: "Normal", value: 200 },
    { label: "Fast", value: 100 },
    { label: "Very Fast", value: 50 },
    { label: "Ultra Fast", value: 25 },
  ];

  const currentSpeedLabel =
    speedOptions.find((option) => option.value === speed)?.label || "Custom";

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      {/* Generation counter */}
      <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm self-end">
        Generation: {generation}
      </div>

      <div className="flex gap-2 bg-gray-500 w-fit p-4 rounded-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="rounded-full active:scale-95 transition-transform duration-50"
            >
              Fill
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => fillPattern("random")}>
                Random
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Patterns</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => fillPattern("glider")}>
                Glider
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fillPattern("pulsar")}>
                Pulsar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fillPattern("beacon")}>
                Beacon
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Logic Gates</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem disabled onClick={() => fillPattern("andGate")}>
                AND Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => fillPattern("orGate")}>
                OR Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => fillPattern("xorGate")}>
                XOR Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => fillPattern("notGate")}>
                NOT Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => fillPattern("nandGate")}>
                NAND Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => fillPattern("norGate")}>
                NOR Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => fillPattern("xnorGate")}>
                XNOR Gate
                <DropdownMenuShortcut>In progress</DropdownMenuShortcut>
              </DropdownMenuItem>
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
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          className="rounded-full active:scale-95 transition-transform duration-50"
          disabled={isRunning}
          onClick={nextStep}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Button
          className="rounded-full active:scale-95 transition-transform duration-50"
          onClick={resetGrid}
        >
          <Undo className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default GolFooter;
