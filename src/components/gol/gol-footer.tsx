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
import { ArrowRight, Pause, Play, Undo } from "lucide-react";
import { useGolStore } from "@/logic/cellular-automata/gol-store";

const GolFooter = () => {
  const { width, height, setGrid, setIsRunning, isRunning, resetGrid } =
    useGolStore();

  return (
    <div className="absolute bottom-4 right-4 flex gap-2 bg-gray-500 w-fit p-4 rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="rounded-full">
            Fill
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setGrid(
                  Array.from({ length: height }, () =>
                    Array.from({ length: width }, () =>
                      Math.random() > 0.5 ? 1 : 0
                    )
                  )
                );
              }}
            >
              Random
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Logic Gates</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>AND Gate</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button className="rounded-full" onClick={setIsRunning}>
        {isRunning ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
      <Button className="rounded-full" disabled={isRunning}>
        <ArrowRight className="w-4 h-4" />
      </Button>
      <Button className="rounded-full" onClick={resetGrid}>
        <Undo className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default GolFooter;
