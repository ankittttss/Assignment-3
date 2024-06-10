import React from "react";

interface DetailsProps {
  personalDetails: Record<string, any>;
  familyDetails: { firstName: string; lastName: string; relation: string; age: string; images: File[] }[];
}

const SummaryDetails: React.FC<DetailsProps> = ({ personalDetails, familyDetails }) => {
  return (
    <div className="details">
      {/* Render personal details */}
      <h3>Personal Details</h3>
      {Object.entries(personalDetails).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
      {/* Render family details */}
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
          {/* Render images for each family member */}
          {member.images.map((image, i) => (
            <div key={i}>
              <img src={URL.createObjectURL(image)} alt={`Family Member ${index + 1} Image ${i + 1}`} className="image-preview" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SummaryDetails;
