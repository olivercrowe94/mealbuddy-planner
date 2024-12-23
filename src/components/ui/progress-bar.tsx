import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function ProgressBar({ steps, currentStep, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Progress bar */}
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              "flex flex-col items-center space-y-2",
              index <= currentStep
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              )}
            >
              {index + 1}
            </div>
            <span className="text-sm font-medium hidden md:block">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}