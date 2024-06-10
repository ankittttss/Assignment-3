import React from "react";
import "./FinalComponent.css"; // Import the CSS file

interface FamilyMember {
  firstName: string;
  lastName: string;
  relation: string;
  age: string;
  images: File[];
}

interface AllDetailsSummaryProps {
  personalDetails: Record<string, any>;
  familyDetails: FamilyMember[];
  uploadedImages: Array<File[]>;
}

const AllDetailsSummary: React.FC<AllDetailsSummaryProps> = ({
  personalDetails,
  familyDetails,
  uploadedImages,
}) => {
  return (
    <div className="all-details-summary"> {/* Add the class here */}
      <h2>All Details Summary</h2>
      <h3>Personal Details</h3>
      <p><strong>First Name:</strong> {personalDetails.firstName}</p>
      <p><strong>Last Name:</strong> {personalDetails.lastName}</p>
      <p><strong>Age:</strong> {personalDetails.age}</p>
      <p><strong>Date of Birth:</strong> {personalDetails.dob}</p>
      <p><strong>Gender:</strong> {personalDetails.gender}</p>
      <h3>Family Details</h3>
      {familyDetails.map((member, index) => (
        <div key={index} className="family-member"> {/* Add the class here */}
          <h4>Family Member {index + 1}</h4>
          <p><strong>First Name:</strong> {member.firstName}</p>
          <p><strong>Last Name:</strong> {member.lastName}</p>
          <p><strong>Relation:</strong> {member.relation}</p>
          <p><strong>Age:</strong> {member.age}</p>
          <h3>Uploaded Images</h3>
          <div className="uploaded-images"> {/* Add the class here */}
            {uploadedImages[index]?.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`Family Member ${index + 1} Image ${i + 1}`}
                className="image-preview"
              />
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllDetailsSummary;
