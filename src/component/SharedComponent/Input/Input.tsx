// src/components/FormInput.tsx
import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: Control<FieldValues>;
  label: string;
  type: string;
  rules?: Record<string, any>;
  defaultValue?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type,
  rules = {},
  defaultValue = "",
}) => {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input type={type} className="inp" {...field} />
        )}
      />
    </div>
  );
};

export default FormInput;
