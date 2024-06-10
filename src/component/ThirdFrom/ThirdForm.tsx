import React, { useState } from "react";
import SummaryDetails from "../FinalComponent/FinalComponent";
import "../ThirdFrom/ThirdFrom.css";

// type
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
  uploadedImage: File | null;
  onImageUpload: (file: File, index: number) => void;
  onPrevious: () => void;
  onSubmit: () => void; // Add onSubmit prop
}
const SummaryForm: React.FC<SummaryFormProps> = ({
  personalDetails,
  familyDetails,
  onImageUpload,
  onPrevious,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[][]>(
    Array.from({ length: familyDetails?.length || 0 }, () => [])
  );
  const [submitted, setSubmitted] = useState(false);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<boolean[]>(
    Array.from({ length: familyDetails?.length || 0 }, () => false)
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = previews;
      setImagePreviews(updatedPreviews);
      setImagesUploaded((prevImagesUploaded) => {
        const newImagesUploaded = [...prevImagesUploaded];
        newImagesUploaded[index] = true;
        return newImagesUploaded;
      });
      files.forEach((file) => {
        onImageUpload(file, index);
      });
    }
  };

  console.log(familyDetails)

  const handleSubmit = () => {
    if (imagesUploaded.some((uploaded) => !uploaded)) {
      setImageErrors(["Please upload at least one image for each family member"]);
      return;
    }
    setSubmitted(true);
  };

  // use form
  return (
    <div className="summary-form">
      {!submitted ? (
        <>
          {/* Render form details */}
          <h2>Summary</h2>
          <h3>Personal Details</h3>
          {Object.entries(personalDetails).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}

          <h3>Family Details</h3>
          {familyDetails.map((member, index) => (
            <div key={index} className="family-member">
              <div className="member-details">
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
              </div>
              {/* Upload image functionality for each family member */}
              <div className="image-container">
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
              </div>
            </div>
          ))}
          {/* Display image upload errors */}
          {imageErrors.length > 0 && (
            <div className="error">
              {imageErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          {/* Previous button */}
          <button onClick={onPrevious} className="prev-button">
            Previous
          </button>
          {/* Submit button */}
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </>
      ) : (
        // Render summary details after submission
        <div className="summary-form">
          <h2>Final Data</h2>
          <h3>Personal Details</h3>
          {Object.entries(personalDetails).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
{/* make it common */}
          <h3>Family Details</h3>
          {familyDetails.map((member, index) => (
            <div key={index} className="family-member">
              <div className="member-details">
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
              </div>
              {/* Display image previews */}
              <div className="image-container">
                {imagePreviews[index].map((preview, i) => (
                  <img
                    key={i}
                    src={preview}
                    alt={`Family Member ${index + 1} Image ${i + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
