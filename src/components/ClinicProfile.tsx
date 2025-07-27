"use client";
import React, { useState, useEffect } from "react";
import { useEHR } from "@/context/EHRContext";

const ClinicProfile = () => {
  const { clinic, setClinic } = useEHR();
  const [localClinic, setLocalClinic] = useState(clinic);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalClinic(clinic);
  }, [clinic]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalClinic({ ...localClinic, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalClinic({ ...localClinic, logoUrl: imageUrl });
    }
  };

  const handleSave = () => {
    setClinic(localClinic);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalClinic(clinic);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow border mt-6">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Profile Page</h2>

      {/* Logo Upload */}
<div className="flex flex-col items-center mb-6">
  {localClinic.logoUrl && (
    <img
      src={localClinic.logoUrl}
      alt="Logo"
      className="h-20 w-20 rounded-full object-cover mb-2 border shadow"
    />
  )}

  {/* Upload Button + File Input */}
  <div className="relative">
    <button
      className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={!isEditing}
    >
      Upload Logo
    </button>

    {/* Hidden File Input */}
    <input
      type="file"
      accept="image/*"
      onChange={handleLogoUpload}
      disabled={!isEditing}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
  </div>
</div>


      {/* Form Fields */}
      <div className="space-y-4">
        <Field label="Healthcare Center Name" name="name" value={localClinic.name} onChange={handleChange} disabled={!isEditing} />
        <TextAreaField label="Address" name="address" value={localClinic.address} onChange={handleChange} disabled={!isEditing} />
        <Field label="Phone" name="phone" value={localClinic.phone} onChange={handleChange} disabled={!isEditing} />
        <Field label="Email" name="email" value={localClinic.email} onChange={handleChange} disabled={!isEditing} />
        <Field label="Treating Doctor" name="doctor" value={localClinic.doctor} onChange={handleChange} disabled={!isEditing} />
        <Field label="License" name="license" value={localClinic.license} onChange={handleChange} disabled={!isEditing} />
        <Field label="Department/Specialty" name="speciality" value={localClinic.speciality} onChange={handleChange} disabled={!isEditing} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2 rounded">Edit</button>
        ) : (
          <>
            <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
            <button onClick={handleCancel} className="bg-red-600 text-white px-6 py-2 rounded">Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, disabled }: any) => (
  <div>
    <label className="font-semibold block mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2 border rounded ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, disabled }: any) => (
  <div>
    <label className="font-semibold block mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2 border rounded h-24 ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
    />
  </div>
);

export default ClinicProfile;
