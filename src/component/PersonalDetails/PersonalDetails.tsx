import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './PersonalDetails.css';

interface PersonalDetailsFormProps {
  onSubmit: (data: Record<string, any>) => void; // Function to submit details
  defaultValues: Record<string, any>; // Add defaultValues prop
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues // Set default values here
  });
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const handleFormSubmit = (data: any) => {  // It will validate the data 
    if (validateForm(data)) {
      onSubmit(data);
    }
  };

  const validateForm = (data: any) => {
    let isValid = true;
    const errors: { [key: string]: string | undefined } = {};

    // First Name validation
    if (!data.firstName) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }

    // Last Name validation
    if (!data.lastName) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }

    // Age validation
    if (!data.age) {
      errors.age = 'Age is required';
      isValid = false;
    } else if (parseInt(data.age) < 18) {
      errors.age = 'Age must be at least 18';
      isValid = false;
    }

    // Date of Birth validation
    if (!data.dob) {
      errors.dob = 'Date of Birth is required';
      isValid = false;
    }

    // Gender validation
    if (!data.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="personal-details-form">
      <h2>Personal Details</h2>
      <div className="form-group">
        <label className='label'>First Name</label>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => <input className='inp' {...field} />}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div className="form-group">
        <label className='label'>Last Name</label>
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => <input className='inp' {...field} />}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>
      <div className="form-group">
        <label className='label'>Age</label>
        <Controller
          control={control}
          name="age"
          render={({ field }) => <input type="number" className='inp' {...field} />}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className="form-group">
        <label className='label'>Date of Birth</label>
        <Controller
          control={control}
          name="dob"
          render={({ field }) => <input type="date" className='inp' {...field} />}
        />
        {errors.dob && <p className="error">{errors.dob}</p>}
      </div>
      <div className="form-group">
        <label className='label'>Gender</label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <select className='inp' {...field}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>
      <button type="submit" className='nxt'>Next</button>
    </form>
  );
};

export default PersonalDetailsForm;
