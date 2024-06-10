// Stepper.tsx
import React from "react";
import "./Stepper.css";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={index < currentStep - 1 ? "step completed" : index === currentStep - 1 ? "step active" : "step"}
        >
          {index < currentStep - 1 ? "✓" : step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
