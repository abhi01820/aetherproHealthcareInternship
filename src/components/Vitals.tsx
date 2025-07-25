"use client";

import { useState } from "react";
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
}

export default function ClinicalDesktopUI() {
  const router = useRouter();
  const [panelRowIndex, setPanelRowIndex] = useState<number | null>(null);
  const [cptPanelRowIndex, setCptPanelRowIndex] = useState<number | null>(null);
  const [medPanelRowIndex, setMedPanelRowIndex] = useState<number | null>(null);

const [icdRows, setIcdRows] = useState<ICDRow[]>([
  { code: "", desc: "", type: "Primary" },
  { code: "", desc: "", type: "Secondary" },
  ...Array.from({ length: 19 }).map(() => ({
    code: "",
    desc: "",
    type: "Secondary" as const,
  })),
]);


  const [cptRows, setCptRows] = useState<CPTInvestigationRow[]>(
    Array(7).fill({ code: "", desc: "" })
  );

  const handleCptSelect = (index: number, code: string, desc: string) => {
    const newRows = [...cptRows];
    newRows[index] = { code, desc };
    setCptRows(newRows);
    setCptPanelRowIndex(null);
  };

  const [medRows, setMedRows] = useState(
    [] as {
      tradeName: string;
      route: string;
      granular: string;
      days: number;
      freq: string;
      remark: string;
    }[]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const [selectionMade, setSelectionMade] = useState(false);
  const [hideSDX, setHideSDX] = useState(false);

  const handleICDSelect = (entry: {
    Code: string;
    ShortDesc: string;
    LongDesc: string;
  }) => {
    const updated = [...icdRows];
    const emptyIndex = updated.findIndex((r) => r.code === "" && r.desc === "");
    if (emptyIndex !== -1) {
      updated[emptyIndex].code = entry.Code;
      updated[emptyIndex].desc = entry.ShortDesc;
      if (emptyIndex === 1) {
        setHideSDX(true);
      }
      setSelectionMade(true);
    }
    setIcdRows(updated);
    setPanelRowIndex(null);
  };

  const handleMedicineSelect = (entry: {
    TRADE_NAME: string;
    ROUTE_OF_ADMIN: string;
    GRANULAR_UNIT: string;
    PACKAGE_PRICE: string;
    days?: number;
    freq?: string;
    remark?: string;
  }) => {
    setMedRows([
      ...medRows,
      {
        tradeName: entry.TRADE_NAME,
        route: entry.ROUTE_OF_ADMIN,
        granular: entry.GRANULAR_UNIT,
        days: entry.days ?? 5,
        freq: entry.freq ?? "Once daily",
        remark: entry.remark ?? "N/A",
      },
    ]);
    setMedPanelRowIndex(null);
  };

  const { setPatient } = useEHR();
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [physicalExam, setPhysicalExam] = useState("");
  const [assessment, setAssessment] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");

  return (
    <div className="w-full border-2 border-black relative text-sm">
      {/* Panels */}
      {panelRowIndex !== null && (
        <ICDSearchPanel
          onSelect={handleICDSelect}
          onClose={() => setPanelRowIndex(null)}
          position="inline"
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
      <div className="flex flex-col md:flex-row font-semibold ">
        <div className="md:w-[80%] bg-cyan-200 px-2 py-1 flex flex-wrap items-center gap-4">
          <span className="font-bold">Vitals:</span>
          <span>Temp: 39°C</span>
          <span>BP: 128/80 mmHg</span>
          <span>HR: 92 bpm</span>
          <span>Weight: 65</span>
          <span>Height: 171</span>
        </div>
        <div className="md:w-[10%] bg-cyan-200 border-t md:border-r md:border-t-0 border-black flex items-center justify-center text-center"></div>
        <div className="md:w-[20%] bg-green-100 border-t md:border-l md:border-t-0 border-black flex items-center justify-center text-center">
          Smart EMR <br />- Powered by AI
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-[90%] bg-[#fffbea] md:border-b-0 md:border-l border-black">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Subjective Notes/Chief Complaint
              </div>
              <textarea
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full border-x border-b border-gray-300 p-2 italic text-red-600 bg-white min-h-[124px] resize-none focus:outline-none"
                placeholder="Enter chief complaint..."
              />

              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Physical examination
              </div>
              <textarea
                value={physicalExam}
                onChange={(e) => setPhysicalExam(e.target.value)}
                className="w-full border border-gray-300 p-2 italic text-red-600 
           bg-[repeating-linear-gradient(to_bottom,_#f3f4f6_0px,_#f3f4f6_1px,_white_1px,_white_22px)]
           min-h-[90px] resize-none focus:outline-none"
                placeholder="Enter Physical examination..."
              />
              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Assessment/Diagnosis
              </div>
              <textarea
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full border border-gray-300 p-2 italic text-red-600 
           bg-[repeating-linear-gradient(to_bottom,_#f3f4f6_0px,_#f3f4f6_1px,_white_1px,_white_22px)]
           min-h-[90px] resize-none focus:outline-none"
                placeholder="Enter Assessment/Diagnosis..."
              />
              <div className="text-center font-bold border border-gray-300 py-1.5 bg-yellow-100">
                Treatment Plan
              </div>
              <textarea
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="w-full border border-gray-300 p-2 italic text-red-600 
           bg-[repeating-linear-gradient(to_bottom,_#f3f4f6_0px,_#f3f4f6_1px,_white_1px,_white_22px)]
           min-h-[90px] resize-none focus:outline-none"
                placeholder="Enter Treatment Plan..."
              />
            </div>

            <div className="w-full md:w-1/2">
              {/* Header Row */}
              <div className="grid grid-cols-[100px_1fr] text-center font-bold bg-yellow-100 border-l border-b border-gray-300 sticky top-0 z-10">
                <div className="p-1 border-r border-gray-300">ICD Code</div>
                <div className="p-1  flex items-center justify-center">
                  <div className="flex items-center gap-2 px-10 py-0.5 border border-gray-300 rounded-full bg-pink-100">
                    <span className="font-semibold">ICD Desc</span>
                    <button
                      className="bg-blue-200 hover:bg-blue-300 rounded-full px-1 cursor-pointer"
                      onClick={() => setPanelRowIndex(-1)}
                      title="Add ICD"
                    >
                      🔍
                    </button>
                  </div>
                </div>
              </div>

              {/* ICD Rows */}
              <div className="max-h-[254px] overflow-y-auto scrollbar-hide">
                {(() => {
                  let pdxShown = false;
                  let sdxShown = false;

                  return icdRows.map((row, idx) => {
                    let displayCode = row.code;

                    if (!row.code) {
                      if (row.type === "Primary" && !pdxShown) {
                        displayCode = "PDX";
                        pdxShown = true;
                      } else if (
                        row.type === "Secondary" &&
                        !sdxShown &&
                        !hideSDX
                      ) {
                        displayCode = "SDX";
                        sdxShown = true;
                      } else {
                        displayCode = ""; // Other empty rows show nothing
                      }
                    }

                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-[100px_1.5fr] text-center bg-white border-l border-b border-gray-100 items-center"
                      >
                        {/* Column 1: ICD Code / PDX / SDX */}
                        <div className="p-1 text-red-300 min-h-[32px] flex items-center justify-center">
                          {displayCode}
                        </div>

                        {/* Column 2: ICD Description */}
                        <div className="p-1 border-l border-gray-100 min-h-[32px] flex items-center justify-start px-3 text-gray-800">
                          {row.desc || ""}
                        </div>
                      </div>
                    );
                  });
                })()}
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
                          const emptyIndex = cptRows.findIndex(
                            (row) => row.code === "" && row.desc === ""
                          );
                          if (emptyIndex !== -1)
                            setCptPanelRowIndex(emptyIndex);
                          else alert("No empty row available!");
                        }}
                        title="Add CPT"
                      >
                        🔍
                      </button>
                    </div>
                  </div>

                  <div className="p-1 border-l border-gray-300">Qty</div>
                </div>

                {cptRows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[100px_1fr_60px] text-center bg-white border-l border-b border-gray-100 items-center"
                  >
                    <div className="p-1 border-r border-gray-100 text-red-600 truncate">
                      {row.code || "-"}
                    </div>
                    <div className="p-1 border-r border-gray-100 truncate flex justify-between items-center gap-1">
                      <span className="w-full text-center">
                        {row.desc || "-"}
                      </span>
                      {row.code && (
                        <button
                          className="text-red-500 cursor-pointer font-semibold"
                          onClick={() => {
                            const updated = [...cptRows];
                            updated[i] = { code: "", desc: "" };
                            setCptRows(updated);
                          }}
                          title="Remove CPT"
                        >
                          ✕
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
          {/* Medicine Prescription Table */}
          <div>
            <div className="text-center font-bold py-1.5 bg-pink-200">
              Medicine prescribed
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
                      <button
                        className="ml-2 bg-blue-200 cursor-pointer hover:bg-blue-300 rounded px-1"
                        onClick={() => setMedPanelRowIndex(0)}
                        title="Search Medicine"
                      >
                        🔍
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: Math.max(3, medRows.length) }).map(
                    (_, i) => (
                      <tr key={i}>
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
                          {medRows[i]?.days || <>&nbsp;</>}
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          {medRows[i]?.freq || <>&nbsp;</>}
                        </td>
                        <td className="border border-gray-300 bg-white px-2 py-1">
                          {medRows[i]?.remark || <>&nbsp;</>}
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
              <button className="bg-gray-800 cursor-pointer text-white py-4 rounded">
                Medical Coding
              </button>
              <button className="bg-blue-500 cursor-pointer text-white py-4 rounded">
                AI - Advisory
              </button>
              <button className="bg-green-500 cursor-pointer text-white py-4 rounded">
                Suggestions
              </button>
              <button className="bg-purple-400 cursor-pointer text-white py-4 rounded">
                Claims Database
              </button>
              <button
                className="bg-black text-white py-4 cursor-pointer px-4 rounded"
                onClick={() => {
                  setPatient((prev) => ({
                    ...prev,
                    vitals: {
                      Temperature: "39°C",
                      BP: "128/80 mmHg",
                      Pulse: "92 bpm",
                    },
                    diagnosis: icdRows.map((r) => r.desc).filter(Boolean),
                    procedures: cptRows.map((r) => r.desc).filter(Boolean),
                    medications: medRows.map((med) => ({
                      name: med.tradeName,
                      dosage:med.days,
                      frequency: med.freq,
                    })),
                    chiefComplaint,
                    physicalExam,
                    assessment,
                    treatmentPlan,
                  }));
                  router.push("/EHRReport");
                }}
              >
                Generate E-HR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
