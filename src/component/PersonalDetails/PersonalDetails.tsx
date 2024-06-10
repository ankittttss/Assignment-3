import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './PersonalDetails.css';

interface PersonalDetailsFormProps {
  onSubmit: (data: Record<string, any>) => void;
  defaultValues: Record<string, any>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    mode: 'onTouched'
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const validateDOB = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    return selectedDate <= currentDate || "Date of Birth cannot be in the future";
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="personal-details-form">
      <h2>Personal Details</h2>
      <div className="form-group">
        <label className='label'>First Name</label>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First Name is required" }}
          render={({ field }) => <input className='inp' {...field} />}
        />
        {errors.firstName && (
          <p className="error">
            {errors.firstName.message as string}
          </p>
        )}
      </div>
      <div className="form-group">
        <label className='label'>Last Name</label>
        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Last Name is required" }}
          render={({ field }) => <input className='inp' {...field} />}
        />
        {errors.lastName && (
          <p className="error">
            {errors.lastName.message as string}
          </p>
        )}
      </div>
      <div className="form-group">
        <label className='label'>Age</label>
        <Controller
          control={control}
          name="age"
          rules={{
            required: "Age is required",
            min: { value: 1, message: "Age must be at least 1" },
            max: { value: 120, message: "Age must be less than or equal to 120" }
          }}
          render={({ field }) => <input type="number" className='inp' {...field} />}
        />
        {errors.age && (
          <p className="error">
            {errors.age.message as string}
          </p>
        )}
      </div>
      <div className="form-group">
        <label className='label'>Date of Birth</label>
        <Controller
          control={control}
          name="dob"
          rules={{ 
            required: "Date of Birth is required",
            validate: validateDOB
          }}
          render={({ field }) => <input type="date" className='inp' {...field} />}
        />
        {errors.dob && (
          <p className="error">
            {errors.dob.message as string}
          </p>
        )}
      </div>
      <div className="form-group">
        <label className='label'>Gender</label>
        <Controller
          control={control}
          name="gender"
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <select className='inp' {...field}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
        {errors.gender && (
          <p className="error">
            {errors.gender.message as string}
          </p>
        )}
      </div>
      <button type="submit" className='nxt'>Next</button>
    </form>
  );
};

export default PersonalDetailsForm;
