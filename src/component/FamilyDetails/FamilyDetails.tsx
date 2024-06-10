// FamilyDetailsForm.tsx

import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import "./FamilyDetails.css";

interface FamilyMember {
  // Structure of Input //
  firstName: string;
  lastName: string;
  relation: string;
  age: string;
}

interface FormValues {
  familyMembers: FamilyMember[];
}

interface FamilyDetailsFormProps {
  // Interface of our props//
  onSubmit: (data: FormValues) => void;
  onPrevious: () => void;
  defaultValues: Record<string, any>;
}

const FamilyDetailsForm: React.FC<FamilyDetailsFormProps> = ({
  onSubmit,
  onPrevious,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // Initialises the form state and methods provided//
    defaultValues,
    mode:'onTouched'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  useEffect(() => {
    // Ensure the first family member field is always shown by default
    if (fields.length === 0) {
      append({ firstName: "", lastName: "", relation: "", age: "" });
    }
  }, [fields, append]);

  const onSubmitForm = (data: FormValues) => {
    const formattedData = {
      familyMembers: data.familyMembers.map((member) => ({
        ...member,
        age: parseInt(member.age, 10).toString(),
      })),
    };
    onSubmit(formattedData);
  };

  const handleAddField = () => {
    append({ firstName: "", lastName: "", relation: "", age: "" });
    // setAppenddd(appendd+1);
  };

  const handleRemoveField = (index: number) => {
    // Ensure that the first family member field cannot be removed
    if (index !== 0) {
      remove(index);
      // setAppenddd(appendd-1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="family-details-form">
      <h2>Family Details</h2>
      {fields.map((member, index) => (
        <div key={member.id} className="family-details-row">
          <div className="form-group">
            <label className="label">First Name</label>
            <Controller
              control={control}
              name={`familyMembers.${index}.firstName`}
              rules={{ required: "First Name is required" }}
              render={({ field }) => <input {...field} className="inp" />}
            />
            {errors.familyMembers?.[index]?.firstName && (
              <p className="error">
                {errors.familyMembers[index]?.firstName?.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="label">Last Name</label>
            <Controller
              control={control}
              name={`familyMembers.${index}.lastName`}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => <input {...field} className="inp" />}
            />
            {errors.familyMembers?.[index]?.lastName && (
              <p className="error">
                {errors.familyMembers[index]?.lastName?.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="label">Relation</label>
            <Controller
              control={control}
              name={`familyMembers.${index}.relation`}
              rules={{ required: "Relation is required" }}
              render={({ field }) => <input {...field} className="inp" />}
            />
            {errors.familyMembers?.[index]?.relation && (
              <p className="error">
                {errors.familyMembers[index]?.relation?.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="label">Age</label>
            <Controller
              control={control}
              name={`familyMembers.${index}.age`}
              rules={{
                required: "Age is required",
                min: { value: 1, message: "Age must be a positive number" },
                max: { value: 100, message: "Age must be less than 100" }, // Corrected validation rule
                validate: (value) => {
                  const age = parseInt(value, 10);
                  return (
                    (Number.isInteger(age) && age > 0 && age < 100) ||
                    "Age must be a positive integer and less than 100"
                  );
                },
              }}
              render={({ field }) => (
                <input {...field} type="text" className="inp" />
              )}
            />
            {errors.familyMembers?.[index]?.age && (
              <p className="error">
                {errors.familyMembers[index]?.age?.message}
              </p>
            )}
          </div>
          {index !== 0 && ( // Only show Remove button for fields other than the first one
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="remove-button"
            >
              Remove
            </button>
          )}
          <hr />
        </div>
      ))}
      <button type="button" onClick={handleAddField} className="add-button">
        + Add Family Member
      </button>
      <button type="submit" className="submit-button">
        Next
      </button>
      <button type="button" onClick={onPrevious} className="previous-button">
        Previous
      </button>
    </form>
  );
};

export default FamilyDetailsForm;
