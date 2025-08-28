"use client";

import { useEffect, useState, useCallback } from "react";
import ICDSearchPanel from "@/components/ICDSearchPanel";
import CPTSearchPanel from "@/components/CPTSearchPanel";
import MedicineSearchPanel from "@/components/MedicineSearchPanel";
import { useRouter } from "next/navigation";
import { useEHR } from "@/context/EHRContext";

interface ICDRow {
  code: string;
  desc: string;
  type: "Primary" | "Secondary";
}

interface CPTInvestigationRow {
  code: string;
  desc: string;
  type: string;
}

// AI Chatbot Popup Component
interface PatientData {
  treatmentPlan: string;
  diagnosis: Array<{ code: string; desc: string; type: string }>;
  physicalExam: string;
  chiefComplaint: string;
  assessment: string;
  procedures: string[];
  medications: Array<{ name: string; dosage: string; frequency: string }>;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
}

const AIChatbotPopup = ({ 
  isOpen, 
  onClose, 
  patientData,
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  patientData: PatientData;
}) => {
  const [recommendations, setRecommendations] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const currentInput = userInput;
    setUserInput('');

    const newMessages: { role: 'user' | 'assistant', content: string }[] = [...messages, { role: 'user', content: currentInput }];
    setMessages(newMessages);
    const messageHistory = newMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    
    setIsThinking(true);

    // This prompt can be refined to be more conversational
    const prompt = `Based on the previous recommendations and the patient data, answer the following question: ${currentInput}\n\nHistory:\n${messageHistory}`;

    try {
      // Using the same API endpoint, you might want a different one for chat
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.recommendations }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't get a response." }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const generateDemoRecommendations = (patientInfo: {
    treatmentPlan: string;
    diagnosis: Array<{ code: string; desc: string }>;
    physicalExam: string;
    chiefComplaint: string;
    procedures: string[];
    medications: Array<{ name: string; dosage: string; frequency: string }>;
    vitals: {
      temperature: string;
      bloodPressure: string;
      heartRate: string;
      weight: string;
      height: string;
    };
  }) => {
    const hasProcedures = patientInfo.procedures.length > 0;
    const hasDiagnosis = patientInfo.diagnosis.length > 0;
    const hasTreatmentPlan = patientInfo.treatmentPlan && patientInfo.treatmentPlan !== "Not provided";
    const hasPhysicalExam = patientInfo.physicalExam && patientInfo.physicalExam !== "Not provided";
    const hasChiefComplaint = patientInfo.chiefComplaint && patientInfo.chiefComplaint !== "Not provided";

    return `## Medical Coding Audit Report (Demo)

### CPT Code Analysis
**Current Procedures:** ${hasProcedures ? patientInfo.procedures.join(', ') : 'None documented'}

**Recommendations:**
${hasProcedures ? 
  '- Review procedure documentation for completeness\n- Ensure all procedures have corresponding CPT codes\n- Verify medical necessity for each procedure' :
  '- No procedures documented. Consider adding relevant procedures based on diagnosis and treatment plan.'
}

### ICD-10 Code Validation
**Current Diagnosis:** ${hasDiagnosis ? patientInfo.diagnosis.map((d: { code: string; desc: string }) => `${d.code}: ${d.desc}`).join(', ') : 'None documented'}

**Recommendations:**
${hasDiagnosis ?
  '- Verify diagnosis codes match documented conditions\n- Ensure primary diagnosis supports medical necessity\n- Review for any missing secondary diagnoses' :
  '- No diagnosis codes documented. Add appropriate ICD-10 codes based on clinical findings.'
}

### NCCI Compliance
**Potential Issues:**
- Check for bundled procedures that should be unbundled
- Verify modifier usage for multiple procedures
- Review for mutually exclusive code pairs

### Documentation Compliance
**Assessment:**
- Treatment plan documentation: ${hasTreatmentPlan ? 'Present' : 'Missing'}
- Physical examination: ${hasPhysicalExam ? 'Present' : 'Missing'}
- Chief complaint: ${hasChiefComplaint ? 'Present' : 'Missing'}

**Recommendations:**
${!hasTreatmentPlan || !hasPhysicalExam || !hasChiefComplaint ?
  '- Complete missing documentation sections\n- Ensure all required documentation elements are present\n- Verify medical necessity documentation' :
  '- Documentation appears complete. Review for accuracy and specificity.'
}

### Revenue Optimization
**Opportunities:**
- Review for missed billable procedures
- Verify appropriate code selection for maximum reimbursement
- Consider additional diagnostic codes if supported by documentation

### Action Items
1. ${!hasDiagnosis ? 'Add appropriate ICD-10 diagnosis codes' : 'Review and validate existing diagnosis codes'}
2. ${!hasProcedures ? 'Document relevant procedures performed' : 'Review procedure documentation for completeness'}
3. ${!hasTreatmentPlan || !hasPhysicalExam || !hasChiefComplaint ? 'Complete missing documentation sections' : 'Review documentation for accuracy'}
4. Address any NCCI bundling issues
5. Implement documentation improvements

### Demo Note
This is a demonstration of the medical coding audit feature. For real AI-powered recommendations, please configure your OpenAI API key which is paid version of the app .`;
  };

  const generateRecommendations = useCallback(async () => {
    setIsLoading(true);
    
         // Prepare the patient data for the AI prompt
     const patientInfo = {
       treatmentPlan: patientData.treatmentPlan || "Not provided",
       diagnosis: patientData.diagnosis || [],
       physicalExam: patientData.physicalExam || "Not provided",
       chiefComplaint: patientData.chiefComplaint || "Not provided",
       assessment: patientData.assessment || "Not provided",
       procedures: patientData.procedures || [],
       medications: patientData.medications || [],
       vitals: {
         temperature: patientData.temperature,
         bloodPressure: patientData.bloodPressure,
         heartRate: patientData.heartRate,
         weight: patientData.weight,
         height: patientData.height
       }
     };

    const prompt = `Medical Coding Audit Prompt

You are an AAPC-certified medical coder and compliance auditor. Review the patient chart provided below and produce an audit in the following table format.

Rules:
- Do not recommend any Office/Outpatient E/M CPT codes (99202–99215).
- Focus on procedure-based billing for CPT.
- Do not make the review payer-specific; ignore Medicare/Medicaid-specific coverage policies.
- Apply NCCI (National Correct Coding Initiative) edits to identify and flag bundling or unbundling issues.

Output Table Columns:
Section – Chief Complaint, HPI, ROS, Vitals, Physical Exam, Assessment/Diagnosis, Procedures, Treatment Plan.
Issue – Describe what is missing, incomplete, or incorrect.
Risk – State the compliance or reimbursement risk (e.g., claim denial, downcoding, audit flag, NCCI bundling).
Coder Recommendation – Suggest the exact fix or addition needed.
Reason/Guideline Reference – Explain why the fix is necessary, referencing CMS, AAPC, ICD-10-CM, CPT, or NCCI guidelines.

Additional Output Requirements:
- Suggest correct ICD-10-CM and non-E/M CPT/HCPCS codes based on the documented information.
- If a section is complete, mark "✅ Green sign" and state it meets documentation standards.
- List potential NCCI edit conflicts for the recommended CPT codes.

Patient Chart:
Chief Complaint: ${patientInfo.chiefComplaint}
Physical Examination: ${patientInfo.physicalExam}
Assessment/Diagnosis: ${patientInfo.assessment || 'Not documented'}
Treatment Plan: ${patientInfo.treatmentPlan}
Procedures: ${patientInfo.procedures.join(', ')}
Diagnosis Codes: ${patientInfo.diagnosis.map((d: { code: string; desc: string }) => `${d.code}: ${d.desc}`).join(', ')}
Medications: ${patientInfo.medications.map((m: { name: string; dosage: string; frequency: string }) => `${m.name} - ${m.dosage} ${m.frequency}`).join(', ')}
Vitals: Temperature: ${patientInfo.vitals.temperature}°C, BP: ${patientInfo.vitals.bloodPressure} mmHg, HR: ${patientInfo.vitals.heartRate} bpm, Weight: ${patientInfo.vitals.weight} kg, Height: ${patientInfo.vitals.height} cm

Please provide the audit in the specified table format with all required columns and additional output requirements.`;

    try {
      // First try to call the free Hugging Face API
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
      } else {
        // If Hugging Face API fails, try OpenAI as backup
        const openaiResponse = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        if (openaiResponse.ok) {
          const openaiData = await openaiResponse.json();
          setRecommendations(openaiData.recommendations);
        } else {
          // If both APIs fail, show demo data
          const errorData = await openaiResponse.json();
          console.warn('Both APIs failed, showing demo data:', errorData.error);
          
          // Generate demo recommendations based on patient data
          const demoRecommendations = generateDemoRecommendations(patientInfo);
          setRecommendations(demoRecommendations);
        }
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
      
      // Fallback to demo data
      const demoRecommendations = generateDemoRecommendations(patientInfo);
      setRecommendations(demoRecommendations + '\n\n[Note: This is demo data. Configure API keys for real AI recommendations.]');
    } finally {
      setIsLoading(false);
    }
  }, [patientData]);

  useEffect(() => {
    if (isOpen) {
      generateRecommendations();
    }
  }, [isOpen, generateRecommendations]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-end z-50">
      {/* No background overlay - direct chatbot panel */}
      <div className="bg-white shadow-xl w-[30%] h-full flex flex-col border-l border-gray-200 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-blue-50">
          <h2 className="text-lg font-bold text-gray-800">AI Medical Coding Audit</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold p-1"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                <p className="text-xs text-gray-600">Generating recommendations...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="prose max-w-none">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3 rounded">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> AI analysis based on patient data. Review with medical coding team.
                  </p>
                </div>
                <div className="whitespace-pre-wrap text-xs leading-relaxed">
                  {recommendations}
                </div>
              </div>
              <div className="mt-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`p-2 rounded-lg mb-2 text-xs ${msg.role === 'user' ? 'bg-gray-200 text-right' : 'bg-blue-100'}`}>
                    {msg.content}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer with Chat */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a follow-up question..."
              className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={isLoading || isThinking}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || isThinking || !userInput.trim()}
              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={generateRecommendations}
              disabled={isLoading || isThinking}
              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading || isThinking ? 'Generating...' : 'Regenerate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ClinicalDesktopUI() {
  const router = useRouter();
  const { patient, setPatient } = useEHR();
  const [panelRowIndex, setPanelRowIndex] = useState<number | null>(null);
  const [cptPanelRowIndex, setCptPanelRowIndex] = useState<number | null>(null);
  const [medPanelRowIndex, setMedPanelRowIndex] = useState<number | null>(null);
  const [isAIChatbotOpen, setIsAIChatbotOpen] = useState(false);

  const [icdRows, setIcdRows] = useState<ICDRow[]>(() => {
    // Always start with 19 empty rows and no pre-filled ICD codes
    return [
      { code: "", desc: "", type: "Primary" },
      { code: "", desc: "", type: "Secondary" },
      ...Array.from({ length: 19 }).map(() => ({
        code: "",
        desc: "",
        type: "Secondary" as const,
      })),
    ];
  });

  const [cptRows, setCptRows] = useState<CPTInvestigationRow[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitals_cptRows');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return Array.from({ length: 8 }, () => ({ code: "", desc: "", type: "" }));
  });

  const handleCptSelect = (index: number, code: string, desc: string) => {
    const newRows = [...cptRows];
    newRows[index] = { code, desc, type: "" };
    setCptRows(newRows);
    setCptPanelRowIndex(null);
  };

  const [medRows, setMedRows] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitals_medRows');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [] as {
      tradeName: string;
      route: string;
      granular: string;
      days: number;
      freq: string;
    }[];
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectionMade, setSelectionMade] = useState(false);

  const handleICDSelect = (entry: {
    Code: string;
    ShortDesc: string;
    LongDesc: string;
  }) => {
    // Check for duplicate code
    if (icdRows.some((row) => row.code === entry.Code)) {
      // Silently ignore duplicate
      setPanelRowIndex(null);
      return;
    }
    const updated = [...icdRows];
    const emptyIndex = updated.findIndex((r) => r.code === "" && r.desc === "");
    if (emptyIndex !== -1) {
      updated[emptyIndex].code = entry.Code;
      updated[emptyIndex].desc = entry.ShortDesc;
      setSelectionMade(true);
    }
    // Ensure 19 empty rows after filled rows
    const filledRows = updated.filter((row) => row.code !== "" && row.desc !== "");
    const emptyRowsCount = 19;
    const emptyRows = Array.from({ length: emptyRowsCount }, () => ({
      code: "",
      desc: "",
      type: "Secondary" as const,
    }));
    setIcdRows([...filledRows, ...emptyRows]);
    setPanelRowIndex(null);
  };

  const handleMedicineSelect = (entry: {
    TRADE_NAME: string;
    ROUTE_OF_ADMIN: string;
    GRANULAR_UNIT: string;
    PACKAGE_PRICE: string;
    days?: number;
    freq?: string;
  }) => {
    setMedRows([
      ...medRows,
      {
        tradeName: entry.TRADE_NAME,
        route: entry.ROUTE_OF_ADMIN,
        granular: entry.GRANULAR_UNIT,
        days: entry.days ?? 5,
        freq: entry.freq ?? "Once daily",
      },
    ]);
    setMedPanelRowIndex(null);
  };

  useEffect(() => {
    const updatedDiagnosis = icdRows
      .filter((row) => row.code && row.desc)
      .map((row) => ({
        code: row.code,
        desc: row.desc,
        type: row.type, // Primary or Secondary
      }));

    setPatient((prev) => ({ ...prev, diagnosis: updatedDiagnosis }));
  }, [icdRows, setPatient]);

  const [chiefComplaint, setChiefComplaint] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitals_chiefComplaint');
      return saved || "";
    }
    return "";
  });
  const [physicalExam, setPhysicalExam] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitals_physicalExam');
      return saved || "";
    }
    return "";
  });
  const [assessment, setAssessment] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitals_assessment');
      return saved || "";
    }
    return "";
  });
  const [treatmentPlan, setTreatmentPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitals_treatmentPlan');
      return saved || "";
    }
    return "";
  });
  const [isEditing, setIsEditing] = useState(false);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vitals_chiefComplaint', chiefComplaint);
  }, [chiefComplaint]);

  useEffect(() => {
    localStorage.setItem('vitals_physicalExam', physicalExam);
  }, [physicalExam]);

  useEffect(() => {
    localStorage.setItem('vitals_assessment', assessment);
  }, [assessment]);

  useEffect(() => {
    localStorage.setItem('vitals_treatmentPlan', treatmentPlan);
  }, [treatmentPlan]);

  useEffect(() => {
    localStorage.setItem('vitals_icdRows', JSON.stringify(icdRows));
  }, [icdRows]);

  useEffect(() => {
    localStorage.setItem('vitals_cptRows', JSON.stringify(cptRows));
  }, [cptRows]);

  useEffect(() => {
    localStorage.setItem('vitals_medRows', JSON.stringify(medRows));
  }, [medRows]);

  // Load data from EHR context on component mount
  useEffect(() => {
    if (patient.chiefComplaint && !chiefComplaint) {
      setChiefComplaint(patient.chiefComplaint);
    }
    if (patient.physicalExam && !physicalExam) {
      setPhysicalExam(patient.physicalExam);
    }
    if (patient.assessment && !assessment) {
      setAssessment(patient.assessment);
    }
    if (patient.treatmentPlan && !treatmentPlan) {
      setTreatmentPlan(patient.treatmentPlan);
    }
    // Do not pre-fill ICD rows from patient diagnosis to keep table initially empty
  }, [patient, chiefComplaint, physicalExam, assessment, treatmentPlan, icdRows]);

  const updatePhysicalExamWithVitals = (updatedPatient: typeof patient) => {
    const vitalsText = [];
    
    if (updatedPatient.temperature) {
      vitalsText.push(`Temperature: ${updatedPatient.temperature}°C`);
    }
    if (updatedPatient.bloodPressure) {
      vitalsText.push(`Blood Pressure: ${updatedPatient.bloodPressure} mmHg`);
    }
    if (updatedPatient.heartRate) {
      vitalsText.push(`Heart Rate: ${updatedPatient.heartRate} bpm`);
    }
    if (updatedPatient.weight) {
      vitalsText.push(`Weight: ${updatedPatient.weight} kg`);
    }
    if (updatedPatient.height) {
      vitalsText.push(`Height: ${updatedPatient.height} cm`);
    }

    if (vitalsText.length > 0) {
      const vitalsString = vitalsText.join(", ");
      
      // Clean up the physical exam text by removing any existing vitals
      let cleanedExam = physicalExam;
      
      // Remove any existing vitals line
      const vitalsLines = cleanedExam.split('\n').filter(line => 
        !line.trim().startsWith('Vitals:') && 
        !line.includes('Temperature:') && 
        !line.includes('Blood Pressure:') && 
        !line.includes('Heart Rate:') && 
        !line.includes('Weight:') && 
        !line.includes('Height:')
      );
      
      cleanedExam = vitalsLines.join('\n').trim();
      
      // Add the new vitals
      const separator = cleanedExam ? "\n\n" : "";
      setPhysicalExam(cleanedExam + separator + `Vitals: ${vitalsString}`);
    }
  };

  const handleGenerateEHR = () => {
    const updatedPatient = {
      ...patient,
      procedures: cptRows.map((r) => r.desc).filter(Boolean),
      cptRows: cptRows
        .filter((r) => r.code && r.desc)
        .map((r) => ({ ...r, type: r.type || "Primary" })),
             medications: medRows.map((med: { tradeName: string; days: number; freq: string; }) => ({
         name: med.tradeName,
         dosage: `${med.days}`,
         frequency: med.freq,
       })),
      chiefComplaint,
      physicalExam,
      assessment,
      treatmentPlan,
    };
    console.log("start");
    console.log(updatedPatient);
    setPatient(updatedPatient);
    setTimeout(() => {
      // double-check patient is updated before navigating
      console.log("Final Patient Before Push:", updatedPatient);
      router.push("/EHRReport");
    }, 300); // increase delay slightly
  };

  const handleNewPatient = () => {
    // Reset all form states to initial values while preserving required fields
    setPatient(prev => ({
      ...prev,
      temperature: "",
      bloodPressure: "",
      heartRate: "",
      weight: "",
      height: "",
      diagnosis: [],
      procedures: [],
      medications: [],
      chiefComplaint: "",
      physicalExam: "",
      assessment: "",
      treatmentPlan: "",
    }));
    
    // Reset ICD rows
    setIcdRows([
      { code: "", desc: "", type: "Primary" },
      { code: "", desc: "", type: "Secondary" },
      ...Array.from({ length: 19 }).map(() => ({
        code: "",
        desc: "",
        type: "Secondary" as const,
      })),
    ]);
    
    // Reset CPT rows
    setCptRows(
      Array.from({ length: 7 }, () => ({ code: "", desc: "", type: "" }))
    );
    
    // Reset medicine rows
    setMedRows([]);
    
    // Reset clinical notes
    setChiefComplaint("");
    setPhysicalExam("");
    setAssessment("");
    setTreatmentPlan("");
    
    // Clear localStorage
    localStorage.removeItem('vitals_chiefComplaint');
    localStorage.removeItem('vitals_physicalExam');
    localStorage.removeItem('vitals_assessment');
    localStorage.removeItem('vitals_treatmentPlan');
    localStorage.removeItem('vitals_icdRows');
    localStorage.removeItem('vitals_cptRows');
    localStorage.removeItem('vitals_medRows');
    
    // Reset editing state
    setIsEditing(false);
  };

  return (
    <div className="w-full border-2 border-black relative text-sm">
      {/* AI Chatbot Popup */}
             <AIChatbotPopup
         isOpen={isAIChatbotOpen}
         onClose={() => setIsAIChatbotOpen(false)}
         patientData={{
           treatmentPlan,
           diagnosis: icdRows.filter(row => row.code && row.desc),
           physicalExam,
           chiefComplaint,
           assessment,
           procedures: cptRows.filter(row => row.code && row.desc).map(row => row.desc),
                       medications: medRows.map((med: { tradeName: string; days: number; freq: string }) => ({
              name: med.tradeName,
              dosage: med.days.toString(),
              frequency: med.freq
            })),
           temperature: patient.temperature,
           bloodPressure: patient.bloodPressure,
           heartRate: patient.heartRate,
           weight: patient.weight,
           height: patient.height
         }}
       />

      {/* Panels */}
      {panelRowIndex !== null && (
        <ICDSearchPanel
          onSelect={handleICDSelect}
          onClose={() => setPanelRowIndex(null)}
        />
      )}

      {cptPanelRowIndex !== null && (
        <CPTSearchPanel
          rowIndex={cptPanelRowIndex}
          onSelect={(code, desc) =>
            handleCptSelect(cptPanelRowIndex!, code, desc)
          }
          onClose={() => setCptPanelRowIndex(null)}
        />
      )}

      {medPanelRowIndex !== null && (
        <MedicineSearchPanel
          onSelect={handleMedicineSelect}
          onClose={() => setMedPanelRowIndex(null)}
        />
      )}

      {/* Vitals Row */}
      <div className="flex flex-col md:flex-row font-semibold">
        <div className="md:w-[80%] bg-cyan-200 px-2 py-1 flex flex-wrap items-center gap-4">
          <span className="font-bold">Vitals:</span>
          <span className="flex items-center gap-1">
            Temp: 
            <input
              type="text"
              value={patient.temperature || ""}
              onChange={(e) => {
                const newTemp = e.target.value;
                setPatient(prev => ({ ...prev, temperature: newTemp }));
                updatePhysicalExamWithVitals({
                  ...patient,
                  temperature: newTemp
                });
              }}
              placeholder="36"
              className="w-16 px-1 border border-gray-400 rounded bg-white text-sm"
            />°C
          </span>
          <span className="flex items-center gap-1">
            BP: 
            <input
              type="text"
              value={patient.bloodPressure || ""}
              onChange={(e) => {
                const newBP = e.target.value;
                setPatient(prev => ({ ...prev, bloodPressure: newBP }));
                updatePhysicalExamWithVitals({
                  ...patient,
                  bloodPressure: newBP
                });
              }}
              placeholder="128"
              className="w-20 px-1 border border-gray-400 rounded bg-white text-sm"
            /> mmHg
          </span>
          <span className="flex items-center gap-1">
            HR: 
            <input
              type="text"
              value={patient.heartRate || ""}
              onChange={(e) => {
                const newHR = e.target.value;
                setPatient(prev => ({ ...prev, heartRate: newHR }));
                updatePhysicalExamWithVitals({
                  ...patient,
                  heartRate: newHR
                });
              }}
              placeholder="74"
              className="w-16 px-1 border border-gray-400 rounded bg-white text-sm"
            /> bpm
          </span>
          <span className="flex items-center gap-1">
            Weight: 
            <input
              type="text"
              value={patient.weight || ""}
              onChange={(e) => {
                const newWeight = e.target.value;
                setPatient(prev => ({ ...prev, weight: newWeight }));
                updatePhysicalExamWithVitals({
                  ...patient,
                  weight: newWeight
                });
              }}
              placeholder="64"
              className="w-16 px-1 border border-gray-400 rounded bg-white text-sm"
            /> kg
          </span>
          <span className="flex items-center gap-1">
            Height: 
            <input
              type="text"
              value={patient.height || ""}
              onChange={(e) => {
                const newHeight = e.target.value;
                setPatient(prev => ({ ...prev, height: newHeight }));
                updatePhysicalExamWithVitals({
                  ...patient,
                  height: newHeight
                });
              }}
              placeholder="167"
              className="w-16 px-1 border border-gray-400 rounded bg-white text-sm"
            /> cm
          </span>
        </div>

        <div className="md:w-[10%] bg-cyan-200 border-t md:border-r md:border-t-0 border-black flex items-center justify-center text-center"></div>
        <div className="md:w-[20%] bg-green-100 border-t md:border-l md:border-t-0 border-black flex items-center justify-center text-center">
          Smart EMR <br />- Powered by AI
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-[90%] bg-[#fffbea] md:border-b-0 md:border-l border-black">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-6/10">
              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Subjective Notes/Chief Complaint
              </div>
              <textarea
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                disabled={!isEditing}
                className={`w-full border-x border-b border-gray-300 p-2 italic text-black-600 min-h-[124px] resize-none focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                placeholder="Enter chief complaint..."
              />

              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Physical examination
              </div>
              <textarea
                value={physicalExam}
                onChange={(e) => setPhysicalExam(e.target.value)}
                disabled={!isEditing}
                className={`w-full border border-gray-300 p-2 italic text-black-600 min-h-[90px] resize-none focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                placeholder="Enter Physical examination..."
              />
              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Assessment/Diagnosis
              </div>
              <textarea
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                disabled={!isEditing}
                className={`w-full border border-gray-300 p-2 italic text-black-600 min-h-[110px] resize-none focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                placeholder="Enter Assessment/Diagnosis..."
              />
              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Treatment Plan
              </div>
              <textarea
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                disabled={!isEditing}
                className={`w-full border border-gray-300 p-2 italic text-black-600 min-h-[110px] resize-none focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                placeholder="Enter Treatment Plan..."
              />
            </div>

            <div className="w-full md:w-4/10">
              {/* Header Row */}
              <div className="grid grid-cols-[100px_1fr] text-center font-bold bg-yellow-100 border-l border-b border-gray-300 sticky top-0 z-10">
                <div className="p-1 border-r border-gray-300">ICD Code</div>
                <div className="p-1  flex items-center justify-center">
                  <div className="flex items-center gap-2 px-10 py-0.5 border border-gray-300 rounded-full bg-pink-100">
                    <span className="font-semibold">ICD Desc</span>
                      <button
                      className="bg-blue-200 hover:bg-blue-300 rounded-full px-1 cursor-pointer"
                      onClick={() => {
                        if (isEditing) {
                          setPanelRowIndex(-1);
                        }
                      }}
                      title="Add ICD"
                    >
                      🔍
                    </button>
                  </div>
                </div>
              </div>

              {/* ICD Rows */}
              <div className="max-h-[254px] overflow-y-auto scrollbar-hide">
                {icdRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[100px_1.5fr] text-center bg-white border-l border-b border-gray-100 items-center group relative"
                  >
                    {/* Column 1: ICD Code */}
                    <div className="p-1 text-black-500 min-h-[32px] flex items-center justify-center">
                      {row.code || ""}
                    </div>

                    {/* Column 2: ICD desc */}
                    <div className="p-1 border-l border-gray-100 min-h-[32px] flex items-center justify-start px-3 text-gray-800">
                      {row.desc || ""}
                    </div>

                    {/* Delete button */}
                      {isEditing && (
                        <button
                          className="absolute right-1 top-1 text-red-600 hover:text-red-800 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete ICD"
                          onClick={() => {
                            const updated = [...icdRows];
                            updated.splice(idx, 1);
                            // Add empty rows to maintain 19 rows
                            while (updated.length < 19) {
                              updated.push({ code: "", desc: "", type: "Secondary" });
                            }
                            setIcdRows(updated);
                          }}
                          style={{ fontSize: '14px', lineHeight: '1', width: '20px', height: '20px' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                  </div>
                ))}
              </div>

              {/* Investigations Header */}
              <div className="">
                <div className="grid grid-cols-[100px_1fr_60px] text-center font-bold bg-yellow-100 border-b border-t border-gray-300  ">
                  <div className="p-1 border-r border-gray-300">Procedures</div>

                  <div className="p-1 flex items-center justify-center border-r border-gray-300">
                    <div className="flex items-center gap-2 px-10 py-0.5 border border-gray-300 rounded-full bg-pink-100">
                      <span className="font-semibold">Short Desc</span>
                      <button
                        className="bg-blue-200 hover:bg-blue-300 rounded-full px-1 cursor-pointer"
                        onClick={() => {
                          if (isEditing) {
                            const emptyIndex = cptRows.findIndex(
                              (row) => row.code === "" && row.desc === ""
                            );
                            if (emptyIndex !== -1)
                              setCptPanelRowIndex(emptyIndex);
                            else alert("No empty row available!");
                          }
                        }}
                        title="Add CPT"
                      >
                        🔍
                      </button>
                    </div>
                  </div>

                  <div className="p-1 border-l border-gray-300">Qty</div>
                </div>

                <div className="max-h-[254px] overflow-y-auto scrollbar-hide">
                  {cptRows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[100px_1fr_60px] text-center bg-white border-l border-b border-gray-100 items-center group relative"
                    >
                      <div className="p-1 border-r border-gray-100 text-red-600 truncate">
                        {row.code || "-"}
                      </div>
                      <div className="p-1 border-r border-gray-100 truncate flex justify-between items-center gap-1">
                        <span className="w-full text-center">
                          {row.desc || "-"}
                        </span>

                        {/* Delete button */}
                        {isEditing && row.code && (
                          <button
                            className="absolute right-1 top-1 text-red-600 hover:text-red-800 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const updated = [...cptRows];
                              updated.splice(i, 1);
                              // Add empty rows to maintain 8 rows
                              while (updated.length < 9) {
                                updated.push({ code: "", desc: "", type: "" });
                              }
                              setCptRows(updated);
                            }}
                            title="Delete CPT"
                            style={{ fontSize: '14px', lineHeight: '1', width: '20px', height: '20px' }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="p-1 border-l border-gray-100">
                        <input
                          type="number"
                          min={1}
                          defaultValue={1}
                          className="w-full text-center outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Medicine Prescription Table */}
          <div>
            <div className="text-center font-bold py-1.5 bg-pink-200">
              Medicine prescribed
              <button
                className="ml-2 bg-blue-200 cursor-pointer hover:bg-blue-300 rounded px-1"
                onClick={() => setMedPanelRowIndex(0)}
                title="Search Medicine"
              >
                🔍
              </button>
            </div>
            <div className="overflow-y-auto scrollbar-hide max-h-[115px] relative">
              <table className="w-full text-sm text-center border border-gray-300">
                <thead className="sticky top-0 z-10 bg-cyan-200">
                  <tr className="font-semibold">
                    <th className="border border-gray-300 px-2 py-1">
                      TRADE NAME
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      ROUTE OF ADMIN
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      GRANULAR
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Number of days
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Frequency
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Remarks
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: Math.max(3, medRows.length) }).map(
                    (_, i) => (
                      <tr key={i} className="group relative">
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          {medRows[i]?.tradeName || <>&nbsp;</>}
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          {medRows[i]?.route || <>&nbsp;</>}
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          {medRows[i]?.granular || <>&nbsp;</>}
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              className="w-5 h-5 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 disabled:opacity-50"
                              onClick={() => {
                                if (isEditing) {
                                  const newRows = [...medRows];
                                  newRows[i] = { ...newRows[i], days: Math.max(1, (newRows[i]?.days || 1) - 1) };
                                  setMedRows(newRows);
                                }
                              }}
                              disabled={!isEditing || (medRows[i]?.days || 1) <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="365"
                              value={medRows[i]?.days || 1}
                              onChange={(e) => {
                                if (isEditing) {
                                  const newRows = [...medRows];
                                  newRows[i] = { ...newRows[i], days: Math.max(1, parseInt(e.target.value) || 1) };
                                  setMedRows(newRows);
                                }
                              }}
                              className="w-12 text-center border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              disabled={!isEditing}
                            />
                            <button
                              type="button"
                              className="w-5 h-5 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 disabled:opacity-50"
                              onClick={() => {
                                if (isEditing) {
                                  const newRows = [...medRows];
                                  newRows[i] = { ...newRows[i], days: Math.min(365, (newRows[i]?.days || 1) + 1) };
                                  setMedRows(newRows);
                                }
                              }}
                              disabled={!isEditing}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          {medRows[i] ? (
                            <select
                              value={medRows[i].freq || "Once daily"}
                              onChange={(e) => {
                                const newRows = [...medRows];
                                newRows[i] = { ...newRows[i], freq: e.target.value };
                                setMedRows(newRows);
                              }}
                              className="w-full px-1 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="Once daily">Once daily</option>
                              <option value="Twice daily">Twice daily</option>
                              <option value="Thrice daily">Thrice daily</option>
                            </select>
                          ) : (
                            <>&nbsp;</>
                          )}
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1 relative">
                          {medRows[i]?.remark || <>&nbsp;</>}
                          
                          {/* Delete button - appears on hover when editing */}
                          {isEditing && medRows[i] && (
                            <button
                              className="absolute right-1 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full shadow-md hover:shadow-lg"
                              title="Delete Medicine"
                              onClick={() => {
                                const newRows = [...medRows];
                                newRows.splice(i, 1);
                                setMedRows(newRows);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-[20%] flex flex-col md:flex-row">
          <div className="w-full  bg-amber-50 p-8 text-base">
            <div className="flex flex-col gap-2">
              <button 
                className="bg-gray-800 cursor-pointer text-white py-4 rounded"
                onClick={handleNewPatient}
              >
                New Patient 
              </button>
              <button 
                className="bg-blue-500 cursor-pointer text-white py-4 rounded"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                className="bg-black text-white py-4 cursor-pointer px-4 rounded"
                onClick={handleGenerateEHR}
              >
                Generate E-HR
              </button>
              <button 
                className="bg-purple-400 cursor-pointer text-white py-4 rounded hover:bg-purple-500"
                onClick={() => setIsAIChatbotOpen(true)}
              >
                AI-ChatBot 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



