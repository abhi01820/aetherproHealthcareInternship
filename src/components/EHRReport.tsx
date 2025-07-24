"use client";

import React from "react";
import { useEHR } from "@/context/EHRContext";

const EHRReport: React.FC = () => {
  const { patient } = useEHR();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[800px] mx-auto p-10 bg-gray-100 shadow text-black text-sm leading-tight">
      <h1 className="text-2xl font-bold mb-4 text-center">
        CLINICAL DATA SUITE
      </h1>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <p>
          <strong>Patient Name:</strong> {patient.name}
        </p>
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Gender:</strong> {patient.gender}
        </p>
        <p>
          <strong>Phone:</strong> {patient.phone}
        </p>
        <p>
          <strong>Insurance:</strong> {patient.insurance}
        </p>
        <p>
          <strong>Payer:</strong> {patient.payer}
        </p>
        <p>
          <strong>Doctor:</strong> {patient.doctor}
        </p>
      </div>

      <hr className="my-2" />

      <h2 className="font-semibold mt-2">Vitals</h2>
      <ul className="list-disc pl-4">
        {patient.vitals && (
          <>
            <li>Temperature: {patient.vitals.Temperature}</li>
            <li>BP: {patient.vitals.BP}</li>
            <li>Pulse: {patient.vitals.Pulse}</li>
          </>
        )}
      </ul>

      <h2 className="font-semibold mt-2">Chief Complaint</h2>
      <p className="border p-2 rounded">{patient.chiefComplaint}</p>

      <h2 className="font-semibold mt-2">Physical Examination</h2>
      <p className="border p-2 rounded">{patient.physicalExam}</p>

      <h2 className="font-semibold mt-2">Assessment / Diagnosis</h2>
      <p className="border p-2 rounded">{patient.assessment}</p>

      <h2 className="font-semibold mt-2">Treatment Plan</h2>
      <p className="border p-2 rounded">{patient.treatmentPlan}</p>

      <h2 className="font-semibold mt-2">Diagnoses (ICD Codes)</h2>
      <ul className="list-disc pl-4">
        {patient.diagnosis?.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <h2 className="font-semibold mt-2">Procedures (CPT Codes)</h2>
      <ul className="list-disc pl-4">
        {patient.procedures?.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <h2 className="font-semibold mt-2">Medications</h2>
      <ul className="list-disc pl-4">
        {patient.medications?.map((med, i) => (
          <li key={i}>
            {med.name} - {med.dosage || "N/A"} - {med.frequency || "N/A"}
          </li>
        ))}
      </ul>

      {/* Signature Section */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="flex flex-col items-start">
          <p>
            <strong>Doctor's Signature:</strong>
          </p>
          <div className="border-t border-gray-400 w-40 mt-6" />
        </div>
        <div className="flex flex-col items-start">
          <p>
            <strong>Patient's Signature:</strong>
          </p>
          <div className="border-t border-gray-400 w-40 mt-6" />
        </div>
      </div>

      {/* Footer - Company Info */}
      <footer className="mt-6 pt-2 border-t border-gray-300 text-center text-xs text-gray-700 leading-snug">
        <p>
          <strong>AetherPro Healthcare Private Limited</strong>
        </p>
        <p>123 HealthTech Road, Bengaluru, Karnataka, India</p>
        <p>Email: contact@aetherpro.health | Phone: +91-9876543210</p>
        <p>
          &copy; {new Date().getFullYear()} AetherPro Healthcare. All rights
          reserved.
        </p>
      </footer>

      {/* Print Button */}
      <div className="mt-4 print:hidden text-center">
        <button
          onClick={handlePrint}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Print / Save Report
        </button>
      </div>
    </div>
  );
};

export default EHRReport;
