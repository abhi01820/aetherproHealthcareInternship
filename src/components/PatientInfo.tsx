"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import './PatientInfo.css';
import { useEHR } from "@/context/EHRContext";

interface FieldProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, value, onChange, disabled }) => (
  <div className="flex items-center">
    <label className="text-sm font-bold w-28">{label}:</label>
    <input
      type="text"
      name={name}
      value={value ?? ""}
      onChange={onChange}
      disabled={disabled}
      className={`border p-1 rounded flex-grow ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
    />
  </div>
);

const PatientInfo: React.FC = () => {
  const { patient, setPatient } = useEHR();
  const [localPatient, setLocalPatient] = useState(patient);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ["age", "patientId", "visitId", "nationalId", "insuranceId"];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;
    setLocalPatient({ ...localPatient, [name]: parsedValue });
  };

  useEffect(() => {
    setLocalPatient(patient);
  }, [patient]);

  return (
    <div className="patient-info-bar">
      <div className="grid grid-cols-6 gap-4">
        <Field label="Patient Name" name="name" value={localPatient.name} disabled={false} onChange={handleChange} />
        <Field label="Gender" name="gender" value={localPatient.gender} disabled={false} onChange={handleChange} />
        <Field label="Age" name="age" value={localPatient.age} disabled={false} onChange={handleChange} />
        <Field label="NAT ID" name="nationalId" value={localPatient.nationalId} disabled={false} onChange={handleChange} />
        <Field label="Nationality" name="nationality" value={localPatient.nationality} disabled={false} onChange={handleChange} />
        <Field label="Insurance" name="insurance" value={localPatient.insurance} disabled={false} onChange={handleChange} />
      </div>
    </div>
  );
};

export default PatientInfo;
