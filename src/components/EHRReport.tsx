"use client";

import React from "react";
import { useEHR } from "@/context/EHRContext";

const EHRReport: React.FC = () => {
  const { patient } = useEHR();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[800px] mx-auto p-10  print:pt-0 bg-gray-100 shadow text-black text-sm leading-tight">
      <div className=" border-black">
        <h1 className="text-2xl font-bold text-center py-2">
          UNIFIED CLAIM FORM
        </h1>
        <div className="flex justify-center">
          <div className="bg-gray-300 mb-2 rounded-full px-4 py-1 font-semibold text-lg text-black">
            Provider Name: A1hospital, Location: 123 Medical plaza
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Patient Details */}
        <div className="border p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold border-b mb-2">
            Patient details
          </h2>
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>DOB:</strong> {patient.dob} (Age: {patient.age})
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Contact:</strong> {patient.phone}
          </p>
          <p>
            <strong>Patient ID:</strong> {patient.patientId}
          </p>
          <p>
            <strong>Visit ID:</strong> {patient.visitId}
          </p>
          <p>
            <strong>National ID:</strong> {patient.nationalId}
          </p>
          <p>
            <strong>Nationality:</strong> {patient.nationality}
          </p>
        </div>

        {/* Insurance Details */}
        <div className="border p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold border-b mb-2">
            Insurance details
          </h2>
          <p>
            <strong>Insurance:</strong> {patient.insurance}
          </p>
          <p>
            <strong>Payer:</strong> {patient.payer}
          </p>
          <p>
            <strong>Insurance ID:</strong> {patient.insuranceId}
          </p>
        </div>
      </div>

      <hr className="my-2" />

      <h2 className="font-semibold mt-2">Vitals</h2>
      {patient.vitals && (
        <div className="flex flex-wrap gap-8 pl-4 text-sm mt-1">
          <span> Temperature: {patient.vitals.Temperature}</span>
          <span> BP: {patient.vitals.BP}</span>
          <span> Pulse: {patient.vitals.Pulse}</span>
        </div>
      )}

      <hr className="my-2" />

      <h2 className="font-semibold mt-2">Chief Complaint</h2>
      <p className="p-2 rounded">{patient.chiefComplaint}</p>

      <h2 className="font-semibold mt-2">Physical Examination</h2>
      <p className="p-2 rounded">{patient.physicalExam}</p>

      <h2 className="font-semibold mt-2">Assessment / Diagnosis</h2>
      <p className="p-2 rounded">{patient.assessment}</p>

      <h2 className="font-semibold mt-2">Treatment Plan</h2>
      <p className="p-2 rounded">{patient.treatmentPlan}</p>

      <hr className="my-2" />

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
            <strong>Doctor&apos;s Signature:</strong>
          </p>
          <div className="border-t border-gray-400 w-40 mt-10" />
        </div>
        <div className="flex flex-col items-start">
          <p>
            <strong>Patient&#39;s Signature:</strong>
          </p>
          <div className="border-t border-gray-400 w-40 mt-10" />
        </div>
      </div>

      {/* Disclaimer Footer - Below Signatures */}
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



      {/* Print Button (hidden in print) */}
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
