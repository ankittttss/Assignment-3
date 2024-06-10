import React, { useState } from "react";
import "../ThirdFrom/ThirdFrom.css";

interface FamilyMember {
  firstName: string;
  lastName: string;
  relation: string;
  age: string;
  images: File[]; // Add an array of File objects for images
}

interface SummaryFormProps {
  personalDetails: Record<string, any>;
  familyDetails: FamilyMember[];
  uploadedImage: File | null; // Define the uploadedImage prop
  onImageUpload: (file: File, index: number) => void;
  onPrevious: () => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({
  personalDetails,
  familyDetails,
  onImageUpload,
  onPrevious,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[][]>(
    Array.from({ length: familyDetails.length }, () => [])
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = previews; // Update the previews for the current family member
      setImagePreviews(updatedPreviews);
      files.forEach((file) => {
        onImageUpload(file, index); // Call onImageUpload for each file
      });
    }
  };

  return (
    <div className="summary-form">
      <h2>Summary</h2>
      <h3>Personal Details</h3>
      {/* Render personal details */}
      <h3>Family Details</h3>
      {familyDetails.map((member, index) => (
        <div key={index}>
          <h4>Family Member {index + 1}</h4>
          <p>
            <strong>First Name:</strong> {member.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {member.lastName}
          </p>
          <p>
            <strong>Relation:</strong> {member.relation}
          </p>
          <p>
            <strong>Age:</strong> {member.age}
          </p>
          {/* Upload image functionality for each family member */}
          <h3>Upload Image</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e, index)}
          />
          {/* Display image previews */}
          {imagePreviews[index].map((preview, i) => (
            <img
              key={i}
              src={preview}
              alt={`Family Member ${index + 1} Image ${i + 1}`}
              className="image-preview"
            />
          ))}
          <hr />
        </div>
      ))}
      {/* Previous button */}
      <button onClick={onPrevious} className="previous-button">
        Previous
      </button>
    </div>
  );
};

export default SummaryForm;
