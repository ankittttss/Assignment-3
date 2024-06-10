// Stepper.tsx
import React from "react";
import "./Stepper.css";

interface StepperProps {
  steps: string[];
  currentStep: number;
  formSubmitted: boolean;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, formSubmitted }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={
            index < currentStep - 1
              ? "step completed"
              : index === currentStep - 1
              ? "step active"
              : formSubmitted // Apply green style if form has been submitted
              ? "step completed"
              : "step"
          }
        >
          {index < currentStep - 1 ? "✓" : step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
