import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./PersonalDetails.css";
import FormInput from "../SharedComponent/Input/Input";

import { useContext } from "react";
import { CounterContext } from "../Context/Context";

interface PersonalDetailsFormProps {
  onSubmit: (data: Record<string, any>) => void;
  defaultValues: Record<string, any>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultValues,
    mode: "onTouched",
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const counterstate = useContext(CounterContext);
  console.log(counterstate);

  const validateDOB = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    return (
      selectedDate <= currentDate || "Date of Birth cannot be in the future"
    );
  };

  const watchDOB = watch("dob"); // Watching the 'dob' field

  const validateAge = (value: string) => {
    if (!watchDOB) return true;
    const dob = new Date(watchDOB);
    const currentDate = new Date();
    let yearsDifference = currentDate.getFullYear() - dob.getFullYear();
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      yearsDifference--;
    }
    const age = parseInt(value);
    return yearsDifference === age;
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="personal-details-form"
    >
      <h2>Personal Details</h2>
      <div className="form-group">
        {/* Make common input */}
        <FormInput
          name="firstName"
          control={control}
          label="First Name"
          type="text"
          rules={{ required: "First Name is required" }}
          defaultValue={defaultValues.firstName}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message as string}</p>
        )}
      </div>
      <div className="form-group">
        <FormInput
          name="lastName"
          control={control}
          label="Last Name"
          type="text"
          rules={{ required: "Last Name is required" }}
          defaultValue={defaultValues.lastName}
        />
        {errors.lastName && (
          <p className="error">{errors.lastName.message as string}</p>
        )}
      </div>
      <div className="form-group">
        <FormInput
          name="age"
          control={control}
          label="age"
          type="text"
          rules={{ required: "Age is required", validate: validateAge }}
          defaultValue={defaultValues.age}
        />
        {errors.age && <p className="error">{errors.age.message as string}</p>}
      </div>
      <div className="form-group">
        <label className="label">Date of Birth</label>
        <Controller
          control={control}
          name="dob"
          rules={{
            required: "Date of Birth is required",
            validate: validateDOB,
          }}
          render={({ field }) => (
            <input type="date" className="inp" {...field} />
          )}
        />
        {errors.dob && <p className="error">{errors.dob.message as string}</p>}
      </div>
      <div className="form-group">
        <label className="label">Gender</label>
        {/* Common select */}
        <Controller
          control={control}
          name="gender"
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <select className="inp" {...field}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
        {/* same */}
        {errors.gender && (
          <p className="error">{errors.gender.message as string}</p>
        )}
      </div>
      {/* same */}
      <button type="submit" className="nxt">
        Next
      </button>
    </form>
  );
};

export default PersonalDetailsForm;
