// MultiStepForm.tsx
import React, { useState } from "react";
import PersonalDetailsForm from "../src/component/PersonalDetails/PersonalDetails";
import FamilyDetailsForm from "../src/component/FamilyDetails/FamilyDetails";
import SummaryForm from "../src/component/ThirdFrom/ThirdForm";
import Stepper from "../src/component/SharedComponent/Stepper/Stepper";
import "./App.css";

const steps = ["PersonalDetails", "FamilyDetails", "ImageUploading"]; // Used In Stepper to identify at what page we are

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1); 
  const [personalDetails, setPersonalDetails] = useState({});
  const [familyDetails, setFamilyDetails] = useState([]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission status

  const handlePersonalDetailsSubmit = (data: any) => {
    setPersonalDetails(data);
    setStep(2);
  };

  const handleFamilyDetailsSubmit = (data: any) => {
    setFamilyDetails(data.familyMembers);
    setStep(3);
  };

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleFinalSubmit = () =>{
    setFormSubmitted(true); // Set form submission status to true upon final submission
    setStep(4);
  }

  return (
    <div className="multi-step-form">
      <Stepper steps={steps} currentStep={step} formSubmitted={formSubmitted} />
      {step === 1 && (
        <PersonalDetailsForm
          onSubmit={handlePersonalDetailsSubmit}
          defaultValues={personalDetails}
        />
      )}
      {step === 2 && (
        <FamilyDetailsForm
          onSubmit={handleFamilyDetailsSubmit}
          onPrevious={handlePrevious}
          defaultValues={{ familyMembers: familyDetails }}
        />
      )}
      {step === 3 && (
        <SummaryForm
          personalDetails={personalDetails}
          familyDetails={familyDetails}
          uploadedImage={uploadedImage}
          onImageUpload={handleImageUpload}
          onPrevious={handlePrevious}
          onSubmit={handleFinalSubmit} // Pass the onSubmit handler to SummaryForm
        />
      )}
    </div>
  );
};

export default MultiStepForm;
