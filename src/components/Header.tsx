'use client';
import React from 'react';
import { useEHR } from '@/context/EHRContext'; // ✅ import the context

export default function Header() {
  const { patient, clinic } = useEHR();

  return (
    <div className="w-full font-sans">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-12 bg-cyan-200 overflow-x-auto border-2 border-gray-800">
        <div className="col-span-1 flex items-center justify-start py-1 border-r-2 border-gray-800 font-bold text-sm">
          Patient Name
        </div>
        <div className="col-span-1 flex items-center py-1 border-r-2 border-gray-800">
          {patient.name ? (
        patient.name
          ) : (
        <span className="text-gray-400">Anonymous</span>
          )}
        </div>

        <div className="col-span-1 flex items-center justify-start py-1 border-r-2 border-gray-800 font-bold text-sm">
          Gender
        </div>
        <div className="col-span-1 flex items-center py-1 border-r-2 border-gray-800">
          {patient.gender ? (
        patient.gender
          ) : (
        <span className="text-gray-400">M/F</span>
          )}
        </div>

        <div className="col-span-1 flex items-center justify-start py-1 border-r-2 border-gray-800 font-bold text-sm">
          Age
        </div>
        <div className="col-span-1 flex items-center py-1 border-r-2 border-gray-800">
          {patient.age ? (
        patient.age
          ) : (
        <span className="text-gray-400">Number</span>
          )}
        </div>

        <div className="col-span-1 flex items-center justify-start py-1 border-r-2 border-gray-800 font-bold text-sm">
          NAT ID
        </div>
        <div className="col-span-1 flex items-center py-1 border-r-2 border-gray-800">
          {patient.nationalId ? (
        patient.nationalId
          ) : (
        <span className="text-gray-400">XOOC</span>
          )}
        </div>

        <div className="col-span-1 flex items-center justify-start py-1 border-r-2 border-gray-800 font-bold text-sm">
          Nationality
        </div>
        <div className="col-span-1 flex items-center py-1 border-r-2 border-gray-800">
          {patient.nationality ? (
        patient.nationality
          ) : (
        <span className="text-gray-400">INDIAN</span>
          )}
        </div>

        <div className="col-span-1 flex items-center justify-start py-1 border-r-2 border-gray-800 font-bold text-sm">
          Insurance
        </div>
        <div className="col-span-1 flex items-center py-1">
          {patient.insurance ? (
        patient.insurance
          ) : (
        <span className="text-gray-400">ABC Insurance Company</span>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-sky-100 p-3 rounded-lg border-1.5 border-gray-800">
        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Patient Name</span>
          <span className="border-b-2 border-gray-800 pb-1">{patient.name || 'N/A'}</span>

          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Gender</span>
          <span className="border-b-2 border-gray-800 pb-1">{patient.gender || 'N/A'}</span>

          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Age</span>
          <span className="border-b-2 border-gray-800 pb-1">{patient.age || 'N/A'}</span>

          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">NAT ID</span>
          <span className="border-b-2 border-gray-800 pb-1 truncate">{patient.nationalId || 'N/A'}</span>

          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Nationality</span>
          <span className="border-b-2 border-gray-800 pb-1">{patient.nationality || 'INDIAN'}</span>

          <span className="font-bold text-lg">Insurance</span>
          <span>{patient.insurance || 'N/A'}</span>
        </div>
      </div>

      {/* Doctor Details */}
      {/* Doctor Details from Clinic */}
<div className="bg-yellow-100 py-2 px-10 text-lg border-r border-l border-gray-800">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
    <div>
      <span className="text-blue-700 font-bold">Doctor: </span>
      <span className="text-black font-bold">{clinic.doctor || 'Dr. Smith'}</span>
    </div>
    <div>
      <span className="text-blue-700 font-bold">Speciality: </span>
      <span className="text-black font-bold ">{clinic.speciality || 'Cardiologist'}</span>
    </div>
    <div>
      <span className="text-blue-700 font-bold">Date: </span>
      <span className="text-black font-bold ">
        {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}
      </span>
    </div>
  </div>
</div>

    </div>
  );
}
