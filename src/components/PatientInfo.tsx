"use client";

import React, { useState, useEffect } from "react";
import { useEHR } from "@/context/EHRContext";

const PatientInfo = () => {
  const { patient, setPatient } = useEHR();
  const [localPatient, setLocalPatient] = useState(patient);
  const [isEditing, setIsEditing] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // Convert numeric fields properly
  const numericFields = ["age", "patientId", "visitId", "nationalId", "insuranceId"];
  const parsedValue = numericFields.includes(name) ? Number(value) : value;

  setLocalPatient({ ...localPatient, [name]: parsedValue });
};

  const handleSave = () => {
    setPatient(localPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalPatient(patient);
    setIsEditing(false);
  };

  useEffect(() => {
    setLocalPatient(patient);
  }, [patient]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md border">
      {/* Patient Info Header */}
      <h2 className="text-blue-600 text-lg font-semibold border-b pb-2 mb-4">Patient Information</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Field label="Name" name="name" value={localPatient.name} disabled={!isEditing} onChange={handleChange} />
        <Field label="DOB" name="dob" value={localPatient.dob} disabled={!isEditing} onChange={handleChange} />
        <Field label="Gender" name="gender" value={localPatient.gender} disabled={!isEditing} onChange={handleChange} />
        <Field label="Age" name="age" value={localPatient.age} disabled={!isEditing} onChange={handleChange} />
        <Field label="Patient ID" name="patientId" value={localPatient.patientId} disabled={!isEditing} onChange={handleChange} />
        <Field label="Visit ID" name="visitId" value={localPatient.visitId} disabled={!isEditing} onChange={handleChange} />
        <Field label="National ID" name="nationalId" value={localPatient.nationalId} disabled={!isEditing} onChange={handleChange} />
        

      </div>

      {/* Insurance Details */}
      <h2 className="text-blue-600 text-lg font-semibold border-b pb-2 mb-4">Insurance Details</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Field label="Insurance" name="insurance" value={localPatient.insurance} disabled={!isEditing} onChange={handleChange} />
        <Field label="Payer" name="payer" value={localPatient.payer} disabled={!isEditing} onChange={handleChange} />
        <Field label="Insurance Card" name="insuranceId" value={localPatient.insuranceId?.toString()} disabled={!isEditing} onChange={handleChange} />
      </div>

      {/* Vitals Section */}
<h2 className="text-blue-600 text-lg font-semibold border-b pb-2 mb-4">Vitals</h2>
<div className="grid grid-cols-2 gap-4 mb-6">
  <Field label="Temperature (°C)" name="temperature" value={localPatient.temperature} disabled={!isEditing} onChange={handleChange} />
  <Field label="Blood Pressure (mmHg)" name="bloodPressure" value={localPatient.bloodPressure} disabled={!isEditing} onChange={handleChange} />
  <Field label="Heart Rate (bpm)" name="heartRate" value={localPatient.heartRate} disabled={!isEditing} onChange={handleChange} />
  <Field label="Weight (kg)" name="weight" value={localPatient.weight} disabled={!isEditing} onChange={handleChange} />
  <Field label="Height (cm)" name="height" value={localPatient.height} disabled={!isEditing} onChange={handleChange} />
</div>


      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save
              </button>
              <button onClick={handleCancel} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Cancel
              </button>
            </>
          )}
        </div>
        <button className="text-sm underline text-gray-700 hover:text-black">Add New Patient</button>
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, disabled }: any) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border p-2 rounded ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
    />
  </div>
);

export default PatientInfo;
