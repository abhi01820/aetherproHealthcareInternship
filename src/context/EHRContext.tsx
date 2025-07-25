// src/contexts/EHRContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PatientVitals {
  Temperature: string;
  BP: string;
  Pulse: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface Patient {
  name: string;
  age: number;
  dob:string,
  gender: string;
  phone: string;
  insurance: string;
  payer: string;
  doctor: string;
  patientId:number,
  visitId:number,
  nationalId:number,
  nationality:string,
  insuranceId:number,
  vitals?: PatientVitals;
  diagnosis?: string[];
  procedures?: string[];
  medications?: Medication[];
  chiefComplaint?: string;
  physicalExam?: string;
  assessment?: string;
  treatmentPlan?: string;
  [key: string]: string | number | string[] | Medication[] | PatientVitals | undefined;
}

interface EHRContextProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const defaultPatient: Patient = {
  name: "RAJ",
  age: 36 ,
  dob:"20-01-2005",
  gender: "Male",
  phone: "123-450-2322",
  insurance: "AetherPro Healthcare",
  payer: "AetherPro Health Inc.",
  doctor: "Dr. Priya Sharma",
  patientId:1234,
  visitId:2343,
  nationalId:789,
  nationality:"Indian" ,
  insuranceId:123456
};

const EHRContext = createContext<EHRContextProps>({
  patient: defaultPatient,
  setPatient: () => {},
});

export const useEHR = () => useContext(EHRContext);

export const EHRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<Patient>(defaultPatient);

  return (
    <EHRContext.Provider value={{ patient, setPatient }}>
      {children}
    </EHRContext.Provider>
  );
};
