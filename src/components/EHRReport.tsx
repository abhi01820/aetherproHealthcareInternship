"use client";

import React, { useState } from "react";
import { useEHR } from "@/context/EHRContext";
import {
  User,
  Calendar,
  HeartPulse,
  Thermometer,
  Activity,
  Weight,
  Ruler,
  Phone,
  MapPin,
  IdCard,
  FileText,
  BadgeCheck,
  Landmark,
} from "lucide-react";
import Image from "next/image";

const EHRReport: React.FC = () => {
  const { patient, clinic } = useEHR();

  const [doctorName, setDoctorName] = useState("Dr. John Smith");
  const [license, setLicense] = useState("MD-12345");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [patientSignedName, setPatientSignedName] = useState("");
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [patientSignatureSaved, setPatientSignatureSaved] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [referralDetails, setReferralDetails] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const handleDoctorSign = () => {
    if (doctorName && license) {
      setSignatureSaved(true);
      setShowSignatureModal(false);
    }
  };

  const handlePatientSign = () => {
    if (patientSignedName.trim()) {
      setPatientSignatureSaved(true);
      setShowPatientModal(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto print:border p-10 bg-white shadow-lg text-black text-sm leading-tight print:shadow-none">
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-900  flex justify-center">
        UNIFIED CLAIM FORM{" "}
      </h1>
      <div className="flex justify-between items-start gap-6 mb-2 pb-1 border-b  print:gap-2">
        {/* Logo and Clinic Info */}
        <div className="flex items-start gap-4">
          {clinic.logoUrl && (
            <div className="flex-shrink-0">
              <Image
                src={clinic.logoUrl}
                alt="Clinic Logo"
                width={72} // or desired dimensions
                height={72}
                className="rounded-full object-cover print:h-16 print:w-16"
              />
            </div>
          )}
          <div className="leading-snug">
            <h1 className="text-xl font-bold text-gray-900">{clinic.name}</h1>
            <p className="text-sm text-gray-700">{clinic.address}</p>
            <p className="text-sm text-gray-700">
              Phone: {clinic.phone} | Email: {clinic.email}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="text-right text-sm text-gray-800 space-y-1 leading-snug">
          <p className="font-semibold text-base">Medical Report</p>
          <p>
            <strong>Treating Doctor:</strong> {clinic.doctor}
          </p>
          <p>
            <strong>Department/Specialty:</strong> {clinic.speciality}
          </p>
        </div>
      </div>

      <div className="print:flex print:flex-col print:gap-4 print:text-sm  print-area  ">

        
        {/* Patient Information */}
        <div className="border-b border-black-300 pb-2 mb-2 print:mb-0 print:border-b-0  print-section   ">
          <h2 className="text-base font-semibold mb-1 flex items-center gap-2 text-bold print:flex-col print:items-start">
            Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-800 print:grid-cols-1 print:gap-0">
            <div className="print:flex print:flex-wrap print:gap-x-4 print:gap-y-1">
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <User className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Name:</strong> {patient.name}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Calendar className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">DOB:</strong> {patient.dob} (Age: {patient.age})
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <HeartPulse className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Gender:</strong> {patient.gender}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Phone className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Contact:</strong> {patient.phone}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <MapPin className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Address:</strong> {patient.address || "-"}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <IdCard className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Patient ID:</strong> {patient.patientId}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <IdCard className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Visit ID:</strong> {patient.visitId}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <BadgeCheck className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-normal">National ID:</strong> {patient.nationalId}
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Details */}
        <div className="border-b border-black-300 pb-2 mb-2 print:mb-0 print:border-b-0   print-section">
          <h2 className="text-base font-semibold mb-1 flex items-center gap-2 text-black-600 print:flex-col print:items-start">
             Insurance Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-800 print:grid-cols-1 print:gap-0">
            <div className="print:flex print:flex-wrap print:gap-x-4 print:gap-y-1">
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <FileText className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Insurance:</strong> {patient.insurance}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Landmark className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Payer:</strong> {patient.payer}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <IdCard className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Insurance ID:</strong> {patient.insuranceId}
              </p>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="border-b border-black-300 pb-1 print:pb-0 print:border-b-0  print-section  ">
          <h2 className="text-base font-semibold mb-1 flex items-center gap-2 text-black-600 print:flex-col print:items-start">
             Vital Signs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-800 print:grid-cols-1 print:gap-0">
            <div className="print:flex print:flex-wrap print:gap-x-4 print:gap-y-1">
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Thermometer className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Temperature:</strong> {patient.temperature || "-"} °C
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Activity className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">BP:</strong> {patient.bloodPressure || "-"}
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <HeartPulse className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Heart Rate:</strong> {patient.heartRate || "-"} bpm
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Weight className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Weight:</strong> {patient.weight || "-"} kg
              </p>
              <p className="flex items-center gap-2 print:inline-flex print:items-center">
                <Ruler className="w-4 h-4 text-gray-500 print:hidden" />
                <strong className="print:font-bold">Height:</strong> {patient.height || "-"} cm
              </p>
            </div>
          </div>
        </div>


      </div>

      {/* Medical section (To be filled by doctor only) */}
      <div className=" bg-white space-y-1 rounded-md">
        <h2 className="text-base font-semibold text-black-800  ">
          Medical Section (To be filled by Doctor only)
        </h2>

        {/* Clinical Info */}
        <div className="grid md:grid-cols-2 gap-1">
          <div>
            <h3 className="font-bold text-gray-700 ">Chief Complaint</h3>
            <p className=" p-2 mt-1 text-sm text-gray-800">
              {patient.chiefComplaint || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 ">Physical Examination</h3>
            <p className=" p-2 mt-1  text-sm text-gray-800">
              {patient.physicalExam || "N/A"}
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 ">Assessment / Diagnosis</h3>
            <p className=" p-2 mt-1  text-sm text-gray-800">
              {patient.assessment || "N/A"}
            </p>
          </div>
        </div>

        {/* Diagnoses */}
        <div className="mb-1">
          <h3 className="font-bold text-gray-700 mb-2">
            Diagnoses (ICD Codes)
          </h3>
          {Array.isArray(patient.diagnosis) && patient.diagnosis.length > 0 ? (
            <div className="mb-2">
              <div className="font-medium">Primary Diagnosis:</div>
              <p className="ml-4">
                • {patient.diagnosis[0]?.code ?? "N/A"} -{" "}
                {patient.diagnosis[0]?.desc ?? "N/A"} (
                {patient.diagnosis[0]?.type ?? "N/A"})
              </p>

              {patient.diagnosis.length > 1 && (
                <>
                  <div className="font-medium mt-2">Secondary Diagnosis:</div>
                  <ul className="list-disc pl-8 space-y-1">
                    {patient.diagnosis.slice(1).map((d, i) => (
                      <li key={i}>
                        {d?.code ?? "N/A"} - {d?.desc ?? "N/A"} (
                        {d?.type ?? "N/A"})
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No diagnosis provided</p>
          )}
        </div>

        {/* Investigations - CPT Codes */}
        {patient.cptRows?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Investigations (CPT Codes)
            </h3>
            <div className="overflow-x-auto rounded border border-gray-300">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-white-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-300">
                      CPT Code
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300">
                      Description
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.cptRows.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-white-50"}
                    >
                      <td className="px-4 py-2 border-b border-gray-300">
                        {row.code || "-"}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {row.desc || "-"}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {row.type || 1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Treatment Plan */}
        <div className="border-b border-black-300 pb-1">
          <h3 className="font-bold text-gray-700 mb-1">Treatment Plan</h3>
          <p className="bg-white-100 p-1 text-sm text-gray-800">
            {patient.treatmentPlan || "N/A"}
          </p>
        </div>

        {/* Medications */}
        <div className="border-b border-black-300 pb-1">
          <h3 className="font-bold text-gray-700 mb-1">Medications</h3>
          {patient.medications?.length > 0 ? (
            <div className="bg-white-50 p-1 text-sm text-gray-800 space-y-1">
              {patient.medications.map((med, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="flex-1">{med.name}</span>
                  <span className="flex-1 text-center">
                    {med.dosage || "N/A"}
                  </span>
                  <span className="flex-1 text-right">
                    {med.frequency || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No medications added.</p>
          )}
        </div>
      </div>

      {/* Signatures Section */}
      <div className="flex justify-between mt-2 gap-4">
        {/* Doctor's Signature */}
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-700 mb-1">
            Doctors Signature & Seal
          </p>
          {signatureSaved ? (
            <div className="border-b border-gray-400 pb-1">
              <p className="text-sm text-gray-800 underline">{doctorName}</p>
              <p className="text-xs text-gray-500 mt-0.5">License: {license}</p>
            </div>
          ) : (
            <button
              onClick={() => setShowSignatureModal(true)}
              className="text-blue-600 underline text-sm"
            >
              Click to sign
            </button>
          )}
        </div>

        {/* Patient's Signature */}
        <div className="flex-1 text-right">
          <p className="text-sm font-bold text-gray-700 mb-1">
            Patients Signature
          </p>
          {patientSignatureSaved ? (
            <div className="border-b border-gray-400 pb-1 inline-block">
              <p className="text-sm text-gray-800 underline">
                {patientSignedName}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowPatientModal(true)}
              className="text-green-600 underline text-sm"
            >
              Click to sign
            </button>
          )}
        </div>
      </div>

      {showSignatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            {/* Your modal content */}
            <h2 className="text-lg font-semibold mb-4">Sign Here</h2>
            {/* Signature input or canvas */}
            <button
              onClick={() => setShowSignatureModal(false)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-10 p-2 bg-gray-50 text-xs text-gray-700 italic border rounded">
        <p>
          <strong>Disclaimer:</strong> I, {doctorName}, treating doctor of the
          above patient, confirm that all the information provided in this form
          is true to the best of my professional knowledge.
        </p>
      </div>

      {/* Referral Section */}
      <div className="mt-2">
        <label className="flex items-center gap-2 font-bold text-black text-sm mb-2">
          <input
            type="checkbox"
            checked={showReferral}
            onChange={(e) => setShowReferral(e.target.checked)}
          />
          Referral (If applicable)
        </label>

        {showReferral && (
          <div className="bg-gray-50  p-4 rounded">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Referred to:
            </label>
            <input
              type="text"
              value={referralDetails}
              onChange={(e) => setReferralDetails(e.target.value)}
              placeholder="Enter referral details"
              className=" p-2 rounded w-full"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>
          This is a computer-generated document. Valid with digital signature
          and seal.
        </p>
        <p>AetherPro Healthcare - 123 HealthTech Road, Bengaluru</p>
        <p>Page 1 of 1</p>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
        >
          Print / Save Report
        </button>
      </div>

      {/* Doctor Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Doctors Signature</h3>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full mb-2 p-2 border rounded"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <label className="block text-sm font-medium mb-1">
              License Number
            </label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
            <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="px-4 py-1 border rounded"
                >
                  Close
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="px-2 py-1 border rounded w-1/2"
                  // Add state and handler for chat input as needed
                />
                <button
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                  // Add onClick handler for sending chat message
                >
                  Send
                </button>
                <button
                  onClick={handleDoctorSign}
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                  Apply
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Signature Modal */}
      {showPatientModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Patient Signature</h3>
            <label className="block text-sm font-medium mb-1">
              Patient Name
            </label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={patientSignedName}
              onChange={(e) => setPatientSignedName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPatientModal(false)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePatientSign}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EHRReport;
