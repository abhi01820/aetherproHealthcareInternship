"use client";

import { useEffect, useState } from "react";

interface MedicineEntry {
  TRADE_NAME: string;
  ROUTE_OF_ADMIN: string;
  GRANULAR_UNIT: string;
  PACKAGE_PRICE: string;
  remark?: string;
  days?: number;
  freq?: string;
}

interface Props {
  onSelect: (entry: MedicineEntry) => void;
  onClose: () => void;
}

export default function MedicineSearchPanel({ onSelect, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineData, setMedicineData] = useState<MedicineEntry[]>([]);
  const [filteredResults, setFilteredResults] = useState<MedicineEntry[]>([]);

  useEffect(() => {
    fetch("/data/medicine.json")
      .then((res) => res.json())
      .then((data: MedicineEntry[]) => {
        setMedicineData(data);
      })
      .catch((err) => console.error("❌ Failed to load medicine data:", err));
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredResults([]);
    const results = medicineData.filter((med) =>
      med.TRADE_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results.slice(0, 10));
  }, [searchTerm, medicineData]);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-pink-500 w-[90%] max-w-2xl shadow-lg rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-pink-500 text-white px-3 py-1 rounded font-semibold">Search</span>
        <input
          type="text"
          className="border border-pink-500 px-4 py-2 w-full rounded shadow"
          placeholder="Search medicine by trade name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      <div className="max-h-80 overflow-y-auto text-sm">
        {filteredResults.map((item, i) => (
          <div
            key={i}
            className="p-2 border-b hover:bg-pink-50 cursor-pointer"
            onClick={() => {
              onSelect({
                ...item,
                days: item.days ?? 5,
                freq: item.freq ?? "Once daily",
                remark: item.remark ?? "N/A",
              });
              onClose();
            }}
          >
            <div className="text-gray-700 font-bold">{item.TRADE_NAME}</div>
            <div className="text-gray-500 italic">
              {item.ROUTE_OF_ADMIN} • {item.GRANULAR_UNIT}
            </div>
          </div>
        ))}
        {filteredResults.length === 0 && (
          <p className="text-gray-500 italic text-center">No matches found.</p>
        )}
      </div>

      <div className="text-right mt-4">
        <button
          onClick={onClose}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
