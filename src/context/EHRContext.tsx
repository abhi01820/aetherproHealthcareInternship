// src/contexts/EHRContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PatientVitals {
  Temperature: string;
  BP: string;
  Pulse: string;
}

interface CptRow {
  code: string;
  description: string;
  type: string;
}


interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  logoUrl?: string;
  doctor: string;
  license: string;
  speciality: string;
}

interface Patient {
  name: string;
  age: number;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  insurance: string;
  payer: string;
  speciality: string;
  doctor: string;
  patientId: number;
  visitId: number;
  nationalId: number;
  nationality: string;
  insuranceId: number;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;

  // NEWLY ADDED FIELDS FOR EHR DATA
  vitals: PatientVitals;
  diagnosis: { code: string; description: string; type: "Primary" | "Secondary" }[];
  procedures: string[];
  medications: Medication[];
  chiefComplaint: string;
  physicalExam: string;
  assessment: string;
  treatmentPlan: string;
  cptRows: CptRow[];
  [key: string]: unknown;
}



interface EHRContextProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  clinic: ClinicInfo;
  setClinic: React.Dispatch<React.SetStateAction<ClinicInfo>>;
}

// Default patient state
const defaultPatient: Patient = {
  name: "RAJ",
  age: 20,
  dob: "20-01-2005",
  gender: "Male",
  phone: "123-450-2322",
  address: "hyderabad",
  insurance: "AetherPro Healthcare",
  payer: "AetherPro Health Inc.",
  doctor: "Dr. Priya Sharma",
  patientId: 1234,
  visitId: 2343,
  nationalId: 789,
  nationality: "Indian",
  insuranceId: 123456,
  speciality: "Cardiologist",
  temperature: "",
  bloodPressure: "",
  heartRate: "",
  weight: "",
  height: "",

  // Initialized new fields
  vitals: {
    Temperature: "",
    BP: "",
    Pulse: "",
  },
  diagnosis: [
  { code: "I10", description: "Essential (primary) hypertension", type: "Primary" },
  { code: "E11", description: "Type 2 diabetes mellitus", type: "Secondary" },
],
  procedures: [],
  medications: [],
  chiefComplaint: "",
  physicalExam: "",
  assessment: "",
  treatmentPlan: "",
  cptRows:[],
};

// Default clinic state
const defaultClinic: ClinicInfo = {
  name: "Healthcare Medical Center",
  address: "123 Medical Plaza, Healthcare City, HC 12345",
  phone: "(555) 000-1234",
  email: "info@healthcarecenter.com",
  doctor: "Dr. John Smith",
  license: "MD1234",
  speciality: "Internal Medicine/Specialist",
  logoUrl: "/logo-placeholder.png",
};

const EHRContext = createContext<EHRContextProps>({
  patient: defaultPatient,
  setPatient: () => {},
  clinic: defaultClinic,
  setClinic: () => {},
});

export const useEHR = () => useContext(EHRContext);





export const EHRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<Patient>(defaultPatient);

    useEffect(() => {
    console.log("Diagnosis data:", patient.diagnosis);
  }, [patient]);
  const [clinic, setClinic] = useState<ClinicInfo>(defaultClinic);

  return (
    <EHRContext.Provider value={{ patient, setPatient, clinic, setClinic }}>
      {children}
    </EHRContext.Provider>
  );
};
